import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const [state, handleSubmit] = useForm('myeyyyaj');

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Let's Create Together
        </h2>
        <p className="text-gray-700 text-lg mb-10">
          Ready to bring your vision to life? Get in touch with us via email or follow our journey on our socials.
        </p>
        
        <div className="glass-panel-strong p-8">
          {state.succeeded ? (
            <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-6 rounded-xl font-bold">
              Thanks for reaching out! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input id="name" type="text" name="name" required className="w-full bg-white/90 border border-gray-300 shadow-inner text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input id="email" type="email" name="email" required className="w-full bg-white/90 border border-gray-300 shadow-inner text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea id="message" rows="4" name="message" required className="w-full bg-white/90 border border-gray-300 shadow-inner text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              <button type="submit" disabled={state.submitting} className="mt-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-lg py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {state.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
