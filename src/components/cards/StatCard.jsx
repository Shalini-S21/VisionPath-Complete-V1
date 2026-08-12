import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isIncrease = true,
  icon: Icon,
  description,
}) => {
  return (
    <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h3>
        {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
      </div>

      {change && (
        <div className="flex items-center gap-1 text-[11px] font-bold">
          {isIncrease ? (
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {change}
            </span>
          ) : (
            <span className="text-rose-500 flex items-center">
              <ArrowDownRight className="w-3.5 h-3.5" />
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
