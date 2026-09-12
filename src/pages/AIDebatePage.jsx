import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Clock,
  Sparkles,
  Send,
  Bot,
  Award,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ExitModal } from '../components/debate/ExitModal';
import { RebuttalCoachDrawer } from '../components/debate/RebuttalCoachDrawer';
import { useApp } from '../context/AppContext';
import { DEMO_MODE } from '../config';

export const AIDebatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { topics, currentUser, addSession } = useApp();

  const topic = topics.find(t => t.id === id) || topics[0];
  const userSide = location.state?.side || 'Ủng hộ';
  const aiDifficulty = location.state?.aiDifficulty || 'Trung bình';
  const opponentSide = userSide === 'Ủng hộ' ? 'Phản đối' : 'Ủng hộ';

  // Round tracking: 1: Mở đầu, 2: Phản biện, 3: Kết luận
  const [currentRound, setCurrentRound] = useState(1);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isCoachDrawerOpen, setIsCoachDrawerOpen] = useState(false);
  const [debateFinished, setDebateFinished] = useState(false);

  // Timer countdown simulation (3 mins = 180s per round)
  const [timeLeft, setTimeLeft] = useState(180);

  // Debate Transcript State organized by rounds
  const [transcript, setTranscript] = useState({
    1: {
      user: null,
      ai: null,
    },
    2: {
      user: null,
      ai: null,
    },
    3: {
      user: null,
      ai: null,
    }
  });

  // Pre-configured Academic AI Arguments for each round
  const mockAiResponses = {
    1: `Xin chào. Đại diện cho phe ${opponentSide}, tôi xin khẳng định rằng mạng xã hội là công cụ trung tính và mang lại lợi ích cách mạng cho giới trẻ. 
Thứ nhất, nó dân chủ hóa cơ hội tiếp cận tri thức: hàng triệu học sinh vùng xa có thể tham gia các nhóm học thuật và khóa học mở miễn phí. 
Thứ hai, mạng xã hội tạo ra nền kinh tế sáng tạo, nơi thanh niên xây dựng thương hiệu cá nhân và khởi nghiệp từ sớm. Các tác động tiêu cực về tâm lý thực chất xuất phát từ việc thiếu kỹ năng quản trị bản thân chứ không nằm ở bản chất công nghệ.`,
    2: `Tôi xin phản bác lập luận của bạn: Bạn đang đổ lỗi cho thuật toán của mạng xã hội gây ra trầm cảm và xao nhãng học tập. Tuy nhiên, theo các nghiên cứu xã hội học, việc tiếp xúc nhiều nguồn thông tin đa chiều giúp giới trẻ rèn luyện tư duy phản biện tốt hơn so với tiếp nhận thông tin thụ động từ truyền thông một chiều. 
Hơn nữa, thay vì cấm đoán hoặc nhìn nhận tiêu cực, giải pháp cốt lõi là đưa giáo dục năng lực số vào trường học. Bạn có thể chứng minh được nếu loại bỏ mạng xã hội thì tỷ lệ cô lập xã hội ở giới trẻ sẽ tự động biến mất hay không?`,
    3: `Tổng kết lại phiên tranh biện: Phe Phản đối đã chứng minh rõ ràng rằng lợi ích của mạng xã hội trong việc mở rộng tri thức, tạo dựng cơ hội nghề nghiệp và kết nối xã hội toàn cầu là vượt trội hoàn toàn. Những thách thức về sức khỏe tinh thần là bài toán về giáo dục thói quen và quản trị thời gian, không thể là lý do để phủ nhận giá trị to lớn của cuộc cách mạng số đối với thế hệ tương lai.`
  };

  // Sample quick templates for instant demo
  const sampleLearnerArguments = {
    1: `Kính thưa ban giám khảo và đối thủ tranh biện. Đại diện cho phe Ủng hộ, tôi khẳng định mạng xã hội gây hại nhiều hơn mang lại lợi ích cho giới trẻ. 
Thứ nhất, nó làm gia tăng trầm cảm và hội chứng sợ bỏ lỡ do sự so sánh xã hội liên tục. 
Thứ hai, thuật toán tối ưu hóa thời gian giữ chân người dùng làm xói mòn khả năng tập trung sâu và năng suất học tập thực tế. 
Thứ ba, sự bùng nổ của tin giả và bạo lực mạng tạo ra môi trường độc hại đối với sự phát triển nhân cách của thanh thiếu niên.`,
    2: `Tôi xin phản biện quan điểm của đối thủ: Đối thủ cho rằng công nghệ là trung tính và lỗi do người dùng. Tuy nhiên, các tập đoàn công nghệ chủ đích thiết kế thuật toán gây nghiện bằng phản hồi tức thời nhằm tối đa hóa lợi nhuận quảng cáo. 
Người trẻ chưa hoàn thiện về mặt tâm lý rất khó để tự kiểm soát. Hơn nữa, việc giao tiếp ảo kéo dài đã làm suy giảm nghiêm trọng kỹ năng ứng xử thực tế và sự gắn kết gia đình - đây là những tổn hại sâu sắc không thể bù đắp chỉ bằng sự tiện lợi thông tin.`,
    3: `Tổng kết lại toàn bộ phiên tranh biện hôm nay: Phe Ủng hộ đã chỉ ra rõ ràng rằng cái giá phải trả về sức khỏe tinh thần, năng lực tập trung và sự an toàn tâm lý của cả một thế hệ vượt xa những lợi ích kết nối bề nổi. Công nghệ chỉ có giá trị khi phục vụ hạnh phúc con người, và khi nó gây tổn hại đến nền tảng tinh thần của giới trẻ thì đó chính là mối nguy hại lớn cần được nhìn nhận nghiêm túc.`
  };

  // Timer interval
  useEffect(() => {
    if (debateFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [debateFinished, currentRound]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFillSample = () => {
    setInputText(sampleLearnerArguments[currentRound] || '');
  };

  const handleSubmitArgument = () => {
    if (!inputText.trim() || isAiThinking) return;

    const userArg = inputText.trim();
    setInputText('');

    // Update user transcript for current round
    setTranscript(prev => ({
      ...prev,
      [currentRound]: {
        ...prev[currentRound],
        user: userArg
      }
    }));

    // AI is preparing response
    setIsAiThinking(true);

    setTimeout(() => {
      const aiArg = mockAiResponses[currentRound];
      setTranscript(prev => ({
        ...prev,
        [currentRound]: {
          ...prev[currentRound],
          ai: aiArg
        }
      }));
      setIsAiThinking(false);

      if (currentRound < 3) {
        setCurrentRound(prev => prev + 1);
        setTimeLeft(currentRound === 1 ? 180 : 120); // Reset timer for next round
      } else {
        // Debate Completed
        setDebateFinished(true);
      }
    }, 1200);
  };

  const handleFinishDebate = () => {
    const newSession = addSession({
      topicId: topic.id,
      topicTitle: topic.title,
      mode: 'Với AI',
      opponent: `Đối thủ AI (Cấp độ: ${aiDifficulty})`,
      side: userSide,
      score: 76,
      status: 'Hoàn thành',
      grade: 'Khá tốt',
      rubric: {
        argumentation: 8.0,
        evidence: 6.0,
        relevance: 8.5,
        structure: 7.5,
        persuasion: 7.0,
      },
      transcript: transcript
    });

    navigate(`/ket-qua/${newSession.id}`);
  };

  const rounds = [
    { num: 1, name: 'Mở đầu', time: '3 phút' },
    { num: 2, name: 'Phản biện', time: '3 phút' },
    { num: 3, name: 'Kết luận', time: '2 phút' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#172033] flex flex-col">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 h-16 flex items-center justify-between shadow-xs">
        {/* Left: Exit button & Motion */}
        <div className="flex items-center gap-4 min-w-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExitModalOpen(true)}
            className="shrink-0"
          >
            Thoát phiên
          </Button>

          <div className="min-w-0 hidden md:block">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Kiến nghị tranh biện
            </span>
            <div className="text-xs sm:text-sm font-bold text-[#173B67] truncate max-w-lg">
              {topic.title}
            </div>
          </div>
        </div>

        {/* Center: Timer */}
        <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-1.5 rounded-lg border border-slate-200">
          <Clock className="w-4 h-4 text-[#2563EB]" />
          <span className="font-mono text-sm font-bold text-[#173B67]">
            {formatTime(timeLeft)}
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            (Vòng {currentRound}/3)
          </span>
        </div>

        {/* Right: Round Progress Indicators */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
          {rounds.map((r) => {
            const isCompleted = transcript[r.num]?.user && transcript[r.num]?.ai;
            const isCurrent = currentRound === r.num && !debateFinished;
            return (
              <div key={r.num} className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-[#2563EB] text-white ring-2 ring-blue-400/30'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : r.num}
                </div>
                <span className={`hidden sm:inline ${isCurrent ? 'text-[#2563EB] font-bold' : 'text-slate-600'}`}>
                  {r.name}
                </span>
              </div>
            );
          })}
        </div>
      </header>

      {/* Main 3-Area Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden">
        
        {/* LEFT COLUMN: LEARNER (BẠN) */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-260px)]">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover border border-blue-200"
                />
                <div>
                  <div className="text-xs font-bold text-[#173B67] flex items-center gap-1">
                    {currentUser.name}
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-semibold">BẠN</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Phe: <span className="font-bold text-[#2563EB]">{userSide}</span>
                  </div>
                </div>
              </div>
              <Badge variant="primary" size="xs">Người học</Badge>
            </div>

            {/* Content: Latest & Previous Arguments */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Lập luận của bạn qua các vòng
              </div>

              {/* Loop through rounds */}
              {[1, 2, 3].map(roundNum => {
                const arg = transcript[roundNum]?.user;
                if (!arg && currentRound !== roundNum) return null;

                return (
                  <div key={roundNum} className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                      <span>Vòng {roundNum} — {rounds[roundNum - 1].name}</span>
                      {arg && <span className="text-emerald-600 font-medium">Đã gửi</span>}
                    </div>

                    {arg ? (
                      <div className="bg-[#EFF6FF] border border-blue-200/90 rounded-lg p-3.5 text-xs text-slate-800 leading-relaxed shadow-2xs">
                        <p className="whitespace-pre-line">{arg}</p>
                      </div>
                    ) : currentRound === roundNum ? (
                      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-3 text-xs text-slate-500 italic text-center">
                        Đang chờ bạn soạn thảo và gửi lập luận...
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: DIỄN BIẾN (Timeline) */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-260px)]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="font-bold text-xs uppercase tracking-wider text-[#173B67] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                Diễn biến tranh luận
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Theo luật 3 vòng</span>
            </div>

            {/* Timeline Rounds */}
            <div className="space-y-4">
              {rounds.map(r => {
                const roundData = transcript[r.num];
                const isCurrent = currentRound === r.num && !debateFinished;
                const isPassed = currentRound > r.num || debateFinished;

                return (
                  <div
                    key={r.num}
                    className={`rounded-lg border p-3.5 transition-all ${
                      isCurrent
                        ? 'border-blue-300 bg-blue-50/30 ring-1 ring-blue-200'
                        : isPassed
                        ? 'border-slate-200 bg-slate-50/60'
                        : 'border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-[#173B67]">
                        Vòng {r.num} — {r.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">{r.time}</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {/* Learner turn status */}
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-slate-200/80">
                        <span className="text-slate-700 font-medium">Bạn ({userSide})</span>
                        {roundData.user ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            ✓ Hoàn thành
                          </span>
                        ) : isCurrent ? (
                          <span className="text-[#2563EB] font-bold animate-pulse">
                            ● Đang đến lượt
                          </span>
                        ) : (
                          <span className="text-slate-400">Chờ lượt</span>
                        )}
                      </div>

                      {/* AI turn status */}
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-slate-200/80">
                        <span className="text-slate-700 font-medium">Đối thủ AI ({opponentSide})</span>
                        {roundData.ai ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            ✓ Hoàn thành
                          </span>
                        ) : isCurrent && isAiThinking ? (
                          <span className="text-amber-600 font-bold animate-pulse">
                            ● Đang phản hồi...
                          </span>
                        ) : (
                          <span className="text-slate-400">Chờ lượt</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI OPPONENT (ĐỐI THỦ AI) */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-260px)]">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#173B67] flex items-center gap-1">
                    Đối thủ AI
                    <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-semibold">{aiDifficulty}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Phe: <span className="font-bold text-slate-700">{opponentSide}</span>
                  </div>
                </div>
              </div>
              <Badge variant="navy" size="xs">Đối thủ AI</Badge>
            </div>

            {/* AI Arguments Content */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Lập luận của đối thủ qua các vòng
              </div>

              {/* If AI is currently generating */}
              {isAiThinking && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 text-xs text-amber-900 animate-pulse flex items-center gap-2.5">
                  <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>Đối thủ đang chuẩn bị phản hồi...</span>
                </div>
              )}

              {/* Loop through AI transcript */}
              {[1, 2, 3].map(roundNum => {
                const arg = transcript[roundNum]?.ai;
                if (!arg) return null;

                return (
                  <div key={roundNum} className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                      <span>Vòng {roundNum} — {rounds[roundNum - 1].name}</span>
                      <span className="text-slate-600 font-medium">Đối thủ đã nói</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-800 leading-relaxed shadow-2xs">
                      <p className="whitespace-pre-line">{arg}</p>
                    </div>
                  </div>
                );
              })}

              {!transcript[1]?.ai && !isAiThinking && (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-4 text-xs text-slate-400 italic text-center">
                  AI sẽ phản hồi sau khi bạn gửi lập luận Vòng 1.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM COMPOSER / ACTION BAR */}
      <div className="bg-white border-t border-[#E2E8F0] p-4 shadow-lg sticky bottom-0 z-20">
        <div className="max-w-7xl mx-auto space-y-3">
          
          {debateFinished ? (
            /* Debate Finished Notification Banner */
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Phiên tranh biện đã hoàn thành xuất sắc!
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Trọng tài AI đã phân tích toàn bộ 3 vòng đấu và hoàn tất bảng điểm 5 tiêu chí.
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleFinishDebate}
                className="shrink-0 w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800"
              >
                Xem kết quả tranh biện & Bảng điểm
              </Button>
            </div>
          ) : (
            /* Composer Interface */
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#173B67] uppercase tracking-wider">
                    Lập luận của bạn — Vòng {currentRound}: {rounds[currentRound - 1].name}
                  </span>
                  {DEMO_MODE && (
                    <button
                      type="button"
                      onClick={handleFillSample}
                      className="text-[11px] text-[#2563EB] hover:underline bg-blue-50 px-2 py-0.5 rounded font-medium"
                      title="Điền nhanh nội dung mẫu cho demo"
                    >
                      Điền lập luận mẫu (Demo)
                    </button>
                  )}
                </div>

                <div className="text-xs text-slate-400">
                  {inputText.length} / 2000 ký tự
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <textarea
                  rows={3}
                  maxLength={2000}
                  value={inputText}
                  disabled={isAiThinking}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Nhập nội dung lập luận ${rounds[currentRound - 1].name.toLowerCase()} của bạn (sử dụng mô hình Luận điểm - Lý lẽ - Dẫn chứng)...`}
                  className="flex-1 p-3 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 resize-none disabled:bg-slate-50 disabled:text-slate-400"
                />

                <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="md"
                    icon={Sparkles}
                    onClick={() => setIsCoachDrawerOpen(true)}
                    className="flex-1 sm:flex-none border-blue-200 text-[#2563EB] hover:bg-blue-50"
                  >
                    Gợi ý phản biện
                  </Button>

                  <Button
                    variant="primary"
                    size="md"
                    icon={Send}
                    loading={isAiThinking}
                    disabled={!inputText.trim() || isAiThinking}
                    onClick={handleSubmitArgument}
                    className="flex-1 sm:flex-none"
                  >
                    Gửi lập luận
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      <ExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={() => navigate('/chu-de')}
      />

      {/* Rebuttal Coach Drawer */}
      <RebuttalCoachDrawer
        isOpen={isCoachDrawerOpen}
        onClose={() => setIsCoachDrawerOpen(false)}
        tips={topic.defaultCoachTips}
        currentRoundName={`Vòng ${currentRound} (${rounds[currentRound - 1].name})`}
      />
    </div>
  );
};
