import { useState } from "react";
import { 
  Code, 
  Copy, 
  Download 
} from 'lucide-react';

export const JSONViewer = ({ data, type=true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  const handleType = () => {
    if (type === true) {return data}
    return JSON.stringify(data, null, 2);
    }

  return (
    <section className="flex flex-col gap-4 col-span-12 md:col-span-3 ">

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* <!-- H3 takes full width on mobile because of flex-col text center --> */}
        <h3 className="w-full text-lg font-bold flex items-center gap-2 md:mx-0 text-center">
          <Code className="w-5 h-5 text-emerald-400" />
          Result (Structured JSON)
        </h3>

        {/* <!-- Buttons container --> */}
        <div className="flex gap-2 w-full sm:w-auto justify-start sm:justify-end">
          <button className="flex items-center justify-center gap-2 rounded-xl font-bold transition-all active:scale-95 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 h-9 px-4 text-xs">
            <Copy className="w-4 h-4" />
            Copy JSON
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl font-bold transition-all active:scale-95 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 h-9 px-4 text-xs">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 overflow-hidden">
        <pre className="overflow-auto max-h-[400px] text-emerald-400 font-mono text-sm leading-relaxed custom-scrollbar">
          {handleType()}
        </pre>
      </div>
    </section>
  );
};