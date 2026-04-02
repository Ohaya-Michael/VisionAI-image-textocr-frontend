import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CloudUpload, 
  Zap, 
  Image as ImageIcon, 
  CheckCircle2, 
  Loader2,
  BarChart
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ClassificationResult {
  className: string;
  probability: number;
}

const mockResults: ClassificationResult[] = [
  { className: 'Golden Retriever', probability: 0.92 },
  { className: 'Labrador Retriever', probability: 0.05 },
  { className: 'Chesapeake Bay Retriever', probability: 0.02 },
  { className: 'Flat-Coated Retriever', probability: 0.005 },
  { className: 'English Setter', probability: 0.005 },
];

export default function ImageClassification() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [results, setResults] = useState<ClassificationResult[] | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResults(null);
        setProgress(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const startClassification = () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    setProgress(0);
    setResults(null);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setResults(mockResults);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <section className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">Image Classification</h1>
          <p className="text-slate-500 dark:text-slate-400">Upload an image to identify its primary objects and categories using VisionAI's deep learning models.</p>
        </div>

        <div className="relative group">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={cn(
            "flex flex-col items-center gap-6 rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-all duration-200",
            selectedImage 
              ? "border-primary/50 bg-primary/5" 
              : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-primary/50"
          )}>
            {selectedImage ? (
              <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-bold">Change Image</p>
                </div>
              </div>
            ) : (
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <CloudUpload className="size-8" />
              </div>
            )}
            <div className="space-y-1">
              <p className="text-lg font-bold tracking-tight">
                {selectedImage ? 'Image selected' : 'Drag and drop your image here'}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Supported formats: PNG, JPG, WEBP (Max 10MB)</p>
            </div>
            {!selectedImage && (
              <button className="flex items-center justify-center rounded-xl h-11 px-6 bg-slate-200 dark:bg-slate-800 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                Select Image
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={startClassification}
            disabled={isProcessing || !selectedImage}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-primary text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {isProcessing ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Zap className="size-4 fill-white" />
            )}
            Classify Image
          </button>
        </div>
      </section>

      <AnimatePresence>
        {isProcessing && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Loader2 className="size-5 text-primary animate-spin" />
                Analyzing Pixels
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border text-primary bg-primary/10 border-primary/20 animate-pulse">
                Running Inference...
              </span>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Neural Network Progress</p>
                <p className="text-sm font-black text-primary">{progress}%</p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary transition-all duration-300"
                />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {results && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ImageIcon className="size-5 text-primary" />
                Analyzed Image
              </h3>
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl aspect-square bg-slate-100 dark:bg-slate-900">
                <img 
                  src={selectedImage!} 
                  alt="Analyzed" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <BarChart className="size-5 text-primary" />
                Top Classifications
              </h3>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
                {results.map((result, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2">
                        {i === 0 && <CheckCircle2 className="size-4 text-emerald-500" />}
                        <p className={cn(
                          "text-sm font-bold",
                          i === 0 ? "text-slate-900 dark:text-white" : "text-slate-500"
                        )}>
                          {result.className}
                        </p>
                      </div>
                      <p className="text-xs font-black text-primary">
                        {(result.probability * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.probability * 100}%` }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className={cn(
                          "h-full rounded-full",
                          i === 0 ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-600 dark:text-emerald-400 leading-relaxed">
                  VisionAI is highly confident that this image contains a <strong>{results[0].className}</strong>. The analysis was completed using the latest ResNet-101 architecture.
                </p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
