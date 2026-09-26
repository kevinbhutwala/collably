"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const talent = [
  { name: "Prarthana", tag: "Fashion / 30K", image: "/creators/prarthana.jpg", tone: "from-amber-200/10" },
  { name: "Vasudha Rai", tag: "Beauty / 115K", image: "/creators/vasudha-rai.jpg", tone: "from-rose-200/10" },
  { name: "Kunal Rajput", tag: "Fitness / 85K", image: "/creators/kunal-rajput.jpg", tone: "from-blue-200/10" },
];

const steps = [
  { number: "01", title: "Drop a brief", copy: "Describe the idea, audience and outcome. AbeyCollab turns it into a clear opportunity." },
  { number: "02", title: "Meet your match", copy: "Shortlist verified talent with the right voice, audience and creative instinct." },
  { number: "03", title: "Make it real", copy: "Review, approve and release every milestone from one calm, protected workspace." },
];

export function CollabSignalHome() {
  return (
    <div className="bg-[#101010] text-white overflow-hidden">
      <section className="relative min-h-[calc(100svh-4rem)] flex items-center px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="pointer-events-none absolute -left-40 top-20 size-[520px] rounded-full bg-[#f5c842]/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-0 size-[440px] rounded-full bg-[#e89b7a]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div className="max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              <span className="size-1.5 rounded-full bg-[#f5c842] shadow-[0_0_14px_#f5c842]" />
              The collaboration layer for culture
            </div>
            <h1 className="max-w-3xl text-[clamp(3.65rem,8vw,8.6rem)] font-black leading-[0.87] tracking-[-0.075em] text-white">
              Make the <span className="font-serif font-normal italic text-[#f5c842]">right</span> thing.
              <br />With the right people.
            </h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-white/60 sm:text-lg">
              AbeyCollab is where bold briefs find brilliant creators — and great work moves from first idea to paid, proven impact.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/brand/register" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#f5c842] px-6 py-3.5 text-sm font-bold text-[#101010] transition-transform hover:-translate-y-0.5">
                Start a collaboration <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" data-icon="inline-end" />
              </Link>
              <Link href="/creators" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/50 hover:text-white">
                Explore the network <ChevronRight data-icon="inline-end" />
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium text-white/45">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="text-[#f5c842]" data-icon="inline-start" /> Protected payments</span>
              <span className="inline-flex items-center gap-2"><Zap className="text-[#f5c842]" data-icon="inline-start" /> Payouts in 24 hours</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-[#f5c842]" data-icon="inline-start" /> Verified talent</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[680px] lg:mx-0">
            <div className="relative aspect-[0.94] overflow-hidden rounded-[2rem] border border-white/15 bg-[#1b1b1b] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.5)] sm:rounded-[2.5rem] sm:p-5">
              <div className="grid h-full grid-cols-2 grid-rows-[1.15fr_0.85fr] gap-3 sm:gap-4">
                <div className="relative row-span-2 overflow-hidden rounded-[1.4rem] bg-[#31291c]">
                  <Image src="/creators/vasudha-rai.jpg" alt="Creator Vasudha Rai" fill priority className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 1024px) 50vw, 34vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/5" />
                  <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">Beauty / Storytelling</p><p className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">Vasudha Rai</p></div>
                </div>
                <div className="relative overflow-hidden rounded-[1.4rem] bg-[#272322]">
                  <Image src="/creators/kunal-rajput.jpg" alt="Creator Kunal Rajput" fill className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 1024px) 50vw, 24vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><p className="absolute inset-x-4 bottom-4 text-sm font-bold sm:inset-x-5 sm:bottom-5 sm:text-base">Kunal / Fitness</p>
                </div>
                <div className="relative overflow-hidden rounded-[1.4rem] bg-[#403522]">
                  <Image src="/creators/prarthana.jpg" alt="Creator Prarthana" fill className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 1024px) 50vw, 24vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><p className="absolute inset-x-4 bottom-4 text-sm font-bold sm:inset-x-5 sm:bottom-5 sm:text-base">Prarthana / Fashion</p>
                </div>
              </div>
              <div className="absolute -left-3 top-10 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#181818]/90 p-3 shadow-2xl backdrop-blur-xl sm:-left-8 sm:top-16 sm:p-4">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#f5c842] text-[#101010]"><Sparkles /></div>
                <div><p className="text-[10px] uppercase tracking-widest text-white/40">Signal found</p><p className="text-xs font-bold sm:text-sm">A perfect creative fit</p></div>
              </div>
              <div className="absolute -bottom-3 right-5 rounded-2xl border border-white/15 bg-[#181818]/95 p-3 shadow-2xl backdrop-blur-xl sm:-bottom-5 sm:right-8 sm:p-4">
                <div className="flex items-center gap-3"><CircleDollarSign className="text-[#f5c842]" /><div><p className="text-[10px] uppercase tracking-widest text-white/40">Milestone paid</p><p className="text-sm font-bold">₹45,000 released</p></div></div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35"><span>01 — Find your signal</span><span>Scroll to explore ↓</span></div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4efe4] px-5 py-20 text-[#111] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-8 border-b border-black/15 pb-10 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">A better way to work together</p><h2 className="mt-4 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl">Less chasing.<br /><span className="font-serif font-normal italic text-[#a57917]">More making.</span></h2></div><p className="max-w-sm text-sm leading-6 text-black/55">From the first spark to the final post, AbeyCollab gives every collaboration the clarity, confidence and momentum it deserves.</p></div>
          <div className="mt-12 grid gap-0 md:grid-cols-3">{steps.map((step, index) => <div key={step.number} className={`py-8 md:px-8 md:py-4 ${index > 0 ? "border-t border-black/15 md:border-l md:border-t-0" : "md:pl-0"}`}><p className="font-mono text-xs text-[#a57917]">{step.number}</p><h3 className="mt-12 text-2xl font-bold tracking-tight">{step.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-black/55">{step.copy}</p></div>)}</div>
        </div>
      </section>

      <section className="bg-[#101010] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto grid max-w-[1440px] items-end gap-12 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5c842]">The network, in motion</p><h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl">Ideas look<br /><span className="font-serif font-normal italic text-white/60">better together.</span></h2><p className="mt-6 max-w-sm text-sm leading-6 text-white/50">Meet the people already turning audience, taste and ambition into meaningful brand stories.</p><Link href="/creators" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#f5c842]">View the full network <ArrowUpRight data-icon="inline-end" /></Link></div><div className="grid grid-cols-3 gap-2 sm:gap-4">{talent.map((person) => <Link href="/creators" key={person.name} className="group relative aspect-[0.72] overflow-hidden rounded-2xl bg-white/10"><Image src={person.image} alt={person.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 33vw, 25vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" /><div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5"><p className="text-xs font-bold sm:text-sm">{person.name}</p><p className="mt-1 text-[9px] uppercase tracking-widest text-white/50 sm:text-[10px]">{person.tag}</p></div></Link>)}</div></div></section>

      <section className="bg-[#f5c842] px-5 py-20 text-[#101010] sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-black/50">Your next collaboration starts here</p><h2 className="mt-4 max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl">Bring the<br />good idea.</h2></div><Link href="/brand/register" className="group inline-flex items-center gap-3 rounded-full bg-[#101010] px-7 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">Build your brief <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" data-icon="inline-end" /></Link></div></section>
    </div>
  );
}

export default CollabSignalHome;

