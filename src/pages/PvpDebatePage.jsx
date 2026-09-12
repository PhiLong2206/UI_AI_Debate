import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Send, Award, Sparkles, Swords, User, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ExitModal } from '../components/debate/ExitModal';
import { useApp } from '../context/AppContext';

export const PvpDebatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, addSession } = useApp();

  const [currentRound, setCurrentRound] = useState(1);
  const [isOpponentThinking, setIsOpponentThinking] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [debateFinished, setDebateFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  const opponentName = 'Nguyễn Đức Duy';
  const motionTitle = 'Mạng xã hội có gây hại nhiều hơn mang lại lợi ích cho giới trẻ?';

  const [transcript, setTranscript] = useState({
    1: { user: null, opponent: null },
    2: { user: null, opponent: null },
    3: { user: null, opponent: null }
  });

  const mockOpponentResponses = {
    1: `Chào Phi Long. Về phía phe Phản đối, tôi cho rằng mạng xã hội là phương tiện không thể thiếu trong kỷ nguyên số. 
Nó cung cấp cho giới trẻ khả năng kết nối không giới hạn, tiếp cận nguồn tri thức mở và tạo ra các cơ hội nghề nghiệp mà thế hệ trước không có được. 
Tác động tiêu cực là do cách tiếp cận của từng cá nhân chứ không phải do bản chất nền tảng.`,
    2: `Tôi xin phản biện quan điểm của bạn: Bạn cho rằng thuật toán thao túng tâm lý, nhưng người trẻ ngày nay có khả năng thích ứng công nghệ rất cao. 
Nhiều sinh viên đã tận dụng mạng xã hội để tổ chức các chiến dịch xã hội ý nghĩa và xây dựng cộng đồng học thuật vững mạnh. 
Nếu chỉ tập trung vào mặt tiêu cực, chúng ta sẽ bỏ lỡ cơ hội phát triển vượt bậc của cả một thế hệ.`,
    3: `Tổng kết trận đấu: Phe Phản đối đã chứng minh rằng lợi ích về mặt tri thức, kinh tế sáng tạo và kết nối toàn cầu của mạng xã hội lớn hơn rất nhiều so với những rủi ro có thể kiểm soát được bằng giáo dục và ý thức người dùng.`
  };

  const sampleUserArguments = {
    1: `Chào đối thủ Đức Duy. Đại diện phe Ủng hộ, tôi khẳng định mạng xã hội gây hại nhiều hơn lợi ích vì làm gia tăng tỷ lệ cô lập tâm lý, giảm sút khả năng tập trung sâu và tiếp xúc với lượng lớn thông tin sai lệch gây hoang mang cho người trẻ.`,
    2: `Phản biện lại luận điểm của bạn: Bạn nhấn mạnh cơ hội nhưng lại né tránh việc thuật toán tối ưu hóa tương tác tiêu cực để kiếm tiền. Trẻ vị thành niên chưa đủ kinh nghiệm sống rất dễ bị tổn thương tâm lý trước áp lực đồng trang lứa và bạo lực mạng.`,
    3: `Kết luận: Phe Ủng hộ khẳng định nền tảng số đang tạo ra cái giá quá đắt về sức khỏe tinh thần và năng suất lao động thực chất của giới trẻ.`
  };

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

  const handleSubmitArgument = () => {
    if (!inputText.trim() || isOpponentThinking) return;

    const userArg = inputText.trim();
    setInputText('');

    setTranscript(prev => ({
      ...prev,
      [currentRound]: { ...prev[currentRound], user: userArg }
    }));

    setIsOpponentThinking(true);

    setTimeout(() => {
      const oppArg = mockOpponentResponses[currentRound];
      setTranscript(prev => ({
        ...prev,
        [currentRound]: { ...prev[currentRound], opponent: oppArg }
      }));
      setIsOpponentThinking(false);

      if (currentRound < 3) {
        setCurrentRound(prev => prev + 1);
        setTimeLeft(180);
      } else {
        setDebateFinished(true);
      }
    }, 1300);
  };

  const handleFinishPvp = () => {
    const newSession = addSession({
      topicId: 'tp-01',
      topicTitle: motionTitle,
      mode: '1 vs 1',
      opponent: opponentName,
      side: 'Ủng hộ',
      score: 77,
      opponentScore: 76,
      status: 'Hoàn thành',
      grade: 'Thắng',
      rubric: {
        argumentation: 8.0,
        evidence: 6.5,
        relevance: 8.5,
        structure: 7.5,
        persuasion: 8.0,
      },
      opponentRubric: {
        argumentation: 7.5,
        evidence: 8.0,
        relevance: 8.0,
        structure: 7.0,
        persuasion: 7.5,
      }
    });

    navigate(`/ket-qua-1v1/${newSession.id}`);
  };

  const rounds = [
    { num: 1, name: 'Mở đầu' },
    { num: 2, name: 'Phản biện' },
    { num: 3, name: 'Kết luận' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#172033] flex flex-col">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 h-16 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4 min-w-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExitModalOpen(true)}
            className="shrink-0"
          >
            Thoát phòng
          </Button>

          <div className="min-w-0 hidden md:block">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Phòng đấu 1 vs 1: {id || 'ADPP-8241'}
            </span>
            <div className="text-xs sm:text-sm font-bold text-[#173B67] truncate max-w-md">
              {motionTitle}
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

        {/* Right: Round Indicators */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
          {rounds.map(r => {
            const isCompleted = transcript[r.num]?.user && transcript[r.num]?.opponent;
            const isCurrent = currentRound === r.num && !debateFinished;
            return (
              <div key={r.num} className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
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
        {/* LEFT: BẠN */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-260px)]">
          <div>
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
                    Phe: <span className="font-bold text-[#2563EB]">Ủng hộ</span>
                  </div>
                </div>
              </div>
              <Badge variant="primary" size="xs">Chủ phòng</Badge>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Lập luận của bạn
              </div>

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
                        Đang đến lượt bạn nhập lập luận...
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTER: DIỄN BIẾN (Timeline & Status) */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-260px)]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="font-bold text-xs uppercase tracking-wider text-[#173B67] flex items-center gap-1.5">
                <Swords className="w-4 h-4 text-indigo-600" />
                Diễn biến đối đầu 1 vs 1
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Trọng tài AI giám sát</span>
            </div>

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
                        ? 'border-indigo-300 bg-indigo-50/30 ring-1 ring-indigo-200'
                        : isPassed
                        ? 'border-slate-200 bg-slate-50/60'
                        : 'border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#173B67] mb-2">
                      Vòng {r.num} — {r.name}
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-slate-200/80">
                        <span className="text-slate-700 font-medium">Bạn (Ủng hộ)</span>
                        {roundData.user ? (
                          <span className="text-emerald-600 font-bold">✓ Đã phát biểu</span>
                        ) : isCurrent ? (
                          <span className="text-[#2563EB] font-bold animate-pulse">● Đến lượt bạn</span>
                        ) : (
                          <span className="text-slate-400">Chờ lượt</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-slate-200/80">
                        <span className="text-slate-700 font-medium">{opponentName} (Phản đối)</span>
                        {roundData.opponent ? (
                          <span className="text-emerald-600 font-bold">✓ Đã phát biểu</span>
                        ) : isCurrent && isOpponentThinking ? (
                          <span className="text-amber-600 font-bold animate-pulse">● Đang soạn thảo...</span>
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

        {/* RIGHT: OPPONENT (NGUYỄN ĐỨC DUY) */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-260px)]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                  alt={opponentName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <div className="text-xs font-bold text-[#173B67]">{opponentName}</div>
                  <div className="text-[11px] text-slate-500">
                    Phe: <span className="font-bold text-slate-700">Phản đối</span>
                  </div>
                </div>
              </div>
              <Badge variant="navy" size="xs">Đối thủ</Badge>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Lập luận của đối thủ
              </div>

              {isOpponentThinking && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 text-xs text-amber-900 animate-pulse flex items-center gap-2.5">
                  <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>Đang chờ {opponentName} phản biện...</span>
                </div>
              )}

              {[1, 2, 3].map(roundNum => {
                const arg = transcript[roundNum]?.opponent;
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

              {!transcript[1]?.opponent && !isOpponentThinking && (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-4 text-xs text-slate-400 italic text-center">
                  Đối thủ sẽ phát biểu sau lượt của bạn.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM COMPOSER */}
      <div className="bg-white border-t border-[#E2E8F0] p-4 shadow-lg sticky bottom-0 z-20">
        <div className="max-w-7xl mx-auto space-y-3">
          {debateFinished ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Trận đấu 1 vs 1 đã kết thúc!
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Trọng tài AI đã hoàn thành chấm điểm so sánh độc lập giữa hai học viên.
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleFinishPvp}
                className="shrink-0 bg-emerald-700 hover:bg-emerald-800"
              >
                Xem kết quả từ Trọng tài AI
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#173B67] uppercase tracking-wider">
                    Lập luận của bạn — Vòng {currentRound}: {rounds[currentRound - 1].name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setInputText(sampleUserArguments[currentRound] || '')}
                    className="text-[11px] text-[#2563EB] hover:underline bg-blue-50 px-2 py-0.5 rounded font-medium"
                  >
                    Điền nhanh (Demo)
                  </button>
                </div>
                <div className="text-xs text-slate-400">{inputText.length} / 2000 ký tự</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <textarea
                  rows={3}
                  maxLength={2000}
                  value={inputText}
                  disabled={isOpponentThinking}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập nội dung phản biện trực tiếp tới đối thủ..."
                  className="flex-1 p-3 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 resize-none disabled:bg-slate-50"
                />

                <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                  <Button
                    variant="primary"
                    size="md"
                    icon={Send}
                    loading={isOpponentThinking}
                    disabled={!inputText.trim() || isOpponentThinking}
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

      <ExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={() => navigate('/tranh-bien/1v1')}
      />
    </div>
  );
};
