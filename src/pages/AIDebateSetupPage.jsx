import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Clock, Shield, CheckCircle2, Play, BookOpen, Bot } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const AIDebateSetupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { topics } = useApp();

  // Get initial topicId from location.state or query param or default to tp-01
  const initialTopicId = location.state?.topicId || searchParams.get('topicId') || topics[0]?.id || 'tp-01';
  
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopicId);
  const [selectedSide, setSelectedSide] = useState('Ủng hộ');
  const [aiDifficulty, setAiDifficulty] = useState('Trung bình');

  const selectedTopic = topics.find(t => t.id === selectedTopicId) || topics[0];

  const handleStartDebate = () => {
    navigate(`/tranh-bien/ai/${selectedTopic.id}`, {
      state: {
        topicId: selectedTopic.id,
        side: selectedSide,
        aiDifficulty: aiDifficulty,
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#173B67] tracking-tight">
              Thiết lập phiên tranh biện với Đối thủ AI
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Chọn chủ đề, phe tranh luận và cấp độ thử thách để bắt đầu luyện tập lập luận.
            </p>
          </div>
        </div>
      </div>

      {/* Main Setup Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-6">
        {/* Step 1: Select Topic */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            1. Chọn chủ đề tranh biện
          </label>
          <div className="space-y-3">
            <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              className="block w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
            >
              {topics.filter(t => !t.status || t.status === 'Đã xuất bản').map((t) => (
                <option key={t.id} value={t.id}>
                  [{t.category}] {t.title} ({t.difficulty})
                </option>
              ))}
            </select>

            {/* Selected Topic Brief */}
            {selectedTopic && (
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Badge variant={selectedTopic.category}>{selectedTopic.category}</Badge>
                  <Badge variant={selectedTopic.difficulty}>Độ khó: {selectedTopic.difficulty}</Badge>
                  <span className="text-slate-400 ml-auto">{selectedTopic.practiceCount} lượt luyện</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {selectedTopic.summary}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Choose Side */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            2. Chọn phe của bạn
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedSide('Ủng hộ')}
              className={`p-4 rounded-lg border text-left transition-all flex items-start justify-between ${
                selectedSide === 'Ủng hộ'
                  ? 'border-[#2563EB] bg-[#EFF6FF] ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="font-bold text-sm text-[#2563EB]">Phe Ủng hộ</div>
                <div className="text-xs text-slate-600 mt-1">
                  Bảo vệ luận điểm ủng hộ kiến nghị. Bạn sẽ là người phát biểu mở đầu trước.
                </div>
              </div>
              {selectedSide === 'Ủng hộ' && (
                <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0 ml-2" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setSelectedSide('Phản đối')}
              className={`p-4 rounded-lg border text-left transition-all flex items-start justify-between ${
                selectedSide === 'Phản đối'
                  ? 'border-[#173B67] bg-slate-100 ring-2 ring-slate-700/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="font-bold text-sm text-[#173B67]">Phe Phản đối</div>
                <div className="text-xs text-slate-600 mt-1">
                  Phản bác kiến nghị và đưa ra các bằng chứng về mặt trái hoặc giải pháp thay thế.
                </div>
              </div>
              {selectedSide === 'Phản đối' && (
                <CheckCircle2 className="w-5 h-5 text-[#173B67] shrink-0 ml-2" />
              )}
            </button>
          </div>
        </div>

        {/* Step 3: AI Difficulty */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            3. Độ khó của Đối thủ AI
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { level: 'Dễ', desc: 'Lập luận đơn giản, dễ tìm điểm hở' },
              { level: 'Trung bình', desc: 'Lập luận có cấu trúc, dẫn chứng cơ bản' },
              { level: 'Khó', desc: 'Lập luận chặt chẽ, phản biện xoáy sâu' },
            ].map(({ level, desc }) => (
              <button
                key={level}
                type="button"
                onClick={() => setAiDifficulty(level)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  aiDifficulty === level
                    ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm">{level}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Format / Structure Preview */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            4. Định dạng phiên tranh biện (3 Vòng · 8 phút)
          </label>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
            <div className="text-xs font-bold uppercase tracking-wider text-[#173B67] mb-2.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2563EB]" />
              Tiến trình 3 vòng chuẩn học thuật
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded bg-white border border-slate-200">
                <span className="font-bold text-[#173B67]">Vòng 1: Mở đầu</span>
                <p className="text-slate-500 mt-0.5">3 phút • Trình bày các luận điểm chính</p>
              </div>
              <div className="p-2.5 rounded bg-white border border-slate-200">
                <span className="font-bold text-[#173B67]">Vòng 2: Phản biện</span>
                <p className="text-slate-500 mt-0.5">3 phút • Phản bác luận điểm đối thủ</p>
              </div>
              <div className="p-2.5 rounded bg-white border border-slate-200">
                <span className="font-bold text-[#173B67]">Vòng 3: Kết luận</span>
                <p className="text-slate-500 mt-0.5">2 phút • Tóm tắt và củng cố lập trường</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/chu-de')}
          >
            Xem danh sách chủ đề
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Play}
            onClick={handleStartDebate}
          >
            Bắt đầu tranh biện
          </Button>
        </div>
      </div>
    </div>
  );
};
