import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Award,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { PROGRESS_HISTORY } from '../data/mockData';

export const ProgressPage = () => {
  const navigate = useNavigate();

  const skills = [
    { name: '1. Lập luận', score: 8.0, desc: 'Tính logic và liên kết nguyên nhân - kết quả' },
    { name: '2. Dẫn chứng', score: 6.2, desc: 'Độ tin cậy của số liệu và ví dụ thực tế', isWeak: true },
    { name: '3. Tính liên quan', score: 8.1, desc: 'Bám sát trọng tâm kiến nghị' },
    { name: '4. Cấu trúc', score: 7.4, desc: 'Trình tự mở bài, phản biện và kết luận' },
    { name: '5. Khả năng thuyết phục', score: 6.9, desc: 'Sức nặng diễn đạt và tính đĩnh đạc' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#173B67] tracking-tight">
          Tiến độ học tập & Phân tích năng lực
        </h2>
        <p className="text-sm text-[#64748B] mt-1">
          Theo dõi sự tiến bộ về tư duy phản biện qua các phiên tranh biện và phân tích tiêu chí đánh giá.
        </p>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-subtle">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Điểm trung bình toàn khóa
          </div>
          <div className="text-3xl font-extrabold text-[#173B67] mt-1">
            76.4 <span className="text-sm text-slate-400 font-normal">/ 100</span>
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +8.4 điểm so với phiên đầu tiên
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-subtle">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Tổng số phiên tranh biện
          </div>
          <div className="text-3xl font-extrabold text-[#173B67] mt-1">
            12
          </div>
          <div className="text-xs text-blue-600 font-medium mt-1">
            10 phiên với AI • 2 trận 1 vs 1
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-subtle">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Kỹ năng dẫn đầu
          </div>
          <div className="text-xl font-extrabold text-[#2563EB] mt-1.5 truncate">
            Tính liên quan (8.1)
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Phản ứng nhanh & bám sát kiến nghị
          </div>
        </div>
      </div>

      {/* Chart: Điểm số theo thời gian */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#173B67]">
              Biểu đồ biến thiên điểm số qua các phiên
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Xu hướng cải thiện từ tháng 08/2026 đến nay</p>
          </div>
          <Badge variant="primary" size="xs">Cập nhật theo thời gian thực</Badge>
        </div>

        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PROGRESS_HISTORY} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} />
              <YAxis domain={[50, 100]} stroke="#94A3B8" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  fontSize: '12px'
                }}
                formatter={(value) => [`${value} / 100`, 'Điểm tổng']}
                labelFormatter={(label) => `Ngày ${label}`}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563EB"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, fill: '#173B67' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill Breakdown & Improvement Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Skill Breakdown Progress Bars */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#173B67]">
              Phân tích chi tiết 5 Kỹ năng Tranh biện
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Điểm trung bình theo từng tiêu chí đánh giá</p>
          </div>

          <div className="space-y-4 pt-2">
            {skills.map((skill, idx) => {
              const percentage = (skill.score / 10) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#172033]">{skill.name}</span>
                      <p className="text-[11px] text-slate-500">{skill.desc}</p>
                    </div>
                    <span className={`font-bold text-sm ${skill.isWeak ? 'text-amber-600' : 'text-[#2563EB]'}`}>
                      {skill.score.toFixed(1)} / 10
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div
                      className={`h-full rounded-full ${skill.isWeak ? 'bg-amber-500' : 'bg-[#2563EB]'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Kỹ năng cần cải thiện (Dẫn chứng) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-amber-200/90 rounded-xl p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 text-amber-700 font-bold text-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <div>Kỹ năng cần tập trung cải thiện</div>
                <div className="text-xs text-amber-900 font-normal">Dẫn chứng & Số liệu thực tế</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Điểm dẫn chứng của bạn hiện tại đạt <strong>6.2 / 10</strong>, thấp hơn các tiêu chí còn lại. Các luận điểm của bạn thường có lý lẽ sắc sảo nhưng thiếu số liệu nghiên cứu định lượng hoặc trích dẫn từ các báo cáo chuyên ngành.
            </p>

            <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200 text-xs text-amber-950 space-y-1.5">
              <div className="font-bold">Gợi ý rèn luyện từ Giảng viên:</div>
              <p>• Trích dẫn nguồn cụ thể (Tên tổ chức, năm công bố).</p>
              <p>• Đọc kỹ tab "Tài liệu tham khảo" trước khi bắt đầu phiên.</p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={BookOpen}
              className="w-full"
              onClick={() => navigate('/chu-de')}
            >
              Luyện tập kỹ năng này ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
