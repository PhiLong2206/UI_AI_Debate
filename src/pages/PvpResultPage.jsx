import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Swords,
  LayoutDashboard,
  TrendingUp,
  FileText,
  Calendar,
  Trophy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const PvpResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sessions } = useApp();

  const [showFullTranscript, setShowFullTranscript] = useState(false);

  const session = sessions.find(s => s.id === id) || sessions[1] || sessions[0];

  const comparisonCriteria = [
    { label: '1. Lập luận', user: 8.0, opp: 7.5 },
    { label: '2. Dẫn chứng', user: 6.5, opp: 8.0 },
    { label: '3. Tính liên quan', user: 8.5, opp: 8.0 },
    { label: '4. Cấu trúc', user: 7.5, opp: 7.0 },
    { label: '5. Khả năng thuyết phục', user: 8.0, opp: 7.5 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-lg text-[#173B67]">Kết quả đối đầu 1 vs 1 từ Trọng tài AI</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ngày: {session.date || '08/09/2026'}</span>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Kiến nghị tranh biện</span>
          <h1 className="text-lg sm:text-xl font-bold text-[#172033] mt-0.5">
            {session.topicTitle}
          </h1>
        </div>

        {/* Head-to-head Score Comparison Card */}
        <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 border border-slate-200 rounded-xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center">
            {/* Player 1 (You) */}
            <div className="flex flex-col items-center p-3 rounded-lg bg-white border-2 border-blue-400 shadow-xs">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="You"
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                />
                <Trophy className="w-5 h-5 text-amber-500 absolute -top-1 -right-1 fill-amber-400" />
              </div>
              <div className="font-bold text-sm text-[#172033] mt-2">Nguyễn Phi Long (Bạn)</div>
              <div className="text-xs text-blue-600 font-semibold">Phe Ủng hộ</div>
              <div className="text-3xl font-black text-[#2563EB] mt-1">77</div>
              <Badge variant="success" size="xs" className="mt-1">Chiến thắng</Badge>
            </div>

            {/* VS Center replaced with Đối đầu */}
            <div className="space-y-1">
              <span className="text-lg font-black text-slate-500 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-slate-200">
                Đối đầu
              </span>
              <div className="text-xs font-bold text-[#173B67] pt-2">Cách biệt: +1.0 điểm</div>
              <p className="text-[11px] text-slate-500 max-w-[160px] mx-auto">
                Quyết định bởi Trọng tài AI dựa trên tổng hợp 5 tiêu chí
              </p>
            </div>

            {/* Player 2 (Opponent) */}
            <div className="flex flex-col items-center p-3 rounded-lg bg-white border border-slate-300 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                alt="Opponent"
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-300"
              />
              <div className="font-bold text-sm text-[#172033] mt-2">Nguyễn Đức Duy</div>
              <div className="text-xs text-slate-600 font-semibold">Phe Phản đối</div>
              <div className="text-3xl font-black text-slate-700 mt-1">76</div>
              <Badge variant="default" size="xs" className="mt-1">Á quân</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#173B67]">
            Bảng đối chiếu điểm số chi tiết
          </h3>
          <p className="text-xs text-slate-500">So sánh trực quan giữa 2 học viên trên từng tiêu chí</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-[#E2E8F0] text-slate-600 font-semibold">
                <th className="py-3 px-4">Tiêu chí đánh giá</th>
                <th className="py-3 px-4 text-center text-[#2563EB] font-bold">Phi Long (Bạn)</th>
                <th className="py-3 px-4 text-center text-slate-700 font-bold">Đức Duy</th>
                <th className="py-3 px-4 text-right">Đánh giá trọng tài</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonCriteria.map((c, idx) => {
                const userWins = c.user > c.opp;
                const oppWins = c.opp > c.user;

                return (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{c.label}</td>
                    <td className={`py-3.5 px-4 text-center font-bold ${userWins ? 'text-[#2563EB] bg-blue-50/50' : 'text-slate-700'}`}>
                      {c.user.toFixed(1)} {userWins && '★'}
                    </td>
                    <td className={`py-3.5 px-4 text-center font-bold ${oppWins ? 'text-indigo-700 bg-indigo-50/50' : 'text-slate-700'}`}>
                      {c.opp.toFixed(1)} {oppWins && '★'}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-500">
                      {userWins ? (
                        <span className="text-emerald-600 font-semibold">Bạn vượt trội (+{(c.user - c.opp).toFixed(1)})</span>
                      ) : oppWins ? (
                        <span className="text-amber-600 font-semibold">Đức Duy dẫn (+{(c.opp - c.user).toFixed(1)})</span>
                      ) : (
                        <span>Ngang bằng</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Judge Notes & Strengths / Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Điểm mạnh của bạn trong trận đấu
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-emerald-600 font-bold">•</span>
              <span>Phản biện sắc bén vào điểm yếu của Đức Duy về việc áp đặt văn hóa cứng nhắc.</span>
            </li>
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-emerald-600 font-bold">•</span>
              <span>Kiểm soát vòng phản biện vượt trội, bám sát kiến nghị đề ra.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <AlertCircle className="w-4 h-4" />
            Điểm cần cải thiện
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-amber-600 font-bold">•</span>
              <span>Đức Duy có hệ thống số liệu dẫn chứng tốt hơn (8.0 so với 6.5). Bạn cần bổ sung thêm trích dẫn nghiên cứu khoa học.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Transcript Accordion */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card overflow-hidden">
        <button
          type="button"
          onClick={() => setShowFullTranscript(!showFullTranscript)}
          className="w-full p-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2563EB]" />
            <span className="text-xs sm:text-sm font-bold text-[#173B67]">
              Xem toàn bộ biên bản trận đấu 1 vs 1
            </span>
          </div>
          {showFullTranscript ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {showFullTranscript && (
          <div className="p-5 space-y-3 border-t border-[#E2E8F0] text-xs">
            <div className="bg-blue-50/70 border border-blue-200 p-3 rounded-md">
              <div className="font-bold text-[#2563EB] mb-1">Phi Long (Ủng hộ):</div>
              <p className="text-slate-800">"Chào đối thủ Đức Duy. Đại diện phe Ủng hộ, tôi khẳng định mạng xã hội gây hại nhiều hơn vì làm tăng trầm cảm và cô lập..."</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-md">
              <div className="font-bold text-slate-700 mb-1">Đức Duy (Phản đối):</div>
              <p className="text-slate-800">"Chào Phi Long. Về phía phe Phản đối, tôi cho rằng mạng xã hội là phương tiện không thể thiếu trong kỷ nguyên số..."</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Button
          variant="outline"
          size="md"
          icon={LayoutDashboard}
          onClick={() => navigate('/tong-quan')}
        >
          Về trang tổng quan
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="md"
            icon={Swords}
            onClick={() => navigate('/tranh-bien/1v1')}
          >
            Về sảnh 1 vs 1
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={TrendingUp}
            onClick={() => navigate('/tien-do')}
          >
            Xem tiến độ học tập
          </Button>
        </div>
      </div>
    </div>
  );
};
