import React, {useState} from 'react';
import { motion } from 'motion/react';
import { 
  CloudUpload, 
  Bolt, 
  ListChecks, 
  DownloadCloud, 
  CheckCircle2, 
  Clock, 
  Loader2,
  Database,
  FolderOpen,
  ChevronDown,
  Copy,
  Download,
  FileText
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ProcessingFile } from '@/src/types';

export default function BatchProcessing() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Überprüfung auf den MIME-Type oder die Dateiendung für ZIP
      const isZip = file.type === 'application/zip' || 
                    file.type === 'application/x-zip-compressed' || 
                    file.name.endsWith('.zip');

      if (!isZip) {
        alert('Please upload a valid .zip file');
        e.target.value = ''; // Input zurücksetzen
        return;
      }
 
      // Beispiel für Größenvalidierung (z.B. max 50MB)
      const maxSize = 50 * 1024 * 1024; 
      if (file.size > maxSize) {
        alert('File is too large. Max size is 50MB.');
        return;
      }

      console.log('Selected ZIP file:', file.name, `${(file.size / 1024 / 1024).toFixed(2)} MB`);
      setSelectedFile(file);
    }
  };


const mockFiles: ProcessingFile[] = [
  { id: '1', name: 'resume_john_doe_v2.pdf', size: '1.2 MB', progress: 100, status: 'completed' },
  { id: '2', name: 'invoice_45922_corp.png', size: '2.4 MB', progress: 45, status: 'processing' },
  { id: '3', name: 'tax_return_2023_draft.pdf', size: '4.1 MB', progress: 0, status: 'queued' },
];

return (
  <div className="max-w-5xl mx-auto space-y-10">
      <section className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">Batch Text Extraction</h1>
          <p className="text-slate-500 dark:text-slate-400">Upload multiple resumes, CVs, or invoices simultaneously for high-volume automated processing.</p>
        </div>

        <div className="relative group">
          <input 
            type="file" 
            // Akzeptiert .zip sowie die gängigen MIME-Types für ZIP-Archive
             accept=".zip,application/zip,application/x-zip-compressed" 
             onChange={handleFileUpload} // Ensure your handler name matches
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={cn(
            "flex flex-col items-center gap-6 rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-all duration-200",
            selectedFile // Renamed from selectedImage for clarity
              ? "border-primary/50 bg-primary/5" 
              : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-primary/50"
          )}>
            {selectedFile ? (
              <div className="flex flex-col items-center gap-3">
                <div className="size-20 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-lg border-2 border-primary/20">
                  {/* Changed icon to FileText for a document feel */}
                  <FileText className="size-10" />
                </div>
                <div className="max-w-[200px] truncate">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {selectedFile.name} {/* Assuming selectedFile is the File object */}
                  </p>
                </div>
              </div>
            ) : (
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <CloudUpload className="size-8" />
              </div>
            )}
            <div className="space-y-1">
              <p className="text-lg font-bold tracking-tight">
                {selectedFile ? 'Document selected' : 'Drag and drop your document here'}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Supported formats: ZIPPED PDF, DOCX, XLSX (Max 10MB)
              </p>
            </div>
            {!selectedFile && (
              <button className="flex items-center justify-center rounded-xl h-11 px-6 bg-slate-200 dark:bg-slate-800 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                Select File
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-primary text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            <Bolt className="size-4 fill-white" />
            Process Batch
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ListChecks className="size-5 text-primary" />
            Batch Processing Queue
          </h3>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-2 rounded-lg h-8 px-3 sm:px-4 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              <DownloadCloud className="size-3" />
              Download All (.zip)
            </button>
            <span className="text-[10px] font-bold text-slate-500 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              2 of 5 files remaining
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {mockFiles.map((file) => (
            <div 
              key={file.id}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200 flex items-center gap-4",
                file.status === 'processing' 
                  ? "bg-primary/5 border-primary/30 ring-1 ring-primary/10" 
                  : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800",
                file.status === 'queued' && "opacity-60"
              )}
            >
              <div className={cn(
                "size-10 rounded flex items-center justify-center",
                file.status === 'completed' && "bg-emerald-500/10 text-emerald-500",
                file.status === 'processing' && "bg-primary/10 text-primary",
                file.status === 'queued' && "bg-slate-200 dark:bg-slate-800 text-slate-500"
              )}>
                {file.status === 'completed' && <CheckCircle2 className="size-5" />}
                {file.status === 'processing' && <Loader2 className="size-5 animate-spin" />}
                {file.status === 'queued' && <Clock className="size-5" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{file.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-24 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${file.progress}%` }}
                      className={cn(
                        "h-full",
                        file.status === 'completed' ? "bg-emerald-500" : "bg-primary"
                      )}
                    />
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    file.status === 'completed' && "text-emerald-500",
                    file.status === 'processing' && "text-primary",
                    file.status === 'queued' && "text-slate-500"
                  )}>
                    {file.status === 'completed' ? 'Completed' : `${file.status} (${file.progress}%)`}
                  </span>
                </div>
              </div>

              {file.status === 'completed' && (
                <button className="text-primary text-xs font-bold hover:underline">
                  View Results
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Database className="size-5 text-primary" />
            Result Preview: <span className="ml-1 text-slate-500 dark:text-slate-400 font-normal truncate max-w-[200px] sm:max-w-none">resume_john_doe_v2.pdf</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary/20 transition-colors">
              <FolderOpen className="size-3" />
              Switch File
              <ChevronDown className="size-3" />
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-slate-200 dark:bg-slate-800 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              <Copy className="size-3" />
              Copy JSON
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-slate-200 dark:bg-slate-800 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              <Download className="size-3" />
              Download File
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 overflow-hidden">
          <pre className="custom-scrollbar overflow-auto max-h-[400px] text-emerald-400 font-mono text-sm leading-relaxed">
{`{
  "document_type": "Curriculum Vitae",
  "confidence_score": 0.985,
  "extracted_data": {
    "personal_info": {
      "full_name": "John R. Doe",
      "email": "j.doe@example.com",
      "phone": "+1 (555) 123-4567",
      "location": "San Francisco, CA"
    },
    "summary": "Senior Software Engineer with 8+ years of experience in distributed systems and cloud architecture...",
    "skills": [
      "Python", "React", "Node.js", "AWS", "Kubernetes"
    ],
    "experience": [
      {
        "company": "TechSphere Inc.",
        "role": "Lead Developer",
        "duration": "2019 - Present"
      }
    ]
  }
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}
