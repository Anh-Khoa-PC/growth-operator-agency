import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { AlertTriangle } from 'lucide-react';

const GatewayModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = sessionStorage.getItem('goa_accepted');
    if (!hasAccepted) {
      // Small delay for effect
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('goa_accepted', 'true');
    setIsOpen(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
          >
             {/* Background Effects */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,92,0,0.1),transparent_50%)]" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-brand-orange" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Xin lưu ý
              </h3>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                Trang web này chỉ dành cho những người muốn kiếm tiền nghiêm túc từ việc xây dựng cộng đồng và phát triển doanh nghiệp.
              </p>

              <div className="flex flex-col gap-3">
                <Button 
                    variant="secondary" 
                    onClick={handleAccept}
                    className="w-full justify-center !text-base"
                >
                  Tôi hiểu
                </Button>
                <button 
                    onClick={handleDecline}
                    className="text-gray-500 text-sm hover:text-white transition-colors py-2"
                >
                  Tôi không muốn kiếm tiền
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GatewayModal;