import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Shield, BookOpen, ExternalLink, Play, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const TopicDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { topics } = useApp();

  const topic = topics.find(t => t.id === id) || topics[0];

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'references'
  const [selectedSide, setSelectedSide] = useState('Ủng hộ'); // 'Ủng hộ' | 'Phản đối'
  const [aiDifficulty, setAiDifficulty] = useState('Trung bình'); // 'Dễ' | 'Trung bình' | 'Khó'

  const handleStartDebate = () => {
    navigate(`/tranh-bien/ai/${topic.id}`, {
      state: {
        topicId: topic.id,
        side: selectedSide,
        aiDifficulty: aiDifficulty,
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/chu-de')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#2563EB] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách chủ đề
      </button>

      {/* Header Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={topic.category}>{topic.category}</Badge>
          <Badge variant={topic.difficulty}>Độ khó: {topic.difficulty}</Badge>
          <span className="text-xs text-slate-400 ml-auto">
            Cập nhật: {topic.updatedAt || '10/09/2026'} • Tác giả: {topic.author}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#173B67] leading-snug">
          {topic.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {topic.summary}
        </p>

        {/* Compact Practice Focus Section */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs">
          <span className="font-bold text-[#173B67] shrink-0">Bạn sẽ luyện tập:</span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
              • Xây dựng lập luận
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
              • Phản biện trực tiếp
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
              • Sử dụng dẫn chứng
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 pt-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Tổng quan kiến nghị
          </button>
          <button
            onClick={() => setActiveTab('references')}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              activeTab === 'references'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Tài liệu tham khảo ({topic.references?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' ? (
          <div className="space-y-4 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#173B67] mb-2">
                Thông tin nền
              </h4>
              <p className="whitespace-pre-line text-slate-600">
                {topic.background}
              </p>
            </div>

            {topic.sampleSides && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-lg border border-blue-200 bg-blue-50/50">
                  <div className="font-bold text-xs text-[#2563EB] mb-1">
                    Phe Ủng hộ
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {topic.sampleSides.pro}
                  </p>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-bold text-xs text-[#173B67] mb-1">
                    Phe Phản đối
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {topic.sampleSides.con}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2 pt-2">
            {topic.references && topic.references.map((ref, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-300 bg-white flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-semibold text-[#172033]">{ref.title}</div>
                  <div className="text-slate-500 mt-0.5">Nguồn: {ref.source}</div>
                </div>
                <Button variant="ghost" size="sm" icon={ExternalLink} iconPosition="right">
                  Xem tài liệu
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section: Thiết lập phiên tranh biện */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-6">
        <div>
          <h3 className="text-base font-bold text-[#173B67]">
            Thiết lập phiên tranh biện với Trí tuệ nhân tạo
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Lựa chọn vai trò của bạn và cấp độ thử thách của đối thủ AI.
          </p>
        </div>

        {/* Choose Side */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            1. Chọn phe của bạn
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

        {/* AI Difficulty */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            2. Độ khó của Trợ lý AI
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

        {/* Debate Structure Preview */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-[#173B67] mb-2.5 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#2563EB]" />
            Cấu trúc phiên tranh biện chuẩn (3 Vòng)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded bg-white border border-slate-200">
              <span className="font-bold text-[#173B67]">Vòng 1: Mở đầu</span>
              <p className="text-slate-500 mt-0.5">3 phút • Trình bày hệ thống luận điểm chính</p>
            </div>
            <div className="p-2.5 rounded bg-white border border-slate-200">
              <span className="font-bold text-[#173B67]">Vòng 2: Phản biện</span>
              <p className="text-slate-500 mt-0.5">3 phút • Phản bác luận điểm của đối thủ</p>
            </div>
            <div className="p-2.5 rounded bg-white border border-slate-200">
              <span className="font-bold text-[#173B67]">Vòng 3: Kết luận</span>
              <p className="text-slate-500 mt-0.5">2 phút • Tổng kết và nhấn mạnh tác động</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/chu-de')}
          >
            Quay lại
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Play}
            onClick={handleStartDebate}
          >
            Bắt đầu tranh biện ngay
          </Button>
        </div>
      </div>
    </div>
  );
};
