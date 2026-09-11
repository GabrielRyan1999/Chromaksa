import { motion } from 'framer-motion';

export default function Services() {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Our Pillars
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Illustration & Animation */}
          <motion.div 
            whileHover="hover"
            className="glass-panel p-8 group relative overflow-hidden"
          >
            <div className="relative h-48 mb-8 rounded-2xl bg-white/50 border border-white/60 flex items-center justify-center overflow-hidden">
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium"
                variants={{
                  hover: { opacity: 0 }
                }}
              >
                Illustration: [Line-Art Placeholder]
              </motion.div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-blue-600 font-bold bg-blue-50/80"
                initial={{ opacity: 0 }}
                variants={{
                  hover: { opacity: 1 }
                }}
              >
                Illustration: [Colored Animation Artwork]
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Illustration & Animation</h3>
            <p className="text-gray-700 text-lg">
              Hand-drawn by Aline, every frame tells a story. We transform your ideas into captivating visual narratives that connect with your audience on a human level.
            </p>
          </motion.div>

          {/* Technology & AI */}
          <motion.div 
            whileHover="hover"
            className="glass-panel p-8 group relative overflow-hidden"
          >
            <div className="relative h-48 mb-8 rounded-2xl bg-white/50 border border-white/60 flex items-center justify-center overflow-hidden">
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium"
                variants={{
                  hover: { opacity: 0 }
                }}
              >
                Illustration: [Tech Wireframe Placeholder]
              </motion.div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-green-600 font-bold bg-green-50/80"
                initial={{ opacity: 0 }}
                variants={{
                  hover: { opacity: 1 }
                }}
              >
                Illustration: [AI Conceptual Colored]
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Technology & AI</h3>
            <p className="text-gray-700 text-lg">
              Engineered by Ryan. We integrate modern tech stacks and AI safety practices to future-proof your digital presence, ensuring your brand stands out and scales safely.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
