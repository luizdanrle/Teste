import React, { useMemo, useState, useEffect, useRef } from 'react';
import { CalendarClock, MailCheck, Sparkles, Copy, Server, Activity, Send, Loader2, CheckCircle2 } from 'lucide-react';

interface ReminderStatusProps {
  emails: string[];
  nextDate: string;
  serviceId?: string;
  serviceDate?: Date;
  warrantyMonths?: number;
}

export const ReminderStatus: React.FC<ReminderStatusProps> = ({ 
  emails, 
  nextDate, 
  serviceId = "000", 
  serviceDate = new Date(),
  warrantyMonths = 10
}) => {
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [lastSentTime, setLastSentTime] = useState<string | null>(null);
  const isMounted = useRef(true);

  // Previne atualização de estado em componente desmontado (erro comum em React)
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Generate the "AI" message
  const generatedMessage = useMemo(() => {
    const expDate = new Date(serviceDate);
    expDate.setMonth(expDate.getMonth() + warrantyMonths);
    const dateStr = expDate.toLocaleDateString('pt-BR');
    
    return `Assunto: Aviso de Garantia - Serviço ID: ${serviceId}

Olá,

Este é um lembrete automático do sistema TechMaintain.

Informamos que a garantia do serviço realizado em seu console (ID: ${serviceId}) vencerá em ${dateStr}.

Situação atual: Garantia Ativa.
Por favor, verifique o estado do equipamento. Caso note qualquer anomalia, entre em contato conosco antes do vencimento.

Atenciosamente,
Equipe Técnica`;
  }, [serviceId, serviceDate, warrantyMonths]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    alert("Mensagem copiada para a área de transferência!");
  };

  const handleManualSend = () => {
    if (sentSuccess) return; 

    setIsSending(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (!isMounted.current) return;
      
      setIsSending(false);
      setSentSuccess(true);
      setLastSentTime(new Date().toLocaleTimeString('pt-BR'));
      
      const subject = `Aviso de Garantia - Serviço ID: ${serviceId}`;
      const body = generatedMessage;
      const cc = "luizdanrley47@gmail.com";
      
      // Criação de link invisível para abrir o e-mail (mais seguro que window.location)
      const mailtoLink = `mailto:${emails.join(',')}?cc=${cc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.click();
      
      alert(`O aplicativo de e-mail foi aberto.\n\n⚠️ IMPORTANTE:\nNão esqueça de ANEXAR a imagem do relatório baixada.`);
    }, 2000);
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl mt-8">
      {/* Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-tech-600/20 text-tech-400 rounded-lg">
            <Server size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Painel de Automação</h3>
            <p className="text-xs text-slate-500 font-mono">Service Daemon v2.4.1</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <Activity size={12} className="text-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-500 uppercase">Sistema Online</span>
        </div>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-8">
        
        {/* Left Column: Status */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <MailCheck size={14} /> Destinatários Configurados
            </h4>
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 divide-y divide-slate-700/50">
              {emails.map((email, index) => (
                <div key={index} className="px-4 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-tech-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]"></div>
                  <span className="text-sm text-slate-300 font-mono truncate">{email}</span>
                </div>
              ))}
              <div className="px-4 py-3 flex items-center gap-3 bg-slate-900/50">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm text-purple-300 font-mono truncate">CC: luizdanrley47@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold mb-1">Próxima Verificação</p>
              <p className="text-lg font-mono text-white font-bold flex items-center gap-2">
                <CalendarClock size={18} className="text-tech-500" />
                {nextDate}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Intervalo</p>
              <p className="text-sm text-slate-300 font-medium">30 Dias</p>
            </div>
          </div>
        </div>

        {/* Right Column: Message Preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} className="text-purple-400" /> Prévia da Mensagem
            </h4>
            <button 
              onClick={copyToClipboard}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition-colors flex items-center gap-1 border border-slate-700"
            >
              <Copy size={12} /> Copiar
            </button>
          </div>
          
          <div className="bg-slate-950 rounded-lg border border-slate-800 p-4 relative group min-h-[180px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-tech-500 opacity-50"></div>
            <pre className="font-mono text-xs text-slate-400 whitespace-pre-wrap leading-relaxed">
              {generatedMessage}
            </pre>
          </div>
        </div>
      </div>

      {/* Footer / Action Bar */}
      <div className="bg-slate-950/50 border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {sentSuccess ? (
             <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-full">
               <CheckCircle2 size={20} />
             </div>
          ) : (
             <div className="p-2 bg-slate-800 text-slate-500 rounded-full">
               <MailCheck size={20} />
             </div>
          )}
          
          <div>
            <p className="text-sm font-bold text-slate-200">
              {sentSuccess ? 'Aplicativo Aberto' : 'Notificação Pendente'}
            </p>
            <p className="text-xs text-slate-500">
              {sentSuccess ? `Disparado às ${lastSentTime}` : 'Aguardando gatilho automático ou manual'}
            </p>
          </div>
        </div>

        <button 
          onClick={handleManualSend}
          disabled={isSending || sentSuccess}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all
            ${sentSuccess 
              ? 'bg-emerald-600/20 text-emerald-500 cursor-default border border-emerald-600/30' 
              : 'bg-tech-600 hover:bg-tech-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] border border-tech-500'
            }
            disabled:opacity-70 disabled:cursor-not-allowed
          `}
        >
          {isSending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Enviando...
            </>
          ) : sentSuccess ? (
            <>
              <CheckCircle2 size={16} />
              Enviado
            </>
          ) : (
            <>
              <Send size={16} />
              Enviar Email Agora
            </>
          )}
        </button>
      </div>
    </div>
  );
};