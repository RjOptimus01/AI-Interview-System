import React from "react";
import { Award, BarChart3, BookOpen, CalendarDays, FileText, Flame, Mic, Shield, Sparkles, Target, User } from "lucide-react";
import {
  average,
  cleanSkills,
  formatDateTime,
  initials,
  RankBadge,
  subtleSurfaceClass,
  surfaceClass,
} from "./SharedUI";
import { getBadgeMeta, getDailyChallengeStatus, getRankProgress } from "../utils/gamification";

const ChallengeStatePill = ({ status }) => {
  const meta = {
    available: {
      label: "Available Today",
      className: "soft-status-success text-emerald-100 dark:text-emerald-200",
    },
    completed_today: {
      label: "Completed Today",
      className: "soft-status-info text-[var(--app-text)]",
    },
    missed: {
      label: "Streak At Risk",
      className: "soft-status-warning text-[var(--app-accent)]",
    },
  };

  const item = meta[status] || meta.available;
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.className}`}>{item.label}</span>;
};

const DashboardMetric = ({ icon, label, value, detail }) => (
  <div className="dashboard-metric">
    <div className="dashboard-metric__icon">{icon}</div>
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-[0.18em] faint-copy">{label}</p>
      <p className="mt-2 text-3xl font-black text-[var(--app-text)]">{value}</p>
      <p className="mt-1 text-sm muted-copy">{detail}</p>
    </div>
  </div>
);

const DashboardAction = ({ icon, label, description, onClick, primary = false }) => (
  <button type="button" onClick={onClick} className={`dashboard-action ${primary ? "dashboard-action--primary" : ""}`}>
    <span className="dashboard-action__icon">{icon}</span>
    <span className="min-w-0 text-left">
      <span className="block font-extrabold">{label}</span>
      <span className="mt-1 block text-sm opacity-80">{description}</span>
    </span>
  </button>
);

const LastFiveInterviewChart = ({ sessions }) => {
  const recentSessions = [...sessions].slice(-5);
  const maxScore = 100;

  return (
    <div className="interview-chart">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow-label">Last 5 Interviews</p>
          <h4 className="mt-2 text-lg font-black text-[var(--app-text)]">Score Progress</h4>
        </div>
        <span className="rounded-full border border-[rgba(255,210,74,0.24)] px-3 py-1 text-xs font-bold text-[var(--app-accent)]">
          /100
        </span>
      </div>

      {recentSessions.length ? (
        <div className="interview-chart__plot" role="img" aria-label="Bar chart showing scores from the last five interviews">
          {recentSessions.map((session, index) => {
            const score = Math.max(0, Math.min(maxScore, Number(session.score || 0)));
            const height = Math.max(8, score);
            const label = session.type || `Session ${index + 1}`;

            return (
              <div className="interview-chart__item" key={`${session.date || "session"}-${index}`}>
                <div className="interview-chart__bar-track">
                  <div className="interview-chart__bar" style={{ height: `${height}%` }}>
                    <span>{score}</span>
                  </div>
                </div>
                <div className="interview-chart__label">
                  <span>{label}</span>
                  <small>{session.date ? new Date(session.date).toLocaleDateString() : `#${index + 1}`}</small>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`${subtleSurfaceClass} mt-4 p-4 text-sm muted-copy`}>
          Complete interviews to populate your score chart.
        </div>
      )}
    </div>
  );
};

const ProfileAvatar = ({ currentUser, profilePhoto }) => {
  const fullName = `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`.trim();

  if (profilePhoto) {
    return <img src={profilePhoto} alt="Profile" className="dashboard-avatar" />;
  }

  return <div className="dashboard-avatar dashboard-avatar--initials">{initials(fullName) || "U"}</div>;
};

