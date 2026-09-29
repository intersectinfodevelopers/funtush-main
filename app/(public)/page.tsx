import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";
import { getRecommendations, getMarketplaceStats, getDestinations, getAgencies, getSubscriptionTiers } from "@/lib/api/marketplace";
import { getVisitorId } from "@/lib/visitor";
import { formatPrice } from "@/lib/utils/format";
import { PackageGrid } from "@/components/marketplace/packages/PackageGrid";

export default async function Home() {
  const visitorId = await getVisitorId();
  const [recommendations, stats, destinations, agencies, tiers] = await Promise.all([
    getRecommendations(visitorId).catch(() => ({ personalized: false, data: [] })),
    getMarketplaceStats().catch(() => null),
    getDestinations().catch(() => []),
    getAgencies().catch(() => []),
    getSubscriptionTiers().catch(() => []),
  ]);
  // Whatever a paid tier's actual configured trial length is (admin-editable) —
  // never a hardcoded marketing number. Hidden below if nothing offers one.
  const trialDays = tiers.filter((t) => t.trialDays > 0).reduce((max, t) => Math.max(max, t.trialDays), 0);

  return (
    <>
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
                  Nepal&rsquo;s Trekking Marketplace
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
                  and get discovered by trekkers on FunTush.com
                  {stats && stats.totalTrekkers > 0 ? ` (${stats.totalTrekkers} and counting)` : ""}.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={ROUTES.REGISTER_AGENCY}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-600"
                  >
                    🚀 Start Selling Online
                  </Link>

                  <Link
                    href={ROUTES.EXPLORE}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-blue-600 transition hover:bg-slate-100"
                  >
                    ● Explore Treks
                  </Link>
                </div>

                {/* Trust Points */}
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-400">
                  {trialDays > 0 && (
                    <span>
                      <span className="mr-1 text-green-400">✓</span>
                      {trialDays}-day free trial
                    </span>
                  )}

                  <span>
                    <span className="mr-1 text-green-400">✓</span>
                    No credit card to sign up
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

                  {/* Featured Trek — a real package from the recommendation engine; omitted when there isn't one */}
                  {recommendations.data[0] && (
                    <Link
                      href={ROUTES.PACKAGE(recommendations.data[0].slug)}
                      className="absolute bottom-0 left-0 right-0 p-6"
                    >
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-yellow-300">
                        {recommendations.data[0].sponsored ? "⭐ Sponsored" : "⭐ Featured Trek"}
                      </p>

                      <h2 className="text-2xl font-extrabold">{recommendations.data[0].title}</h2>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                        <span>
                          📍 {recommendations.data[0].destination || "Nepal"} · {recommendations.data[0].duration_days} Days
                        </span>

                        <span className="rounded-md bg-blue-500 px-2 py-1 font-semibold">
                          From {formatPrice(recommendations.data[0].price_npr, "NPR")}
                        </span>
                      </div>
                    </Link>
                  )}
                </div>

                {/* ================= RATING ================= */}
                {/* Real average rating + review count — hidden entirely once there are
                    zero reviews rather than showing a misleading "0.0". */}
                {stats && stats.totalReviews > 0 && (
                  <div className="absolute bottom-24 left-10 z-20 w-44 rounded-2xl bg-white p-4 text-slate-900 shadow-xl">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      ⭐ Platform rating
                    </p>

                    <p className="mt-2 text-3xl font-extrabold text-orange-500">
                      {stats.averageRating?.toFixed(1)}
                    </p>

                    <p className="mt-1 text-sm text-orange-500">{"★".repeat(Math.round(stats.averageRating ?? 0))}</p>

                    <p className="mt-2 text-[10px] text-slate-500">
                      from {stats.totalReviews} review{stats.totalReviews === 1 ? "" : "s"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ================= STATS ================= */}
            {/* Real platform-scale counts from /marketplace/stats — never fixed
                marketing numbers. "$0 Commission" is a real pricing policy, not
                a live count, so it's the one value left as-is. */}
            <div className="border-t border-white/10 py-7">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                <HeroStat value={stats ? `${stats.totalAgencies}` : "—"} label="Agencies" icon="▦" />

                <HeroStat value={stats ? `${stats.totalPackages}` : "—"} label="Packages" icon="▤" />

                {destinations.length > 0 ? (
                  <HeroStat value={`${destinations.length}`} label="Destinations" icon="●" />
                ) : (
                  <HeroStat value={stats ? `${stats.totalReviews}` : "—"} label="Reviews" icon="★" />
                )}

                <HeroStat value="$0" label="Commission" icon="♟" />
              </div>
            </div>

            {/* ================= SEARCH ================= */}
            <div className="pb-10 pt-4">
              <p className="mb-3 text-sm text-slate-400">🔍 Find a trek right now:</p>

              <form
                action={ROUTES.EXPLORE}
                method="get"
                className="flex max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur sm:flex-row"
              >
                <label className="min-w-0 flex-1 border-b border-white/10 px-5 py-3 sm:border-b-0 sm:border-r">
                  <span className="block text-[10px] font-bold tracking-wider text-slate-400">WHERE TO?</span>
                  <input
                    name="q"
                    placeholder="Everest, Annapurna…"
                    className="mt-1 w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none"
                  />
                </label>

                <label className="min-w-0 flex-1 border-b border-white/10 px-5 py-3 sm:border-b-0 sm:border-r">
                  <span className="block text-[10px] font-bold tracking-wider text-slate-400">DURATION</span>
                  <select name="duration_max" className="mt-1 w-full bg-transparent text-sm text-slate-200 outline-none">
                    <option value="" className="text-gray-900">Any length</option>
                    <option value="5" className="text-gray-900">Up to 5 days</option>
                    <option value="10" className="text-gray-900">Up to 10 days</option>
                    <option value="15" className="text-gray-900">Up to 15 days</option>
                  </select>
                </label>

                <label className="min-w-0 flex-1 border-b border-white/10 px-5 py-3 sm:border-b-0">
                  <span className="block text-[10px] font-bold tracking-wider text-slate-400">DIFFICULTY</span>
                  <select name="difficulty" className="mt-1 w-full bg-transparent text-sm text-slate-200 outline-none">
                    <option value="" className="text-gray-900">Any level</option>
                    <option value="EASY" className="text-gray-900">Easy</option>
                    <option value="MODERATE" className="text-gray-900">Moderate</option>
                    <option value="CHALLENGING" className="text-gray-900">Strenuous</option>
                    <option value="DIFFICULT" className="text-gray-900">Extreme</option>
                  </select>
                </label>

                <button
                  type="submit"
                  aria-label="Search treks"
                  className="m-2 flex h-12 shrink-0 items-center justify-center rounded-xl bg-blue-500 px-6 text-sm font-bold transition hover:bg-blue-600 sm:w-12 sm:px-0 sm:text-xl"
                >
                  <span className="sm:hidden">Search</span>
                  <span className="hidden sm:inline">🔍</span>
                </button>
              </form>
            </div>
          </div>
        </section>
        {/* ================= TRUST FEATURES SECTION ================= */}
        <section className="border-y border-blue-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-13 items-center justify-between overflow-x-auto">
              {/* Verified Agencies */}
              <div className="flex shrink-0 items-center gap-2 px-5 py-3">
                <span className="text-lg text-blue-600">🛡</span>

                <span className="text-sm font-medium text-slate-700">
                  Verified Agencies Only
                </span>
              </div>

              {/* Divider */}
              <div className="h-5 w-px shrink-0 bg-blue-100" />

              {/* Zero Commission */}
              <div className="flex shrink-0 items-center gap-2 px-5 py-3">
                <span className="text-lg text-blue-600">♟</span>

                <span className="text-sm font-medium text-slate-700">
                  Zero Commission
                </span>
              </div>

              <div className="h-5 w-px shrink-0 bg-blue-100" />

              {/* Safety Monitoring */}
              <div className="flex shrink-0 items-center gap-2 px-5 py-3">
                <span className="text-lg text-blue-600">🔔</span>

                <span className="text-sm font-medium text-slate-700">
                  24/7 Safety Monitoring
                </span>
              </div>

              <div className="h-5 w-px shrink-0 bg-blue-100" />

              {/* Rating — real average from /marketplace/stats; omitted until there is at least one review */}
              {stats && stats.totalReviews > 0 && stats.averageRating !== null && (
                <>
                  <div className="flex shrink-0 items-center gap-2 px-5 py-3">
                    <span className="text-lg text-blue-600">★</span>

                    <span className="text-sm font-medium text-slate-700">
                      {stats.averageRating.toFixed(1)}/5 Rating
                    </span>
                  </div>

                  <div className="h-5 w-px shrink-0 bg-blue-100" />
                </>
              )}


              {/* Live */}
              <div className="flex shrink-0 items-center gap-2 px-5 py-3">
                <span className="text-lg text-blue-600">⚡</span>

                <span className="text-sm font-medium text-slate-700">
                  Live in 10 Minutes
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

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
              From <span className="text-blue-500">One System</span>
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
            <Link
              href={ROUTES.REGISTER_AGENCY}
              className="flex min-w-60 items-center justify-center gap-3 rounded-xl bg-blue-500 px-7 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-500/30"
            >
              <span className="text-lg">🚀</span>
              Start Selling Online
            </Link>

            <Link
              href={ROUTES.EXPLORE}
              className="flex min-w-50 items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 font-bold text-blue-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
            >
              <span className="text-lg">◉</span>
              Explore Treks
            </Link>
          </div>

          {/* ================= TRUST POINTS ================= */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span>
              <span className="text-emerald-400">✓</span> No setup fees
            </span>

            <span className="hidden text-slate-700 sm:inline">•</span>

            <span>
              <span className="text-emerald-400">✓</span> Zero commission
            </span>

            <span className="hidden text-slate-700 sm:inline">•</span>

            <span>
              <span className="text-emerald-400">✓</span> Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* ================= FEATURED TREK PACKAGES ================= */}
      <section className="bg-[#f1f5ff] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-500">
                <span>★</span>
                {recommendations.personalized ? "Because of what you looked at" : "Handpicked for you"}
              </div>

              <h2 className="text-4xl font-extrabold tracking-tight text-[#071936] sm:text-5xl">
                {recommendations.personalized ? "Recommended For You" : "Featured Trek Packages"}
              </h2>

              <p className="mt-4 text-base text-[#55719a] sm:text-lg">
                Real packages from verified Nepal trekking agencies
              </p>
            </div>
          </div>

          {/* Package Cards */}
          <div className="mt-10">
            {recommendations.data.length > 0 ? (
              <PackageGrid packages={recommendations.data} />
            ) : (
              <p className="text-center text-[#55719a]">No packages published yet — check back soon.</p>
            )}
          </div>

          {recommendations.data.length > 0 && (
            <div className="mt-10 flex justify-center">
              <Link
                href={ROUTES.EXPLORE}
                className="rounded-xl border-2 border-blue-200 bg-transparent px-9 py-4 text-sm font-semibold text-[#17355d] transition-all duration-200 hover:border-blue-500 hover:bg-white hover:text-blue-600"
              >
                Explore All Packages
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Plugins / Integrations Section */}
      <section className="bg-[#f5f8ff] py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold tracking-[0.2em] text-blue-600 uppercase mb-5">
              <span>🔌</span>
              <span>Extend Your Business</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#07152d] leading-tight">
              Supercharge Your Store
              <br />
              with Our Plugins
            </h2>

            <p className="mt-5 text-lg text-[#55709a]">
              One-click integrations built into every FunTush account
            </p>
          </div>

          {/* Plugin Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Google Maps */}
            <div
              className="group bg-white border border-blue-100 rounded-2xl p-6 min-h-51.25
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
            >
              <div
                className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-5
          group-hover:bg-blue-100 transition-colors"
              >
                🗺️
              </div>

              <h3 className="text-lg font-bold text-[#07152d]">Google Maps</h3>

              <p className="text-sm leading-6 text-[#55709a] mt-3">
                Embed live maps on your agency site. Show trailheads, campsites
                and route overlays.
              </p>

              <span className="inline-block mt-4 px-3 py-1 rounded-md bg-green-100 text-green-700 text-xs font-semibold">
                ✓ Free · All Tiers
              </span>
            </div>

            {/* Google Analytics */}
            <div
              className="group bg-white border border-blue-100 rounded-2xl p-6 min-h-51.25
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
            >
              <div
                className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-5
          group-hover:bg-blue-100 transition-colors"
              >
                📊
              </div>

              <h3 className="text-lg font-bold text-[#07152d]">
                Google Analytics
              </h3>

              <p className="text-sm leading-6 text-[#55709a] mt-3">
                Track visitors, bookings and conversions with a single paste of
                your GA ID.
              </p>

              <span className="inline-block mt-4 px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-semibold">
                ✓ Free · All Tiers
              </span>
            </div>

            {/* Facebook Pixel */}
            <div
              className="group bg-white border border-blue-100 rounded-2xl p-6 min-h-51.25
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
            >
              <div
                className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-5
          group-hover:bg-blue-100 transition-colors"
              >
                f
              </div>

              <h3 className="text-lg font-bold text-[#07152d]">
                Facebook Pixel
              </h3>

              <p className="text-sm leading-6 text-[#55709a] mt-3">
                Run retargeting ads against trekkers who visited your packages.
              </p>

              <span className="inline-block mt-4 px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-semibold">
                Medium + Large
              </span>
            </div>

            {/* WhatsApp */}
            <div
              className="group bg-white border border-blue-100 rounded-2xl p-6 min-h-51.25
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
            >
              <div
                className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl mb-5
          group-hover:bg-green-100 transition-colors"
              >
                💬
              </div>

              <h3 className="text-lg font-bold text-[#07152d]">
                WhatsApp Widget
              </h3>

              <p className="text-sm leading-6 text-[#55709a] mt-3">
                Float a WhatsApp button on your site. Set custom greeting text
                for trekkers.
              </p>

              <span className="inline-block mt-4 px-3 py-1 rounded-md bg-green-100 text-green-700 text-xs font-semibold">
                ✓ Free · All Tiers
              </span>
            </div>

            {/* Currency Converter */}
            <div
              className="group bg-white border border-blue-100 rounded-2xl p-6 min-h-51.25
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
            >
              <div
                className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-2xl mb-5
          group-hover:bg-yellow-100 transition-colors"
              >
                💰
              </div>

              <h3 className="text-lg font-bold text-[#07152d]">
                Currency Converter
              </h3>

              <p className="text-sm leading-6 text-[#55709a] mt-3">
                Live exchange rates on every package page in trekkers&apos;
                local currency.
              </p>

              <span className="inline-block mt-4 px-3 py-1 rounded-md bg-yellow-100 text-yellow-700 text-xs font-semibold">
                Small + tiers
              </span>
            </div>

            {/* Instagram */}
            <div
              className="group bg-white border border-blue-100 rounded-2xl p-6 min-h-51.25
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
            >
              <div
                className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-2xl mb-5
          group-hover:bg-pink-100 transition-colors"
              >
                ◎
              </div>

              <h3 className="text-lg font-bold text-[#07152d]">
                Instagram Feed
              </h3>

              <p className="text-sm leading-6 text-[#55709a] mt-3">
                Display latest Instagram photos on your agency website.
                Auto-refreshes every 6 hours.
              </p>

              <span className="inline-block mt-4 px-3 py-1 rounded-md bg-pink-100 text-pink-700 text-xs font-semibold">
                Large Only
              </span>
            </div>

            {/* Live Chat */}
            <div
              className="group bg-white border border-blue-100 rounded-2xl p-6 min-h-51.25
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
            >
              <div
                className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl mb-5
          group-hover:bg-purple-100 transition-colors"
              >
                💬
              </div>

              <h3 className="text-lg font-bold text-[#07152d]">Live Chat</h3>

              <p className="text-sm leading-6 text-[#55709a] mt-3">
                Real-time chat widget. Assign to any staff role. Chat history
                stored in your CRM.
              </p>

              <span className="inline-block mt-4 px-3 py-1 rounded-md bg-purple-100 text-purple-700 text-xs font-semibold">
                Large Only
              </span>
            </div>

            {/* API Access */}
            <div
              className="group bg-white border border-blue-100 rounded-2xl p-6 min-h-51.25
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
            >
              <div
                className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-2xl mb-5
          group-hover:bg-sky-100 transition-colors"
              >
                🔑
              </div>

              <h3 className="text-lg font-bold text-[#07152d]">API Access</h3>

              <p className="text-sm leading-6 text-[#55709a] mt-3">
                Named API keys for custom integrations. Full REST API to pull
                packages, bookings and availability.
              </p>

              <span className="inline-block mt-4 px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs font-semibold">
                Large Only
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Top Rated Agencies Section */}
      {/* Real agencies from /marketplace/agencies only — no fixed count, no
          fabricated names/stats. Hidden entirely once there are none listable
          yet (an agency must be ACTIVE and on a paid tier to appear here). */}
      {agencies.length > 0 && (
        <section className="bg-[#f3f7ff] py-16">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-blue-600">🛡</span>
                  <span className="text-sm font-semibold tracking-[0.2em] text-blue-600">
                    VERIFIED PARTNERS
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-[#07152d]">
                  Top Rated Agencies
                </h2>

                <p className="mt-3 text-gray-600 text-base">
                  Independently verified trekking operators with proven safety
                  records
                </p>
              </div>

              {/* Browse Button */}
              <Link
                href={ROUTES.AGENCIES}
                className="hidden md:flex items-center gap-2 rounded-xl border-2 border-blue-200 bg-white px-6 py-3 text-sm font-medium text-[#07152d] transition-all duration-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
              >
                <span className="text-lg">→</span>
                Browse All {stats?.totalAgencies ?? agencies.length} Agencies
              </Link>
            </div>

            {/* Agency Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {agencies.slice(0, 8).map((agency) => {
                const initials = agency.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();
                return (
                  <Link
                    key={agency.id}
                    href={ROUTES.AGENCY(agency.slug)}
                    className="group rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                          {initials}
                        </div>

                        <h3 className="font-semibold text-gray-900">{agency.name}</h3>
                      </div>

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                        {agency.tier}
                      </span>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-sm">
                      <span className="text-orange-400">{"★".repeat(Math.round(agency.rating))}</span>
                      <span className="font-semibold text-gray-900">{agency.rating.toFixed(1)}</span>
                      <span className="text-gray-400">({agency.review_count})</span>
                    </div>

                    {agency.verified && (
                      <div className="mt-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          ✓ Verified
                        </span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
      {/* How FunTush Works Section */}
      <section className="bg-[#f3f7ff] py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#07152d]">
              How FunTush Works
            </h2>

            <p className="mt-4 text-gray-600">
              From discovery to summit in four simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Connecting Line */}
            <div className="absolute left-[12%] right-[12%] top-7 hidden h-0.5 bg-blue-200 lg:block" />

            {/* Step 1 */}
            <div className="group relative z-10 rounded-2xl border border-blue-100 bg-white px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl">
              {/* Number */}
              <div className="relative z-20 mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg">
                1
              </div>

              {/* Icon */}
              <div className="mt-6 text-4xl text-blue-600">🔍</div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Search & Compare
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Browse packages from verified agencies. Filter by
                destination, duration, budget and difficulty.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group relative z-10 rounded-2xl border-2 border-blue-100 bg-white px-6 py-7 text-center shadow-[0_10px_35px_rgba(37,99,235,0.12)] transition-all duration-300 hover:-translate-y-1  hover:border-blue-400  hover:shadow-xl">
              {/* Number */}
              <div className="relative z-20 mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg">
                2
              </div>

              {/* Icon */}
              <div className="mt-6 text-4xl text-blue-600">💬</div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Connect with Agency
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Send an inquiry, ask questions and get a custom quote directly
                from your chosen agency.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group relative z-10 rounded-2xl border border-blue-100 bg-white px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl">
              {/* Number */}
              <div className="relative z-20 mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg">
                3
              </div>

              {/* Icon */}
              <div className="mt-6 text-4xl text-blue-600">💳</div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Book Securely
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Pay via Stripe, eSewa, Khalti or bank transfer. Instant
                confirmation and receipt.
              </p>
            </div>

            {/* Step 4 */}
            <div className="group relative z-10 rounded-2xl border border-blue-100 bg-white px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl">
              {/* Number */}
              <div className="relative z-20 mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg">
                4
              </div>

              {/* Icon */}
              <div className="mt-6 text-4xl text-blue-600">🏔️</div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Trek with Confidence
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Live GPS tracking, 24/7 SOS support and emergency contacts
                active for your entire journey.
              </p>
            </div>
          </div>

          {/* Safety Guarantee */}
          <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-blue-200 bg-blue-50 px-7 py-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="text-3xl text-blue-600">🛡️</div>

              <div>
                <h3 className="font-bold text-gray-900">
                  FunTush Safety Guarantee
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Every trek monitored live. Guides carry emergency devices. SOS
                  alerts authorities in under 60 seconds.
                </p>
              </div>
            </div>

            <button className="shrink-0 rounded-xl border-2 border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-[#07152d] transition-all duration-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-md">
              🛡️ Learn About Safety
            </button>
          </div>
        </div>
      </section>
      {/* Reviews / Testimonials Section */}
      {/* Real reviews from /marketplace/stats only — no fixed review count,
          no invented reviewers. Hidden entirely once there are none yet. */}
      {stats && stats.recentReviews.length > 0 && (
        <section className="bg-[#f3f7ff] py-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.25em] text-blue-500 uppercase mb-3">
                “ Real Reviews
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-[#071a38] mb-4">
                What Our Community Says
              </h2>

              {/* Rating */}
              <div className="flex items-center justify-center gap-3">
                <div className="text-yellow-500 text-xl tracking-wide">
                  {"★".repeat(Math.round(stats.averageRating ?? 0))}
                </div>

                <span className="font-semibold text-gray-900">{stats.averageRating?.toFixed(1)}</span>

                <span className="text-gray-500">
                  from {stats.totalReviews} verified review{stats.totalReviews === 1 ? "" : "s"}
                </span>
              </div>
            </div>

            {/* Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.recentReviews.map((review) => {
                const initials = review.trekkerName
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();
                return (
                  <div
                    key={review.id}
                    className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="text-yellow-500 text-lg tracking-wide mb-4">{"★".repeat(review.rating)}</div>

                    <p className="text-gray-700 text-[15px] leading-7 italic mb-6">{review.text}</p>

                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {initials}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">{review.trekkerName}</h3>
                        <p className="text-xs text-blue-400 mt-1">{review.agencyName}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
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
      <h3 className="text-lg font-extrabold text-white">{title}</h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

