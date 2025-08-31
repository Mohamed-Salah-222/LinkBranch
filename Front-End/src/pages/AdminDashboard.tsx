import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useGetLinks } from "../hooks/useLinks";
import LinkItem from "../components/LinkItem";
import AddLinkForm from "../components/AddLinkForm";
import AppearanceTab from "../components/AppearanceTab";
import LivePreview from "../components/LivePreview";
import type { User } from "../../../packages/types";
import { Link, Settings } from "lucide-react";

type Tab = "links" | "appearance";

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>("links");

  // 1. "Lifted up" state for appearance, initialized with the user's current settings
  const [appearance, setAppearance] = useState<User["appearance"]>(
    user?.appearance || {
      theme: "light",
      backgroundColor: "#f0f9f0",
      buttonColor: "#22c55e",
      font: "Inter",
    }
  );

  const { data: links, isLoading, isError, error } = useGetLinks();

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-emerald-800 font-medium">Growing your dashboard...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-200 max-w-md">
          <div className="text-center space-y-3">
            <div className="text-4xl">🍂</div>
            <h2 className="text-xl font-bold text-red-800">Something went wrong</h2>
            <p className="text-red-600">{error.message}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1F0EE" }}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-emerald-900 via-transparent to-stone-900 pointer-events-none"></div>
      <div className="relative z-10 flex min-h-screen">
        {/* Top Navbar */}
        <div className="fixed top-0 left-64 right-0 border-b border-stone-200 z-20 h-16 flex items-center justify-between px-6" style={{ backgroundColor: "#F1F0EE" }}>
          <h1 className="text-xl font-bold text-emerald-900">My LinkBranch</h1>

          <div className="flex items-center gap-4">
            <div className="flex bg-stone-100 rounded-lg p-1">
              <button onClick={() => setActiveTab("links")} className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${activeTab === "links" ? "bg-white text-emerald-700 shadow-sm" : "text-stone-600 hover:text-stone-800"}`}>
                Links
              </button>
              <button onClick={() => setActiveTab("appearance")} className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${activeTab === "appearance" ? "bg-white text-emerald-700 shadow-sm" : "text-stone-600 hover:text-stone-800"}`}>
                Design
              </button>
            </div>

            <button className="p-2 text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 shadow-lg border-r border-stone-200 flex flex-col" style={{ backgroundColor: "#ECECE9" }}>
          {/* Username Section - Same height as navbar */}
          <div className="h-16 p-6 border-b border-stone-200 flex items-center">
            <div className="w-8 h-8 bg-stone-300 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h2 className="font-semibold text-sm text-stone-800">{user?.username}</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            <a href="#" className="flex items-center px-4 py-2 text-stone-700 hover:bg-stone-200 rounded-lg text-sm font-bold">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              My LinkBranch
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-stone-700 hover:bg-stone-200 rounded-lg text-sm font-bold">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Earn
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-stone-700 hover:bg-stone-200 rounded-lg text-sm font-bold">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Audience
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-stone-700 hover:bg-stone-200 rounded-lg text-sm font-bold">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Insights
            </a>

            {/* Tools Section */}
            <div className="pt-4">
              <h3 className="px-4 py-2 text-sm font-bold text-stone-500 uppercase tracking-wider">Tools</h3>
              <a href="#" className="flex items-center px-4 py-2 text-stone-700 hover:bg-stone-200 rounded-lg text-sm font-bold">
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Social Planner
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-stone-700 hover:bg-stone-200 rounded-lg text-sm font-bold">
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Instagram auto-reply
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-stone-700 hover:bg-stone-200 rounded-lg text-sm font-bold">
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Link shortener
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-stone-700 hover:bg-stone-200 rounded-lg text-sm font-bold">
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Post Ideas
              </a>
            </div>
          </nav>

          {/* Help Icon at Bottom */}
          <div className="p-4">
            <button className="w-10 h-10 bg-stone-100 border-2 border-stone-300 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-200 hover:border-stone-400 transition-all duration-200">
              <span className="text-base font-bold">?</span>
            </button>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex-1 pt-16 h-screen overflow-hidden">
          <div className="h-full flex">
            {/* Left Column: Controls */}
            <div className="w-1/2 p-6 overflow-y-auto">
              <div className="pt-4 space-y-6">
                {activeTab === "links" && (
                  <div className="space-y-8">
                    <AddLinkForm />

                    {/* Links Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-stone-500 rounded-lg">
                          <Link className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-lg font-bold text-stone-800">Your Growing Collection</h2>
                      </div>

                      <div className="space-y-3">
                        {links && links.length > 0 ? (
                          links.map((link, index) => (
                            <div
                              key={link._id}
                              style={{
                                animationDelay: `${index * 100}ms`,
                                animation: "slideInLeft 0.6s ease-out forwards",
                              }}
                            >
                              <LinkItem link={link} />
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 space-y-3">
                            <div className="w-16 h-16 mx-auto bg-stone-100 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                            </div>
                            <div className="space-y-1">
                              <p className="text-stone-700 font-semibold text-sm">Your link tree is ready to grow!</p>
                              <p className="text-stone-500 text-sm">Plant your first link above to get started</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <AppearanceTab appearance={appearance} setAppearance={setAppearance} />

                    {/* Tips Section */}
                    <div className="bg-white p-6 rounded-lg border border-stone-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-stone-100 rounded-lg">
                          <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-800 mb-2 text-sm">Design Tips</h4>
                          <ul className="text-sm text-stone-600 space-y-1 font-medium">
                            <li>• Choose colors that reflect your personality</li>
                            <li>• Ensure good contrast for readability</li>
                            <li>• Try our nature presets for inspiration</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Live Preview */}
            <div className="w-1/2 p-6 overflow-y-auto">
              <div className="pt-4 space-y-4">
                <LivePreview user={user} links={links || []} appearance={appearance} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    .animate-slideInLeft {
      animation: slideInLeft 0.6s ease-out forwards;
    }
  `,
        }}
      />
    </div>
  );
};

export default AdminDashboard;
