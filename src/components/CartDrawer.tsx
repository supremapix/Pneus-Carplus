import React, { useState } from 'react';
import { CartItem, Tire } from '../types';
import { X, ShoppingBag, Trash2, ShieldAlert, CheckCircle, Calendar, MessageSquare, ExternalLink } from 'lucide-react';
import { getBrandFallbackImage } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (tireId: string) => void;
  onUpdateQuantity: (tireId: string, quantity: number) => void;
  onClearCart: () => void;
  onNavigateToCart?: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onNavigateToCart
}: CartDrawerProps) {
  const [userName, setUserName] = useState('');
  const [userCar, setUserCar] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [targetPeriod, setTargetPeriod] = useState('Manhã');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => {
    const price = item.tire.promoPrice || item.tire.price;
    return acc + (price * item.quantity);
  }, 0);

  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const phone = '554130827282'; // Physical store phone

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    let text = `Olá Carplus Pneus! Acabei de selecionar pneus no catálogo virtual e gostaria de agendar a instalação na loja do Portão.\n\n`;
    text += `*MEU ORÇAMENTO:*\n`;
    
    cartItems.forEach((item) => {
      const price = item.tire.promoPrice || item.tire.price;
      text += `- *${item.quantity}x* Pneu ${item.tire.brand} ${item.tire.model} (Medida: ${item.tire.width}/${item.tire.aspectRatio} R${item.tire.rim}) - *R$ ${price.toFixed(2)}/un*\n`;
    });

    text += `\n*VALOR TOTAL ESTIMADO:* R$ ${totalAmount.toFixed(2)}\n`;
    text += `_(Montagem, Montagem de bicos comuns, e Instalação na loja inclusos gratuitamente!)_\n\n`;

    text += `*DADOS DO CLIENTE:*\n`;
    text += `- *Nome:* ${userName || 'Não informado'}\n`;
    if (userCar) text += `- *Veículo:* ${userCar}\n`;
    if (targetDate) {
      const formatedDate = targetDate.split('-').reverse().join('/');
      text += `- *Data de instalação preferida:* ${formatedDate} (${targetPeriod})\n`;
    }

    text += `\n*Unidade do agendamento:* Av. Presid. Arthur da Silva Bernardes, 1323 - Portão, Curitiba.\n`;
    text += `Confirma para mim a disponibilidade desse horário para eu subir o carro no elevador?`;

    const encoded = encodeURIComponent(text);
    const link = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
    window.open(link, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex justify-end backdrop-blur-sm p-2 sm:p-0 font-sans" 
      id="cart-drawer-overlay"
    >
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Drawer box */}
      <div 
        className="relative bg-white w-full max-w-lg h-full flex flex-col shadow-2xl rounded-2xl sm:rounded-l-2xl sm:rounded-r-none overflow-hidden"
        id="cart-drawer-panel"
      >
        {/* Header */}
        <div className="bg-[#1a1c20] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-yellow-500" />
            <h3 className="font-bold text-base text-[#f49e1a]">Meu Carrinho de Instalação</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-white transition"
            id="close-cart-btn-drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info label */}
        <div className="bg-yellow-500/10 text-yellow-500 px-4 py-2.5 text-xs border-b border-yellow-500/15 flex items-center gap-1.5 justify-center text-center font-sans">
          <ShieldAlert className="w-4 h-4 shrink-0 text-yellow-500" />
          <span>Você não paga nada online! O orçamento é enviado e pago apenas após a instalação.</span>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" id="cart-drawer-items-container">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center justify-center text-gray-400">
              <ShoppingBag className="w-12 h-12 text-gray-300 mb-2 animate-bounce" />
              <p className="font-bold text-sm text-gray-600">Seu carrinho está vazio!</p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">
                Navegue no nosso catálogo abaixo e escolha as medidas ideais para o seu automóvel.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-5 py-2 rounded-xl text-xs uppercase"
              >
                Voltar à busca de Pneus
              </button>
            </div>
          ) : (
            <div className="space-y-3" id="cart-drawer-items-list">
              <div className="flex justify-between items-center text-xs text-gray-400 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span>{totalQty} pneu(s) adicionados</span>
                  {onNavigateToCart && (
                    <button
                      onClick={onNavigateToCart}
                      className="text-yellow-600 hover:text-yellow-700 font-extrabold uppercase hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                      id="view-full-cart-link"
                    >
                      Ver Tela Inteira ➔
                    </button>
                  )}
                </div>
                <button 
                  onClick={onClearCart}
                  className="text-gray-400 hover:text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Esvaziar
                </button>
              </div>

              {cartItems.map((item) => {
                const itemPrice = item.tire.promoPrice || item.tire.price;
                return (
                  <div 
                    key={item.tire.id}
                    className="flex flex-col sm:flex-row gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-150 items-start sm:items-center justify-between"
                    id={`cart-drawer-item-${item.tire.id}`}
                  >
                    <div className="flex gap-3 items-center min-w-0 w-full sm:w-auto">
                      <img 
                        src={item.tire.image} 
                        alt={item.tire.name} 
                        className="w-12 h-12 object-contain bg-white rounded border border-gray-250 p-1 shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getBrandFallbackImage(item.tire.brand, item.tire.id);
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <span className="bg-gray-200 text-gray-700 text-[9px] uppercase font-black px-1.5 py-0.5 rounded">
                          {item.tire.brand}
                        </span>
                        <h4 className="text-xs font-black text-gray-900 truncate mt-1" title={item.tire.name}>
                          {item.tire.name}
                        </h4>
                        <p className="text-xs text-yellow-600 font-bold font-mono">
                          R$ {itemPrice.toFixed(2)} /un
                        </p>
                      </div>
                    </div>

                    {/* Quantity edits */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto pt-2.5 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                      <div className="flex items-center border border-gray-300 bg-white rounded-lg overflow-hidden h-8">
                        <button 
                          onClick={() => onUpdateQuantity(item.tire.id, Math.max(1, item.quantity - 1))}
                          className="px-2.5 hover:bg-gray-100 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-xs font-bold text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.tire.id, Math.min(12, item.quantity + 1))}
                          className="px-2.5 hover:bg-gray-100 font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button 
                        onClick={() => onRemoveItem(item.tire.id)}
                        className="p-1.5 hover:text-yellow-600 text-gray-400 transition"
                        title="Remover pneu"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* scheduling fields & form */}
        {cartItems.length > 0 && (
          <form 
            onSubmit={handleSendWhatsAppOrder} 
            className="border-t border-gray-200 p-4 bg-gray-50/70 space-y-3 shrink-0"
            id="cart-drawer-scheduling-form"
          >
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 text-center sm:text-justify">
              Agendar Instalação Carplus Portão:
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-gray-400 font-semibold mb-1">Seu Nome *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Nome do Cliente"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 font-semibold mb-1">Modelo do Carro *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Fiat Argo Drive"
                  value={userCar}
                  onChange={(e) => setUserCar(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-gray-400 font-semibold mb-1">Data Desejada</label>
                <input 
                  type="date" 
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 font-semibold mb-1">Período</label>
                <select 
                  value={targetPeriod}
                  onChange={(e) => setTargetPeriod(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white"
                >
                  <option value="Manhã">Manhã (08h - 12h)</option>
                  <option value="Tarde">Tarde (13h - 18h)</option>
                  <option value="Qualquer Horário">Qualquer Horário</option>
                </select>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-white border border-gray-200 p-3 rounded-xl flex justify-between items-center mt-2.5">
              <div>
                <span className="text-[10px] text-gray-400 block font-semibold uppercase">Orçamento Estimado:</span>
                <span className="text-2xl font-black text-gray-900 font-mono">R$ {totalAmount.toFixed(2)}</span>
              </div>
              <div className="text-right text-[10px] text-yellow-600 font-bold bg-yellow-500/10 px-2.5 py-1.5 rounded-lg border border-yellow-500/20">
                Instalação Inclusa!
              </div>
            </div>

            {/* SEND BUDGET WA */}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-300 animate-pulse text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-yellow-500/10 border border-black"
              id="submit-wa-order-btn"
            >
              <MessageSquare className="w-5 h-5 shrink-0" />
              <span>Enviar Orçamento ao WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
