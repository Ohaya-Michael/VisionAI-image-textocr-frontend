import React from 'react';
import { motion } from 'motion/react';
import { 
  Key, 
  Plus, 
  Copy, 
  MoreVertical, 
  FileText, 
  ChevronRight,
  BarChart3,
  Calendar,
  Users
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { APIKey } from '@/src/types';

const mockKeys: APIKey[] = [
  { id: '1', name: 'Production Main Key', key: '••••••••••••••••34fa', createdDate: 'Oct 24, 2023', status: 'active' },
  { id: '2', name: 'Testing Sandbox', key: '••••••••••••••••881a', createdDate: 'Nov 12, 2023', status: 'active' },
  { id: '3', name: 'Staging Environment', key: '••••••••••••••••92bc', createdDate: 'Dec 01, 2023', status: 'revoked' },
];

export default function APIManagement() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">API Management</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your credentials and monitor service integration.</p>
        </div>
        <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
          <Plus className="size-4" />
          Generate New Key
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:col-span-2 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-bold flex items-center gap-2">
              <BarChart3 className="size-5 text-primary" />
              Usage Statistics
            </h3>
            <span className="self-start sm:self-auto text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">Current Month</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-black">42,892</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">API Requests Made</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400">Limit: 50,000</p>
              </div>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[85%]"></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="size-3" />
              <span>85% of your monthly quota used. Next reset in 12 days.</span>
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-2xl p-6 text-white flex flex-col justify-between shadow-xl shadow-primary/20">
          <div>
            <h3 className="font-bold flex items-center gap-2 mb-2">
              <FileText className="size-5" />
              Quick Documentation
            </h3>
            <p className="text-sm text-primary-100/80 mb-6 leading-relaxed">Jump straight to integration guides and SDK references.</p>
          </div>
          <ul className="space-y-3">
            {['Authentication Guide', 'OCR API Reference', 'Webhooks Integration'].map((item, i) => (
              <li key={i}>
                <a href="#" className="flex items-center justify-between text-sm font-medium group hover:translate-x-1 transition-transform">
                  {item}
                  <ChevronRight className="size-4 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-lg">Your API Keys</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Key</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Created Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {mockKeys.map((key) => (
                <tr key={key.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold">{key.name}</td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      {key.key}
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <Copy className="size-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{key.createdDate}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      key.status === 'active' 
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                        : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                    )}>
                      <span className={cn("size-1.5 rounded-full", key.status === 'active' ? "bg-emerald-500" : "bg-slate-500")}></span>
                      {key.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
