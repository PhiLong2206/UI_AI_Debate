import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../common/Button';

export const ExitModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-[#E2E8F0] max-w-md w-full p-6 shadow-xl animate-scale-in">
        <div className="flex items-center gap-3 text-amber-600 mb-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#172033]">
            Bạn có chắc muốn rời phiên tranh biện?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 pl-13">
          Tiến trình tranh luận và các luận điểm hiện tại có thể không được lưu trữ vào hệ thống đánh giá Rubric.
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
          >
            Tiếp tục tranh biện
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={onConfirm}
          >
            Rời phiên
          </Button>
        </div>
      </div>
    </div>
  );
};
