"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, Play, Sparkles } from "lucide-react";

const heroVideo = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-amber-z3hBWww4xrjdc1lZKN6ilsHl9FdPSH.mp4";

const creatorImages = [
  "/creators/emma-chamberlain.png",
  "/creators/prajakta-koli.png",
  "/creators/kunal-rajput.jpg",
  "/creators/vasudha-rai.jpg",
  "/creators/kusha-kapila.jpg",
  "/creators/mkbhd.jpg",
];

const brandMarks = ["ADIDAS", "Myntra", "boAt", "Nykaa", "LEVI'S", "mamaearth"];

export function CollabSignalHome() {
  return (
    <main className="overflow-hidden bg-[#f5f1ea] text-[#191715]">
      <section className="relative min-h-[100svh] overflow-hidden bg-[#c7a98d] text-white">
        <video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline poster="/creators/vasudha-rai.jpg" aria-label="A creator filming a product story">
          <source src={heroVideo} type="video/mp4" />
          <source src="/reels/abeycollab_debut_reel.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-5 py-5 sm:px-8 lg:px-12">
          <header className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-black tracking-[-0.09em] text-white">abey<span className="text-[#f7c76c]">collab</span></Link>
            <nav className="hidden items-center gap-9 text-sm font-medium md:flex"><Link href="/creators">Creators</Link><Link href="/for-brands">Brands</Link><Link href="/campaigns">Explore</Link></nav>
            <div className="flex items-center gap-3"><Link href="/register" className="hidden rounded-full bg-white px-5 py-3 text-xs font-bold text-[#191715] sm:inline-flex">Join AbeyCollab <ArrowUpRight data-icon="inline-end" /></Link><button className="inline-flex size-11 items-center justify-center rounded-full border border-white/50 bg-black/10 backdrop-blur-md md:hidden" aria-label="Open menu"><Menu /></button></div>
          </header>
          <div className="mt-auto max-w-4xl pb-9 pt-32 sm:pb-12 lg:pb-16">
            <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-white/80"><span className="size-2 rounded-full bg-[#f7c76c]" />The collab economy, in motion</div>
            <h1 className="max-w-4xl text-[clamp(4rem,10vw,9.5rem)] font-black leading-[0.78] tracking-[-0.095em]">Make things<br /><span className="font-serif font-normal italic text-[#f7c76c]">matter.</span></h1>
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center"><Link href="/brand/register" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#f7c76c] px-6 py-4 text-sm font-bold text-[#191715]">Start something <ArrowUpRight data-icon="inline-end" /></Link><Link href="#the-loop" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90"><Play className="size-4 fill-current" /> Watch the loop</Link></div>
          </div>
          <div className="flex items-center justify-between border-t border-white/30 py-4 text-[11px] uppercase tracking-[0.18em] text-white/70"><span>Ideas become influence</span><span className="hidden sm:block">Scroll to explore ↓</span><span>01 — 04</span></div>
        </div>
      </section>

      <section id="the-loop" className="relative bg-[#f5f1ea] px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-28">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b27c3a]">One beautiful loop</p><h2 className="mt-5 max-w-xl text-6xl font-black leading-[0.82] tracking-[-0.085em] sm:text-8xl">Brief.<br /><span className="font-serif font-normal italic text-[#b27c3a]">Create.</span><br />Belong.</h2><p className="mt-8 max-w-sm text-lg leading-7 text-black/55">AbeyCollab turns the distance between a great idea and the right people into one effortless movement.</p></div>
          <div className="relative min-h-[540px] overflow-hidden rounded-[2rem] bg-[#d6c1a6] sm:min-h-[620px]"><Image src="/creators/prajakta-koli.png" alt="Creator building an authentic brand story" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /><div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white sm:inset-x-9 sm:bottom-9"><p className="max-w-xs text-2xl font-bold leading-tight tracking-tight">The right collaboration changes the way a story travels.</p><span className="rounded-full border border-white/40 px-4 py-2 text-xs uppercase tracking-widest">02 / 04</span></div></div>
        </div>
      </section>

      <section className="bg-[#22201d] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1500px]"><div className="flex items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f7c76c]">A network with taste</p><h2 className="mt-4 max-w-2xl text-6xl font-black leading-[0.8] tracking-[-0.08em] sm:text-8xl">Good people<br /><span className="font-serif font-normal italic text-white/55">make good work.</span></h2></div><Sparkles className="mb-2 hidden size-10 text-[#f7c76c] sm:block" /></div><div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{creatorImages.map((image, index) => <Link href="/creators" key={image} className={`group relative overflow-hidden rounded-[1.25rem] ${index % 3 === 1 ? "sm:translate-y-10" : ""}`}><div className="relative aspect-[0.78]"><Image src={image} alt="AbeyCollab creator" fill sizes="(max-width: 640px) 50vw, 16vw" className="object-cover grayscale transition duration-700 group-hover:scale-110 group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><span className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-white/80">Creator {String(index + 1).padStart(2, "0")}</span></div></Link>)}</div></div></section>

      <section className="overflow-hidden bg-[#f7c76c] py-5"><div className="flex w-max animate-[marquee_25s_linear_infinite] gap-12 whitespace-nowrap text-2xl font-black tracking-[-0.04em] sm:text-4xl">{[...brandMarks, ...brandMarks].map((brand, index) => <span key={`${brand}-${index}`} className="flex items-center gap-12">{brand}<i className="size-2 rounded-full bg-[#191715]" /></span>)}</div></section>

      <section className="bg-[#f5f1ea] px-5 py-24 sm:px-8 lg:px-12 lg:py-36"><div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-12 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b27c3a]">Your next story is waiting</p><h2 className="mt-5 max-w-4xl text-7xl font-black leading-[0.78] tracking-[-0.09em] sm:text-[9rem]">Make it<br /><span className="font-serif font-normal italic text-[#b27c3a]">count.</span></h2></div><Link href="/register" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#191715] px-7 py-4 text-sm font-bold text-white">Enter the loop <ArrowUpRight data-icon="inline-end" /></Link></div></section>
    </main>
  );
}

export default CollabSignalHome;
