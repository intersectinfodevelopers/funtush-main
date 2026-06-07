export default function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Safety & Trust</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Safety Commitment</h2>
          <p className="text-gray-700">
            At Funtush, safety is our top priority. We verify all agencies and implement 
            strict safety standards to ensure trekkers have the best experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Verified Agencies</h2>
          <p className="text-gray-700">
            All agencies on Funtush go through a comprehensive verification process including 
            KYC checks and safety certifications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">GPS Tracking</h2>
          <p className="text-gray-700">
            Optional GPS tracking allows you to share your location with loved ones during 
            your trek for added peace of mind.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">SOS Support</h2>
          <p className="text-gray-700">
            24/7 SOS support available via WhatsApp. In case of emergency, reach us anytime.
          </p>
        </section>
      </div>
    </div>
  );
}
