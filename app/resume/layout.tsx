import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Jonathan Peris",
  description:
    "Professional resume of Jonathan Peris — Software Engineer with 12+ years of experience in .NET and Fintech.",
};

export default function ResumeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
