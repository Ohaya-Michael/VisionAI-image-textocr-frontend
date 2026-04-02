import React from 'react';
import { Globe, Brain, LogOut, Link as LinkIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Settings() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">OCR Preferences</h1>
        <p className="text-slate-500 dark:text-slate-400">Configure how VisionAI processes your documents and images.</p>
      </div>

      <div className="space-y-8">
        <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="size-5 text-primary" />
            <h2 className="text-lg font-bold">Language Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Primary Language</label>
              <select className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary py-2.5 text-sm">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Secondary Language (Auto-Detect)</label>
              <select className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary py-2.5 text-sm">
                <option>None</option>
                <option>Spanish</option>
                <option>Japanese</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="size-5 text-primary" />
            <h2 className="text-lg font-bold">Extraction Settings</h2>
          </div>
          <div className="space-y-6">
            {[
              { title: 'Handwriting Recognition', desc: 'Enable AI models for handwritten text processing' },
              { title: 'Table Structure Extraction', desc: 'Preserve grid layouts and cell hierarchies' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
            <div className="space-y-3 pt-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold">Confidence Threshold</label>
                <span className="text-sm text-primary font-bold">85%</span>
              </div>
              <input type="range" className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" defaultValue="85" />
              <p className="text-xs text-slate-500">Results below this percentage will be flagged for manual review.</p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <LogOut className="size-5 text-primary" />
            <h2 className="text-lg font-bold">Output Preferences</h2>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col gap-2 max-w-md">
              <label className="text-sm font-semibold">Default Export Format</label>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-primary text-white text-sm font-bold">JSON</button>
                <button className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium transition-colors">XML</button>
                <button className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium transition-colors">CSV</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Include Metadata</p>
                <p className="text-sm text-slate-500">Export file size, source, and timestamps</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 pb-12">
          <button className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors order-2 sm:order-1">Reset to Default</button>
          <button className="w-full sm:w-auto px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all order-1 sm:order-2">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function Psychology(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 0 0-10 10c0 2.5 1 4.8 2.6 6.4L2 22l3.6-2.6C7.2 21 9.5 22 12 22a10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
