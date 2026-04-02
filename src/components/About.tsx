import React from 'react';
import { motion } from 'motion/react';
import { Eye, Brain, Cpu, Globe, Mail, MessageSquare } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto space-y-24 pb-20">
      {/* Mission */}
      <section className="grid lg:grid-cols-2 gap-16 items-center pt-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Our Mission
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            Democratizing <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Computer Vision</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
            We are on a journey to make advanced image classification accessible to every industry, from global healthcare networks to local manufacturing plants.
          </p>
        </div>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-slate-200 dark:bg-slate-800 rounded-2xl aspect-video overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/tech/1200/800" 
              alt="Technology" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Our Technology Stack</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Built on the cutting edge of machine learning research and high-performance engineering.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { 
              title: 'Neural Networks', 
              icon: Brain,
              desc: 'Our proprietary deep learning models are optimized for both extreme precision and rapid inference speeds, allowing for classification accuracy that exceeds human capability.'
            },
            { 
              title: 'Edge Computing', 
              icon: Cpu,
              desc: 'Deploy complex models directly to low-power edge devices. Real-time processing without the latency or privacy concerns of constant cloud communication.'
            }
          ].map((tech, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <tech.icon className="size-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{tech.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Meet the Visionaries</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Our diverse team of scientists, engineers, and designers is dedicated to building the future of vision.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Dr. Sarah Chen', role: 'CEO & Co-Founder', desc: 'PhD in Computer Science, Stanford', seed: 'sarah' },
            { name: 'Marcus Vossen', role: 'CTO', desc: 'Former Lead Research at DeepMind', seed: 'marcus' },
            { name: 'Elena Rodriguez', role: 'VP of Engineering', desc: 'Expert in Edge Infrastructure', seed: 'elena' },
            { name: 'James Wilson', role: 'Head of Design', desc: 'Human-Centered AI Design Lead', seed: 'james' },
          ].map((member, i) => (
            <div key={i} className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-2xl aspect-square bg-slate-200 dark:bg-slate-800">
                <img 
                  src={`https://picsum.photos/seed/${member.seed}/400/400`} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-xl font-bold">{member.name}</h4>
              <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
              <p className="text-slate-500 text-sm">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
