import React from 'react';
import { X, Sparkles, Target, HelpCircle, ShieldAlert, Compass } from 'lucide-react';
import { Badge } from '../common/Badge';

export const RebuttalCoachDrawer = ({ isOpen, onClose, tips, currentRoundName }) => {
  if (!isOpen) return null;

  const defaultCoachData = tips || {
    keyOpponentPoints: [
      'Đối phương lập luận rằng mạng xã hội làm gia tăng tình trạng lo âu, cô lập xã hội và hội chứng FOMO.',
      'Đối phương viện dẫn thuật toán thu hút chú ý làm giảm sút thời gian tự học của thanh thiếu niên.'
    ],
    vulnerabilities: [
      'Đối phương đánh đồng "hành vi lạm dụng quá đà" với "toàn bộ bản chất của công nghệ".',
      'Chưa xét đến lợi ích tiếp cận tri thức miễn phí cho học sinh vùng sâu vùng xa.'
    ],
    rebuttalDirections: [
      'Áp dụng chiến thuật Phân tách nguyên nhân: Công nghệ là công cụ trung tính, chìa khóa nằm ở giáo dục năng lực số (digital literacy).',
      'Đưa ra dẫn chứng về các nhóm học tập cộng tác và phong trào thiện nguyện lan tỏa tích cực từ mạng xã hội.'
    ],
    suggestedQuestions: [
      'Nếu không có mạng xã hội, chi phí cơ hội để giới trẻ kết nối mạng lưới học thuật và nghề nghiệp toàn cầu sẽ lớn thế nào?',
      'Có phải mọi người dùng đều chịu ảnh hưởng tiêu cực, hay vấn đề chỉ xuất hiện ở nhóm thiếu sự kiểm soát thời gian?'
    ]
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white border-l border-[#E2E8F0] shadow-2xl flex flex-col justify-between animate-slide-left">
        {/* Header */}
        <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#173B67]">Gợi ý phản biện (Rebuttal Coach)</h3>
              <p className="text-[11px] text-slate-500">Định hướng tư duy phản biện học thuật</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs sm:text-sm">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-xs leading-relaxed">
            💡 <strong>Lưu ý từ Giảng viên:</strong> Huấn luyện viên AI chỉ cung cấp hướng tư duy và cấu trúc phân tích, không viết sẵn câu trả lời để rèn luyện năng lực phản biện độc lập của bạn.
          </div>

          {/* Section 1: Luận điểm chính của đối phương */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#173B67]">
              <Target className="w-4 h-4 text-blue-600" />
              1. Luận điểm chính của đối phương
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
              {defaultCoachData.keyOpponentPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-700 text-xs leading-relaxed">
                  <span className="font-bold text-blue-600">•</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Điểm có thể khai thác */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#173B67]">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              2. Điểm có thể khai thác (Lỗ hổng lập luận)
            </div>
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3.5 space-y-2">
              {defaultCoachData.vulnerabilities.map((vul, i) => (
                <div key={i} className="flex items-start gap-2 text-amber-950 text-xs leading-relaxed">
                  <span className="font-bold text-amber-600">•</span>
                  <span>{vul}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Hướng phản biện */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#173B67]">
              <Compass className="w-4 h-4 text-emerald-600" />
              3. Hướng phản biện đề xuất
            </div>
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-lg p-3.5 space-y-2">
              {defaultCoachData.rebuttalDirections.map((dir, i) => (
                <div key={i} className="flex items-start gap-2 text-emerald-950 text-xs leading-relaxed">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>{dir}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Câu hỏi gợi ý */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#173B67]">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              4. Câu hỏi gợi ý xoáy sâu
            </div>
            <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-lg p-3.5 space-y-2">
              {defaultCoachData.suggestedQuestions.map((q, i) => (
                <div key={i} className="text-indigo-950 text-xs italic leading-relaxed">
                  "{q}"
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E2E8F0] bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">Đang áp dụng cho {currentRoundName}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-md text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            Đã hiểu, quay lại viết luận điểm
          </button>
        </div>
      </div>
    </>
  );
};
