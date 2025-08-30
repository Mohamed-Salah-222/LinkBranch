import type { User, Link } from "../../../packages/types";
import { ExternalLink } from "lucide-react";

interface LivePreviewProps {
  user: User | null;
  links: Link[];
  appearance: User["appearance"];
}

const LivePreview = ({ user, links, appearance }: LivePreviewProps) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Sleek Phone Frame */}
      <div className="relative p-1 bg-gradient-to-b from-stone-300 to-stone-400 rounded-[28px] shadow-xl">
        {/* Inner Phone Screen */}
        <div
          className="w-full h-[720px] rounded-[24px] overflow-y-auto relative"
          style={{
            backgroundColor: appearance.backgroundColor,
            fontFamily: appearance.font,
          }}
        >
          {/* Subtle Background Texture */}
          <div className="absolute inset-0 opacity-3 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none"></div>

          {/* Content Container */}
          <div className="relative z-10 p-6 flex flex-col items-center space-y-6">
            {/* Profile Section */}
            <div className="flex flex-col items-center space-y-4 pt-6">
              <div className="relative group">
                <img src={user?.profileImageUrl || "https://via.placeholder.com/96"} alt="Profile" className="w-24 h-24 rounded-full object-cover shadow-lg border-3 border-white/70 transition-transform duration-300 group-hover:scale-105" />
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse"></div>
                {/* Subtle Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="font-bold text-xl tracking-wide transition-colors duration-300" style={{ color: appearance.buttonColor }}>
                  @{user?.username || "username"}
                </h2>
                <p className="text-sm leading-relaxed max-w-xs transition-colors duration-300" style={{ color: appearance.buttonColor, opacity: 0.75 }}>
                  {user?.bio || "Welcome to my digital garden 🌱"}
                </p>
              </div>
            </div>

            {/* Links Section */}
            <div className="w-full space-y-3 pt-2">
              {links.length > 0 ? (
                links.map((link, index) => (
                  <div
                    key={link._id}
                    className="relative group animate-fadeInUp"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-4 px-6 rounded-2xl font-semibold text-sm
                               transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
                               border border-white/15 backdrop-blur-sm
                               hover:border-white/30 active:scale-[0.98]
                               relative overflow-hidden group shadow-sm"
                      style={{
                        backgroundColor: appearance.buttonColor,
                        color: appearance.backgroundColor,
                        boxShadow: `0 4px 20px ${appearance.buttonColor}20`,
                      }}
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                      {/* Link Content */}
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        <span className="truncate">{link.title}</span>
                        <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-90 transition-all duration-200 flex-shrink-0" />
                      </div>

                      {/* Subtle Inner Glow */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 space-y-4 opacity-70">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="text-2xl">🌱</div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium" style={{ color: appearance.buttonColor, opacity: 0.8 }}>
                      Your garden awaits
                    </p>
                    <p className="text-xs" style={{ color: appearance.buttonColor, opacity: 0.6 }}>
                      Add links to see them bloom here
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Footer Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-b-[24px]"></div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(15px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fadeInUp {
      animation: fadeInUp 0.8s ease-out;
    }
  `,
        }}
      />
    </div>
  );
};

export default LivePreview;
