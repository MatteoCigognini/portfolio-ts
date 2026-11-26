import Link from 'next/link';
import { Mona_Sans } from 'next/font/google';
import './globals.css';

const sans = Mona_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

export default function NotFound() {
  return (
    <html lang="it" className={sans.variable}>
      <body>
        <main
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
            padding: 24,
          }}
        >
          <div>
            <p className="gradient-text" style={{ fontSize: 'clamp(5rem, 20vw, 10rem)', fontWeight: 800, lineHeight: 1 }}>
              404
            </p>
            <p style={{ marginTop: 16, color: 'var(--foreground-muted)' }}>Pagina non trovata · Page not found</p>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                marginTop: 32,
                padding: '12px 28px',
                borderRadius: 999,
                background: 'var(--gradient-button)',
                color: '#1a0a02',
                fontWeight: 600,
              }}
            >
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
