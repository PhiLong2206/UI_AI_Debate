import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Toast } from '../common/Toast';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine page title based on path
  const getPageTitle = (path) => {
    if (path.startsWith('/tong-quan')) return 'Trang tổng quan';
    if (path.startsWith('/chu-de/')) return 'Thiết lập phiên tranh biện';
    if (path.startsWith('/chu-de')) return 'Chủ đề tranh biện';
    if (path.startsWith('/tranh-bien/1v1/phong')) return 'Phòng tranh biện 1 vs 1';
    if (path.startsWith('/tranh-bien/1v1')) return 'Tranh biện 1 vs 1';
    if (path.startsWith('/tran-cua-toi')) return 'Trận của tôi';
    if (path.startsWith('/tien-do')) return 'Tiến độ học tập';
    if (path.startsWith('/ho-so')) return 'Hồ sơ cá nhân';
    if (path.startsWith('/cai-dat')) return 'Cài đặt hệ thống';
    if (path.startsWith('/giang-vien/chu-de/tao-moi')) return 'Tạo chủ đề tranh biện';
    if (path.startsWith('/giang-vien/chu-de')) return 'Quản lý chủ đề';
    if (path.startsWith('/giang-vien/bao-cao')) return 'Báo cáo học viên';
    return 'ADPP - Luyện tập tranh biện';
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#172033] flex">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-[230px] flex flex-col min-h-screen">
        <Topbar
          onOpenSidebar={() => setSidebarOpen(true)}
          title={getPageTitle(location.pathname)}
        />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <Toast />
    </div>
  );
};
