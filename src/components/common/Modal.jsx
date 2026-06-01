import PropTypes from 'prop-types';
import { X } from 'lucide-react';

// ============================================================
// Modal — Diálogo superpuesto reutilizable
// Renderiza null si isOpen es false (sin nodo en el DOM).
// ============================================================
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fade-in 0.2s ease both' }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-elevated border border-gray-100 p-6"
        style={{ animation: 'fade-up 0.3s ease both' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          {title && (
            <h2 className="text-lg font-bold text-brand-purple">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-1.5 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen:   PropTypes.bool.isRequired,
  onClose:  PropTypes.func.isRequired,
  title:    PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;