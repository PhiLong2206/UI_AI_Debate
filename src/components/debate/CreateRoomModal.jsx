import React, { useState } from 'react';
import { X, Users2, Clock, Lock, Globe, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';

export const CreateRoomModal = ({ isOpen, onClose, onCreated }) => {
  const { topics, createPvpRoom } = useApp();

  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id || 'tp-01');
  const [timePerTurn, setTimePerTurn] = useState('3 phút');
  const [privacy, setPrivacy] = useState('Công khai'); // 'Công khai' | 'Riêng tư'

  if (!isOpen) return null;

  const handleCreate = (e) => {
    e.preventDefault();
    const topic = topics.find(t => t.id === selectedTopicId);
    const newRoom = createPvpRoom({
      topicId: topic.id,
      topicTitle: topic.title,
      timePerTurn,
      privacy,
    });
    onCreated(newRoom);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-[#E2E8F0] max-w-lg w-full p-6 shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Users2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#173B67]">Tạo phòng tranh biện 1 vs 1</h3>
              <p className="text-xs text-slate-500">Mời sinh viên khác tham gia đối kháng trực tiếp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCreate} className="space-y-4 pt-4">
          {/* Topic Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Chủ đề tranh biện
            </label>
            <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            >
              {topics.filter(t => t.status === 'Đã xuất bản').map(t => (
                <option key={t.id} value={t.id}>
                  [{t.category}] {t.title}
                </option>
              ))}
            </select>
          </div>

          {/* Time per turn */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Thời gian mỗi lượt nói
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['3 phút', '5 phút'].map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setTimePerTurn(time)}
                  className={`p-3 rounded-lg border text-left flex items-center gap-2 text-xs font-semibold ${
                    timePerTurn === time
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-1 ring-blue-400'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{time} / lượt</span>
                </button>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Chế độ phòng
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { type: 'Công khai', icon: Globe, desc: 'Bất kỳ sinh viên nào cũng có thể ghép trận' },
                { type: 'Riêng tư', icon: Lock, desc: 'Chỉ tham gia khi có mã phòng (Code)' },
              ].map(({ type, icon: Icon, desc }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPrivacy(type)}
                  className={`p-3 rounded-lg border text-left ${
                    privacy === type
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-1 ring-blue-400'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{type}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-tight">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <Button variant="outline" size="md" onClick={onClose}>
              Hủy
            </Button>
            <Button variant="primary" size="md" type="submit">
              Tạo phòng & Chờ đối thủ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
