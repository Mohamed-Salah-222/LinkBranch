import { useParams } from "react-router-dom";
import { useGetPublicProfile } from "../hooks/useUser.js"; // Added .js extension
import { useTrackClick } from "../hooks/useLinks.js"; // <-- Import the new hook

const PublicProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { data, isLoading, isError, error } = useGetPublicProfile(username);

  const { mutate: trackClick } = useTrackClick(); // <-- Get the mutation function

  const handleLinkClick = (linkId: string) => {
    // Call our mutation to track the click in the background
    trackClick(linkId);
  };

  console.log("Username:", username);
  console.log("isLoading:", isLoading);
  console.log("isError:", isError);
  console.log("error:", error);
  console.log("data:", data);

  if (isLoading) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center">Error: {error.message}</div>;
  }

  if (!data) return null;

  // KEY FIX: Move this line to be AFTER the loading and error checks.
  // If the code reaches this point, TypeScript knows 'data' is defined.
  const { profile, links } = data;

  return (
    <div
      className="min-h-screen p-4 flex justify-center"
      style={{
        backgroundColor: profile.appearance?.backgroundColor || "#ffffff",
        fontFamily: profile.appearance?.font || "Arial, sans-serif",
      }}
    >
      <div className="w-full max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="text-center my-8">
          <img src={profile.profileImageUrl || "https://via.placeholder.com/96"} alt={profile.displayName} className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
          <h1 className="font-bold text-2xl" style={{ color: profile.appearance?.buttonColor || "#000000" }}>
            {profile.displayName}
          </h1>
          <p className="mt-2" style={{ color: profile.appearance?.buttonColor || "#000000" }}>
            {profile.bio || "No bio available"}
          </p>
        </div>

        {/* Links List */}
        <div className="space-y-4">
          {links?.map((link) => (
            <a
              key={link._id}
              href={link.url}
              onClick={() => handleLinkClick(link._id)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center p-4 rounded-lg font-semibold transition-transform hover:scale-105"
              style={{
                backgroundColor: profile.appearance?.buttonColor || "#007bff",
                color: profile.appearance?.backgroundColor || "#ffffff",
              }}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
