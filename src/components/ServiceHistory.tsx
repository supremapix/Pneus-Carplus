import React, { useState, useEffect } from 'react';
import { DEFAULT_SERVICE_HISTORY } from '../data';
import { ServiceRecord } from '../types';
import { Search, Calendar, ShieldCheck, Plus, CheckCircle, FileText, Trash2, HelpCircle } from 'lucide-react';

export default function ServiceHistory() {
  const [records, setRecords] = useState<ServiceRecord[]>([]);
  const [searchPlate, setSearchPlate] = useState('');
  const [filteredRecords, setFilteredRecords] = useState<ServiceRecord[]>([]);
  
  // Registration form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlate, setNewPlate] = useState('');
  const [newVehicle, setNewVehicle] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newKm, setNewKm] = useState('');
  const [newServices, setNewServices] = useState('');
  const [newTotal, setNewTotal] = useState('');

  // Initial load
  useEffect(() => {
    const saved = localStorage.getItem('carplus_services');
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        setRecords(DEFAULT_SERVICE_HISTORY);
      }
    } else {
      setRecords(DEFAULT_SERVICE_HISTORY);
      localStorage.setItem('carplus_services', JSON.stringify(DEFAULT_SERVICE_HISTORY));
    }
  }, []);

  // Filter records
  useEffect(() => {
    if (!searchPlate.trim()) {
      setFilteredRecords(records);
    } else {
      const q = searchPlate.toUpperCase().trim();
      setFilteredRecords(records.filter(r => r.plate.toUpperCase().includes(q) || r.vehicle.toLowerCase().includes(q.toLowerCase())));
    }
  }, [searchPlate, records]);

  // Handle addition
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlate || !newVehicle || !newOwner) return;

    const servicesList = newServices.split(',').map(s => s.trim()).filter(Boolean);
    const newRecord: ServiceRecord = {
      id: 'CUSTOM_' + Date.now(),
      plate: newPlate.toUpperCase(),
      vehicle: newVehicle,
      ownerName: newOwner,
      date: new Date().toLocaleDateString('pt-BR'),
      services: servicesList.length > 0 ? servicesList : ['Troca de Pneus / Alinhamento Geral'],
      total: Number(newTotal) || 350.00,
      status: 'Concluído',
      km: Number(newKm) || 45000
    };

    const updated = [newRecord, ...records];
    setRecords(updated);
    localStorage.setItem('carplus_services', JSON.stringify(updated));

    // Reset
    setNewPlate('');
    setNewVehicle('');
    setNewOwner('');
    setNewKm('');
    setNewServices('');
    setNewTotal('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    localStorage.setItem('carplus_services', JSON.stringify(updated));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-150 p-5 sm:p-6 shadow-md text-gray-800" id="service-history-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1c20] tracking-tight">
            Histórico Digital de Serviços
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-justify">
            Consulte serviços realizados ou agendados na Carplus Pneus informando a placa ou o modelo do veículo.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition ml-auto sm:ml-0 shadow-sm"
          id="toggle-add-service-btn"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>{showAddForm ? 'Fechar Cadastro' : 'Cadastrar Serviço'}</span>
        </button>
      </div>

      {/* Registration Form */}
      {showAddForm && (
        <form onSubmit={handleAddService} className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 mb-6 space-y-3" id="add-service-form">
          <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-yellow-500" />
            Cadastrar Novo Serviço para consulta local
          </h4>
          <p className="text-[11px] text-gray-400">
            Adicione uma simulação de troca ou manutenção para verificar como funciona o histórico persistido.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Placa *</label>
              <input
                type="text"
                required
                placeholder="Ex: ABC-1234"
                value={newPlate}
                onChange={(e) => setNewPlate(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white focus:ring-yellow-500 uppercase"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Veículo *</label>
              <input
                type="text"
                required
                placeholder="Ex: Fiat Argo 1.3"
                value={newVehicle}
                onChange={(e) => setNewVehicle(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Cliente *</label>
              <input
                type="text"
                required
                placeholder="Ex: Carlos Batista"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Quilometragem (KM)</label>
              <input
                type="number"
                placeholder="Ex: 56000"
                value={newKm}
                onChange={(e) => setNewKm(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Valor Total (R$)</label>
              <input
                type="number"
                placeholder="Ex: 680"
                value={newTotal}
                onChange={(e) => setNewTotal(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Serviços realizados (Separados por vírgula)</label>
            <input
              type="text"
              placeholder="Ex: Troca de pneu, Alinhamento, Limpeza de bicos"
              value={newServices}
              onChange={(e) => setNewServices(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1a1c20] hover:bg-black text-white font-bold py-2 px-4 rounded-lg text-xs tracking-wide uppercase transition"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.9)' }}
            id="save-service-btn"
          >
            Salvar Registro no Histórico do Navegador
          </button>
        </form>
      )}

      {/* Search Input */}
      <div className="relative mb-5" id="service-search-box">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="w-4 h-4 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Digite a placa do carro ou modelo para filtrar de imediato (Ex: AAA-1234)..."
          value={searchPlate}
          onChange={(e) => setSearchPlate(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-xl pl-9 pr-4 py-3 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition"
          id="search-history-input"
        />
      </div>

      {/* List matches */}
      {filteredRecords.length > 0 ? (
        <div className="space-y-4" id="service-records-list">
          {filteredRecords.map((r) => (
            <div 
              key={r.id} 
              className="border border-gray-100 rounded-xl p-4 hover:border-gray-300 transition duration-300 bg-white shadow-sm flex flex-col sm:flex-row justify-between gap-4"
              id={`service-record-${r.id}`}
            >
              <div className="flex-1">
                {/* Header detail */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-[#1a1c20] text-yellow-500 font-mono font-bold text-xs uppercase px-2 py-0.5 rounded leading-tight tracking-wider">
                    {r.plate}
                  </span>
                  <span className="font-semibold text-sm text-gray-900">{r.vehicle}</span>
                  <span className="text-gray-300 text-xs">•</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {r.date}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  <strong>Responsável:</strong> {r.ownerName} {r.km > 0 && `| KM: ${r.km.toLocaleString()}`}
                </div>

                {/* Services Pills */}
                <div className="space-y-1.5" id={`services-list-${r.id}`}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Procedimentos Efetuados:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {r.services.map((srv, i) => (
                      <span 
                        key={i}
                        className="bg-yellow-500/10 border border-yellow-500/25 text-yellow-600 text-[11px] px-2.5 py-1 rounded font-semibold font-sans"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status and Total */}
              <div className="flex sm:flex-col justify-between items-end text-right shrink-0 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                <div>
                  <span className={`inline-block text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                    r.status === 'Concluído' 
                      ? 'bg-yellow-500 text-gray-950 border border-black' 
                      : r.status === 'Agendado'
                      ? 'bg-gray-900 text-white border border-gray-700'
                      : 'bg-white text-gray-950 border border-gray-300'
                  }`}>
                    {r.status}
                  </span>
                  <div className="text-xl font-black text-gray-900 mt-1 font-mono">
                    R$ {r.total.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      const text = `Olá! Gostaria de consultar ou remarcar o serviço ID ${r.id} referente ao carro ${r.vehicle} (Placa ${r.plate}) na loja de Curitiba.`;
                      window.open(`https://api.whatsapp.com/send?phone=554130827282&text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="text-xs text-yellow-600 font-extrabold hover:underline"
                    id={`query-whatsapp-srv-${r.id}`}
                  >
                    Suporte WhatsApp
                  </button>

                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1 hover:text-yellow-600 text-gray-400 transition"
                    title="Remover do histórico local"
                    id={`delete-srv-${r.id}`}
                  >
                    <Trash2 className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500 font-medium">Nenhum veículo localizado com esses dados.</p>
          <p className="text-xs text-gray-400 mt-1">
            Cadastre seu veículo no botão acima para construir seu histórico de simulação.
          </p>
        </div>
      )}
    </div>
  );
}
