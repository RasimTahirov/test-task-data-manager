'use client'

import { Roboto } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import "../styles/globals.css";

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={roboto.className}>
          {children}
        </body>
      </Provider>
    </html>
  );
}
