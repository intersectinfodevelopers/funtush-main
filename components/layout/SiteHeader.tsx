import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
// import { SolutionsDropdown } from "./SolutionsDropdown";

export function SiteHeader() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          FunTush
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
  <Link
    href="#"
    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
  >
    Solutions
  </Link>

  <Link
    href="#"
    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
  >
    Product
  </Link>

  <Link
    href={ROUTES.PRICING}
    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
  >
    Pricing
  </Link>

  <Link
    href="#"
    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
  >
    Company
  </Link>

  <Link
    href={ROUTES.BLOG}
    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
  >
    Resources
  </Link>

  <Link
    href={ROUTES.AGENCIES}
    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
  >
    Agencies
  </Link>

  <Link
    href="#"
    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
  >
    Destinations
  </Link>
</nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.LOGIN}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Live
          </Link>

          <Link
            href={ROUTES.REGISTER}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            sign-in
          </Link>
        </div>

      </div>
    </header>
  );
}