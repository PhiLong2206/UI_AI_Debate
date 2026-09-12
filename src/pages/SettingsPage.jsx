import React, { useState } from 'react';
import { Settings, Volume2, Bell, Shield, Moon, Globe } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';

export const SettingsPage = () => {
  const { showToast } = useApp();

  const [aiVoice, setAiVoice] = useState(true);
  const [timerSound, setTimerSound] = useState(true);
  const [autoRebuttalTips, setAutoRebuttalTips] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  const handleSave = () => {
    showToast('Đã lưu cấu hình hệ thống thành công!');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#173B67] tracking-tight">
          Cài đặt hệ thống
        </h2>
        <p className="text-sm text-[#64748B] mt-1">
          Tùy chỉnh trải nghiệm phòng tranh biện và thông báo học tập.
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-6 text-xs sm:text-sm">
        {/* Section 1 */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#173B67] flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#2563EB]" />
            Âm thanh & Trợ lý giọng nói (AI Speech)
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <div className="font-semibold text-[#172033]">Phát giọng đọc phản biện từ AI</div>
                <div className="text-xs text-slate-500">Tự động đọc lập luận của đối thủ AI bằng giọng chuẩn tiếng Việt</div>
              </div>
              <input
                type="checkbox"
                checked={aiVoice}
                onChange={(e) => setAiVoice(e.target.checked)}
                className="w-4 h-4 text-[#2563EB] rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <div className="font-semibold text-[#172033]">Âm thanh chuông báo hết giờ vòng đấu</div>
                <div className="text-xs text-slate-500">Phát âm thanh nhẹ khi còn 30 giây và khi hết giờ phát biểu</div>
              </div>
              <input
                type="checkbox"
                checked={timerSound}
                onChange={(e) => setTimerSound(e.target.checked)}
                className="w-4 h-4 text-[#2563EB] rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#173B67] flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#2563EB]" />
            Trợ lý phản biện & Thông báo
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <div className="font-semibold text-[#172033]">Tự động gợi ý phản biện khi đến vòng 2</div>
                <div className="text-xs text-slate-500">Hiển thị nút hỗ trợ tư duy Rebuttal Coach khi đối thủ vừa dứt lời</div>
              </div>
              <input
                type="checkbox"
                checked={autoRebuttalTips}
                onChange={(e) => setAutoRebuttalTips(e.target.checked)}
                className="w-4 h-4 text-[#2563EB] rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <div className="font-semibold text-[#172033]">Nhận báo cáo tiến độ qua Email sinh viên hàng tuần</div>
                <div className="text-xs text-slate-500">Gửi tổng hợp điểm Rubric và các bài tập cần cải thiện</div>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="w-4 h-4 text-[#2563EB] rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <Button variant="primary" size="md" onClick={handleSave}>
            Lưu cài đặt
          </Button>
        </div>
      </div>
    </div>
  );
};
