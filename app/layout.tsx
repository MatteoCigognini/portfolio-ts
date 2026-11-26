import type { ReactNode } from 'react';

// Il vero root layout (con <html lang>) è in app/[lang]/layout.tsx:
// questo serve solo a Next per le pagine fuori dalla lingua (es. /_not-found).
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
