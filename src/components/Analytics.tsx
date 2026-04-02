import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Activity, CheckCircle2, Timer, CloudUpload, Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const data = [
  { name: 'Oct 01', requests: 4000 },
  { name: 'Oct 07', requests: 3000 },
  { name: 'Oct 14', requests: 2000 },
  { name: 'Oct 21', requests: 2780 },
  { name: 'Oct 30', requests: 1890 },
];

const pieData = [
  { name: '200 OK', value: 98.2, color: '#1152d4' },
  { name: '400 Bad Request', value: 1.4, color: '#f59e0b' },
  { name: '500 Server Error', value: 0.4, color: '#ef4444' },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black tracking-tight">Real-time Analytics</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Monitoring API traffic and health across all regions</p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar">
          {['24h', '7d', '30d', 'Custom'].map((t) => (
            <button 
              key={t}
              className={cn(
                "px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold rounded-md transition-all whitespace-nowrap",
                t === '30d' ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Requests', val: '1,248,902', change: '+12.5%', icon: Activity, color: 'primary' },
          { label: 'Success Rate', val: '99.98%', change: 'Stable', icon: CheckCircle2, color: 'emerald' },
          { label: 'Avg. Latency', val: '42ms', change: '+4ms', icon: Timer, color: 'amber' },
          { label: 'Data Processed', val: '850.4GB', change: '+8.2%', icon: CloudUpload, color: 'purple' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg", `bg-${kpi.color}-500/10`)}>
                <kpi.icon className={cn("size-5", `text-${kpi.color}-500`)} />
              </div>
              <span className={cn(
                "text-[10px] font-bold flex items-center px-2 py-0.5 rounded-full",
                kpi.change.startsWith('+') ? "text-emerald-500 bg-emerald-500/10" : "text-slate-400 bg-slate-400/10"
              )}>
                {kpi.change}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">{kpi.label}</p>
            <p className="text-3xl font-black mt-1">{kpi.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h4 className="font-bold text-base mb-8">API Request Volume</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1152d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1152d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#1152d4" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h4 className="font-bold text-base mb-6">Status Code Distribution</h4>
          <div className="h-[200px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-black">99.9%</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Uptime</p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
