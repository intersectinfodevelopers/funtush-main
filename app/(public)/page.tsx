import Image from 'next/image';
import Link from 'next/link';

import destinations from '@/data/destinations.json';
import { Destination } from '@/types/destination';
import { ROUTES } from '@/lib/constants/routes';

export default function Home() {
  return (<>
    <div>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#071b3a] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="grid min-h-155 items-center gap-10 py-15 lg:grid-cols-2">
            {/* ================= LEFT CONTENT ================= */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Nepals #1 Trekking Marketplace
              </div>

              {/* Heading */}
              <h1 className="max-w-2xl text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[64px]">
                More Than
                <br />
                A Website —
                <br />A Full <span className="text-blue-500">Booking</span>
                <br />
                Infrastructure
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Run your entire trekking business from one platform. Online
                bookings, guide management, live safety monitoring, payments —
                and get discovered by 100,000+ trekkers on FunTush.com.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-600"
                >
                  🚀 Start Selling Online
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-blue-600 transition hover:bg-slate-100"
                >
                  ● Explore Platform
                </button>
              </div>

              {/* Trust Points */}
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-400">
                <span>
                  <span className="mr-1 text-green-400">✓</span>
                  30-day free trial
                </span>

                <span>
                  <span className="mr-1 text-green-400">✓</span>
                  No credit card
                </span>

                <span>
                  <span className="mr-1 text-green-400">✓</span>
                  Live in 10 minutes
                </span>
              </div>
            </div>

            {/* ================= RIGHT VISUAL ================= */}
            <div className="relative hidden min-h-140 lg:block py-23">
              {/* Main Image / Mountain Card */}
              <div className="absolute right-5 top-1/2 h-150.5 w-107.5 -translate-y-1/2 overflow-hidden rounded-3xl bg-linear-to-b from-sky-300 via-slate-100 to-green-800">
                {/* Mountain decoration */}
                <div className="absolute inset-0 ">
                  <div className="absolute left-[18%] top-[20%] h-55 w-55 rotate-45 bg-white/60" />

                  <div className="absolute right-[8%] top-[30%] h-42.5 w-42.5 rotate-45 bg-slate-200/70" />

                  <div className="absolute bottom-0 h-1/2 w-full bg-linear-to-t from-green-950/80 to-transparent" />
                </div>

                {/* Featured Trek */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-yellow-300">
                    ⭐ Featured Trek
                  </p>

                  <h2 className="text-2xl font-extrabold">Everest Base Camp</h2>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span>📍 Nepal · 12 Days</span>

                    <span className="rounded-md bg-yellow-400 px-2 py-1 font-bold text-slate-900">
                      ⭐ 4.9
                    </span>

                    <span className="rounded-md bg-blue-500 px-2 py-1 font-semibold">
                      From $1,200
                    </span>
                  </div>
                </div>
              </div>

              {/* ================= JUST BOOKED ================= */}
              <div className="absolute left-0 top-24 z-20 w-52 rounded-2xl bg-white p-4 text-slate-900 shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span className="text-green-500">✓</span> Just booked
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-xs font-bold text-white">
                    EBC
                  </div>

                  <div>
                    <p className="text-xs font-bold">EBC Trek — 12D</p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Sarah M. from Germany
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= LIVE NOW ================= */}
              <div className="absolute right-0 top- z-20 w-44 rounded-2xl bg-white p-4 text-slate-900 shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span className="text-green-500">●</span> Live now
                </p>

                <p className="mt-2 text-3xl font-extrabold">3,240</p>

                <p className="mt-1 text-[10px] text-slate-500">
                  Trekkers on trail
                </p>
              </div>

              {/* ================= RATING ================= */}
              <div className="absolute bottom-24 left-10 z-20 w-44 rounded-2xl bg-white p-4 text-slate-900 shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  ⭐ Platform rating
                </p>

                <p className="mt-2 text-3xl font-extrabold text-orange-500">
                  4.9
                </p>

                <p className="mt-1 text-sm text-orange-500">★★★★★</p>

                <p className="mt-2 text-[10px] text-slate-500">
                  from 12,800+ reviews
                </p>
              </div>

              {/* ================= NEW AGENCIES ================= */}
              <div className="absolute bottom-16 -right-3.5 z-20 w-40 rounded-2xl bg-white p-4 text-slate-900 shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  ⭐ New this week
                </p>

                <p className="mt-2 text-lg font-extrabold text-blue-600">
                  +14 Agencies
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  joined the platform
                </p>
              </div>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="border-t border-white/10 py-7">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <HeroStat value="1,200+" label="Agencies" icon="▦" />

              <HeroStat value="8,400+" label="Packages" icon="▤" />

              <HeroStat value="62" label="Countries" icon="●" />

              <HeroStat value="$0" label="Commission" icon="♟" />
            </div>
          </div>

          {/* ================= SEARCH ================= */}
          <div className="pb-10 pt-4">
            <p className="mb-3 text-sm text-slate-400">
              🔍 Or find a trek right now:
            </p>

            {/* Search Tabs */}
            <div className="inline-flex rounded-xl border border-white/20 bg-white/5 p-1">
              <button className="rounded-lg bg-white/15 px-5 py-2 text-sm font-semibold text-white">
                ▲ Treks
              </button>

              <button className="rounded-lg px-5 py-2 text-sm text-slate-400 transition hover:text-white">
                ▦ Agencies
              </button>

              <button className="rounded-lg px-5 py-2 text-sm text-slate-400 transition hover:text-white">
                ◈ Destinations
              </button>
            </div>

            {/* Search Box */}
            <div className="mt-3 flex max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur sm:flex-row">
              <SearchField label="WHERE TO?" value="Nepal, Peru, Tanzania..." />

              <SearchField label="DURATION" value="Any length" />

              <SearchField label="DIFFICULTY" value="Any level" />

              <button
                type="button"
                className="m-2 flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-xl bg-blue-500 text-xl transition hover:bg-blue-600 sm:self-center"
              >
                🔍
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* ================= TRUST FEATURES SECTION ================= */}
<section className="border-y border-blue-100 bg-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex min-h-13 items-center justify-between overflow-x-auto">

      {/* Verified Agencies */}
      <div className="flex shrink-0 items-center gap-2 px-5 py-3">
        <span className="text-lg text-blue-600">
          🛡
        </span>

        <span className="text-sm font-medium text-slate-700">
          Verified Agencies Only
        </span>
      </div>

      {/* Divider */}
      <div className="h-5 w-px shrink-0 bg-blue-100" />

      {/* Zero Commission */}
      <div className="flex shrink-0 items-center gap-2 px-5 py-3">
        <span className="text-lg text-blue-600">
          ♟
        </span>

        <span className="text-sm font-medium text-slate-700">
          Zero Commission
        </span>
      </div>

      <div className="h-5 w-px shrink-0 bg-blue-100" />

      {/* Safety Monitoring */}
      <div className="flex shrink-0 items-center gap-2 px-5 py-3">
        <span className="text-lg text-blue-600">
          🔔
        </span>

        <span className="text-sm font-medium text-slate-700">
          24/7 Safety Monitoring
        </span>
      </div>

      <div className="h-5 w-px shrink-0 bg-blue-100" />

      {/* Rating */}
      <div className="flex shrink-0 items-center gap-2 px-5 py-3">
        <span className="text-lg text-blue-600">
          ★
        </span>

        <span className="text-sm font-medium text-slate-700">
          4.9/5 Rating
        </span>
      </div>

      <div className="h-5 w-px shrink-0 bg-blue-100" />

      {/* Countries */}
      <div className="flex shrink-0 items-center gap-2 px-5 py-3">
        <span className="text-lg text-blue-600">
          🌐
        </span>

        <span className="text-sm font-medium text-slate-700">
          62 Countries
        </span>
      </div>

      <div className="h-5 w-px shrink-0 bg-blue-100" />

      {/* Live */}
      <div className="flex shrink-0 items-center gap-2 px-5 py-3">
        <span className="text-lg text-blue-600">
          ⚡
        </span>

        <span className="text-sm font-medium text-slate-700">
          Live in 10 Minutes
        </span>
      </div>

    </div>
  </div>
</section>

    </div>
    
    {/* ================= SEARCH SECTION ================= */}
<section className="bg-[#f5f8ff] px-4 py-10 sm:px-6 lg:px-8">

  <div className="mx-auto max-w-7xl">

    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_15px_50px_rgba(30,80,150,0.10)] sm:p-7">

      {/* ================= CATEGORY TABS ================= */}
      <div className="mb-6 inline-flex flex-wrap items-center gap-1 rounded-xl bg-[#eef4ff] p-1">

        <button
          type="button"
          className="rounded-lg px-5 py-3 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          ▲ Treks
        </button>

        <button
          type="button"
          className="rounded-lg px-5 py-3 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          ▦ Hotels
        </button>

        <button
          type="button"
          className="rounded-lg px-5 py-3 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          ▣ Tours
        </button>

        <button
          type="button"
          className="rounded-lg px-5 py-3 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          ♟ Group Tours
        </button>

        {/* Active */}
        <button
          type="button"
          className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-blue-100"
        >
          ▦ Agencies
        </button>

      </div>

      {/* ================= SEARCH FIELDS ================= */}
      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">

        {/* Destination */}
        <div>
          <label className="mb-2 flex items-center gap-1 text-xs font-bold tracking-wide text-slate-600">
            <span className="text-blue-500">⌕</span>
            DESTINATION / TREK NAME
          </label>

          <div className="flex h-12 items-center rounded-xl border-2 border-blue-100 bg-white px-3 transition focus-within:border-blue-500">

            <span className="mr-3 text-xl text-blue-500">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Nepal, Everest, Annapurna..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />

          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="mb-2 flex items-center gap-1 text-xs font-bold tracking-wide text-slate-600">
            <span className="text-blue-500">▣</span>
            DURATION
          </label>

          <select
            defaultValue="8-14"
            className="h-12 w-full appearance-none rounded-xl border-2 border-blue-100 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500"
          >
            <option value="any">Any Duration</option>
            <option value="1-3">1-3 Days</option>
            <option value="4-7">4-7 Days</option>
            <option value="8-14">8-14 Days</option>
            <option value="15-21">15-21 Days</option>
            <option value="22+">22+ Days</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="mb-2 flex items-center gap-1 text-xs font-bold tracking-wide text-slate-600">
            <span className="text-blue-500">▥</span>
            DIFFICULTY
          </label>

          <select
            defaultValue="any"
            className="h-12 w-full appearance-none rounded-xl border-2 border-blue-100 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500"
          >
            <option value="any">Any Level</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="difficult">Difficult</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="mb-2 flex items-center gap-1 text-xs font-bold tracking-wide text-slate-600">
            <span className="text-blue-500">$</span>
            BUDGET / PERSON
          </label>

          <select
            defaultValue="any"
            className="h-12 w-full appearance-none rounded-xl border-2 border-blue-100 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500"
          >
            <option value="any">Any Budget</option>
            <option value="0-500">$0 - $500</option>
            <option value="500-1000">$500 - $1,000</option>
            <option value="1000-2000">$1,000 - $2,000</option>
            <option value="2000+">$2,000+</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 lg:w-auto"
          >
            <span className="text-lg">⌕</span>
            Search
          </button>

        </div>

      </div>

      {/* ================= QUICK FILTERS ================= */}
      <div className="mt-4 flex flex-wrap items-center gap-2">

        <span className="mr-1 text-sm font-medium text-slate-500">
          🔥 Quick filters:
        </span>

        <button
          type="button"
          className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
        >
          ▲ Nepal
        </button>

        <button
          type="button"
          className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-blue-100"
        >
          ⭐ Top Rated
        </button>

        <button
          type="button"
          className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-blue-100"
        >
          ◴ Free Cancellation
        </button>

        <button
          type="button"
          className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-blue-100"
        >
          ⚑ Beginner Friendly
        </button>

        <button
          type="button"
          className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-blue-100"
        >
          ♛ Award Winning
        </button>

      </div>

    </div>
  </div>
</section>
{/* ================= TOP TREKKING DESTINATIONS ================= */}
{/* ================= TOP TREKKING DESTINATIONS ================= */}
<section className="bg-[#f5f8ff] px-4 py-14 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-7xl">

    {/* Section Header */}
    <div className="mb-8 flex items-end justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-blue-600">
          <span>🌐</span>
          EXPLORE THE WORLD
        </div>

        <h2 className="text-4xl font-extrabold tracking-tight text-[#07152f] sm:text-5xl">
          Top Trekking Destinations
        </h2>

        <p className="mt-3 text-base text-[#41628d]">
          From Himalayan giants to Andean trails — discover your next adventure
        </p>
      </div>

      <button
        type="button"
        className="hidden items-center gap-2 rounded-xl border-2 border-blue-100 bg-white px-6 py-3 text-sm font-semibold text-[#07152f] transition-all duration-200 hover:border-blue-400 hover:text-blue-600 sm:flex"
      >
        <span className="text-lg">→</span>
        View All Destinations
      </button>
    </div>


    {/* ================= DESTINATION CARDS ================= */}
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(4,1fr)] lg:grid-rows-[180px_180px]">

      {/* ================= NEPAL ================= */}
      <div className="destination-card group relative min-h-100 overflow-hidden rounded-2xl lg:row-span-2 lg:min-h-0">

        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#07152f] px-4 py-2 text-xs font-bold text-white">
            <span>🏆</span>
            Most Popular
          </div>

          <div className="text-xs font-semibold uppercase text-white/80">
            NP
          </div>

          <h3 className="mt-1 text-3xl font-extrabold text-white">
            Nepal
          </h3>

          <p className="mt-2 text-sm text-white/80">
            🏢 342 Agencies
            <span className="mx-2">·</span>
            2,800+ Packages
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["Everest", "Annapurna", "Langtang", "Manaslu"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm transition-colors group-hover:bg-white/25"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>


      {/* ================= PERU ================= */}
      <DestinationCard
        countryCode="PE"
        name="Peru"
        agencies="89"
        location="Inca Trail"
        image="https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=85"
      />


      {/* ================= TANZANIA ================= */}
      <DestinationCard
        countryCode="TZ"
        name="Tanzania"
        agencies="54"
        location="Kilimanjaro"
        image="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=85"
      />


      {/* ================= PATAGONIA ================= */}
      <DestinationCard
        countryCode="CL"
        name="Patagonia"
        agencies="41"
        location="Torres del Paine"
        image="https://images.unsplash.com/photo-1478827387698-1527781a4887?auto=format&fit=crop&w=600&q=85"
      />


      {/* ================= BHUTAN ================= */}
      <DestinationCard
        countryCode="BT"
        name="Bhutan"
        agencies="28"
        location="Snowman"
        image="https://images.unsplash.com/photo-1553901753-215db344677a?auto=format&fit=crop&w=600&q=85"
      />


      {/* ================= INDIA ================= */}
      <DestinationCard
        countryCode="IN"
        name="India"
        agencies="67"
        location="Ladakh"
        image="https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=600&q=85"
      />

    </div>
  </div>
</section>

{/* ================= PLATFORM OVERVIEW ================= */}
<section className="relative overflow-hidden bg-[#081a35] px-4 py-20 sm:px-6 lg:px-8">

  {/* Subtle background decoration */}
  <div className="pointer-events-none absolute inset-0 opacity-20">
    <div className="absolute left-1/2 top-0 h-125 w-175 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl">

    {/* ================= HEADER ================= */}
    <div className="mx-auto max-w-3xl text-center">

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-2 text-xs font-bold text-blue-300">
        <span>⚡</span>
        Platform Overview
      </div>

      {/* Heading */}
      <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
        Run Your Entire Business
        <br />
        From{" "}
        <span className="text-blue-500">
          One System
        </span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
        Online + offline bookings, payments, guide management, inventory
        and safety — all from a single infrastructure.
      </p>
    </div>


    {/* ================= FEATURE CARDS ================= */}
    <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

      {/* Package Manager */}
      <PlatformCard
        icon="▰"
        iconClass="text-emerald-400"
        title="Package Manager"
        description="Build rich trek packages with itineraries, altitude tables, pricing tiers, gallery, SEO, and auto-generated PDFs."
      />

      {/* Booking & Payments */}
      <PlatformCard
        icon="▰"
        iconClass="text-emerald-400"
        title="Booking & Payments"
        description="Accept globally with Stripe, eSewa, Khalti, Fonepay. Instant confirmation, invoicing and webhook tracking."
      />

      {/* Guide Management */}
      <PlatformCard
        icon="◉"
        iconClass="text-yellow-400"
        title="Guide Management"
        description="Profiles, certifications, availability, live GPS tracking, performance scoring — from one screen."
      />

      {/* Safety Monitoring */}
      <PlatformCard
        icon="⬟"
        iconClass="text-red-400"
        title="Safety Monitoring"
        description="Live GPS, SOS dashboard, 15-min response protocol, 4-layer offline pipeline. Never gated — all tiers."
      />

      {/* Finance & Accounting */}
      <PlatformCard
        icon="◔"
        iconClass="text-violet-400"
        title="Finance & Accounting"
        description="Full P&L, guide payroll, income/expense, tax summary, balance sheet and exportable PDF reports."
      />

      {/* White Label Website */}
      <PlatformCard
        icon="◎"
        iconClass="text-blue-400"
        title="White-Label Website"
        description="Your brand, your domain. Custom colors, logo, SEO config, blog, navigation builder — zero coding."
      />

    </div>


    {/* ================= CTA BUTTONS ================= */}
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

      <button
        type="button"
        className="flex min-w-60 items-center justify-center gap-3 rounded-xl bg-blue-500 px-7 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-500/30"
      >
        <span className="text-lg">🚀</span>
        Start Selling Online
      </button>

      <button
        type="button"
        className="flex min-w-50 items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 font-bold text-blue-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
      >
        <span className="text-lg">◉</span>
        Explore Platform
      </button>

    </div>


    {/* ================= TRUST POINTS ================= */}
    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500">

      <span>
        <span className="text-emerald-400">✓</span>{" "}
        No setup fees
      </span>

      <span className="hidden text-slate-700 sm:inline">•</span>

      <span>
        <span className="text-emerald-400">✓</span>{" "}
        Zero commission
      </span>

      <span className="hidden text-slate-700 sm:inline">•</span>

      <span>
        <span className="text-emerald-400">✓</span>{" "}
        Cancel anytime
      </span>

    </div>

  </div>
</section>
    </>
    
  );

}