const RankProgressCard = ({ gamification, nextRank }) => {
  const badge = getBadgeMeta(gamification.currentRank);
  const progress = getRankProgress(gamification.totalXp);

  return (
    <div className={`${surfaceClass} dashboard-panel`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <RankBadge badge={badge} size="md" />
          <div>
            <p className="text-sm muted-copy">Current rank</p>
            <p className="mt-1 text-2xl font-black text-[var(--app-text)]">{gamification.currentRank}</p>
          </div>
        </div>
        <div className={`${subtleSurfaceClass} px-4 py-3 text-right`}>
          <p className="text-xs uppercase tracking-[0.2em] faint-copy">XP</p>
          <p className="mt-1 text-2xl font-black text-[var(--app-text)]">{gamification.totalXp}</p>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between text-sm muted-copy">
          <span>{nextRank ? `${nextRank.name} unlock` : "Top rank reached"}</span>
          <span>{nextRank ? `${Math.max(0, nextRank.minXp - gamification.totalXp)} XP left` : "Complete"}</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500" style={{ width: `${progress.progressPercent}%` }} />
        </div>
      </div>
    </div>
  );
};

export const PersonalDashboard = ({ currentUser, userData, setCurrentPage, sessionHistory, gamification, dailyChallenge, onStartDailyChallenge, nextRank }) => {
  const latestSession = sessionHistory[sessionHistory.length - 1];
  const avgScore = Math.round(average(sessionHistory.map((item) => item.score || 0)));
  const dailyChallengeStatus = getDailyChallengeStatus(gamification, dailyChallenge);
  const profile = userData?.profile || {};
  const profilePhoto = profile.profilePhoto || "";
  const skills = cleanSkills(profile.skills || userData?.latestCandidateProfile?.skills || []);
  const phone = profile.phone || userData?.latestCandidateProfile?.phone || "";
  const profileItems = [
    currentUser?.firstName,
    currentUser?.lastName,
    currentUser?.email,
    phone,
    profilePhoto,
    skills.length ? "skills" : "",
  ];
  const profileCompletion = Math.round((profileItems.filter(Boolean).length / profileItems.length) * 100);

  return (
    <div className="dashboard-shell">
      <section className="dashboard-welcome">
        <div className="dashboard-welcome__copy">
          <p className="eyebrow-label">Personal Dashboard</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-[var(--app-text)] sm:text-4xl">
            Welcome back, {currentUser?.firstName || "User"}
          </h2>
        </div>
        <div className="dashboard-profile-card">
          <ProfileAvatar currentUser={currentUser} profilePhoto={profilePhoto} />
          <div className="min-w-0">
            <p className="truncate text-lg font-black text-[var(--app-text)]">
              {`${currentUser?.firstName || "User"} ${currentUser?.lastName || ""}`.trim()}
            </p>
            <p className="truncate text-sm muted-copy">{currentUser?.email || "No email saved"}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-amber-500" style={{ width: `${profileCompletion}%` }} />
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] faint-copy">{profileCompletion}% profile complete</p>
          </div>
        </div>
      </section>

      <section className="dashboard-actions-grid">
        <DashboardAction primary icon={<Mic className="h-5 w-5" />} label="Start Interview" description="Launch a regular mock session" onClick={() => setCurrentPage("interview")} />
        <DashboardAction icon={<Target className="h-5 w-5" />} label="Daily Challenge" description="Keep your practice streak alive" onClick={onStartDailyChallenge} />
        <DashboardAction icon={<FileText className="h-5 w-5" />} label="ATS Checker" description="Analyze resume fit and mistakes" onClick={() => setCurrentPage("ats")} />
        <DashboardAction icon={<BookOpen className="h-5 w-5" />} label="Courses" description="Open company prep tracks" onClick={() => setCurrentPage("courses")} />
      </section>

      <section className="dashboard-metrics-grid">
        <DashboardMetric icon={<Sparkles className="h-5 w-5" />} label="Total XP" value={gamification.totalXp} detail="Earned through completed practice" />
        <DashboardMetric icon={<Shield className="h-5 w-5" />} label="Rank" value={gamification.currentRank} detail={`${gamification.earnedBadges.length} badges unlocked`} />
        <DashboardMetric icon={<Flame className="h-5 w-5" />} label="Streak" value={gamification.currentStreak} detail={`Longest streak: ${gamification.longestStreak}`} />
        <DashboardMetric icon={<BarChart3 className="h-5 w-5" />} label="Avg Score" value={avgScore || 0} detail={`${sessionHistory.length} sessions completed`} />
      </section>

      <section className="dashboard-main-grid">
        <div className="space-y-6">
          <div className={`${surfaceClass} dashboard-panel dashboard-challenge-card`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--app-accent)]">
                  <CalendarDays className="h-4 w-4" />
                  Today's Challenge
                </div>
                <h3 className="mt-3 text-2xl font-black text-[var(--app-text)]">{dailyChallenge.title}</h3>
              </div>
              <ChallengeStatePill status={dailyChallengeStatus} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
              <span className="accent-pill">{dailyChallenge.interviewType}</span>
              <span className="accent-pill">{dailyChallenge.sessionMode === "camera" ? "Camera" : "Voice Only"}</span>
              <span className="accent-pill">{dailyChallenge.dateKey}</span>
            </div>
            <button type="button" onClick={onStartDailyChallenge} className="primary-button mt-5">
              Start Daily Challenge
            </button>
          </div>

          <div className={`${surfaceClass} dashboard-panel`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow-label">Recent Activity</p>
                <h3 className="mt-3 text-2xl font-black text-[var(--app-text)]">
                  {latestSession ? `${latestSession.type} interview completed` : "No interview completed yet"}
                </h3>
                <p className="mt-2 text-sm muted-copy">
                  {latestSession ? formatDateTime(latestSession.date) : "Start your first session to build a practice timeline."}
                </p>
              </div>
              <button type="button" onClick={() => setCurrentPage("progress")} className="secondary-button">
                View Progress
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className={`${subtleSurfaceClass} p-4`}>
                <p className="text-xs uppercase tracking-[0.18em] faint-copy">Latest score</p>
                <p className="mt-2 text-2xl font-black text-[var(--app-text)]">{latestSession ? `${latestSession.score}/100` : "-"}</p>
              </div>
              <div className={`${subtleSurfaceClass} p-4`}>
                <p className="text-xs uppercase tracking-[0.18em] faint-copy">Rating</p>
                <p className="mt-2 text-2xl font-black text-[var(--app-text)]">{latestSession ? `${latestSession.rating}/10` : "-"}</p>
              </div>
              <div className={`${subtleSurfaceClass} p-4`}>
                <p className="text-xs uppercase tracking-[0.18em] faint-copy">XP reward</p>
                <p className="mt-2 text-2xl font-black text-[var(--app-text)]">{latestSession?.xpAwarded ? `+${latestSession.xpAwarded}` : "-"}</p>
              </div>
            </div>
            <LastFiveInterviewChart sessions={sessionHistory} />
          </div>
        </div>

        <aside className="space-y-6">
          <RankProgressCard gamification={gamification} nextRank={nextRank} />

          <div className={`${surfaceClass} dashboard-panel`}>
            <div className="flex items-center gap-3">
              <div className="dashboard-metric__icon">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="eyebrow-label">Profile Snapshot</p>
                <h3 className="mt-1 text-xl font-black text-[var(--app-text)]">Prep identity</h3>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div className={`${subtleSurfaceClass} px-4 py-3`}>
                <p className="text-xs uppercase tracking-[0.18em] faint-copy">Phone</p>
                <p className="mt-1 text-sm font-semibold text-[var(--app-text)]">{phone || "Not added yet"}</p>
              </div>
              <div className={`${subtleSurfaceClass} px-4 py-3`}>
                <p className="text-xs uppercase tracking-[0.18em] faint-copy">Skills</p>
                {skills.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-[rgba(255,210,74,0.24)] bg-[rgba(255,210,74,0.12)] px-3 py-1 text-xs font-semibold text-[var(--app-accent)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1 text-sm muted-copy">Add skills in your profile to personalize prep context.</p>
                )}
              </div>
            </div>
            <button type="button" onClick={() => setCurrentPage("profile")} className="secondary-button mt-5 w-full">
              Edit Profile
            </button>
          </div>

          <div className={`${surfaceClass} dashboard-panel`}>
            <div className="flex items-center gap-3">
              <div className="dashboard-metric__icon">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="eyebrow-label">Badge Vault</p>
                <h3 className="mt-1 text-xl font-black text-[var(--app-text)]">{gamification.earnedBadges.length} unlocked</h3>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {gamification.earnedBadges.map((badgeName) => {
                const badgeMeta = getBadgeMeta(badgeName);
                return (
                  <div key={badgeName} className={`${subtleSurfaceClass} flex items-center gap-3 px-3 py-2`}>
                    <RankBadge badge={badgeMeta} size="sm" emphasize={badgeName === gamification.currentRank} />
                    <span className="text-sm font-semibold text-[var(--app-text)]">{badgeMeta.badgeLabel}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
