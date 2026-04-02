import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PlayCircle, Zap, Shield, Globe, Users } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Zap className="size-3 fill-primary" />
              Powered by Next-Gen Neural Networks
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              Classify the <span className="text-primary">World</span> Around You
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              Experience the future of computer vision. Our advanced AI identifies and categorizes images with unprecedented accuracy in milliseconds. Build smarter applications today.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary/25 hover:scale-105 transition-transform">
                Start Free Trial
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/5 px-8 py-4 text-base font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <PlayCircle className="size-5" />
                View Demo
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-background-dark bg-slate-800 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <span className="font-medium">Trusted by 2,000+ developers</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary to-cyan-400 opacity-20 blur-3xl"></div>
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-2xl">
              <div className="aspect-video w-full rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                <img 
                  src="https://picsum.photos/seed/vision/1200/800" 
                  alt="AI Visualization" 
                  className="size-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <div className="size-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-widest">Live Analysis</span>
                  </div>
                  <div className="px-2 py-1 rounded bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase">
                    99.8% Confidence
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-xl bg-white dark:bg-slate-800 p-4 shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Zap className="size-5 fill-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Processing Speed</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white">14ms / image</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-primary text-sm font-bold uppercase tracking-widest">Process</h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Three Simple Steps to Insight</h3>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">Our platform streamlines the entire classification process, making advanced AI accessible to everyone from hobbyists to enterprises.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Upload', 
              desc: 'Securely upload your images or connect your real-time data stream to our high-performance cloud API.',
              icon: Globe,
              step: '01'
            },
            { 
              title: 'Analyze', 
              desc: 'Our deep-learning models process every pixel to identify objects, scenes, and complex patterns instantly.',
              icon: Zap,
              step: '02'
            },
            { 
              title: 'Result', 
              desc: 'Receive detailed classification reports and rich metadata in JSON, CSV, or via Webhooks automatically.',
              icon: Shield,
              step: '03'
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 p-8 transition-all hover:border-primary/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <feature.icon className="size-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
              <div className="mt-auto pt-4 text-primary font-bold text-sm inline-flex items-center gap-1">
                Step {feature.step} <ArrowRight className="size-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative rounded-3xl bg-primary overflow-hidden p-8 lg:p-12 text-center text-white shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Ready to see the world differently?</h2>
          <p className="max-w-2xl mx-auto text-base lg:text-lg font-medium text-white/90">Join thousands of developers and businesses using VisionAI to power their intelligent workflows.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex-1 sm:flex-none rounded-xl bg-white px-8 py-4 text-base font-bold text-primary hover:bg-slate-100 transition-colors">
              Start Free Trial
            </button>
            <button className="flex-1 sm:flex-none rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white hover:bg-white/20 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
