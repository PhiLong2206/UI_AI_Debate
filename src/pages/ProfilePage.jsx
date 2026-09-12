import React, { useState } from 'react';
import { User, Mail, GraduationCap, School, BookOpen, Clock, Calendar, Edit3, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const ProfilePage = () => {
  const { currentUser, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    if (showToast) {
      showToast('Tính năng cập nhật thông tin cá nhân đang hoạt động.');
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-slate-200 shadow-xs"
          />
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl font-bold text-[#173B67]">{currentUser.name}</h1>
              <Badge variant="primary" size="xs">{currentUser.roleTitle}</Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium">{currentUser.email}</p>
            <div className="text-xs text-slate-600 pt-1 space-y-0.5">
              <p>Trường: <span className="font-semibold text-slate-800">Trường Đại học FPT</span> • Khóa: <span className="font-semibold text-slate-800">K17</span></p>
              <p>Chuyên ngành: <span className="font-semibold text-slate-800">Kỹ thuật Phần mềm (Software Engineering)</span></p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Edit3}
          onClick={handleEditClick}
          className="shrink-0"
        >
          Chỉnh sửa hồ sơ
        </Button>
      </div>

      {/* Two Clean Sections: A. Thông tin học tập & B. Hoạt động tranh biện */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Section A: Thông tin học tập */}
        <div className="md:col-span-6 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-4 h-4 text-[#2563EB]" />
            <h3 className="font-bold text-sm text-[#173B67] uppercase tracking-wider">
              Thông tin học tập
            </h3>
          </div>

          <div className="space-y-3 divide-y divide-slate-100">
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Mã số sinh viên:</span>
              <span className="font-semibold text-slate-900 font-mono">SE171234</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Cơ sở:</span>
              <span className="font-semibold text-slate-900">FPT University TP.HCM</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Lớp học phần:</span>
              <span className="font-semibold text-slate-900">DEB101 — Kỹ năng Tranh biện</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Giảng viên phụ trách:</span>
              <span className="font-semibold text-slate-900">TS. Trần Văn Nam</span>
            </div>
          </div>
        </div>

        {/* Section B: Hoạt động tranh biện */}
        <div className="md:col-span-6 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <BookOpen className="w-4 h-4 text-[#2563EB]" />
            <h3 className="font-bold text-sm text-[#173B67] uppercase tracking-wider">
              Hoạt động tranh biện
            </h3>
          </div>

          <div className="space-y-3 divide-y divide-slate-100">
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Tổng số phiên tranh biện:</span>
              <span className="font-bold text-[#173B67] text-sm">12</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Tranh biện với AI:</span>
              <span className="font-semibold text-slate-900">10 phiên</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Tranh biện 1 vs 1:</span>
              <span className="font-semibold text-slate-900">2 trận</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Điểm trung bình:</span>
              <span className="font-bold text-[#2563EB] text-sm">76.4 / 100</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Ngày tham gia gần nhất:</span>
              <span className="font-semibold text-slate-900">10/09/2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
