import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    navy: 'bg-slate-800 text-white border-slate-700',
    outline: 'bg-transparent text-slate-600 border-slate-300',
    // Difficulty
    'Dễ': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Trung bình': 'bg-amber-50 text-amber-700 border-amber-200',
    'Khó': 'bg-red-50 text-red-700 border-red-200',
    // Category
    'Xã hội': 'bg-blue-50 text-blue-700 border-blue-200',
    'Công nghệ': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Giáo dục': 'bg-teal-50 text-teal-700 border-teal-200',
    'Kinh tế': 'bg-cyan-50 text-cyan-700 border-cyan-200',
    'Đạo đức': 'bg-violet-50 text-violet-700 border-violet-200',
    // Status
    'Đã xuất bản': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Bản nháp': 'bg-slate-100 text-slate-600 border-slate-200',
    'Đã lưu trữ': 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const sizeStyles = {
    xs: 'text-[11px] px-1.5 py-0.5',
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  const style = variantStyles[variant] || variantStyles.default;

  return (
    <span className={`inline-flex items-center font-medium rounded-md border ${style} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
