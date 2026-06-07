import Link from 'next/link';
import { footerLinks } from '@/config/navigation';
import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h3 className="font-semibold text-white mb-4 capitalize">{key}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2024 {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
