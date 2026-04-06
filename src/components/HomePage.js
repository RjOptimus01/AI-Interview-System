import React from "react";
import { Award, Mic, Target, Upload } from "lucide-react";
import { average, BRAND_NAME, BrandMark, FeatureCard, StatCard, formatDateTime } from "./SharedUI";

export const HomePage = ({ currentUser, setCurrentPage, sessionHistory }) => {
  const latestSession = sessionHistory[sessionHistory.length - 1];
  const avgScore = Math.round(average(sessionHistory.map((item) => item.score || 0)));

  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl lg:grid-cols-[1.4fr_0.9fr]">
        <div>
          <div className="mb-5">
            <BrandMark invert />
          </div>
          <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
            Practice resume-based interviews with feedback that actually tells you what to improve.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Upload your resume, choose the round, answer by voice, and get detailed strengths, weaknesses, and
            improvement suggestions for every answer.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setCurrentPage("interview")} className="primary-button">
              Start Interview
            </button>
            <button onClick={() => setCurrentPage("dashboard")} className="secondary-button border-white/20 text-white hover:bg-white/10">
              View Dashboard
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <StatCard value={sessionHistory.length} label="Sessions completed" accent="from-cyan-500 to-blue-500" />
          <StatCard value={avgScore || 0} label="Average interview score" accent="from-emerald-500 to-green-500" />
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">Latest activity</p>
            <p className="mt-2 text-lg font-semibold">
              {latestSession ? `${latestSession.type} interview scored ${latestSession.score}/100` : "No interview yet"}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {latestSession ? formatDateTime(latestSession.date) : `Welcome, ${currentUser?.firstName || "User"}`}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <FeatureCard
          icon={<Upload className="h-6 w-6" />}
          title="Real resume parsing"
          description="Supports PDF, DOCX, and TXT files and extracts structured profile details automatically."
        />
        <FeatureCard
          icon={<Mic className="h-6 w-6" />}
          title="Voice-first interview flow"
          description="Questions are spoken aloud and answers can be captured directly from microphone input."
        />
        <FeatureCard
          icon={<Target className="h-6 w-6" />}
          title={`${BRAND_NAME} coaching`}
          description="Each question gets a score, speaking-quality feedback, and a concrete improvement suggestion."
        />
      </section>
    </div>
  );
};

export const TypeCountCard = ({ title, count, icon }) => (
  <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-slate-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{title}</p>
        <div className="mt-3 text-4xl font-black text-slate-900">{count}</div>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">{icon}</div>
    </div>
  </div>
);

export const HeroIcon = () => (
  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
    <Award className="h-5 w-5" />
  </div>
);
