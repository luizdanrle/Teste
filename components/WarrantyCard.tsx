import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, Clock } from 'lucide-react';

interface WarrantyCardProps {
  serviceDate: Date;
  durationMonths: number;
}

type WarrantyStatus = 'active' | 'warning' | 'expired';

export const WarrantyCard: React.FC<WarrantyCardProps> = ({ serviceDate, durationMonths }) => {
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(300); // approx 10 months
  const [expirationDate, setExpirationDate] = useState<Date>(new Date());
  const [status, setStatus] = useState<WarrantyStatus>('active');
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const expDate = new Date(serviceDate);
    expDate.setMonth(expDate.getMonth() + durationMonths);
    setExpirationDate(expDate);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = expDate.getTime() - now.getTime();
      const totalDuration = expDate.getTime() - serviceDate.getTime();
      
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      const totalDaysCalc = Math.ceil(totalDuration / (1000 * 60 * 60 * 24));
      
      setDaysRemaining(days);
      setTotalDays(totalDaysCalc);

      // Calculate progress percentage
      const progressPercent = Math.max(0, Math.min(100, (difference / totalDuration) * 100));
      setProgress(progressPercent);

      if (days <= 0) {
        setStatus('expired');
      } else if (days <= 30) {
        setStatus('warning');
      } else {
        setStatus('active');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 86400000); // Update daily

    return () => clearInterval(timer);
  }, [serviceDate, durationMonths]);

  // Styles based on status
  const getStyles = () => {
    switch (status) {
      case 'expired':
        return {
          container: 'border-red-200 bg-red-50',
          iconBg: 'bg-red-100 text-red-600',
          text: 'text-red-700',
          count: 'text-red-500',
          progressColor: 'bg-red-500',
          icon: <AlertCircle size={28} />,
          title: 'Garantia Expirada'
        };
      case 'warning':
        return {
          container: 'border-amber-200 bg-amber-50',
          iconBg: 'bg-amber-100 text-amber-600',
          text: 'text-amber-700',
          count: 'text-amber-600',
          progressColor: 'bg-amber-500',
          icon: <AlertTriangle size={28} />,
          title: 'Garantia Perto do Vencimento'
        };
      default:
        return {
          container: 'border-emerald-100 bg-emerald-50/50',
          iconBg: 'bg-emerald-100 text-emerald-600',
          text: 'text-emerald-700',
          count: 'text-tech-600',
          progressColor: 'bg-tech-500',
          icon: <ShieldCheck size={28} />,
          title: 'Garantia Ativa'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`rounded-xl p-6 border ${styles.container} shadow-sm relative overflow-hidden transition-all`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className={`p-3 rounded-2xl ${styles.iconBg} shadow-sm`}>
            {styles.icon}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Status Oficial</h3>
            <p className={`text-2xl font-bold ${styles.text} tracking-tight`}>
              {styles.title}
            </p>
            {status === 'warning' && (
              <p className="text-xs text-amber-600 font-bold mt-1 bg-amber-100 px-2 py-0.5 rounded inline-block">
                Ação Necessária: Renove agora
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center w-full md:w-auto bg-white/60 p-4 rounded-xl border border-slate-100/50 backdrop-blur-sm">
          <div className="flex items-end gap-2">
             <span className={`text-5xl font-bold font-mono tracking-tighter leading-none ${styles.count}`}>
               {status === 'expired' ? 0 : daysRemaining}
             </span>
             <span className="text-xs font-bold uppercase text-slate-400 mb-1.5 pb-0.5">Dias<br/>Restantes</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="mt-8">
        <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
          <span>Início: {serviceDate.toLocaleDateString()}</span>
          <span>Vencimento: {expirationDate.toLocaleDateString()}</span>
        </div>
        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <div 
            className={`h-full ${styles.progressColor} transition-all duration-1000 ease-out relative`}
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};