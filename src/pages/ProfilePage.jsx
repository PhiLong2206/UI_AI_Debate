import React from 'react';
import { User, Mail, GraduationCap, Award, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const ProfilePage = () => {
  const { currentUser } = useApp();

  const badges = [
    { title: 'Tư duy Khởi đầu', desc: 'Hoàn thành 5 phiên tranh biện đầu tiên', icon: '🎯' },
    { title: 'Chuỗi Rèn luyện', desc: 'Luyện tập 5 ngày liên tiếp không ngắt quãng', icon: '🔥' },
    { title: 'Chiến binh 1 vs 1', desc: 'Thắng trận đối đầu PvP đầu tiên', icon: '⚔️' },
    { title: 'Bậc thầy Phản biện', desc: 'Đạt điểm Tính liên quan trên 8.5', icon: '💡' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card flex flex-col sm:flex-row items-center gap-6">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-xs"
        />
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-xl font-bold text-[#173B67]">{currentUser.name}</h1>
            <Badge variant="primary" size="xs">{currentUser.roleTitle}</Badge>
          </div>
          <p className="text-xs text-slate-500 font-medium">{currentUser.email}</p>
          <p className="text-xs text-slate-600 pt-1">
            Sinh viên Đại học FPT • Khóa K17 • Chuyên ngành Kỹ thuật Phần mềm (Software Engineering)
          </p>
        </div>
      </div>

      {/* Details & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left info */}
        <div className="md:col-span-6 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card space-y-4 text-xs">
          <h3 className="font-bold text-sm text-[#173B67] uppercase tracking-wider">
            Thông tin học vụ
          </h3>
          <div className="space-y-3 divide-y divide-slate-100">
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Mã số sinh viên:</span>
              <span className="font-semibold text-slate-900">SE171234</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Cơ sở (Campus):</span>
              <span className="font-semibold text-slate-900">FPT University TP.HCM</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Lớp học phần:</span>
              <span className="font-semibold text-slate-900">DEB101 - Kỹ năng Tranh biện</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Giảng viên phụ trách:</span>
              <span className="font-semibold text-slate-900">TS. Trần Văn Nam</span>
            </div>
          </div>
        </div>

        {/* Right: Badges */}
        <div className="md:col-span-6 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card space-y-4">
          <h3 className="font-bold text-sm text-[#173B67] uppercase tracking-wider">
            Huy hiệu thành tích đạt được ({badges.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {badges.map((b, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <div className="font-bold text-[#172033]">{b.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
