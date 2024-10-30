import type { Metadata } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
    title: "The Happiest One",
    description: "Celebrating the happiest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link href="https://fonts.cdnfonts.com/css/inclusive-sans-2" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/freebooter-script" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/ephesis" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/tangerine" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/carattere" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/italianno" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/monsieur-la-doulaise" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/passions-conflict" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/ruthie" rel="stylesheet"/>
        </head>
        <body className={`antialiased`}>
        {children}
        </body>
        </html>
    );
}
