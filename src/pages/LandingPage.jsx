import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Users2, Award, ArrowRight, BookOpen, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { TOPICS } from '../data/mockData';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#172033] flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              A
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-[#173B67]">ADPP</span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-500 font-medium border-l border-slate-300 pl-2">
                Nền tảng luyện tập tranh biện AI
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#hero" className="text-[#2563EB] font-semibold">Trang chủ</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Phương pháp</a>
            <a href="#topics" className="hover:text-slate-900 transition-colors">Chủ đề nổi bật</a>
            <a href="#about" className="hover:text-slate-900 transition-colors">Về dự án</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dang-nhap')}
            >
              Đăng nhập
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/dang-ky')}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Đề tài Khóa luận Tốt nghiệp - Đại học FPT
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#173B67] tracking-tight leading-[1.15]">
              Luyện tranh biện.<br />
              <span className="text-[#2563EB]">Rèn tư duy.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Nền tảng giúp bạn luyện tập lập luận, phản biện và nhận đánh giá sau mỗi phiên tranh biện với trợ lý AI và cộng đồng sinh viên.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/tong-quan')}
              >
                Bắt đầu luyện tập
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={BookOpen}
                onClick={() => navigate('/chu-de')}
              >
                Khám phá chủ đề
              </Button>
            </div>

            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 max-w-lg text-left">
              <div>
                <div className="text-xl font-bold text-[#173B67]">100%</div>
                <div className="text-xs text-slate-500 font-medium">Tiếng Việt học thuật</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#173B67]">5 Tiêu chí</div>
                <div className="text-xs text-slate-500 font-medium">Rubric chuẩn quốc tế</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#173B67]">3 Vòng</div>
                <div className="text-xs text-slate-500 font-medium">Mở đầu - Phản biện - Kết</div>
              </div>
            </div>
          </div>

          {/* Academic Debate Interface Preview */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="text-xs font-semibold text-slate-700 ml-2">Phòng tranh biện AI mẫu</span>
                </div>
                <Badge variant="primary" size="xs">Đang diễn ra</Badge>
              </div>

              <div className="p-4 space-y-3">
                <div className="text-xs font-bold text-[#173B67] leading-snug">
                  Kiến nghị: "Mạng xã hội có gây hại nhiều hơn mang lại lợi ích cho giới trẻ?"
                </div>

                <div className="bg-[#EFF6FF] border border-blue-200/80 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-[#2563EB]">Bạn (Phe Ủng hộ)</span>
                    <span className="text-[10px] text-slate-500">Vòng 1 - Mở đầu</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    "Mạng xã hội làm gia tăng tỷ lệ trầm cảm và hội chứng FOMO ở giới trẻ do sự so sánh xã hội liên tục..."
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-[#173B67]">Đối thủ AI (Phe Phản đối)</span>
                    <span className="text-[10px] text-slate-500">Vòng 1 - Phản hồi</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    "Bản chất công nghệ là trung tính. Mạng xã hội cũng là kênh học tập cộng tác và mở rộng cơ hội nghề nghiệp lớn nhất..."
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span>Trọng tài AI chấm điểm Rubric</span>
                  <span className="font-semibold text-emerald-600">Điểm tổng: 76/100 (Khá tốt)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Blocks Section */}
      <section id="features" className="py-16 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#173B67]">
              Bạn có thể luyện tập như thế nào?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Quy trình rèn luyện tư duy phản biện có cấu trúc rõ ràng và khoa học.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Block 1 */}
            <div className="bg-[#F6F8FB] border border-[#E2E8F0] rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#173B67] mb-2">
                Tranh biện với AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Luyện tập đối đầu 1-1 với trợ lý AI mô phỏng theo 3 độ khó (Dễ, Trung bình, Khó). Có hỗ trợ huấn luyện viên gợi ý phản biện theo thời gian thực.
              </p>
              <div className="text-xs font-semibold text-[#2563EB] flex items-center gap-1">
                Luyện tập không giới hạn <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Block 2 */}
            <div className="bg-[#F6F8FB] border border-[#E2E8F0] rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#173B67] mb-2">
                Tranh biện 1 vs 1
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Tạo phòng đấu hoặc ghép ngẫu nhiên với các sinh viên khác trong trường. Tranh biện đối kháng trực tiếp theo khung thời gian nghiêm ngặt.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                Phòng đấu thời gian thực <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Block 3 */}
            <div className="bg-[#F6F8FB] border border-[#E2E8F0] rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#173B67] mb-2">
                Nhận đánh giá chi tiết
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Hệ thống chấm điểm theo 5 tiêu chí: Lập luận, Dẫn chứng, Tính liên quan, Cấu trúc và Khả năng thuyết phục kèm phân tích điểm mạnh, điểm cần cải thiện.
              </p>
              <div className="text-xs font-semibold text-teal-700 flex items-center gap-1">
                Báo cáo Rubric cụ thể <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Highlights Section */}
      <section id="topics" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#173B67]">
              Chủ đề nổi bật
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Các chủ đề tranh biện học thuật đang được sinh viên rèn luyện nhiều nhất.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/chu-de')}
          >
            Xem tất cả chủ đề
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOPICS.slice(0, 4).map((topic) => (
            <div
              key={topic.id}
              className="bg-white border border-[#E2E8F0] rounded-lg p-5 hover:border-blue-300 hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={topic.category}>{topic.category}</Badge>
                  <Badge variant={topic.difficulty}>{topic.difficulty}</Badge>
                  <span className="text-xs text-slate-400 ml-auto">{topic.practiceCount} lượt luyện</span>
                </div>
                <h3 className="text-sm font-bold text-[#172033] leading-snug mb-2 line-clamp-2">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {topic.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Tác giả: {topic.author}</span>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => navigate(`/chu-de/${topic.id}`)}
                >
                  Luyện tập ngay
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="mt-auto bg-white border-t border-[#E2E8F0] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-[#173B67]">ADPP (AI Debate Practice Platform)</span> — Đề tài Khóa luận Tốt nghiệp Đại học FPT
          </div>
          <div>
            Sinh viên thực hiện: Nguyễn Phi Long | GVHD: TS. Trần Văn Nam
          </div>
        </div>
      </footer>
    </div>
  );
};
