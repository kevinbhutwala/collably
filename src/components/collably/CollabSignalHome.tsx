"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Play, Sparkles } from "lucide-react";

const creatorStories = [
  { name: "Vasudha Rai", role: "Beauty storyteller", image: "/creators/vasudha-rai.jpg" },
  { name: "Kusha Kapila", role: "Culture + comedy", image: "/creators/kusha-kapila.jpg" },
  { name: "Kunal Rajput", role: "Movement maker", image: "/creators/kunal-rajput.jpg" },
];

const signals = [
  { number: "01", title: "Discover", copy: "Find the right point of view." },
  { number: "02", title: "Make", copy: "Turn a brief into something people feel." },
  { number: "03", title: "Move", copy: "Ship it. Track it. Get paid." },
];

export function CollabSignalHome() {
  return (
    <main className="overflow-hidden bg-[#f4efe6] text-[#191715]">
      <section className="relative min-h-[100svh] overflow-hidden bg-[#d7c1aa]">
        <video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline poster="/creators/vasudha-rai.jpg" aria-label="Creators making a campaign together">
          <source src="/reels/abeycollab_debut_reel.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-5 py-5 sm:px-8 lg:px-12">
          <header className="flex items-center justify-between rounded-full border border-white/35 bg-[#f4efe6]/85 px-5 py-3.5 text-[#191715] shadow-lg shadow-black/5 backdrop-blur-md sm:px-7">
            <Link href="/" className="text-xl font-black tracking-[-0.08em]">abey<span className="text-[#b57a20]">collab</span></Link>
            <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
              <Link href="/creators" className="transition-opacity hover:opacity-60">For creators</Link>
              <Link href="/for-brands" className="transition-opacity hover:opacity-60">For brands</Link>
              <Link href="/campaigns" className="transition-opacity hover:opacity-60">Campaigns</Link>
              <Link href="/about" className="transition-opacity hover:opacity-60">About</Link>
            </nav>
            <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-[#191715] px-4 py-2.5 text-xs font-bold text-white transition-transform hover:-translate-y-0.5">Join the movement <ArrowUpRight data-icon="inline-end" /></Link>
          </header>

          <div className="mt-auto flex max-w-3xl flex-col gap-7 pb-10 pt-32 text-white sm:pb-14 lg:pb-20">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/80">The creator commerce network</p>
            <h1 className="max-w-3xl text-[clamp(4rem,10vw,9rem)] font-black leading-[0.82] tracking-[-0.09em]">Make something<br /><span className="font-serif font-normal italic text-[#ffe08a]">people remember.</span></h1>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Link href="/brand/register" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#ffe08a] px-6 py-3.5 text-sm font-bold text-[#191715] transition-transform hover:-translate-y-1">Start a campaign <ArrowUpRight data-icon="inline-end" /></Link>
              <Link href="#how-it-works" className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"><Play className="size-4 fill-current" /> See how it works</Link>
            </div>
          </div>
          <div className="hidden items-center justify-between border-t border-white/30 py-5 text-xs font-medium text-white/75 sm:flex"><span>Ideas, in good company.</span><span className="flex items-center gap-2">Scroll to explore <ChevronDown className="size-4" /></span><span>01 / 04</span></div>
        </div>
      </section>

      <section id="how-it-works" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b57a20]">Not another marketplace</p><h2 className="mt-5 max-w-xl text-5xl font-black leading-[0.88] tracking-[-0.075em] sm:text-7xl">The place where<br /><span className="font-serif font-normal italic">good work</span><br />finds its people.</h2></div>
          <div className="flex flex-col justify-end gap-10"><p className="max-w-lg text-xl leading-8 text-black/55">AbeyCollab brings ambitious brands and the creators their audience already trusts into one easy, protected flow.</p><div className="grid gap-8 border-t border-black/15 pt-7 sm:grid-cols-3">{signals.map((signal) => <div key={signal.number}><p className="text-xs font-bold text-[#b57a20]">{signal.number}</p><h3 className="mt-4 text-xl font-bold">{signal.title}</h3><p className="mt-2 text-sm leading-6 text-black/50">{signal.copy}</p></div>)}</div></div>
        </div>
      </section>

      <section className="bg-[#1d1b18] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1400px]"><div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ffe08a]">People with a point of view</p><h2 className="mt-4 text-5xl font-black leading-[0.86] tracking-[-0.07em] sm:text-7xl">The faces<br /><span className="font-serif font-normal italic text-white/55">behind the feeling.</span></h2></div><Sparkles className="size-9 text-[#ffe08a]" /></div><div className="grid gap-4 sm:grid-cols-3">{creatorStories.map((creator, index) => <Link href="/creators" key={creator.name} className={`group relative overflow-hidden rounded-[1.5rem] ${index === 1 ? "sm:mt-12" : ""}`}><div className="relative aspect-[0.82] bg-white/10"><Image src={creator.image} alt={creator.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" /><div className="absolute inset-x-5 bottom-5"><p className="text-lg font-bold">{creator.name}</p><p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/60">{creator.role}</p></div></div></Link>)}</div></div>
      </section>

      <section className="bg-[#ffe08a] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a5a14]">Your next collab starts here</p><h2 className="mt-5 max-w-4xl text-6xl font-black leading-[0.8] tracking-[-0.08em] sm:text-8xl">Put a little<br /><span className="font-serif font-normal italic">more feeling</span><br />into it.</h2></div><Link href="/brand/register" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#191715] px-7 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-1">Let&apos;s make it real <ArrowUpRight data-icon="inline-end" /></Link></div></section>
    </main>
  );
}

export default CollabSignalHome;
