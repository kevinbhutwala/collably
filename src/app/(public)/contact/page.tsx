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
    <div className="py-16 sm:py-24 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-xs font-mono font-bold text-[#0A0A0E] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
              Let&apos;s build an iconic campaign together.
            </h1>
            <p className="text-base text-[#5A5A68] leading-relaxed font-sans font-medium">
              Whether you are a brand looking to launch a managed creator cohort or a talent agency seeking enterprise roster integration, our executive team is ready.
            </p>

            <div className="space-y-4 pt-4 text-xs font-mono text-[#6A6A78]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-black/8 flex items-center justify-center text-[#0A0A0E] shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[#0A0A0E] font-bold">partnerships@abeycollab.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-black/8 flex items-center justify-center text-[#0A0A0E] shadow-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <span>San Francisco, CA • New York, NY • London, UK</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6 text-[#0A0A0E]">
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
                <div className="space-y-1.5 text-left font-sans">
                  <label className="block text-xs font-semibold text-[#0A0A0E]">Primary Goal</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-[#F8F8FC] border border-black/10 rounded-xl px-3.5 py-2.5 text-xs text-[#0A0A0E] focus:outline-none focus:border-[#FFD21F] shadow-xs"
                  >
                    <option value="Brand Campaign Management">Brand Campaign Management</option>
                    <option value="Creator Talent Representation">Creator Talent Representation</option>
                    <option value="Enterprise Retainer Consultation">Enterprise Retainer Consultation</option>
                    <option value="Press & Inquiries">Press &amp; Inquiries</option>
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
                  className="w-full rounded-full"
                  rightIcon={<Send className="w-4 h-4 text-[#0A0A0E]" />}
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
