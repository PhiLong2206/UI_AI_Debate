import React from 'react';
import { BarChart3, Users2, Award, TrendingUp, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const EducatorReportsPage = () => {
  const students = [
    { name: 'Nguyễn Phi Long', mssv: 'SE171234', sessions: 12, avgScore: 76.4, weakSkill: 'Dẫn chứng', status: 'Tiến bộ' },
    { name: 'Nguyễn Đức Duy', mssv: 'SE171452', sessions: 15, avgScore: 78.5, weakSkill: 'Cấu trúc', status: 'Tốt' },
    { name: 'Lê Thu Hà', mssv: 'SE172109', sessions: 19, avgScore: 81.2, weakSkill: 'Khả năng thuyết phục', status: 'Xuất sắc' },
    { name: 'Vũ Minh Anh', mssv: 'SE170881', sessions: 14, avgScore: 83.0, weakSkill: 'Dẫn chứng', status: 'Xuất sắc' },
    { name: 'Trần Hoàng Nam', mssv: 'SE173201', sessions: 8, avgScore: 72.0, weakSkill: 'Lập luận', status: 'Cần kèm cặp' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#173B67] tracking-tight">
            Báo cáo Đánh giá Học viên (Lớp DEB101)
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Quản lý chủ đề và theo dõi hoạt động luyện tập của học viên.
          </p>
        </div>
        <Button variant="outline" size="md" icon={Download}>
          Xuất báo cáo Excel
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-subtle">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Tổng số sinh viên</div>
          <div className="text-3xl font-extrabold text-[#173B67] mt-1">45</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">100% đã hoàn thành ít nhất 5 phiên</div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-subtle">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Điểm trung bình lớp</div>
          <div className="text-3xl font-extrabold text-[#173B67] mt-1">77.2</div>
          <div className="text-xs text-blue-600 font-medium mt-1">Thang điểm Rubric 100</div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-subtle">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Kỹ năng chung cần cải thiện</div>
          <div className="text-xl font-extrabold text-amber-600 mt-1.5 truncate">Dẫn chứng</div>
          <div className="text-xs text-slate-500 font-medium mt-1">62% sinh viên điểm dẫn chứng &lt; 7.0</div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#173B67]">Danh sách sinh viên theo dõi trọng điểm</h3>
          <span className="text-xs text-slate-500">Học kỳ Fall 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-[#E2E8F0] text-slate-500 font-semibold">
                <th className="py-3 px-4">Họ và tên</th>
                <th className="py-3 px-4">MSSV</th>
                <th className="py-3 px-4">Số phiên</th>
                <th className="py-3 px-4">Điểm TB</th>
                <th className="py-3 px-4">Kỹ năng yếu nhất</th>
                <th className="py-3 px-4">Đánh giá chung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((st, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-bold text-[#172033]">{st.name}</td>
                  <td className="py-3.5 px-4 text-slate-500">{st.mssv}</td>
                  <td className="py-3.5 px-4 font-medium">{st.sessions} phiên</td>
                  <td className="py-3.5 px-4 font-bold text-[#2563EB]">{st.avgScore}</td>
                  <td className="py-3.5 px-4 text-amber-700 font-medium">{st.weakSkill}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={st.status === 'Xuất sắc' ? 'success' : st.status === 'Cần kèm cặp' ? 'warning' : 'primary'} size="xs">
                      {st.status}
                    </Badge>
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
