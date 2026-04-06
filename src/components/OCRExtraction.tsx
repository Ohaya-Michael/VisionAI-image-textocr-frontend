import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CloudUpload, 
  Bolt, 
  FileText, 
  Code, 
  Copy, 
  Download, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import api from "@/src/api/client";
import {JSONViewer} from './JSONViewer';
import { ProcessingPeriod } from '../ui/ProcessingPeriod';

export default function OCRExtraction() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileSize, setSelectedFileSize] = useState<string | null>(null);
  const [isResult, setIsResult] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const mockJson = `{
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
    ],
    "education": {
      "degree": "B.S. Computer Science",
      "university": "Stanford University"
    }
  },
  "metadata": {
    "processed_at": "2023-11-20T14:23:45Z",
    "engine_version": "v2.4-vision"
  }
}`;

  // Start processing the uploaded document
  const startProcessing = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setProgress(0);

    // build form data for multipart upload
    const formData = new FormData();
    formData.append('file', selectedFile);

    api.post('/api/convert_pdf/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => {
      const data = response.data;
      setIsResult(data);
      setIsProcessing(false);
      console.log('Check if processing is done:', isProcessing);
      console.log('Received response:', data);
    })
    .catch((err) => {
      console.error('upload error', err.response || err);
      setError(
        err.response?.data?.detail ||
        "Could not connect to the API. Is the backend running?"
      );
      setIsProcessing(false);
    });
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    console.log('Started processing document:', selectedFile);
  };


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // You can add file validation here (e.g., type, size)
      setSelectedFile(file);
      setSelectedFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
      setIsProcessing(true);
      setIsResult(null);
      setProgress(0);
      console.log('Selected file:', file);
      // For this mockup, we won't do anything with the file
    }
  };


const renderContent = () => {
  if (isResult) return <JSONViewer data={isResult} type={true} />;
  if (isResult && isProcessing===false) return <ProcessingPeriod />;
  if (isProcessing) return <ProcessingPeriod />;
  return <JSONViewer data={mockJson} type={false} />;
};

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <section className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">Extract Text from Documents</h1>
          <p className="text-slate-500 dark:text-slate-400">Upload resumes, CVs, or invoices to convert them into structured data using advanced VisionAI models.</p>
        </div>

        <div className="relative group">
          <input 
            type="file" 
            // Updated to accept PDF, Word, and Excel files
            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
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
                Supported formats: PDF, DOCX, XLSX (Max 10MB)
              </p>
            </div>
            {!selectedFile && (
              <button className="flex items-center justify-center rounded-xl h-11 px-6 bg-slate-200 dark:bg-slate-800 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                Select File
              </button>
            )}
            {selectedFile && (
              <button className="flex items-center justify-center rounded-xl h-11 px-6 bg-slate-200 dark:bg-slate-800 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                Change File
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          {selectedFile && (
            <button 
              onClick={startProcessing}
              disabled={!isProcessing}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-primary text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              <Bolt className="size-4 fill-white" />
              Process Document
            </button>
          ) }
          {/* {selectedFile && (
            <button 
              disabled={!isProcessing}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-slate-200 dark:bg-slate-800 text-slate-500 font-bold transition-opacity"
            >
              <Loader2 className="size-4 animate-spin" />
              Processing...
            </button>
          )} */}
        </div>
      </section>

      {isProcessing && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Bolt className="size-5 text-primary" />
              Extraction Progress
            </h3>
            <span className={cn(
              "self-start sm:self-auto text-[10px] font-bold px-2.5 py-1 rounded-full border",
              progress < 100 
                ? "text-primary bg-primary/10 border-primary/20 animate-pulse" 
                : "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
            )}>
              {progress < 100 ? 'Processing...' : 'Completed'}
            </span>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div className="size-10 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <FileText className="size-5 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{selectedFile.name}</p>
                <p className="text-xs text-slate-500">{selectedFileSize} • {progress < 100 ? 'Extracting entities...' : 'Analysis complete'}</p>
              </div>
              <div className="text-right self-end sm:self-auto">
                <p className={cn("text-sm font-black", progress < 100 ? "text-primary" : "text-emerald-500")}>
                  {progress}%
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className={cn("h-full transition-all duration-300", progress < 100 ? "bg-primary" : "bg-emerald-500")}
              />
            </div>
          </div>
        </motion.section>
      )}

      {progress === 100 && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Code className="size-5 text-primary" />
              Result (Structured JSON)
            </h3>
            <div className="flex flex-wrap gap-2">
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

          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 overflow-hidden relative">
            <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              JSON Output
            </div>
            <pre className="custom-scrollbar overflow-auto max-h-[400px] text-emerald-400 font-mono text-sm leading-relaxed">
              {mockJson.split('\n').map((line, i) => {
                // Simple syntax highlighting simulation
                const isKey = line.includes('":');
                if (isKey) {
                  const [key, val] = line.split('":');
                  return (
                    <div key={i}>
                      <span className="text-slate-400">{key}"</span>:
                      <span className="text-primary">{val}</span>
                    </div>
                  );
                }
                return <div key={i}>{line}</div>;
              })}
            </pre>
          </div> */}
          {progress === 100 && renderContent()}
        </motion.section>
      )}
    </div>
  );
}
