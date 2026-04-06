import "./utils/storage";
import "./App.css";
import React, { useEffect, useState } from "react";
import { BarChart3, BookOpen, FileText, Home, LogOut, Mic, Moon, Sun } from "lucide-react";
import { LoginPage, SignupPage } from "./components/AuthPages";
import { ATSChecker, InterviewCourses, ScoringDashboard } from "./components/DashboardAndExtras";
import { HomePage } from "./components/HomePage";
import { InterviewPractice } from "./components/InterviewPractice";
import { BrandMark, initials } from "./components/SharedUI";
const THEME_STORAGE_KEY = "theme_preference";

const NavButton = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
      active
        ? "bg-slate-900 text-white shadow-md dark:bg-slate-100 dark:text-slate-900"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }`}
  >
    {icon}
    {label}
  </button>
);

const getSystemTheme = () => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (nextTheme) => {
  document.documentElement.classList.toggle("dark", nextTheme === "dark");
};

const AIInterviewSystem = () => {
  const [theme, setTheme] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [currentPage, setCurrentPage] = useState("home");
  const [userData, setUserData] = useState(null);
  const [sessionHistory, setSessionHistory] = useState([]);

  useEffect(() => {
    const boot = async () => {
      let nextTheme = getSystemTheme();

      try {
        const storedTheme = await window.storage.get(THEME_STORAGE_KEY);
        nextTheme = storedTheme.value === "dark" ? "dark" : "light";
      } catch (error) {
        // No saved preference yet.
      }

      setTheme(nextTheme);
      applyTheme(nextTheme);

      try {
        const result = await window.storage.get("current_user");
        const user = JSON.parse(result.value);
        setCurrentUser(user);
        setIsAuthenticated(true);
        await loadUserState(user.email);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    boot();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mediaQuery) {
      return undefined;
    }

    const handleThemeChange = async (event) => {
      try {
        await window.storage.get(THEME_STORAGE_KEY);
        return;
      } catch (error) {
        const systemTheme = event.matches ? "dark" : "light";
        setTheme(systemTheme);
        applyTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener?.("change", handleThemeChange);

    return () => mediaQuery.removeEventListener?.("change", handleThemeChange);
  }, []);

  const toggleTheme = async () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    await window.storage.set(THEME_STORAGE_KEY, nextTheme);
  };

  const loadUserState = async (email) => {
    try {
      const storedData = await window.storage.get(`user_data_${email}`);
      setUserData(JSON.parse(storedData.value));
    } catch (error) {
      setUserData(null);
    }

    try {
      const storedHistory = await window.storage.get(`session_history_${email}`);
      setSessionHistory(JSON.parse(storedHistory.value));
    } catch (error) {
      setSessionHistory([]);
    }
  };

  const saveUserData = async (nextData) => {
    if (!currentUser) return;

    const merged = {
      ...(userData || {}),
      ...nextData,
    };

    await window.storage.set(`user_data_${currentUser.email}`, JSON.stringify(merged));
    setUserData(merged);
  };

  const addSessionToHistory = async (session) => {
    if (!currentUser) return;

    const nextHistory = [...sessionHistory, session];
    await window.storage.set(`session_history_${currentUser.email}`, JSON.stringify(nextHistory));
    setSessionHistory(nextHistory);
  };

  const handleLoginSuccess = async (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    await window.storage.set("current_user", JSON.stringify(user));
    await loadUserState(user.email);
  };

  const handleLogout = async () => {
    await window.storage.delete("current_user");
    setCurrentUser(null);
    setUserData(null);
    setSessionHistory([]);
    setIsAuthenticated(false);
    setCurrentPage("home");
    setAuthPage("login");
  };

  if (!isAuthenticated) {
    return authPage === "login" ? (
      <LoginPage setAuthPage={setAuthPage} onLoginSuccess={handleLoginSuccess} theme={theme} onToggleTheme={toggleTheme} />
    ) : (
      <SignupPage setAuthPage={setAuthPage} onSignupSuccess={handleLoginSuccess} theme={theme} onToggleTheme={toggleTheme} />
    );
  }

  let page = <HomePage currentUser={currentUser} setCurrentPage={setCurrentPage} sessionHistory={sessionHistory} />;

  if (currentPage === "interview") {
    page = <InterviewPractice currentUser={currentUser} saveUserData={saveUserData} addSessionToHistory={addSessionToHistory} />;
  } else if (currentPage === "ats") {
    page = <ATSChecker userData={userData} saveUserData={saveUserData} />;
  } else if (currentPage === "dashboard") {
    page = <ScoringDashboard sessionHistory={sessionHistory} />;
  } else if (currentPage === "courses") {
    page = <InterviewCourses />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button className="flex items-center gap-3" onClick={() => setCurrentPage("home")}>
            <BrandMark compact invert={theme === "dark"} />
          </button>

          <div className="hidden items-center gap-2 md:flex">
            <NavButton label="Home" active={currentPage === "home"} icon={<Home className="h-4 w-4" />} onClick={() => setCurrentPage("home")} />
            <NavButton label="Interview" active={currentPage === "interview"} icon={<Mic className="h-4 w-4" />} onClick={() => setCurrentPage("interview")} />
            <NavButton label="ATS" active={currentPage === "ats"} icon={<FileText className="h-4 w-4" />} onClick={() => setCurrentPage("ats")} />
            <NavButton label="Dashboard" active={currentPage === "dashboard"} icon={<BarChart3 className="h-4 w-4" />} onClick={() => setCurrentPage("dashboard")} />
            <NavButton label="Courses" active={currentPage === "courses"} icon={<BookOpen className="h-4 w-4" />} onClick={() => setCurrentPage("courses")} />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
            <div className="hidden rounded-2xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:flex sm:items-center sm:gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white dark:bg-slate-100 dark:text-slate-900">
                {initials(currentUser?.firstName || "U")}
              </div>
              <span>{currentUser?.firstName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-300"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{page}</main>
    </div>
  );
};

export default AIInterviewSystem;
