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
    if (window.confirm("Are you sure you want to delete this link?")) {
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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200 hover:bg-stone-50 transition-all duration-200">
      {isEditing ? (
        // --- EDITING VIEW ---
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Title</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-400 
                       text-stone-800 font-medium transition-all duration-200
                       hover:border-stone-300"
              placeholder="Enter link title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">URL</label>
            <input
              type="url"
              value={editedUrl}
              onChange={(e) => setEditedUrl(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-400 
                       text-stone-800 font-medium transition-all duration-200
                       hover:border-stone-300"
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="flex items-center gap-2 justify-end pt-2">
            <button onClick={() => setIsEditing(false)} className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-all duration-200" aria-label="Cancel edit">
              <X size={18} />
            </button>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="p-2 text-white bg-stone-700 rounded-lg 
                       hover:bg-stone-800 disabled:bg-stone-400
                       transition-all duration-200 flex items-center justify-center"
              aria-label="Save changes"
            >
              {isUpdating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={18} />}
            </button>
          </div>
        </div>
      ) : (
        // --- DISPLAY VIEW ---
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-bold text-sm text-stone-800 truncate">{link.title}</p>
              <ExternalLink className="w-4 h-4 text-stone-400" />
            </div>
            <p className="text-stone-500 text-sm truncate">{link.url}</p>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg 
                       transition-all duration-200"
              aria-label="Edit link"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg 
                       transition-all duration-200"
              aria-label="Delete link"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkItem;
