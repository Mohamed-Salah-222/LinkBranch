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
      {/* Phone Frame */}
      <div className="relative p-1 bg-stone-300 rounded-[28px] shadow-lg">
        {/* Inner Phone Screen */}
        <div
          className="w-full h-[720px] rounded-[24px] overflow-y-auto relative"
          style={{
            backgroundColor: appearance.backgroundColor,
            fontFamily: appearance.font,
          }}
        >
          {/* Content Container */}
          <div className="relative p-6 flex flex-col items-center space-y-6">
            {/* Profile Section */}
            <div className="flex flex-col items-center space-y-4 pt-6">
              <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center border border-stone-300">
                <svg className="w-10 h-10 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              <div className="text-center space-y-2">
                <h2 className="font-bold text-lg" style={{ color: appearance.buttonColor }}>
                  {user?.username || "username"}
                </h2>
                <p className="text-sm font-medium" style={{ color: appearance.buttonColor, opacity: 0.7 }}>
                  {user?.bio || "Welcome to my link page"}
                </p>
              </div>
            </div>

            {/* Links Section */}
            <div className="w-full space-y-3 pt-2">
              {links.length > 0 ? (
                links.map((link) => (
                  <div key={link._id} className="w-full">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-3 px-4 rounded-lg font-bold text-sm
                               transition-all duration-200 hover:opacity-90
                               border border-stone-200"
                      style={{
                        backgroundColor: appearance.buttonColor,
                        color: appearance.backgroundColor,
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="truncate">{link.title}</span>
                        <ExternalLink className="w-4 h-4 opacity-60 flex-shrink-0" />
                      </div>
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center bg-stone-100 border border-stone-200">
                    <svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold" style={{ color: appearance.buttonColor, opacity: 0.8 }}>
                      No links yet
                    </p>
                    <p className="text-xs font-medium" style={{ color: appearance.buttonColor, opacity: 0.6 }}>
                      Add links to see them here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
