import './globals.css';
export const metadata = { title: 'MELT — Media Studio', description: 'A beautifully simple media format studio' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}