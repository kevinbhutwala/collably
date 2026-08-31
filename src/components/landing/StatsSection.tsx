import React from "react";
import { ShieldCheck, Zap, DollarSign, Clock } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      label: "Milestone Escrow Protection",
      value: "100%",
      subtext: "Funds released only on deliverable approval",
      icon: ShieldCheck,
      color: "text-brand-accent",
    },
    {
      label: "Invoice Chasing For Creators",
      value: "0 Days",
      subtext: "Guaranteed automatic payout upon approval",
      icon: Zap,
      color: "text-emerald-600",
    },
    {
      label: "Flat Platform Commission",
      value: "10%",
      subtext: "Transparent pricing with zero hidden markups",
      icon: DollarSign,
      color: "text-sky-600",
    },
    {
      label: "Dispute & Support SLA",
      value: "< 4 Hrs",
      subtext: "Dedicated human arbitration & review",
      icon: Clock,
      color: "text-amber-600",
    },
  ];

  return (
    <section className="py-20 border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 text-center space-y-3 flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto shadow-xs">
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                    {s.value}
                  </p>
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mt-1">
                    {s.label}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {s.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
