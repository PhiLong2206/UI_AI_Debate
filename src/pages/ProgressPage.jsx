import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Award,
  AlertCircle,
  BookOpen,
  Calendar,
  Filter,
  CheckCircle2,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DEBATE_HISTORY_DATA } from '../data/mockData';

export const ProgressPage = () => {
  const navigate = useNavigate();

  // 1. Time Range Filter State
  const [timeRange, setTimeRange] = useState('3m'); // '7d' | '30d' | '3m' | '6m' | '1y' | 'custom'
  const [customStartDate, setCustomStartDate] = useState('2026-06-01');
  const [customEndDate, setCustomEndDate] = useState('2026-09-10');

  // 2. Skill / Criterion Filter State
  const [selectedCriterion, setSelectedCriterion] = useState('total'); // 'total' | 'argumentation' | 'evidence' | 'relevance' | 'structure' | 'persuasion'

  const criteriaOptions = [
    { key: 'total', label: 'Tổng điểm', max: 100, unit: '/ 100' },
    { key: 'argumentation', label: 'Lập luận', max: 10, unit: '/ 10' },
    { key: 'evidence', label: 'Dẫn chứng', max: 10, unit: '/ 10' },
    { key: 'relevance', label: 'Tính liên quan', max: 10, unit: '/ 10' },
    { key: 'structure', label: 'Cấu trúc', max: 10, unit: '/ 10' },
    { key: 'persuasion', label: 'Khả năng thuyết phục', max: 10, unit: '/ 10' },
  ];

  // Filter datasets based on selected time range
  const filteredData = useMemo(() => {
    let cutoffDate = new Date('2026-06-01');
    const endDate = new Date('2026-09-11');

    if (timeRange === '7d') {
      cutoffDate = new Date('2026-09-03');
    } else if (timeRange === '30d') {
      cutoffDate = new Date('2026-08-11');
    } else if (timeRange === '3m') {
      cutoffDate = new Date('2026-06-10');
    } else if (timeRange === '6m') {
      cutoffDate = new Date('2026-03-10');
    } else if (timeRange === '1y') {
      cutoffDate = new Date('2025-09-10');
    } else if (timeRange === 'custom') {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);
      return DEBATE_HISTORY_DATA.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
    }

    return DEBATE_HISTORY_DATA.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate && itemDate <= endDate;
    });
  }, [timeRange, customStartDate, customEndDate]);

  // Ensure there is at least something to show if custom range is too small
  const activeSessions = filteredData.length > 0 ? filteredData : DEBATE_HISTORY_DATA;

  // Chart data preparation
  const chartData = useMemo(() => {
    return activeSessions.map(s => ({
      id: s.id,
      date: s.displayDate,
      fullDate: s.fullDate,
      topic: s.topic,
      type: s.type,
      opponent: s.opponent,
      score: selectedCriterion === 'total' ? s.totalScore : s.scores[selectedCriterion],
      rawTotal: s.totalScore,
      scores: s.scores
    }));
  }, [activeSessions, selectedCriterion]);

  // Calculated Metrics from the active sessions
  const metrics = useMemo(() => {
    const totalCount = activeSessions.length;
    const aiCount = activeSessions.filter(s => s.type === 'Với AI').length;
    const pvpCount = activeSessions.filter(s => s.type === '1 vs 1').length;

    const avgTotal = totalCount > 0
      ? (activeSessions.reduce((acc, curr) => acc + curr.totalScore, 0) / totalCount).toFixed(1)
      : '76.4';

    const avgArg = totalCount > 0
      ? (activeSessions.reduce((acc, curr) => acc + curr.scores.argumentation, 0) / totalCount).toFixed(1)
      : '7.6';
    const avgEvi = totalCount > 0
      ? (activeSessions.reduce((acc, curr) => acc + curr.scores.evidence, 0) / totalCount).toFixed(1)
      : '6.8';
    const avgRel = totalCount > 0
      ? (activeSessions.reduce((acc, curr) => acc + curr.scores.relevance, 0) / totalCount).toFixed(1)
      : '8.1';
    const avgStr = totalCount > 0
      ? (activeSessions.reduce((acc, curr) => acc + curr.scores.structure, 0) / totalCount).toFixed(1)
      : '7.5';
    const avgPer = totalCount > 0
      ? (activeSessions.reduce((acc, curr) => acc + curr.scores.persuasion, 0) / totalCount).toFixed(1)
      : '7.2';

    return {
      totalCount,
      aiCount,
      pvpCount,
      avgTotal,
      skills: {
        argumentation: Number(avgArg),
        evidence: Number(avgEvi),
        relevance: Number(avgRel),
        structure: Number(avgStr),
        persuasion: Number(avgPer),
      }
    };
  }, [activeSessions]);

  // Skill definitions for display
  const skillList = [
    { key: 'argumentation', name: 'Lập luận', score: metrics.skills.argumentation, desc: 'Tính logic và liên kết nguyên nhân - kết quả' },
    { key: 'evidence', name: 'Dẫn chứng', score: metrics.skills.evidence, desc: 'Độ tin cậy của số liệu và ví dụ thực tế', isWeak: true },
    { key: 'relevance', name: 'Tính liên quan', score: metrics.skills.relevance, desc: 'Bám sát trọng tâm kiến nghị', isStrong: true },
    { key: 'structure', name: 'Cấu trúc', score: metrics.skills.structure, desc: 'Trình tự mở bài, phản biện và kết luận' },
    { key: 'persuasion', name: 'Khả năng thuyết phục', score: metrics.skills.persuasion, desc: 'Sức nặng diễn đạt và tính đĩnh đạc' },
  ];

  // Dynamic Chart Header info
  const currentCriterionObj = criteriaOptions.find(c => c.key === selectedCriterion) || criteriaOptions[0];

  const chartTitle = selectedCriterion === 'total'
    ? 'Biến động tổng điểm các phiên tranh biện'
    : `Tiến bộ kỹ năng ${currentCriterionObj.label}`;

  const chartSubtitle = selectedCriterion === 'total'
    ? 'Điểm tổng hợp 5 tiêu chí theo từng phiên hoàn thành'
    : `Biến động điểm ${currentCriterionObj.label} qua các phiên tranh biện`;

  const timeRangeLabels = {
    '7d': '7 ngày qua',
    '30d': '30 ngày qua',
    '3m': '3 tháng qua',
    '6m': '6 tháng qua',
    '1y': '1 năm qua',
    'custom': 'Khoảng thời gian tùy chọn',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#173B67] tracking-tight">
          Bản đồ tiến bộ năng lực tranh biện
        </h2>
        <p className="text-sm text-[#64748B] mt-1">
          Theo dõi mức độ tiến bộ qua các phiên tranh biện, phân tích biến động kỹ năng và xác định trọng tâm rèn luyện.
        </p>
      </div>

      {/* 3. TIME RANGE FILTER TOOLBAR */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#173B67] uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
              Khoảng thời gian:
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            {[
              { id: '7d', label: '7 ngày' },
              { id: '30d', label: '30 ngày' },
              { id: '3m', label: '3 tháng' },
              { id: '6m', label: '6 tháng' },
              { id: '1y', label: '1 năm' },
              { id: 'custom', label: 'Tùy chọn' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTimeRange(tab.id)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  timeRange === tab.id
                    ? 'bg-[#173B67] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Date Pickers if 'custom' is selected */}
        {timeRange === 'custom' && (
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-600">Từ ngày:</span>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="px-2.5 py-1 border border-slate-300 rounded bg-white text-slate-800 text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-600">Đến ngày:</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="px-2.5 py-1 border border-slate-300 rounded bg-white text-slate-800 text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 4. COMPARISON SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Điểm trung bình */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-subtle">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Điểm trung bình các phiên
          </div>
          <div className="text-3xl font-extrabold text-[#173B67] mt-1">
            {metrics.avgTotal} <span className="text-sm text-slate-400 font-normal">/ 100</span>
          </div>
          <div className="text-xs font-semibold mt-1 flex items-center gap-1 text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            +4.8 điểm so với {timeRange === '3m' ? '3 tháng trước' : 'giai đoạn trước'}
          </div>
        </div>

        {/* Card 2: Tổng số phiên */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-subtle">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Tổng số phiên tranh biện
          </div>
          <div className="text-3xl font-extrabold text-[#173B67] mt-1">
            {metrics.totalCount}
          </div>
          <div className="text-xs text-blue-600 font-medium mt-1">
            {metrics.aiCount} phiên với AI • {metrics.pvpCount} trận 1 vs 1
          </div>
        </div>

        {/* Card 3: Kỹ năng dẫn đầu */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-subtle">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Kỹ năng dẫn đầu
          </div>
          <div className="text-xl font-extrabold text-[#2563EB] mt-1.5 truncate">
            Tính liên quan ({metrics.skills.relevance})
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Phản ứng nhanh & bám sát kiến nghị
          </div>
        </div>
      </div>

      {/* 5 & 6. SKILL FILTER & MAIN PROGRESS CHART */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-5">
        {/* Criterion Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-[#173B67] uppercase tracking-wider block mb-1.5">
              Tiêu chí phân tích:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {criteriaOptions.map(opt => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelectedCriterion(opt.key)}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                    selectedCriterion === opt.key
                      ? 'bg-[#2563EB] text-white shadow-xs font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <Badge variant="primary" size="xs">
            Dữ liệu từ các phiên đã hoàn thành
          </Badge>
        </div>

        {/* Chart Header */}
        <div>
          <h3 className="text-base font-bold text-[#173B67]">
            {chartTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {chartSubtitle} ({timeRangeLabels[timeRange]})
          </p>
        </div>

        {/* Recharts Container */}
        <div className="h-64 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} />
              <YAxis
                domain={selectedCriterion === 'total' ? [50, 100] : [4, 10]}
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-md text-xs space-y-1">
                        <div className="font-bold text-[#173B67]">Ngày: {data.fullDate}</div>
                        <div className="text-slate-600 max-w-xs truncate">Chủ đề: {data.topic}</div>
                        <div className="text-slate-500">Hình thức: {data.type}</div>
                        <div className="font-bold text-[#2563EB] pt-0.5 border-t border-slate-100">
                          Điểm {currentCriterionObj.label}: {data.score} {currentCriterionObj.unit}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563EB"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, fill: '#173B67' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 7. PERIOD COMPARISON ("SO SÁNH GIAI ĐOẠN") */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#173B67]">
            So sánh giai đoạn
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            01/06/2026 – 31/07/2026 so với 01/08/2026 – 10/09/2026
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-[#E2E8F0] text-slate-500 font-semibold">
                <th className="py-2.5 px-4">Tiêu chí đánh giá</th>
                <th className="py-2.5 px-4">Giai đoạn trước (01/06 – 31/07)</th>
                <th className="py-2.5 px-4">Giai đoạn hiện tại (01/08 – 10/09)</th>
                <th className="py-2.5 px-4 text-right">Mức thay đổi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/80 font-bold bg-slate-50/30">
                <td className="py-3 px-4 text-[#173B67]">Điểm trung bình các phiên</td>
                <td className="py-3 px-4 text-slate-600">71.2 / 100</td>
                <td className="py-3 px-4 text-[#173B67]">76.4 / 100</td>
                <td className="py-3 px-4 text-right text-emerald-600 font-extrabold">+5.2</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-800">Lập luận</td>
                <td className="py-2.5 px-4 text-slate-600">6.8 / 10</td>
                <td className="py-2.5 px-4 font-semibold text-slate-900">7.6 / 10</td>
                <td className="py-2.5 px-4 text-right text-emerald-600 font-bold">+0.8</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-800">Dẫn chứng</td>
                <td className="py-2.5 px-4 text-slate-600">5.9 / 10</td>
                <td className="py-2.5 px-4 font-semibold text-slate-900">6.8 / 10</td>
                <td className="py-2.5 px-4 text-right text-emerald-600 font-bold">+0.9</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-800">Tính liên quan</td>
                <td className="py-2.5 px-4 text-slate-600">7.4 / 10</td>
                <td className="py-2.5 px-4 font-semibold text-slate-900">8.1 / 10</td>
                <td className="py-2.5 px-4 text-right text-emerald-600 font-bold">+0.7</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-800">Cấu trúc</td>
                <td className="py-2.5 px-4 text-slate-600">7.0 / 10</td>
                <td className="py-2.5 px-4 font-semibold text-slate-900">7.5 / 10</td>
                <td className="py-2.5 px-4 text-right text-emerald-600 font-bold">+0.5</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-800">Khả năng thuyết phục</td>
                <td className="py-2.5 px-4 text-slate-600">6.5 / 10</td>
                <td className="py-2.5 px-4 font-semibold text-slate-900">7.2 / 10</td>
                <td className="py-2.5 px-4 text-right text-emerald-600 font-bold">+0.7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 8 & 9. SKILL MAP & SKILL IMPROVEMENT ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Bản đồ năng lực */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#173B67]">
              Bản đồ năng lực
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Điểm trung bình 5 tiêu chí trong khoảng thời gian đã chọn</p>
          </div>

          <div className="space-y-4 pt-2">
            {skillList.map((skill) => {
              const percentage = (skill.score / 10) * 100;
              return (
                <div key={skill.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#172033]">{skill.name}</span>
                      <p className="text-[11px] text-slate-500">{skill.desc}</p>
                    </div>
                    <span className={`font-bold text-sm ${skill.isWeak ? 'text-amber-600' : 'text-[#2563EB]'}`}>
                      {skill.score.toFixed(1)} / 10
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div
                      className={`h-full rounded-full ${skill.isWeak ? 'bg-amber-500' : 'bg-[#2563EB]'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Highlights */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200">
              <span className="text-slate-500 font-medium">Kỹ năng mạnh nhất:</span>
              <div className="font-bold text-[#2563EB] text-sm mt-0.5">
                Tính liên quan — {metrics.skills.relevance}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200">
              <span className="text-slate-500 font-medium">Kỹ năng cần cải thiện:</span>
              <div className="font-bold text-amber-700 text-sm mt-0.5">
                Dẫn chứng — {metrics.skills.evidence}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Phân tích sự tiến bộ */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#173B67]">
              Phân tích sự tiến bộ
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Đánh giá xu hướng thay đổi theo dữ liệu thực nghiệm</p>
          </div>

          <div className="space-y-3.5 pt-1 text-xs text-slate-700">
            {/* Box 1 */}
            <div className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/40 space-y-1">
              <span className="font-bold text-emerald-800 uppercase tracking-wider text-[11px] block">
                Tiến bộ nhiều nhất
              </span>
              <div className="font-bold text-slate-900 text-sm">Dẫn chứng</div>
              <p className="text-slate-600 leading-relaxed">
                +0.9 điểm so với giai đoạn trước. Khả năng bổ sung nguồn tham khảo và ví dụ định lượng đã cải thiện rõ nét.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-3.5 rounded-lg border border-blue-200 bg-blue-50/40 space-y-1">
              <span className="font-bold text-[#2563EB] uppercase tracking-wider text-[11px] block">
                Ổn định nhất
              </span>
              <div className="font-bold text-slate-900 text-sm">Tính liên quan</div>
              <p className="text-slate-600 leading-relaxed">
                Điểm duy trì ổn định từ 7.8 – 8.2 qua hầu hết các phiên tranh luận đối đầu.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/50 space-y-1">
              <span className="font-bold text-amber-800 uppercase tracking-wider text-[11px] block">
                Cần tập trung
              </span>
              <div className="font-bold text-slate-900 text-sm">Dẫn chứng</div>
              <p className="text-slate-600 leading-relaxed">
                Hiện vẫn là tiêu chí có điểm trung bình thấp nhất (6.8 / 10) so với 4 tiêu chí còn lại.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={BookOpen}
            className="w-full"
            onClick={() => navigate('/chu-de/tp-02')}
          >
            Luyện kỹ năng này
          </Button>
        </div>
      </div>

      {/* 10. SESSION DETAIL TABLE ("CHI TIẾT THEO TỪNG PHIÊN") */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#173B67]">
              Chi tiết theo từng phiên
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Bảng điểm Rubric 5 tiêu chí của {activeSessions.length} phiên trong {timeRangeLabels[timeRange]}
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Nguồn dữ liệu đánh giá từ Trọng tài AI
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-[#E2E8F0] text-slate-500 font-semibold">
                <th className="py-3 px-4">Ngày</th>
                <th className="py-3 px-4">Chủ đề kiến nghị</th>
                <th className="py-3 px-4">Hình thức</th>
                <th className="py-3 px-3 text-center">Lập luận</th>
                <th className="py-3 px-3 text-center">Dẫn chứng</th>
                <th className="py-3 px-3 text-center">Liên quan</th>
                <th className="py-3 px-3 text-center">Cấu trúc</th>
                <th className="py-3 px-3 text-center">Thuyết phục</th>
                <th className="py-3 px-4 text-right">Tổng điểm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeSessions.map((session) => (
                <tr key={session.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-600 whitespace-nowrap">
                    {session.fullDate}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#172033] max-w-xs truncate">
                    {session.topic}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <Badge variant={session.type === 'Với AI' ? 'primary' : 'navy'}>
                      {session.type}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-center font-medium text-slate-700">
                    {session.scores.argumentation.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-center font-medium text-amber-700 font-bold">
                    {session.scores.evidence.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-center font-medium text-slate-700">
                    {session.scores.relevance.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-center font-medium text-slate-700">
                    {session.scores.structure.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-center font-medium text-slate-700">
                    {session.scores.persuasion.toFixed(1)}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded font-bold text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {session.totalScore} / 100
                    </span>
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
