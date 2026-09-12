import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users2,
  Swords,
  PlusCircle,
  Copy,
  Check,
  Clock,
  Search,
  Award,
  Globe,
  Lock,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CreateRoomModal } from '../components/debate/CreateRoomModal';
import { useApp } from '../context/AppContext';

export const PvpLobbyPage = () => {
  const navigate = useNavigate();
  const { pvpLearners, pvpRooms, topics, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('find'); // 'find' | 'my-rooms' | 'history'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createdRoom, setCreatedRoom] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [opponentJoined, setOpponentJoined] = useState(false);

  const handleRoomCreated = (room) => {
    setIsCreateModalOpen(false);
    setCreatedRoom(room);
    showToast(`Đã tạo phòng ${room.id} thành công!`);

    // Simulate opponent joining after 2.5 seconds
    setTimeout(() => {
      setOpponentJoined(true);
      showToast('Học viên Nguyễn Đức Duy đã tham gia phòng!', 'info');
    }, 2500);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast('Đã sao chép mã phòng vào bộ nhớ tạm');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleStartPvpMatch = (roomId) => {
    navigate(`/tranh-bien/1v1/phong/${roomId || 'ADPP-8241'}`);
  };

  const handleChallenge = (learner) => {
    showToast(`Đã gửi lời mời thách đấu tới ${learner.name}. Đang tạo phòng...`, 'info');
    setTimeout(() => {
      const room = {
        id: 'ADPP-8241',
        topicId: 'tp-01',
        topicTitle: 'Mạng xã hội có gây hại nhiều hơn mang lại lợi ích cho giới trẻ?',
        host: 'Nguyễn Phi Long',
        opponent: learner.name,
      };
      setCreatedRoom(room);
      setOpponentJoined(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#173B67] tracking-tight">
            Tranh biện 1 vs 1 (PvP)
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Thi đấu đối kháng trực tiếp với sinh viên cùng trường theo thời gian thực.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={PlusCircle}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Tạo phòng tranh biện
        </Button>
      </div>

      {/* Waiting Room Card Modal Simulation (When a room is created) */}
      {createdRoom && (
        <div className="bg-white border-2 border-[#2563EB] rounded-xl p-6 shadow-lg space-y-4 animate-scale-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-base font-bold text-[#173B67]">
                Phòng chờ thi đấu: <span className="font-mono text-[#2563EB]">{createdRoom.id}</span>
              </h3>
            </div>
            <button
              onClick={() => handleCopyCode(createdRoom.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedCode ? 'Đã sao chép' : 'Sao chép mã phòng'}</span>
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-700">
            <strong>Kiến nghị:</strong> {createdRoom.topicTitle}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Player 1 (You) */}
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="You"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
              />
              <div>
                <div className="text-xs font-bold text-[#173B67]">Nguyễn Phi Long (Bạn)</div>
                <div className="text-[11px] text-[#2563EB] font-semibold mt-0.5">Phe Ủng hộ • Chủ phòng</div>
                <Badge variant="success" size="xs" className="mt-1">Sẵn sàng</Badge>
              </div>
            </div>

            {/* Player 2 (Opponent) */}
            <div className={`p-4 rounded-lg border flex items-center gap-3 transition-all ${
              opponentJoined
                ? 'bg-slate-50 border-slate-300'
                : 'bg-slate-50/50 border-dashed border-slate-300'
            }`}>
              {opponentJoined ? (
                <>
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                    alt="Opponent"
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-400"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#172033]">Nguyễn Đức Duy</div>
                    <div className="text-[11px] text-slate-600 font-semibold mt-0.5">Phe Phản đối • Đối thủ</div>
                    <Badge variant="success" size="xs" className="mt-1">Đã vào phòng</Badge>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3 text-slate-400 py-1">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center">
                    <Users2 className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Đang chờ đối thủ tham gia...</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Chia sẻ mã {createdRoom.id} để bạn bè vào phòng</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setCreatedRoom(null); setOpponentJoined(false); }}
            >
              Hủy phòng
            </Button>
            <Button
              variant="primary"
              size="md"
              disabled={!opponentJoined}
              onClick={() => handleStartPvpMatch(createdRoom.id)}
            >
              {opponentJoined ? 'Bắt đầu tranh biện ngay' : 'Đang đợi đối thủ...'}
            </Button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('find')}
          className={`pb-3 px-4 border-b-2 transition-colors ${
            activeTab === 'find'
              ? 'border-[#2563EB] text-[#2563EB]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Tìm đối thủ trực tuyến ({pvpLearners.length})
        </button>
        <button
          onClick={() => setActiveTab('my-rooms')}
          className={`pb-3 px-4 border-b-2 transition-colors ${
            activeTab === 'my-rooms'
              ? 'border-[#2563EB] text-[#2563EB]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Phòng đang mở ({pvpRooms.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-4 border-b-2 transition-colors ${
            activeTab === 'history'
              ? 'border-[#2563EB] text-[#2563EB]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Lịch sử đấu PvP
        </button>
      </div>

      {/* Tab 1: Find Learners / Challenge */}
      {activeTab === 'find' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pvpLearners.map((learner) => {
              const isAvailable = learner.status === 'Đang rảnh';
              return (
                <div
                  key={learner.id}
                  className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-subtle hover:border-blue-300 transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={learner.avatar}
                        alt={learner.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
                      }`} />
                    </div>

                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-[#172033] truncate">
                        {learner.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {learner.matchCount} trận • Điểm TB: <strong className="text-emerald-700">{learner.avgScore}</strong>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge variant="outline" size="xs">{learner.rank}</Badge>
                        <span className={`text-[10px] font-semibold ${isAvailable ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {learner.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant={isAvailable ? 'primary' : 'outline'}
                    size="sm"
                    disabled={!isAvailable}
                    icon={Swords}
                    onClick={() => handleChallenge(learner)}
                    className="shrink-0"
                  >
                    Thách đấu
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Public Rooms */}
      {activeTab === 'my-rooms' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#173B67]">Danh sách phòng chờ công khai</h3>
            <span className="text-xs text-slate-500">Tự động làm mới mỗi 15s</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {pvpRooms.map((room) => (
              <div key={room.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {room.id}
                    </span>
                    <Badge variant={room.status === 'Đang diễn ra' ? 'warning' : 'success'} size="xs">
                      {room.status}
                    </Badge>
                    <span className="text-slate-400">• {room.timePerTurn}</span>
                  </div>
                  <div className="font-bold text-sm text-[#172033]">
                    {room.topicTitle}
                  </div>
                  <div className="text-slate-500">
                    Chủ phòng: <strong>{room.host}</strong> ({room.hostSide})
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStartPvpMatch(room.id)}
                  >
                    {room.status === 'Đang diễn ra' ? 'Theo dõi trận' : 'Tham gia phòng'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: History */}
      {activeTab === 'history' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card text-xs">
          <div className="font-bold text-sm text-[#173B67] mb-3">Các trận 1 vs 1 đã đấu gần đây</div>
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-900">Làm việc từ xa có nên trở thành quyền mặc định?</div>
              <div className="text-slate-500 mt-0.5">Đối thủ: Nguyễn Đức Duy • Ngày 08/09/2026</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Thắng (77 - 76)
              </span>
              <Button variant="outline" size="sm" onClick={() => navigate('/ket-qua-1v1/ses-102')}>
                Xem kết quả Trọng tài AI
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Room Modal */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={handleRoomCreated}
      />
    </div>
  );
};
