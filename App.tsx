import React, { useState } from 'react';
import { 
  User, MapPin, Calendar, Smartphone, Mail, Cpu, Award, 
  Wrench, CheckCircle2, AlertTriangle, Thermometer, ImageIcon, Shield, ExternalLink, Download, QrCode, X, Copy, Check
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { Section } from './components/ui/Section';
import { WarrantyCard } from './components/WarrantyCard';
import { ThermalChart } from './components/ThermalChart';
import { Lightbox } from './components/ui/Lightbox';
import { ReminderStatus } from './components/ReminderStatus';
import { ServiceData, Provider, Client, DeviceInfo, ComponentStatus, ThermalSpecs } from './types';

// --- Hardcoded Data based on User Request ---
const SERVICE_DATE = new Date('2025-11-28T11:00:00');
const WARRANTY_MONTHS = 10;

const serviceInfo: ServiceData = {
  id: "SRV-2025-11-28-001",
  date: "28 de Novembro de 2025",
  location: "Lisboa, Portugal",
  time: "11:00"
};

const provider: Provider = {
  name: "Luiz Danrley Santos Silva",
  email: "luizdanrley47@gmail.com",
  whatsapp: "(+351) 924 789 391",
  roles: ["Engenheiro de Computação", "Técnico em Automação", "Técnico em Eletrônica"],
  // Using thumbnail endpoint which is more robust for direct embedding
  avatarUrl: "https://drive.google.com/thumbnail?id=1OvXfKTvHNVSvlIvB0lIqf2PGZGTKUTjd&sz=w1000" 
};

const client: Client = {
  name: "José Paulo dos Santos",
  whatsapp: "+55 38 9212-0436"
};

const device: DeviceInfo = {
  brand: "Playstation",
  model: "PS4 FAT",
  storage: "1TB",
  firmware: "9.00",
  mode: "Desbloqueada Gold Hen",
  drive: "BD-J LAPSE V1.2 AIO FIX",
  cables: "HDMI, Força, Controles",
  adapter: "Entregues em funcionamento"
};

const internalChecklist: ComponentStatus[] = [
  { name: "Placa Mãe", status: 'clean' },
  { name: "Processador", status: 'clean' },
  { name: "Fonte Interna", status: 'clean' },
  { name: "Carcaça", status: 'clean' },
  { name: "Cooler", status: 'clean' },
];

const thermalSpecs: ThermalSpecs = {
  name: "ZF-12 High Performance",
  conductivity: 12,
  resistance: 0.003,
  tempRange: "-160°C / +280°C"
};

// --- REAL IMAGES FROM GOOGLE DRIVE (Reliable Thumbnail Links) ---
const GALLERY_IMAGES = [
  "https://drive.google.com/thumbnail?id=1LwStppZsUb754upgaHA_Hf-n78fLzQIS&sz=w1000",
  "https://drive.google.com/thumbnail?id=1rNTV2hkZtjBt-AbbQ2liXhTgMJlTBBsN&sz=w1000",
  "https://drive.google.com/thumbnail?id=1zhO9pBVPnW_0BgkAh0GjUSfkobKVimmE&sz=w1000",
  "https://drive.google.com/thumbnail?id=19p5iv1puFT_jWrNOU6hcwFGmwVh_C-pH&sz=w1000",
  "https://drive.google.com/thumbnail?id=1qFPlUpZH_VNQNLhfSGVuchQUQlY-C5c7&sz=w1000",
  "https://drive.google.com/thumbnail?id=1KyQf4BQIK-mPHut6Y7T7xmuOjObDO74F&sz=w1000",
  "https://drive.google.com/thumbnail?id=1j3MNd7ZO3EF554Aw-scRk6YbTeSFqnMG&sz=w1000"
];

// --- REMINDER SYSTEM SETTINGS ---
const REMINDER_EMAILS = [
  "luizdanrley47@gmail.com",
  "paulosantos.1996@outlook.com"
];

const InfoRow: React.FC<{ label: string; value: string; mono?: boolean }> = ({ label, value, mono }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors px-2 rounded">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className={`text-sm text-slate-800 font-semibold text-right ${mono ? 'font-mono' : ''}`}>{value}</span>
  </div>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  if (status === 'clean') {
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle2 size={12}/> Limpo</span>;
  }
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
};

// Helper to clean phone number for WhatsApp link
const getWhatsAppUrl = (phone: string) => {
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}`;
};

const getCorsProxyUrl = (url: string) => `https://wsrv.nl/?url=${encodeURIComponent(url)}`;

// QR Code Modal Component
const QrModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const currentUrl = "https://ai.studio/apps/drive/1EZa-vTdmqg7pTmDyGBlgtom08nRLcpvd?fullscreenApplet=true";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <QrCode size={18} className="text-tech-600" />
            Acesso Mobile
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 flex flex-col items-center gap-6">
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
            <img src={qrUrl} alt="QR Code" className="w-48 h-48" />
          </div>
          
          <div className="text-center space-y-1">
            <p className="font-medium text-slate-800">Escaneie para abrir no celular</p>
            <p className="text-xs text-slate-500">Acesse o relatório completo instantaneamente.</p>
          </div>

          <div className="w-full relative">
            <input 
              type="text" 
              readOnly 
              value={currentUrl} 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-10 text-xs text-slate-600 font-mono truncate focus:outline-none focus:border-tech-400"
            />
            <button 
              onClick={handleCopy}
              className="absolute right-1 top-1 bottom-1 px-2 hover:bg-white rounded-md text-slate-400 hover:text-tech-600 transition-all"
              title="Copiar Link"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true, // Attempt to load cross-origin images
        logging: false,
        backgroundColor: '#f8fafc', // match bg-slate-50
        windowWidth: 1200 // Force desktop width layout
      });

      const link = document.createElement('a');
      link.download = `Relatorio-Tecnico-${serviceInfo.id}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
      alert("Não foi possível gerar a imagem completa. Algumas imagens podem estar bloqueadas pelo servidor.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate next 30-day reminder
  const today = new Date();
  const nextReminder = new Date();
  nextReminder.setDate(today.getDate() + 30);
  const nextReminderStr = nextReminder.toLocaleDateString('pt-BR');

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Lightbox Overlay */}
      <Lightbox 
        images={GALLERY_IMAGES} 
        isOpen={lightboxOpen} 
        initialIndex={currentImageIndex}
        onClose={() => setLightboxOpen(false)}
      />

      {/* QR Code Modal */}
      <QrModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-opacity-90">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="text-tech-600" />
              Relatório de Manutenção
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1 tracking-wide uppercase">ID: {serviceInfo.id}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
             <div className="flex flex-wrap gap-4 text-sm text-slate-600 justify-center">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-md">
                <Calendar size={16} className="text-tech-600" />
                <span>{serviceInfo.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-md">
                <MapPin size={16} className="text-tech-600" />
                <span>{serviceInfo.location}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setQrOpen(true)}
                className="flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 w-10 h-9 rounded-lg transition-colors shadow-sm"
                title="Gerar QR Code"
              >
                <QrCode size={18} />
              </button>
              
              <button 
                onClick={handleDownloadImage}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-tech-600 hover:bg-tech-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                <span>{isGenerating ? 'Gerando...' : 'Baixar Relatório (IMG)'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="report-content" className="max-w-5xl mx-auto px-4 py-8 space-y-6 bg-slate-50">
        
        {/* Top Grid: Provider & Client */}
        <div className="grid md:grid-cols-2 gap-6">
          <Section title="Técnico Responsável" icon={<User size={20} />}>
            <div className="flex items-start gap-5">
              <img 
                src={provider.avatarUrl} 
                alt="Tech" 
                className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
              />
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-lg">{provider.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {provider.roles.map(role => (
                    <span key={role} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium uppercase tracking-wide border border-slate-200">{role}</span>
                  ))}
                </div>
                <div className="pt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail size={14} className="text-tech-500" />
                    <a href={`mailto:${provider.email}`} className="hover:text-tech-600 transition-colors font-medium">{provider.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Smartphone size={14} className="text-tech-500" />
                    <a 
                      href={getWhatsAppUrl(provider.whatsapp)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-tech-600 underline decoration-tech-300 underline-offset-2 hover:text-tech-700 transition-colors font-medium flex items-center gap-1"
                    >
                      {provider.whatsapp}
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Informações do Cliente" icon={<User size={20} />}>
            <div className="flex items-start gap-5">
              {/* Avatar Placeholder matching Tech size */}
              <div className="w-24 h-24 rounded-2xl bg-tech-50 border-2 border-slate-100 flex items-center justify-center text-tech-600 font-bold text-3xl shadow-sm shrink-0">
                {client.name.charAt(0)}
              </div>
              
              <div className="space-y-1.5 w-full">
                <h3 className="font-bold text-slate-900 text-lg">{client.name}</h3>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium uppercase tracking-wide border border-slate-200">Proprietário</span>
                </div>
                
                <div className="pt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Smartphone size={14} className="text-tech-500" />
                    <a 
                      href={getWhatsAppUrl(client.whatsapp)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-tech-600 underline decoration-tech-300 underline-offset-2 hover:text-tech-700 transition-colors font-medium flex items-center gap-1"
                    >
                      {client.whatsapp}
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Device & Technical Details */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Section title="Especificações do Console" icon={<Cpu size={20} />} className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-1">
              <InfoRow label="Marca" value={device.brand} />
              <InfoRow label="Modelo" value={device.model} mono />
              <InfoRow label="Armazenamento" value={device.storage} />
              <InfoRow label="Firmware" value={device.firmware} mono />
              <InfoRow label="Modo" value={device.mode} />
              <InfoRow label="Drive" value={device.drive} mono />
            </div>
            <div className="mt-5 pt-5 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                <Wrench size={12} /> Acessórios Entregues
              </h4>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-700 flex flex-wrap gap-2">
                 {device.cables.split(',').map((item, i) => (
                    <span key={i} className="bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">{item.trim()}</span>
                 ))}
                 <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100 shadow-sm">{device.adapter}</span>
              </div>
            </div>
          </Section>

          <Section title="Estado dos Componentes" icon={<AlertTriangle size={20} />}>
            <div className="space-y-6 pt-2">
              <div className="space-y-2">
                 <div className="flex justify-between items-center text-sm">
                   <span className="font-medium text-slate-700">Integridade dos Parafusos</span>
                   <span className="text-xs font-bold text-slate-400">80%</span>
                 </div>
                 <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div className="grid gap-3">
                <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">Placa Mãe</span>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  </div>
                  <p className="text-xs text-emerald-700">Sem corrosão detectada</p>
                </div>
                
                <div className="p-3 bg-tech-50/50 rounded-lg border border-tech-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">Carcaça</span>
                    <CheckCircle2 size={16} className="text-tech-500" />
                  </div>
                  <p className="text-xs text-tech-700">Acabamento Black Piano OK</p>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Cleaning & Maintenance */}
        <div className="grid md:grid-cols-2 gap-6">
          <Section title="Checklist de Limpeza" icon={<Wrench size={20} />}>
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {['Álcool Isopropyl', 'Pincel Antiestático', 'Mini Aspirador'].map(item => (
                  <span key={item} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-200">
                    {item}
                  </span>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-50 shadow-sm overflow-hidden">
                {internalChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors">
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 bg-slate-50/50">
                   <span className="text-sm font-medium text-slate-700">Thermal Pads</span>
                   <span className="inline-flex items-center gap-1 text-xs font-bold text-tech-600">
                     <CheckCircle2 size={12} /> CONFERIDOS
                   </span>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Substituição Térmica" icon={<Thermometer size={20} />}>
             <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-slate-50 to-white p-4 rounded-xl border border-slate-100">
                <div>
                   <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                     {thermalSpecs.name}
                     <span className="text-[10px] bg-tech-100 text-tech-700 px-1.5 py-0.5 rounded border border-tech-200 uppercase">Pro</span>
                   </h3>
                   <p className="text-xs text-slate-500">Composto de Alta Performance</p>
                </div>
                <div className="text-right">
                  <span className="block text-3xl font-mono font-bold text-tech-600 tracking-tighter">{thermalSpecs.conductivity}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">W/mK</span>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Resistência</span>
                  <span className="font-mono font-semibold text-slate-700">{thermalSpecs.resistance} K/W</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Temp. Operação</span>
                  <span className="font-mono font-semibold text-slate-700">{thermalSpecs.tempRange}</span>
                </div>
             </div>
             
             <ThermalChart conductivity={thermalSpecs.conductivity} />
          </Section>
        </div>

        {/* Gallery */}
        <Section title="Registro Fotográfico" icon={<ImageIcon size={20} />}>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
             {GALLERY_IMAGES.map((src, index) => (
               <div 
                  key={index} 
                  className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-sm cursor-pointer border border-slate-200 hover:border-tech-400 transition-all hover:shadow-lg hover:-translate-y-1"
                  onClick={() => openLightbox(index)}
               >
                 <img 
                   src={src} 
                   alt={`Serviço ${index + 1}`} 
                   className="w-full h-full object-cover"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="text-white flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <div className="bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/30">
                        <ImageIcon size={24} />
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wider">Ampliar</span>
                    </div>
                 </div>
               </div>
             ))}
           </div>
           <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-2">
             <ImageIcon size={14} className="text-tech-500" /> 
             <span>Galeria de alta resolução. Clique para zoom e detalhes.</span>
           </p>
        </Section>

        {/* Warranty Section */}
        <section className="mt-12 space-y-6">
           <div className="flex items-center gap-3 px-2 mb-4">
             <div className="p-2 bg-tech-100 rounded-lg text-tech-600">
               <Shield size={24}/>
             </div>
             <div>
               <h2 className="text-xl font-bold text-slate-900">Garantia & Monitoramento</h2>
               <p className="text-sm text-slate-500">Acompanhamento em tempo real do status do serviço</p>
             </div>
           </div>
           
           <WarrantyCard serviceDate={SERVICE_DATE} durationMonths={WARRANTY_MONTHS} />
           
           <ReminderStatus 
             emails={REMINDER_EMAILS} 
             nextDate={nextReminderStr} 
             serviceId={serviceInfo.id}
             serviceDate={SERVICE_DATE}
             warrantyMonths={WARRANTY_MONTHS}
           />
           
           <div className="text-center mt-12 pb-8 border-t border-slate-200 pt-8">
             <p className="text-xs text-slate-400">
               Documento digital gerado em {new Date().toLocaleDateString('pt-BR')}. Válido como comprovante técnico.
             </p>
             <p className="text-[10px] text-slate-300 mt-2 uppercase tracking-widest font-mono">
               TechMaintain System Secure Report
             </p>
           </div>
        </section>

      </main>
    </div>
  );
};

export default App;