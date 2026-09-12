import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Edit3, Archive, CheckCircle2, Eye, FileText, ArrowUpDown } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../context/AppContext';

export const EducatorTopicsPage = () => {
  const navigate = useNavigate();
  const { topics, updateTopic, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');

  const filteredTopics = topics.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'Tất cả' || t.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleToggleArchive = (topic) => {
    const newStatus = topic.status === 'Đã lưu trữ' ? 'Đã xuất bản' : 'Đã lưu trữ';
    updateTopic(topic.id, { status: newStatus });
    showToast(`Đã chuyển trạng thái chủ đề sang: ${newStatus}`);
  };

  const handlePublish = (topic) => {
    updateTopic(topic.id, { status: 'Đã xuất bản' });
    showToast(`Đã xuất bản chủ đề: "${topic.title.slice(0, 30)}..."`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#173B67] tracking-tight">
            Quản lý Chủ đề Tranh biện (Giảng viên)
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Quản lý chủ đề và theo dõi hoạt động luyện tập của học viên.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={PlusCircle}
          onClick={() => navigate('/giang-vien/chu-de/tao-moi')}
        >
          Tạo chủ đề mới
        </Button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tiêu đề kiến nghị..."
            className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs flex-wrap">
          <span className="font-semibold text-slate-500">Trạng thái:</span>
          {['Tất cả', 'Đã xuất bản', 'Bản nháp', 'Đã lưu trữ'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                selectedStatus === status
                  ? 'bg-[#173B67] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Management Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-[#E2E8F0] text-slate-500 font-semibold">
                <th className="py-3.5 px-4">Tiêu đề kiến nghị</th>
                <th className="py-3.5 px-4">Danh mục</th>
                <th className="py-3.5 px-4">Độ khó</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4">Lượt luyện</th>
                <th className="py-3.5 px-4">Cập nhật</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTopics.map((topic) => (
                <tr key={topic.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-sm text-[#172033] max-w-sm truncate">
                      {topic.title}
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      Tác giả: {topic.author || 'TS. Trần Văn Nam'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge variant={topic.category}>{topic.category}</Badge>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge variant={topic.difficulty}>{topic.difficulty}</Badge>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge variant={topic.status}>{topic.status}</Badge>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-700">
                    {topic.practiceCount} lượt
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                    {topic.updatedAt}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Xem trước"
                        onClick={() => navigate(`/chu-de/${topic.id}`)}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>

                      {topic.status === 'Bản nháp' && (
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => handlePublish(topic)}
                        >
                          Xuất bản
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleArchive(topic)}
                      >
                        {topic.status === 'Đã lưu trữ' ? 'Mở lại' : 'Lưu trữ'}
                      </Button>
                    </div>
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
