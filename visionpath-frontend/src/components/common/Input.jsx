import React from 'react';

export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          className={`w-full rounded-xl border bg-white dark:bg-[#111814] text-slate-900 dark:text-[#F3F4F6] placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm py-2.5 transition-all outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            Icon ? 'pl-10 pr-3.5' : 'px-3.5'
          } ${
            error
              ? 'border-rose-500 focus:ring-rose-500'
              : 'border-slate-200 dark:border-[#1F3327]'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] font-semibold text-rose-500">{error}</p>}
    </div>
  );
};

export default Input;
