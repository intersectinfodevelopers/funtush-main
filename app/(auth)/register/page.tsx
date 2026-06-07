import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Choose Your Account Type</h1>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Link
            href="/register/agency"
            className="p-6 border border-gray-300 rounded-lg text-center hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold">I'm an Agency</h2>
            <p className="text-gray-600 mt-2">List your treks and manage bookings</p>
          </Link>

          <Link
            href="/register/trekker"
            className="p-6 border border-gray-300 rounded-lg text-center hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold">I'm a Trekker</h2>
            <p className="text-gray-600 mt-2">Book amazing treks and connect with agencies</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
