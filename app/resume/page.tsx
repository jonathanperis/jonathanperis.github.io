"use client";

import Link from "next/link";
import { PROFILE, SKILLS, EDUCATION, EXPERIENCES } from "../lib/data";

export default function ResumePage() {
  return (
    <>
      {/* Print / Download bar — hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-bg border-b border-border">
        <div className="max-w-[800px] mx-auto px-8 py-3 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm text-muted hover:text-green transition-colors">
            &larr; Back to portfolio
          </Link>
          <button
            onClick={() => window.print()}
            className="font-mono text-xs text-bg bg-green hover:bg-green-dim px-4 py-1.5 rounded-md transition-colors font-semibold"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Resume content — optimized for A4 print */}
      <div className="resume-page max-w-[800px] mx-auto px-8 py-10 print:px-0 print:py-0 print:max-w-none">

        {/* Header */}
        <header className="mb-6 print:mb-4">
          <h1 className="text-3xl font-bold text-text print:text-black tracking-tight">
            {PROFILE.name}
          </h1>
          <p className="mt-1 text-lg text-green print:text-gray-700 font-medium">
            {PROFILE.title}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted print:text-gray-500 font-mono">
            <span>{PROFILE.email}</span>
            <span>{PROFILE.location}</span>
            <span>{PROFILE.linkedin}</span>
            <span>{PROFILE.github}</span>
            <span>{PROFILE.website}</span>
          </div>
        </header>

        <hr className="border-border print:border-gray-300 mb-5 print:mb-3" />

        {/* Summary */}
        <section className="mb-6 print:mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-green print:text-gray-800 mb-2 print:mb-1">
            Summary
          </h2>
          <p className="text-sm text-muted print:text-gray-600 leading-relaxed">
            {PROFILE.summary}
          </p>
        </section>

        {/* Skills */}
        <section className="mb-6 print:mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-green print:text-gray-800 mb-2 print:mb-1">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
            <div>
              <span className="text-text print:text-black font-medium">Languages: </span>
              <span className="text-muted print:text-gray-600">{SKILLS.languages.join(", ")}</span>
            </div>
            <div>
              <span className="text-text print:text-black font-medium">Backend: </span>
              <span className="text-muted print:text-gray-600">{SKILLS.backend.join(", ")}</span>
            </div>
            <div>
              <span className="text-text print:text-black font-medium">Architecture: </span>
              <span className="text-muted print:text-gray-600">{SKILLS.architecture.join(", ")}</span>
            </div>
            <div>
              <span className="text-text print:text-black font-medium">Cloud & DevOps: </span>
              <span className="text-muted print:text-gray-600">{SKILLS.cloud.join(", ")}</span>
            </div>
            <div>
              <span className="text-text print:text-black font-medium">Databases: </span>
              <span className="text-muted print:text-gray-600">{SKILLS.databases.join(", ")}</span>
            </div>
            <div>
              <span className="text-text print:text-black font-medium">Frontend: </span>
              <span className="text-muted print:text-gray-600">{SKILLS.frontend.join(", ")}</span>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-6 print:mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-green print:text-gray-800 mb-3 print:mb-2">
            Experience
          </h2>
          <div className="space-y-4 print:space-y-2">
            {EXPERIENCES.map((exp) => (
              <div key={`${exp.company}-${exp.period}`} className="print:break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-semibold text-text print:text-black">
                    {exp.title} <span className="font-normal text-muted print:text-gray-500">· {exp.company}</span>
                  </h3>
                  <span className="text-xs text-muted print:text-gray-500 font-mono whitespace-nowrap shrink-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-dim print:text-gray-400 font-mono mt-0.5">
                  {exp.location}
                </p>
                <p className="text-sm text-muted print:text-gray-600 leading-relaxed mt-1">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {exp.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono text-green print:text-gray-600 bg-green-tint print:bg-gray-100 px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6 print:mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-green print:text-gray-800 mb-2 print:mb-1">
            Education
          </h2>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-sm font-semibold text-text print:text-black">
              {EDUCATION.degree} — {EDUCATION.field}
            </h3>
            <span className="text-xs text-muted print:text-gray-500 font-mono whitespace-nowrap shrink-0">
              {EDUCATION.period}
            </span>
          </div>
          <p className="text-xs text-dim print:text-gray-400 font-mono mt-0.5">
            {EDUCATION.institution}
          </p>
          <p className="text-sm text-muted print:text-gray-600 leading-relaxed mt-1">
            {EDUCATION.description}
          </p>
        </section>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
            font-size: 11px !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          body::before {
            display: none !important;
          }
          .resume-page {
            padding: 0.4in 0.5in !important;
            max-width: none !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
}
