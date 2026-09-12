import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Play, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const TopicListPage = () => {
  const navigate = useNavigate();
  const { topics } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tất cả');

  const categories = ['Tất cả', 'Xã hội', 'Công nghệ', 'Giáo dục', 'Kinh tế', 'Đạo đức'];
  const difficulties = ['Tất cả', 'Dễ', 'Trung bình', 'Khó'];

  const filteredTopics = useMemo(() => {
    return topics.filter(topic => {
      // only show published topics to learners
      if (topic.status && topic.status !== 'Đã xuất bản') return false;

      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'Tất cả' || topic.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'Tất cả' || topic.difficulty === selectedDifficulty;
      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [topics, searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#173B67] tracking-tight">
          Chủ đề tranh biện
        </h2>
        <p className="text-sm text-[#64748B] mt-1">
          Chọn một chủ đề để bắt đầu luyện tập và nhận đánh giá từ Trợ lý AI.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-subtle space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm chủ đề theo tên hoặc nội dung..."
            className="block w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          {/* Categories */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-slate-500 mr-1">Danh mục:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#173B67] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-slate-500 mr-1">Độ khó:</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topics Table List */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-card overflow-hidden">
        {filteredTopics.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm font-semibold text-slate-700">Không tìm thấy chủ đề phù hợp</p>
            <p className="text-xs text-slate-500 mt-1">Hãy thử tìm kiếm với từ khóa khác hoặc bỏ các bộ lọc</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tất cả');
                setSelectedDifficulty('Tất cả');
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-[#E2E8F0] text-slate-500 font-semibold">
                  <th className="py-3 px-4">Tiêu đề kiến nghị</th>
                  <th className="py-3 px-4">Danh mục</th>
                  <th className="py-3 px-4">Độ khó</th>
                  <th className="py-3 px-4">Lượt luyện</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTopics.map((topic) => (
                  <tr key={topic.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-sm text-[#172033] hover:text-[#2563EB] transition-colors cursor-pointer" onClick={() => navigate(`/chu-de/${topic.id}`)}>
                        {topic.title}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 max-w-xl">
                        {topic.summary}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant={topic.category}>{topic.category}</Badge>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant={topic.difficulty}>{topic.difficulty}</Badge>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-600">
                      {topic.practiceCount} lượt
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/chu-de/${topic.id}`)}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Play}
                          onClick={() => navigate(`/chu-de/${topic.id}`)}
                        >
                          Bắt đầu
                        </Button>
                      </div>
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
