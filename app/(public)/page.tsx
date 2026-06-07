import { HeroSearchBar } from '@/components/marketplace/search/SearchBar';

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-gray-600">
            Book authentic trekking experiences with verified agencies across Nepal
          </p>
          <div className="max-w-2xl mx-auto">
            <HeroSearchBar />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">200+</div>
              <p className="text-gray-600 mt-2">Trek Packages</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <p className="text-gray-600 mt-2">Verified Agencies</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">5000+</div>
              <p className="text-gray-600 mt-2">Happy Trekkers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
