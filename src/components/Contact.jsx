import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const [state, handleSubmit] = useForm('myeyyyaj');

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-3xl text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-800 tracking-tight" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Let's Create Together
        </h2>
        <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto">
          Ready to bring your vision to life? Get in touch with us via email or follow our journey on our socials.
        </p>
        
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 p-10 md:p-12 rounded-[3rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] relative z-10">
          {state.succeeded ? (
            <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-6 py-8 rounded-2xl font-bold shadow-inner">
              ✨ Thanks for reaching out! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
              <div>
                <label htmlFor="name" className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 pl-2">Name</label>
                <input id="name" type="text" name="name" required className="w-full bg-white/60 backdrop-blur-md border border-white/80 shadow-inner text-slate-900 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-slate-400" placeholder="John Doe" />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs font-bold mt-2 pl-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 pl-2">Email</label>
                <input id="email" type="email" name="email" required className="w-full bg-white/60 backdrop-blur-md border border-white/80 shadow-inner text-slate-900 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-slate-400" placeholder="hello@example.com" />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs font-bold mt-2 pl-2" />
              </div>
              <div>
                <label htmlFor="message" className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 pl-2">Message</label>
                <textarea id="message" rows="5" name="message" required className="w-full bg-white/60 backdrop-blur-md border border-white/80 shadow-inner text-slate-900 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none placeholder:text-slate-400" placeholder="Tell us about your project..."></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs font-bold mt-2 pl-2" />
              </div>
              <button type="submit" disabled={state.submitting} className="mt-4 bg-gradient-to-r from-cyan-500 to-green-500 text-white font-bold text-sm tracking-widest uppercase py-4 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {state.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
