import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { DEMO_MODE } from '../config';
import { Lock, Mail, UserCheck } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { switchRole } = useApp();

  const [email, setEmail] = useState('longnpse171234@fpt.edu.vn');
  const [password, setPassword] = useState('password123');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/tong-quan');
    }, 600);
  };

  const handleQuickLoginAs = (role) => {
    switchRole(role);
    if (role === 'educator') {
      setEmail('namtv@fpt.edu.vn');
    } else {
      setEmail('longnpse171234@fpt.edu.vn');
    }
    navigate('/tong-quan');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold text-xl shadow-sm">
            A
          </div>
        </div>
        <h2 className="mt-4 text-center text-2xl font-extrabold text-[#173B67] tracking-tight">
          ADPP
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500 font-medium">
          Nền tảng luyện tập tranh biện ứng dụng Trí tuệ nhân tạo
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 border border-[#E2E8F0] rounded-xl shadow-card">
          <div className="mb-6">
            <h3 className="text-base font-bold text-[#172033]">Đăng nhập tài khoản</h3>
            <p className="text-xs text-slate-500 mt-0.5">Sử dụng tài khoản email sinh viên hoặc giảng viên</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Địa chỉ Email
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@fpt.edu.vn"
                  className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Mật khẩu
                </label>
                <a href="#forgot" className="text-xs font-medium text-[#2563EB] hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 text-[#2563EB] focus:ring-blue-500 border-slate-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full"
                size="md"
              >
                Đăng nhập
              </Button>
            </div>
          </form>

          {/* Quick Login Role Buttons only in DEMO_MODE */}
          {DEMO_MODE && (
            <div className="mt-6 pt-5 border-t border-slate-200">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">
                Chế độ Demo nhanh
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLoginAs('learner')}
                  className="px-3 py-2 text-xs font-semibold border border-blue-200 bg-blue-50/70 text-[#2563EB] rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Học viên (Phi Long)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLoginAs('educator')}
                  className="px-3 py-2 text-xs font-semibold border border-slate-300 bg-slate-100 text-slate-800 rounded-md hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Giảng viên (TS. Nam)
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Chưa có tài khoản?{' '}
              <Link to="/dang-ky" className="font-semibold text-[#2563EB] hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
