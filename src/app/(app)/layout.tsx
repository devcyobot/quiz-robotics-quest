import type { Metadata } from "next";
import { QuizProvider } from "../../packages/client/context/QuizContext";

import {
  roboto,
  robotoCondensed,
  vt323,
} from "../../packages/client/styles/fonts";
import "../../packages/client/styles/globals.css";

export const metadata: Metadata = {
  title: "Robotics Quest Quiz",
  description: "Robotics Quest Quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-brand-purple-dark h-full md:h-screen ${vt323.variable} ${roboto.variable} ${robotoCondensed.variable}`}
      >
        <QuizProvider totalPages={10}>{children}</QuizProvider>
      </body>
    </html>
  );
}
