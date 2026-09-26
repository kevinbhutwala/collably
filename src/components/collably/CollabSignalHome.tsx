"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";

const stories = [
  { name: "Vasudha Rai", label: "Beauty / Editorial", image: "/creators/vasudha-rai.jpg" },
  { name: "Kunal Rajput", label: "Fitness / Motion", image: "/creators/kunal-rajput.jpg" },
  { name: "Prarthana", label: "Fashion / Culture", image: "/creators/prarthana.jpg" },
  { name: "Kusha Kapila", label: "Comedy / Voice", image: "/creators/kusha-kapila.jpg" },
];

export function CollabSignalHome() {
  return (
    <main className="overflow-hidden bg-[#f4efe7] text-[#171515]">
      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-[#211c1b] text-white">
        <video
          className="absolute inset-0 size-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
          poster="/creators/vasudha-rai.jpg"
          aria-label="Creator filming a brand story"
        >
          <source src="/reels/abeycollab_debut_reel.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1440px] flex-col justify-between px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="flex items-center justify-between gap-6">
            <p className="text-2xl font-black tracking-[-0.08em]">abey<span className="text-[#ffd21f]">collab</span></p>
            <nav className="hidden items-center gap-8 text-sm font-semibold text-white/75 md:flex">
              <Link className="hover:text-white" href="/creators">Creators</Link>
              <Link className="hover:text-white" href="/for-brands">Brands</Link>
              <Link className="hover:text-white" href="/about">About</Link>
            </nav>
            <Link href="/register" className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#171515] transition-transform hover:-translate-y-0.5">Get started</Link>
          </div>

          <div className="max-w-4xl pb-6 sm:pb-10">
            <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-white/70"><span className="size-2 rounded-full bg-[#ffd21f]" /> Ideas in motion</div>
            <h1 className="max-w-4xl text-[clamp(4rem,10vw,9.8rem)] font-black leading-[0.82] tracking-[-0.085em]">Make work<br /><span className="font-serif font-normal italic text-[#ffd21f]">worth watching.</span></h1>
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center"><Link href="/brand/register" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#ffd21f] px-6 py-3.5 text-sm font-bold text-[#171515]">Start a brief <ArrowUpRight data-icon="inline-end" /></Link><span className="flex items-center gap-2 text-sm text-white/70"><Play className="size-4 fill-current" /> Real people. Real stories.</span></div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a57917]">The creative marketplace</p><h2 className="mt-5 max-w-xl text-5xl font-black leading-[0.88] tracking-[-0.07em] sm:text-7xl">Where good<br /><span className="font-serif font-normal italic">ideas meet</span><br />their people.</h2></div>
          <div className="flex flex-col gap-8 lg:items-end"><p className="max-w-md text-lg leading-7 text-black/55 lg:text-right">Brands bring the spark. Creators bring the point of view. AbeyCollab makes the whole thing move.</p><Link href="/campaigns" className="inline-flex items-center gap-2 text-sm font-bold underline decoration-[#ffd21f] decoration-4 underline-offset-4">Explore active briefs <ArrowUpRight data-icon="inline-end" /></Link></div>
        </div>
      </section>

      <section className="bg-[#171515] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]"><div className="mb-10 flex items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffd21f]">Stories start here</p><h2 className="mt-4 text-4xl font-black tracking-[-0.06em] sm:text-6xl">Built for the<br /><span className="font-serif font-normal italic text-white/55">next frame.</span></h2></div><Sparkles className="hidden size-10 text-[#ffd21f] sm:block" /></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{stories.map((story, index) => <Link href="/creators" key={story.name} className={`group relative overflow-hidden rounded-[1.5rem] ${index % 2 === 1 ? "mt-8 sm:mt-14" : ""}`}><div className="relative aspect-[0.72] bg-white/10"><Image src={story.image} alt={story.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" /><div className="absolute inset-x-4 bottom-4"><p className="text-sm font-bold">{story.name}</p><p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/55">{story.label}</p></div></div></Link>)}</div></div>
      </section>

      <section className="bg-[#ffd21f] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 md:flex-row md:items-end"><h2 className="max-w-3xl text-6xl font-black leading-[0.82] tracking-[-0.08em] sm:text-8xl">Bring the<br /><span className="font-serif font-normal italic">next idea.</span></h2><Link href="/brand/register" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#171515] px-7 py-4 text-sm font-bold text-white">Build your brief <ArrowUpRight data-icon="inline-end" /></Link></div></section>
    </main>
  );
}

export default CollabSignalHome;
