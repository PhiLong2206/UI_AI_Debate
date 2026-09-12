import React from 'react';
import { Menu, Bell, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEMO_MODE } from '../../config';

export const Topbar = ({ onOpenSidebar, title }) => {
  const { currentUser, switchRole } = useApp();

  const isEducator = currentUser.role === 'educator';

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E2E8F0] px-4 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg font-bold text-[#173B67] tracking-tight">
            {title || 'Hệ thống Luyện tập Tranh biện'}
          </h1>
        </div>
      </div>

      {/* Right: Actions & Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Role Switcher only shown in DEMO_MODE */}
        {DEMO_MODE && (
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => switchRole('learner')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                !isEducator
                  ? 'bg-white text-[#2563EB] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Học viên
            </button>
            <button
              onClick={() => switchRole('educator')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                isEducator
                  ? 'bg-[#173B67] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Giảng viên
            </button>
          </div>
        )}

        {/* Notifications */}
        <button
          type="button"
          title="Thông báo"
          className="relative p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2563EB] rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* User preview */}
        <div className="flex items-center gap-2.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-[#172033] leading-tight">
              {currentUser.name}
            </div>
            <div className="text-[11px] text-[#64748B] leading-tight">
              {currentUser.roleTitle}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
