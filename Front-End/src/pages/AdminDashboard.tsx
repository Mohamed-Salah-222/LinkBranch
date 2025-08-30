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
        <div className="w-64  shadow-lg border-r border-stone-200 flex flex-col" style={{ backgroundColor: "#F1F0EE" }}>
          {/* Username Section - Same height as navbar */}
          <div className="h-16 p-6 border-b border-stone-200 flex items-center">
            <h2 className="font-bold text-lg text-stone-800">@{user?.username}</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            <a href="#" className="block px-4 py-3 text-stone-700 hover:bg-emerald-50 rounded-lg font-medium">
              My LinkBranch
            </a>
            <a href="#" className="block px-4 py-3 text-stone-700 hover:bg-emerald-50 rounded-lg">
              Earn
            </a>
            <a href="#" className="block px-4 py-3 text-stone-700 hover:bg-emerald-50 rounded-lg">
              Audience
            </a>
            <a href="#" className="block px-4 py-3 text-stone-700 hover:bg-emerald-50 rounded-lg">
              Insights
            </a>

            {/* Tools Section */}
            <div className="pt-4">
              <h3 className="px-4 py-2 text-sm font-semibold text-stone-500 uppercase tracking-wider">Tools</h3>
              <a href="#" className="block px-4 py-2 text-stone-600 hover:bg-emerald-50 rounded-lg text-sm">
                Social Planner
              </a>
              <a href="#" className="block px-4 py-2 text-stone-600 hover:bg-emerald-50 rounded-lg text-sm">
                Instagram auto-reply
              </a>
              <a href="#" className="block px-4 py-2 text-stone-600 hover:bg-emerald-50 rounded-lg text-sm">
                Link shortener
              </a>
              <a href="#" className="block px-4 py-2 text-stone-600 hover:bg-emerald-50 rounded-lg text-sm">
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
                    <div className="bg-gradient-to-br from-white to-stone-50/30 p-8 rounded-2xl shadow-lg border border-stone-200/50">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-stone-600 rounded-lg">
                          <Link className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-stone-800">Your Growing Collection</h2>
                      </div>

                      <div className="space-y-4">
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
                          <div className="text-center py-12 space-y-4">
                            <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                              <div className="text-3xl">🌳</div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-stone-600 font-medium">Your link tree is ready to grow!</p>
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
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200/50">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">💡</div>
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-2">Design Tips</h4>
                          <ul className="text-sm text-amber-700 space-y-1">
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