/* =========================================================
   HERO STAT COMPONENT
========================================================= */

function HeroStat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: string;
}) {
  return (
    <div className="border-r border-white/10 last:border-0">
      <div className="text-2xl font-extrabold sm:text-3xl">{value}</div>

      <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
        <span>{icon}</span>
        {label}
      </div>
    </div>
  );
}

/* =========================================================
   SEARCH FIELD COMPONENT
========================================================= */

function SearchField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 flex-1 border-b border-white/10 px-5 py-3 sm:border-b-0 sm:border-r">
      <p className="text-[10px] font-bold tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm text-slate-300">{value}</p>
    </div>
  );
}
function DestinationCard({
  countryCode,
  name,
  agencies,
  location,
  image,
}: {
  countryCode: string;
  name: string;
  agencies: string;
  location: string;
  image: string;
}) {
  return (
    <div className="group relative min-h-45 overflow-hidden rounded-2xl">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white">

        <div className="text-xs font-semibold">
          {countryCode}
        </div>

        <h3 className="text-xl font-extrabold leading-tight">
          {name}
        </h3>

        <p className="mt-1 text-xs leading-5 text-white/80">
          {agencies} Agencies
          <span className="mx-1">·</span>
          {location}
        </p>

      </div>
    </div>
  );
}


function PlatformCard({
  icon,
  iconClass,
  title,
  description,
}: {
  icon: string;
  iconClass: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative min-h-46.25 overflow-hidden rounded-2xl border border-slate-700/80 bg-[#172b48] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-[#1b3354] hover:shadow-xl hover:shadow-blue-950/30">

      {/* Icon */}
      <div
        className={`mb-7 text-3xl transition-transform duration-300 group-hover:scale-110 ${iconClass}`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-extrabold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>

    </div>
  );
}
