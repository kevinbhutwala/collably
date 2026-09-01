"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useUIStore } from "@/stores/ui.store";
import { Mail, Building2, Send } from "lucide-react";

export default function ContactPage() {
  const { addToast } = useUIStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "Brand Campaign Management",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addToast({
        type: "success",
        title: "Inquiry Received",
        message: "Our talent and brand partnership directors will reach out within 4 hours.",
      });
      setIsSubmitting(false);
      setFormData({ name: "", email: "", company: "", interest: "Brand Campaign Management", message: "" });
    }, 400);
  };

  return (
    <div className="py-16 sm:py-24 bg-[#0a070a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] text-xs font-semibold font-mono">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Let&apos;s build an iconic campaign together.
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-sans">
              Whether you are a brand looking to launch a managed creator cohort or a talent agency seeking enterprise roster integration, our executive team is ready.
            </p>

            <div className="space-y-4 pt-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[hsl(327,100%,55%)]">
                  <Mail className="w-4 h-4" />
                </div>
                <span>partnerships@collably.io</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <span>San Francisco, CA • New York, NY • London, UK</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-6 text-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Sarah Lin"
                  required
                />
                <Input
                  label="Work Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@linear.app"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Company / Brand Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Linear Dynamics"
                  required
                />
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-slate-200">Primary Goal</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[hsl(327,100%,50%)]/50 shadow-xs"
                  >
                    <option value="Brand Campaign Management" className="bg-[#120c16] text-white">Brand Campaign Management</option>
                    <option value="Creator Talent Representation" className="bg-[#120c16] text-white">Creator Talent Representation</option>
                    <option value="Enterprise Retainer Consultation" className="bg-[#120c16] text-white">Enterprise Retainer Consultation</option>
                    <option value="Press & Inquiries" className="bg-[#120c16] text-white">Press &amp; Inquiries</option>
                  </select>
                </div>
              </div>

              <Textarea
                label="How can we help?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your brand timeline, budget targets, or specific creator formats..."
                rows={4}
                required
              />

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full shadow-lg shadow-pink-500/25 rounded-full font-display font-bold"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Send Message to Strategy Team
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
