import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-aero-dark tracking-tight" style={{ fontFamily: 'Archivo, sans-serif' }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">Chromaksa</span> Studio
        </Link>
        <nav className="hidden md:flex gap-8">
          {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-800 font-medium hover:text-blue-500 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
