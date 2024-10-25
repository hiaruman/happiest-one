import type { Metadata } from "next";
import localFont from "next/font/local";
import {Cinzel} from "next/dist/compiled/@next/font/dist/google";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const cinzel = Cinzel({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: "The Happiest One",
    description: "Celebrating the happiest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    console.log('Cinzel ==> ', Cinzel);
    return (
        <html lang="en">
            <body className={`${cinzel.className} antialiased`}>
            {children}
            </body>
        </html>
    );
}
