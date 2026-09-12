import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Users2, Flame, Award, ArrowRight, Play, CheckCircle, Clock, ShieldCheck, Flag } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser, topics, sessions } = useApp();

  const isEducator = currentUser.role === 'educator';

  // If educator role, show educator quick dashboard
  if (isEducator) {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#173B67]">
              Xin chào, {currentUser.name}!
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Quản lý chủ đề và theo dõi hoạt động luyện tập của học viên.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/giang-vien/chu-de/tao-moi')}
            >
              Tạo chủ đề mới
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/giang-vien/chu-de')}
            >
              Quản lý danh sách
            </Button>
          </div>
        </div>

        {/* 3 Stat cards for Educator */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-subtle">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
              Chủ đề đã xuất bản
            </div>
            <div className="text-3xl font-extrabold text-[#173B67]">
              {topics.filter(t => t.status === 'Đã xuất bản').length}
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-1">Đang mở cho sinh viên</div>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-subtle">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
              Tổng lượt sinh viên luyện
            </div>
            <div className="text-3xl font-extrabold text-[#173B67]">
              148
            </div>
            <div className="text-xs text-blue-600 font-medium mt-1">+12 lượt trong tuần này</div>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-subtle">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
              Chủ đề bản nháp
            </div>
            <div className="text-3xl font-extrabold text-[#173B67]">
              {topics.filter(t => t.status === 'Bản nháp').length}
            </div>
            <div className="text-xs text-amber-600 font-medium mt-1">Cần hoàn thiện & duyệt</div>
          </div>
        </div>

        {/* Educator quick table */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#173B67]">Chủ đề gần đây của bạn</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/giang-vien/chu-de')}>
              Xem tất cả
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-[#E2E8F0] text-slate-500 font-semibold">
                  <th className="py-3 px-4">Tiêu đề</th>
                  <th className="py-3 px-4">Danh mục</th>
                  <th className="py-3 px-4">Độ khó</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4">Lượt luyện</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topics.slice(0, 5).map(topic => (
                  <tr key={topic.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#172033] max-w-xs truncate">{topic.title}</td>
                    <td className="py-3 px-4"><Badge variant={topic.category}>{topic.category}</Badge></td>
                    <td className="py-3 px-4"><Badge variant={topic.difficulty}>{topic.difficulty}</Badge></td>
                    <td className="py-3 px-4"><Badge variant={topic.status}>{topic.status}</Badge></td>
                    <td className="py-3 px-4 font-medium text-slate-600">{topic.practiceCount}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="light" size="sm" onClick={() => navigate(`/chu-de/${topic.id}`)}>
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Learner Dashboard View
  const featuredTopic = topics[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#173B67] tracking-tight">
            Xin chào, {currentUser.name.split(' ').pop()}!
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Hôm nay bạn muốn luyện tập chủ đề nào?
          </p>
        </div>
        <div>
          <Button
            variant="primary"
            size="md"
            icon={Play}
            onClick={() => navigate('/chu-de')}
          >
            Bắt đầu tranh biện
          </Button>
        </div>
      </div>

      {/* Three Compact Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-subtle flex items-center justify-between">
          <div>
            <div className="text-3xl font-extrabold text-[#173B67]">
              {currentUser.stats?.completedSessions || 12}
            </div>
            <div className="text-xs font-medium text-[#64748B] mt-1">
              Phiên đã hoàn thành
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-subtle flex items-center justify-between">
          <div>
            <div className="text-3xl font-extrabold text-[#173B67]">
              {currentUser.stats?.averageScore || 76}
            </div>
            <div className="text-xs font-medium text-[#64748B] mt-1">
              Điểm trung bình
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-subtle flex items-center justify-between">
          <div>
            <div className="text-3xl font-extrabold text-[#173B67]">
              {currentUser.stats?.streakDays || 5}
            </div>
            <div className="text-xs font-medium text-[#64748B] mt-1">
              Ngày luyện tập liên tiếp
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid: Tiếp tục luyện tập & Chủ đề dành cho bạn */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Section: Tiếp tục luyện tập (Enhanced with session state) */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Tiếp tục luyện tập
              </span>
              <Badge variant={featuredTopic.category}>{featuredTopic.category}</Badge>
            </div>
            <h3 className="text-base font-bold text-[#173B67] leading-snug mb-2">
              {featuredTopic.title}
            </h3>
            
            {/* Useful Session Status Details */}
            <div className="my-3 p-3 bg-slate-50 border border-slate-200 rounded-md grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Phe tranh luận:</span>
                <span className="font-bold text-[#2563EB]">Ủng hộ</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Vòng hiện tại:</span>
                <span className="font-bold text-[#173B67]">2/3 — Phản biện</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Đối thủ:</span>
                <span className="font-semibold text-slate-700">Trí tuệ nhân tạo (Trung bình)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Thời lượng:</span>
                <span className="font-semibold text-slate-700">8 phút (Còn 01:45)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Đang lưu tiến trình
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/chu-de/${featuredTopic.id}`)}
            >
              Vào phòng luyện
            </Button>
          </div>
        </div>

        {/* Section: Chủ đề dành cho bạn */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-subtle">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Chủ đề dành cho bạn
            </span>
            <button
              onClick={() => navigate('/chu-de')}
              className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
            >
              Xem tất cả <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {topics.slice(1, 4).map(topic => (
              <div
                key={topic.id}
                onClick={() => navigate(`/chu-de/${topic.id}`)}
                className="p-3 rounded-md border border-slate-200 hover:border-blue-300 hover:bg-slate-50/60 transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={topic.category} size="xs">{topic.category}</Badge>
                    <Badge variant={topic.difficulty} size="xs">{topic.difficulty}</Badge>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#172033] truncate">
                    {topic.title}
                  </div>
                </div>
                <Button variant="light" size="sm" className="shrink-0">
                  Luyện tập
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section: Các phiên gần đây (TABLE) */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#173B67]">Các phiên gần đây</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Lịch sử luyện tập và kết quả chấm điểm của bạn</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/tran-cua-toi')}>
            Xem toàn bộ lịch sử
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-[#E2E8F0] text-slate-500 font-semibold">
                <th className="py-3 px-4">Ngày</th>
                <th className="py-3 px-4">Chủ đề</th>
                <th className="py-3 px-4">Hình thức</th>
                <th className="py-3 px-4">Đối thủ</th>
                <th className="py-3 px-4">Phe</th>
                <th className="py-3 px-4">Điểm</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessions.map(session => (
                <tr key={session.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-500 whitespace-nowrap">
                    {session.date}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#172033] max-w-xs truncate">
                    {session.topicTitle}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={session.mode === 'Với AI' ? 'primary' : 'navy'}>
                      {session.mode}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {session.opponent}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`font-semibold ${session.side === 'Ủng hộ' ? 'text-blue-700' : 'text-slate-700'}`}>
                      {session.side}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded font-bold text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {session.score} / 100
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/ket-qua/${session.id}`)}
                    >
                      Xem chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
