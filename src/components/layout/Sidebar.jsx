import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Bot,
  Users2,
  History,
  TrendingUp,
  User,
  Settings,
  PlusCircle,
  FileText,
  BarChart3,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  const isEducator = currentUser.role === 'educator';

  const learnerNavItems = [
    { to: '/tong-quan', label: 'Trang tổng quan', icon: LayoutDashboard },
    { to: '/chu-de', label: 'Chủ đề tranh biện', icon: BookOpen },
    { to: '/chu-de', label: 'Tranh biện với AI', icon: Bot, isHighlighted: true },
    { to: '/tranh-bien/1v1', label: 'Tranh biện 1 vs 1', icon: Users2 },
    { to: '/tran-cua-toi', label: 'Trận của tôi', icon: History },
    { to: '/tien-do', label: 'Tiến độ học tập', icon: TrendingUp },
  ];

  const educatorNavItems = [
    { to: '/tong-quan', label: 'Trang tổng quan', icon: LayoutDashboard },
    { to: '/giang-vien/chu-de', label: 'Quản lý chủ đề', icon: FileText },
    { to: '/giang-vien/chu-de/tao-moi', label: 'Tạo chủ đề mới', icon: PlusCircle, isHighlighted: true },
    { to: '/giang-vien/bao-cao', label: 'Báo cáo học viên', icon: BarChart3 },
  ];

  const secondaryNavItems = [
    { to: '/ho-so', label: 'Hồ sơ', icon: User },
    { to: '/cai-dat', label: 'Cài đặt', icon: Settings },
  ];

  const currentNavItems = isEducator ? educatorNavItems : learnerNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-[230px] bg-white border-r border-[#E2E8F0] flex flex-col justify-between
        transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Logo Section */}
        <div>
          <div className="h-16 px-5 flex items-center gap-2.5 border-b border-[#E2E8F0]">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold text-base shadow-sm">
              A
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-[#173B67] leading-none">
                ADPP
              </div>
              <div className="text-[10px] text-[#64748B] font-medium tracking-tight mt-0.5">
                Nền tảng luyện tập tranh biện
              </div>
            </div>
          </div>

          {/* Role Indicator Banner */}
          <div className="px-4 py-2 mx-3 mt-3 rounded-md bg-slate-50 border border-slate-200/80 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#2563EB]" />
            <span className="text-xs font-medium text-slate-700">
              {isEducator ? 'Chế độ Giảng viên' : 'Chế độ Học viên'}
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 mt-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
              Menu chính
            </div>
            {currentNavItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={idx}
                  to={item.to}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium transition-colors
                    ${isActive
                      ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold shadow-xs'
                      : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}

            <div className="pt-3 pb-1">
              <div className="h-px bg-slate-200 my-1 mx-2" />
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1 mt-1">
                Tài khoản
              </div>
            </div>

            {secondaryNavItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={idx}
                  to={item.to}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium transition-colors
                    ${isActive
                      ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold shadow-xs'
                      : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Card */}
        <div className="p-3 border-t border-[#E2E8F0] bg-slate-50/70">
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#172033] truncate">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-[#64748B] truncate">
                  {currentUser.roleTitle}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/dang-nhap')}
              title="Đăng xuất"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
