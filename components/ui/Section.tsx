import React from 'react';

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, icon, children, className = "" }) => {
  return (
    <section className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-3 bg-slate-50/50">
        {icon && <span className="text-tech-600">{icon}</span>}
        <h2 className="text-lg font-semibold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </section>
  );
};