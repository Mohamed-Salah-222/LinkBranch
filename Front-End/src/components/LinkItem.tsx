import { useState } from "react";
import type { Link } from "../../../packages/types/index.js";
import { Pencil, Trash2, Save, X, ExternalLink } from "lucide-react";
import { useUpdateLink, useDeleteLink } from "../hooks/useLinks";

interface LinkItemProps {
  link: Link;
}

const LinkItem = ({ link }: LinkItemProps) => {
  // 1. State for managing edit mode and form inputs
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(link.title);
  const [editedUrl, setEditedUrl] = useState(link.url);

  // 2. Get the mutation functions from our hooks
  const { mutate: deleteLink } = useDeleteLink();
  const { mutate: updateLink, isPending: isUpdating } = useUpdateLink();

  const handleDelete = () => {
    // Add a confirmation before deleting
    if (window.confirm("Are you sure you want to uproot this link? 🌱")) {
      deleteLink(link._id);
    }
  };

  const handleUpdate = () => {
    updateLink(
      { linkId: link._id, data: { title: editedTitle, url: editedUrl } },
      {
        onSuccess: () => {
          setIsEditing(false); // Exit edit mode on success
        },
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-stone-200/50 hover:shadow-lg transition-all duration-300 group">
      {isEditing ? (
        // --- EDITING VIEW ---
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-4 py-3 pt-6 bg-white/80 border-2 border-stone-200 rounded-xl shadow-sm 
                       focus:outline-none focus:ring-3 focus:ring-emerald-200 focus:border-emerald-400 
                       text-stone-800 font-medium transition-all duration-200
                       hover:border-stone-300 peer"
              placeholder=" "
              required
            />
            <label
              className="absolute left-4 top-3 text-stone-500 text-sm font-semibold tracking-wide
                       transition-all duration-200 pointer-events-none
                       peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-emerald-600
                       peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-75"
            >
              Title
            </label>
          </div>

          <div className="relative">
            <input
              type="url"
              value={editedUrl}
              onChange={(e) => setEditedUrl(e.target.value)}
              className="w-full px-4 py-3 pt-6 bg-white/80 border-2 border-stone-200 rounded-xl shadow-sm 
                       focus:outline-none focus:ring-3 focus:ring-emerald-200 focus:border-emerald-400 
                       text-stone-800 font-medium transition-all duration-200
                       hover:border-stone-300 peer"
              placeholder=" "
              required
            />
            <label
              className="absolute left-4 top-3 text-stone-500 text-sm font-semibold tracking-wide
                       transition-all duration-200 pointer-events-none
                       peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-emerald-600
                       peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-75"
            >
              URL
            </label>
          </div>

          <div className="flex items-center gap-3 justify-end pt-2">
            <button onClick={() => setIsEditing(false)} className="p-3 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-all duration-200" aria-label="Cancel edit">
              <X size={20} />
            </button>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="p-3 text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl 
                       hover:from-emerald-700 hover:to-green-700 disabled:from-stone-400 disabled:to-stone-500
                       transform transition-all duration-200 hover:scale-105 active:scale-95
                       shadow-lg hover:shadow-xl"
              aria-label="Save changes"
            >
              {isUpdating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={20} />}
            </button>
          </div>
        </div>
      ) : (
        // --- DISPLAY VIEW ---
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-bold text-lg text-stone-800 truncate">{link.title}</p>
              <ExternalLink className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <p className="text-stone-500 text-sm truncate">{link.url}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              className="p-3 text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl 
                       transition-all duration-200 transform hover:scale-105"
              aria-label="Edit link"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-3 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl 
                       transition-all duration-200 transform hover:scale-105"
              aria-label="Delete link"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkItem;
