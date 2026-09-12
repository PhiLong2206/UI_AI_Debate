import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  LayoutDashboard,
  TrendingUp,
  FileText,
  Calendar,
  UserCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const DebateResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sessions, topics } = useApp();

  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const [isImprovingArgument, setIsImprovingArgument] = useState(false);
  const [rewrittenArg, setRewrittenArg] = useState(
    'Kính thưa ban giám khảo. Tôi xin bổ sung dẫn chứng cụ thể từ Báo cáo Sức khỏe Tinh thần Thanh thiếu niên (2025) của Viện Nghiên cứu Xã hội học: hơn 68% thanh niên lạm dụng mạng xã hội trên 4 tiếng/ngày ghi nhận triệu chứng lo âu cấp tính, chứng minh tác hại vượt trội so với lợi ích kết nối.'
  );
  const [reScoreLoading, setReScoreLoading] = useState(false);
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleReEvaluate = () => {
    setReScoreLoading(true);
    setTimeout(() => {
      setReScoreLoading(false);
      setIsEvaluated(true);
    }, 600);
  };

  // Find session by id or fallback to default session
  const session = sessions.find(s => s.id === id) || sessions[0];
  const topic = topics.find(t => t.id === session?.topicId) || topics[0];

  const rubricItems = [
    { key: 'argumentation', label: '1. Lập luận', score: session.rubric?.argumentation || 8.0, max: 10, desc: 'Tính logic, chiều sâu và mô hình Luận điểm - Lý lẽ - Dẫn chứng' },
    { key: 'evidence', label: '2. Dẫn chứng', score: session.rubric?.evidence || 6.0, max: 10, desc: 'Độ tin cậy của số liệu, ví dụ thực tế và nguồn học thuật' },
    { key: 'relevance', label: '3. Tính liên quan', score: session.rubric?.relevance || 8.5, max: 10, desc: 'Bám sát kiến nghị và phản hồi trực diện luận điểm đối thủ' },
    { key: 'structure', label: '4. Cấu trúc', score: session.rubric?.structure || 7.5, max: 10, desc: 'Tính mạch lạc, chuyển ý và phân bổ thời lượng giữa các phần' },
    { key: 'persuasion', label: '5. Khả năng thuyết phục', score: session.rubric?.persuasion || 7.0, max: 10, desc: 'Ngôn từ chuẩn mực, độ đĩnh đạc và sức thuyết phục toàn diện' },
  ];

  const strengths = session.strengths || [
    'Cấu trúc luận điểm rõ ràng theo mô hình Luận điểm - Lý lẽ - Dẫn chứng.',
    'Phản xạ tốt trước các luận điểm mở đầu của đối thủ AI về quyền tiếp cận thông tin.',
    'Sử dụng ngôn từ học thuật chuẩn mực, phong thái lập luận điềm tĩnh.'
  ];

  const improvements = session.improvements || [
    'Dẫn chứng số liệu còn chung chung, cần bổ sung các báo cáo thực nghiệm cụ thể.',
    'Phần kết luận còn lặp lại luận điểm mở đầu mà chưa làm nổi bật tác động xã hội lớn hơn.'
  ];

  const feedback = session.feedback || 'Màn thể hiện rất thuyết phục. Bạn đã kiểm soát tốt thời gian và giữ vững lập trường từ đầu đến cuối. Điểm cần khắc phục lớn nhất là tính xác thực và chiều sâu của các ví dụ thực tiễn.';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-[#173B67]">Kết quả đánh giá phiên tranh biện</span>
            <Badge variant="success" size="xs">Đã hoàn thành</Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {session.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5" /> Phe: <strong>{session.side}</strong></span>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Kiến nghị tranh biện</span>
          <h1 className="text-lg sm:text-xl font-bold text-[#172033] mt-0.5">
            {session.topicTitle}
          </h1>
        </div>

        {/* Overall Score Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#2563EB] text-white flex flex-col items-center justify-center shadow-md">
              <span className="text-2xl font-black leading-none">{session.score}</span>
              <span className="text-[10px] uppercase font-bold text-blue-100">/100</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#173B67]">Xếp loại tổng thể:</span>
                <span className="text-base font-extrabold text-[#2563EB]">{session.grade || 'Khá tốt'}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-md">
                Điểm số được tổng hợp tự động từ 5 tiêu chí đánh giá bởi Trọng tài AI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              icon={TrendingUp}
              onClick={() => navigate('/tien-do')}
            >
              Xem tiến độ
            </Button>
          </div>
        </div>
      </div>

      {/* Rubric Horizontal Progress Bars */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-5">
        <div>
          <h3 className="text-base font-bold text-[#173B67]">
            Chi tiết 5 Tiêu chí Đánh giá
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Thang điểm 10 cho từng nhóm năng lực tranh biện học thuật
          </p>
        </div>

        <div className="space-y-4">
          {rubricItems.map((item) => {
            const percentage = (item.score / item.max) * 100;
            const isLow = item.score < 7.0;

            return (
              <div key={item.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#172033]">{item.label}</span>
                    <span className="text-slate-400 ml-2 hidden sm:inline">({item.desc})</span>
                  </div>
                  <span className={`font-bold text-sm ${isLow ? 'text-amber-600' : 'text-[#2563EB]'}`}>
                    {item.score.toFixed(1)} <span className="text-slate-400 text-xs font-normal">/ 10</span>
                  </span>
                </div>

                {/* Progress bar container */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLow ? 'bg-amber-500' : 'bg-[#2563EB]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kỹ năng cần cải thiện nhất */}
      <div className="bg-white border border-amber-200/90 rounded-xl p-6 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#173B67] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Kỹ năng cần cải thiện nhất
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold text-slate-800">Dẫn chứng</span>
              <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                6.0 / 10
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsImprovingArgument(true)}
            >
              Cải thiện lập luận
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/chu-de/${session.topicId || 'tp-01'}`)}
            >
              Luyện lại chủ đề
            </Button>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Bạn đưa ra lập luận phù hợp nhưng một số ý chưa có ví dụ hoặc dẫn chứng cụ thể để hỗ trợ.
        </p>

        {/* Interactive Argument Rewrite & Re-evaluate UI */}
        {isImprovingArgument && (
          <div className="mt-4 pt-4 border-t border-amber-200 bg-slate-50 p-4 rounded-lg space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#173B67]">
              Chế độ Cải thiện & Chấm lại Lập luận
            </div>

            {/* 1. View original argument */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500">1. Lập luận ban đầu của bạn (Vòng 1):</div>
              <p className="text-xs text-slate-700 bg-white p-3 rounded border border-slate-200 italic leading-relaxed">
                "Mạng xã hội làm gia tăng tỷ lệ trầm cảm và hội chứng FOMO ở giới trẻ do sự so sánh xã hội liên tục..."
              </p>
            </div>

            {/* 2. View AI analysis */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-amber-700">2. Phân tích của Trọng tài AI:</div>
              <p className="text-xs text-amber-900 bg-amber-50/80 p-3 rounded border border-amber-200 leading-relaxed">
                Lập luận thiếu trích dẫn nghiên cứu thực nghiệm. Hãy bổ sung báo cáo khảo sát hoặc số liệu định lượng (ví dụ: Viện Nghiên cứu Xã hội học 2025).
              </p>
            </div>

            {/* 3. Rewrite argument */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                3. Viết lại lập luận (Bổ sung dẫn chứng & số liệu cụ thể):
              </label>
              <textarea
                rows={4}
                value={rewrittenArg}
                onChange={(e) => setRewrittenArg(e.target.value)}
                className="w-full p-3 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 leading-relaxed"
              />
            </div>

            {/* 4. Action buttons */}
            <div className="flex items-center justify-between pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsImprovingArgument(false)}
              >
                Đóng
              </Button>

              <Button
                variant="primary"
                size="sm"
                loading={reScoreLoading}
                onClick={handleReEvaluate}
              >
                Chấm lại
              </Button>
            </div>

            {/* 5. Compare previous score vs new score */}
            {isEvaluated && (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Kết quả chấm lại tiêu chí Dẫn chứng
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded">
                    Tăng +2.5 điểm
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded bg-white border border-slate-200">
                    <span className="text-slate-500">Điểm ban đầu:</span>
                    <div className="font-bold text-slate-700 text-sm mt-0.5">6.0 / 10</div>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-emerald-300">
                    <span className="text-emerald-700 font-medium">Điểm mới sau cải thiện:</span>
                    <div className="font-extrabold text-emerald-700 text-sm mt-0.5">8.5 / 10</div>
                  </div>
                </div>

                <p className="text-xs text-emerald-900 leading-relaxed pt-1">
                  Nhận xét: Lập luận mới đã bổ sung nguồn tham khảo uy tín và số liệu định lượng cụ thể, giúp gia tăng đáng kể sức nặng thuyết phục.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Strengths, Improvements & AI Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Điểm mạnh */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Điểm mạnh nổi bật
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Điểm cần cải thiện */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <AlertCircle className="w-4 h-4" />
            Điểm cần cải thiện
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {improvements.map((imp, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-amber-600 font-bold">•</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Judge Feedback Box */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-2">
        <h3 className="text-sm font-bold text-[#173B67] flex items-center gap-2">
          <Award className="w-4 h-4 text-[#2563EB]" />
          Nhận xét tổng quan của Trọng tài AI
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-lg border border-slate-200">
          "{feedback}"
        </p>
      </div>

      {/* Transcript Accordion */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card overflow-hidden">
        <button
          type="button"
          onClick={() => setShowFullTranscript(!showFullTranscript)}
          className="w-full p-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2563EB]" />
            <span className="text-xs sm:text-sm font-bold text-[#173B67]">
              Xem toàn bộ biên bản tranh luận (3 Vòng đấu)
            </span>
          </div>
          {showFullTranscript ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {showFullTranscript && (
          <div className="p-5 space-y-4 border-t border-[#E2E8F0] text-xs">
            <div className="space-y-3">
              <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Vòng 1: Mở đầu
              </div>
              <div className="bg-blue-50/70 border border-blue-200 p-3 rounded-md">
                <div className="font-bold text-[#2563EB] mb-1">Bạn ({session.side}):</div>
                <p className="text-slate-800 leading-relaxed">
                  "Kính thưa ban giám khảo và đối thủ tranh biện. Đại diện cho phe Ủng hộ, tôi khẳng định mạng xã hội gây hại nhiều hơn mang lại lợi ích cho giới trẻ. Thứ nhất, nó làm gia tăng trầm cảm và hội chứng sợ bỏ lỡ. Thứ hai, thuật toán gây nghiện làm giảm năng suất học tập..."
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-md">
                <div className="font-bold text-[#173B67] mb-1">Đối thủ AI:</div>
                <p className="text-slate-800 leading-relaxed">
                  "Đại diện phe Phản đối, tôi khẳng định mạng xã hội là công cụ trung tính mang lại lợi ích cách mạng trong việc kết nối và bình đẳng hóa cơ hội học tập toàn cầu..."
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Vòng 2: Phản biện
              </div>
              <div className="bg-blue-50/70 border border-blue-200 p-3 rounded-md">
                <div className="font-bold text-[#2563EB] mb-1">Bạn ({session.side}):</div>
                <p className="text-slate-800 leading-relaxed">
                  "Tôi xin phản biện quan điểm của đối thủ: Bản chất thuật toán được thiết kế để giữ chân bằng vòng lặp dopamine, người trẻ rất khó tự chủ nếu thiếu sự kiểm soát..."
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-md">
                <div className="font-bold text-[#173B67] mb-1">Đối thủ AI:</div>
                <p className="text-slate-800 leading-relaxed">
                  "Thay vì cấm đoán, giải pháp nằm ở giáo dục năng lực số thay vì đổ lỗi hoàn toàn cho công nghệ..."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Button
          variant="outline"
          size="md"
          icon={LayoutDashboard}
          onClick={() => navigate('/tong-quan')}
        >
          Về trang tổng quan
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="md"
            icon={RotateCcw}
            onClick={() => navigate(`/chu-de/${session.topicId || 'tp-01'}`)}
          >
            Luyện lại chủ đề này
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={TrendingUp}
            onClick={() => navigate('/tien-do')}
          >
            Xem tiến độ học tập
          </Button>
        </div>
      </div>
    </div>
  );
};
