export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
