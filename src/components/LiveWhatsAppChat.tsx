import React, { useState } from 'react';
import { MessageSquare, Send, X, ShieldAlert, Check } from 'lucide-react';

export default function LiveWhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [car, setCar] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const phone = '554130827282'; // (41) 3082-7282

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `Olá Carplus Pneus! Gostaria de agendar um atendimento na loja do Portão.\n`;
    if (name) text += `*Nome*: ${name}\n`;
    if (car) text += `*Veículo*: ${car}\n`;
    if (customMessage) text += `*Mensagem*: ${customMessage}\n`;
    
    const encodedText = encodeURIComponent(text);
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
    window.open(whatsappLink, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="live-whatsapp-chat">
      {/* Absolute floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-yellow-500 text-gray-950 p-4 rounded-full shadow-2xl hover:bg-yellow-400 border-2 border-black transition duration-300 transform hover:scale-105"
          aria-label="Falar no WhatsApp"
          id="whatsapp-trigger-btn"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-950"></span>
          </span>
          <MessageSquare className="w-6 h-6 shrink-0" />
          <span className="font-extrabold text-xs uppercase hidden sm:inline">Agendar Instalação</span>
        </button>
      )}

      {/* Floating Chat Box */}
      {isOpen && (
        <div 
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-80 sm:w-96 text-gray-800 transition duration-300"
          id="whatsapp-chat-box"
        >
          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center justify-between font-sans">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="https://www.carpluspneuseoficina.com.br/images/logos/logo-vertical.svg" 
                  alt="Carplus Logo" 
                  className="w-10 h-10 object-contain rounded-lg bg-yellow-500 p-1"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full border-2 border-black"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight text-[#f49e1a]">Carplus Portão</h4>
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <span>Online</span>
                  <span className="text-[10px] text-gray-400">• Seg a Sáb</span>
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition"
              id="close-chat-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Notice */}
          <div className="bg-[#111215] p-3 border-b border-gray-800 text-xs text-yellow-500 flex items-start gap-2 justify-center">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-yellow-500" />
            <p className="text-justify line-clamp-3">
              Agende seus pneus e pague somente na instalação física! Av. Presid. Arthur da Silva Bernardes, 1323.
            </p>
          </div>

          {/* Body / Form */}
          <form onSubmit={handleSendMessage} className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Seu Nome *</label>
              <input
                type="text"
                required
                placeholder="Ex: João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Seu Veículo (Opcional)</label>
              <input
                type="text"
                placeholder="Ex: Fiat Argo / VW Gol"
                value={car}
                onChange={(e) => setCar(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Dúvida ou Serviço Adicional</label>
              <textarea
                placeholder="Ex: Gostaria de alinhar também."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={2}
                className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-black py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition"
              id="send-whatsapp-chat-form-btn"
            >
              <Send className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
