import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, History, Bot, Users2, Calendar, Award } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const MyDebatesPage = () => {
  const navigate = useNavigate();
  const { sessions } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'ai' | 'pvp'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSide, setSelectedSide] = useState('Tất cả');

  const filteredSessions = useMemo(() => {
    return sessions.filter(session => {
      if (activeTab === 'ai' && session.mode !== 'Với AI') return false;
      if (activeTab === 'pvp' && session.mode !== '1 vs 1') return false;

      const matchesSearch = session.topicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.opponent.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSide = selectedSide === 'Tất cả' || session.side === selectedSide;

      return matchesSearch && matchesSide;
    });
  }, [sessions, activeTab, searchQuery, selectedSide]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#173B67] tracking-tight">
          Trận của tôi
        </h2>
        <p className="text-sm text-[#64748B] mt-1">
          Lịch sử chi tiết các phiên tranh biện với AI và các trận đối đầu 1 vs 1.
        </p>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-subtle space-y-4">
        <div className="flex border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Tất cả phiên ({sessions.length})
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              activeTab === 'ai'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Với AI ({sessions.filter(s => s.mode === 'Với AI').length})
          </button>
          <button
            onClick={() => setActiveTab('pvp')}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              activeTab === 'pvp'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Tranh biện 1 vs 1 ({sessions.filter(s => s.mode === '1 vs 1').length})
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên chủ đề hoặc đối thủ..."
              className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Phe tranh luận:</span>
            {['Tất cả', 'Ủng hộ', 'Phản đối'].map(side => (
              <button
                key={side}
                type="button"
                onClick={() => setSelectedSide(side)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedSide === side
                    ? 'bg-[#173B67] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {side}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-card overflow-hidden">
        {filteredSessions.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs sm:text-sm">
            Không tìm thấy phiên tranh biện nào phù hợp với bộ lọc.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-[#E2E8F0] text-slate-500 font-semibold">
                  <th className="py-3 px-4">Ngày</th>
                  <th className="py-3 px-4">Chủ đề kiến nghị</th>
                  <th className="py-3 px-4">Hình thức</th>
                  <th className="py-3 px-4">Đối thủ</th>
                  <th className="py-3 px-4">Phe</th>
                  <th className="py-3 px-4">Điểm số</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-500 whitespace-nowrap">
                      {session.date}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#172033] max-w-xs truncate">
                      {session.topicTitle}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant={session.mode === 'Với AI' ? 'primary' : 'navy'}>
                        {session.mode}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                      {session.opponent}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-[#2563EB]">
                      {session.side}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded font-bold text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {session.score} / 100
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (session.mode === '1 vs 1') {
                            navigate(`/ket-qua-1v1/${session.id}`);
                          } else {
                            navigate(`/ket-qua/${session.id}`);
                          }
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
