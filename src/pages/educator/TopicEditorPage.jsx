import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Send, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';
import { DEMO_MODE } from '../../config';

export const TopicEditorPage = () => {
  const navigate = useNavigate();
  const { addTopic } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Xã hội');
  const [difficulty, setDifficulty] = useState('Trung bình');
  const [summary, setSummary] = useState('');
  const [background, setBackground] = useState('');
  const [proSide, setProSide] = useState('');
  const [conSide, setConSide] = useState('');
  const [references, setReferences] = useState([
    { title: 'Báo cáo Nghiên cứu Khoa học Giáo dục (2026)', source: 'Hội đồng Khoa học FPT' }
  ]);

  const handleAddReference = () => {
    setReferences(prev => [...prev, { title: '', source: '' }]);
  };

  const handleRemoveReference = (idx) => {
    setReferences(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateReference = (idx, field, val) => {
    setReferences(prev => prev.map((r, i) => i === idx ? { ...r, [field]: val } : r));
  };

  const handleSubmit = (status) => {
    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề kiến nghị tranh biện');
      return;
    }

    addTopic({
      title,
      category,
      difficulty,
      summary: summary || 'Chủ đề tranh biện học thuật mới được biên soạn bởi Giảng viên.',
      background: background || 'Thông tin nền đang được cập nhật thêm tài liệu tham khảo chi tiết.',
      sampleSides: {
        pro: proSide || 'Ủng hộ kiến nghị.',
        con: conSide || 'Phản đối kiến nghị.'
      },
      references: references.filter(r => r.title.trim()),
      status: status, // 'Đã xuất bản' | 'Bản nháp'
    });

    navigate('/giang-vien/chu-de');
  };

  const handleQuickFillSample = () => {
    setTitle('Trí tuệ nhân tạo có nên được công nhận quyền tác giả trong các tác phẩm nghệ thuật?');
    setCategory('Đạo đức');
    setDifficulty('Khó');
    setSummary('Phân tích khía cạnh pháp lý và triết học về tính sáng tạo nguyên bản của AI và bản quyền tác phẩm.');
    setBackground('Khi các mô hình tạo sinh đạt đến khả năng sáng tạo tranh vẽ, âm nhạc và văn học ngang tầm con người, vấn đề quyền sở hữu trí tuệ đang tạo ra cuộc tranh cãi pháp lý gay gắt.');
    setProSide('Ủng hộ: Thừa nhận vai trò sáng tạo của thuật toán và khuyến khích các nhà phát triển đầu tư nghiên cứu.');
    setConSide('Phản đối: Nghệ thuật là độc quyền cảm xúc của con người; chỉ người sáng tạo câu lệnh mới sở hữu tác quyền.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/giang-vien/chu-de')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#2563EB] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách quản lý
        </button>

        {DEMO_MODE && (
          <button
            type="button"
            onClick={handleQuickFillSample}
            className="text-xs text-[#2563EB] font-semibold hover:underline bg-blue-50 px-2.5 py-1 rounded"
          >
            Điền nhanh đề tài mẫu (Demo)
          </button>
        )}
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-card space-y-6">
        <div>
          <h1 className="text-xl font-bold text-[#173B67]">Biên soạn Chủ đề Tranh biện Mới</h1>
          <p className="text-xs text-slate-500 mt-0.5">Điền đầy đủ thông tin học thuật và tài liệu hỗ trợ cho sinh viên</p>
        </div>

        <form className="space-y-5 text-xs sm:text-sm">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tiêu đề kiến nghị tranh biện *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Mạng xã hội có gây hại nhiều hơn mang lại lợi ích cho giới trẻ?"
              className="w-full p-2.5 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
            />
          </div>

          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Danh mục lĩnh vực
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {['Xã hội', 'Công nghệ', 'Giáo dục', 'Kinh tế', 'Đạo đức'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Độ khó kiến nghị
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {['Dễ', 'Trung bình', 'Khó'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mô tả tóm tắt
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Tóm tắt ngắn gọn phạm vi và mục tiêu tranh luận..."
              className="w-full p-2.5 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          {/* Background Information */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Thông tin nền
            </label>
            <textarea
              rows={4}
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Cung cấp bối cảnh thực tế, định nghĩa và các dữ kiện cơ bản..."
              className="w-full p-2.5 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          {/* Sample sides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1.5">
                Định hướng Phe Ủng hộ
              </label>
              <textarea
                rows={2}
                value={proSide}
                onChange={(e) => setProSide(e.target.value)}
                placeholder="Gợi ý luận điểm chính của phe Ủng hộ..."
                className="w-full p-2.5 border border-blue-200 rounded-md bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#173B67] uppercase tracking-wider mb-1.5">
                Định hướng Phe Phản đối
              </label>
              <textarea
                rows={2}
                value={conSide}
                onChange={(e) => setConSide(e.target.value)}
                placeholder="Gợi ý luận điểm chính của phe Phản đối..."
                className="w-full p-2.5 border border-slate-300 rounded-md bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* References */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tài liệu & Nguồn tham khảo học thuật
              </label>
              <button
                type="button"
                onClick={handleAddReference}
                className="text-xs font-semibold text-[#2563EB] flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm tài liệu
              </button>
            </div>

            {references.map((ref, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={ref.title}
                  onChange={(e) => handleUpdateReference(idx, 'title', e.target.value)}
                  placeholder="Tên tài liệu / bài báo khoa học..."
                  className="flex-1 p-2 border border-slate-300 rounded-md text-xs"
                />
                <input
                  type="text"
                  value={ref.source}
                  onChange={(e) => handleUpdateReference(idx, 'source', e.target.value)}
                  placeholder="Nguồn xuất bản..."
                  className="w-1/3 p-2 border border-slate-300 rounded-md text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveReference(idx)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/giang-vien/chu-de')}
            >
              Hủy
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="md"
                icon={Save}
                onClick={() => handleSubmit('Bản nháp')}
              >
                Lưu bản nháp
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={Send}
                onClick={() => handleSubmit('Đã xuất bản')}
              >
                Xuất bản chủ đề
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
