import { useState, type FormEvent } from "react";
import { useCreateLink } from "../hooks/useLinks";
import { Plus, Leaf } from "lucide-react";

const AddLinkForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const { mutate: createLink, isPending, isError, error } = useCreateLink();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createLink(
      { title, url },
      {
        onSuccess: () => {
          // Clear the form for a better user experience
          setTitle("");
          setUrl("");
        },
      }
    );
  };

  return (
    <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg border border-stone-200/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-600 rounded-lg">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-emerald-900">Plant a New Branch</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div className="relative">
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 pt-6 bg-white/80 border-2 border-stone-200 rounded-xl shadow-sm 
             focus:outline-none focus:ring-3 focus:ring-emerald-200 focus:border-emerald-400 
             text-stone-800 font-medium transition-all duration-200
             hover:border-stone-300 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="title"
            className="absolute left-4 top-3 text-stone-500 text-sm font-semibold tracking-wide
             transition-all duration-200 pointer-events-none
             peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-emerald-600
             peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-75"
          >
            Link Title
          </label>
        </div>

        {/* URL Input */}
        <div className="relative">
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 pt-6 bg-white/80 border-2 border-stone-200 rounded-xl shadow-sm 
             focus:outline-none focus:ring-3 focus:ring-emerald-200 focus:border-emerald-400 
             text-stone-800 font-medium transition-all duration-200
             hover:border-stone-300 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="url"
            className="absolute left-4 top-3 text-stone-500 text-sm font-semibold tracking-wide
             transition-all duration-200 pointer-events-none
             peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-emerald-600
             peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-75"
          >
            Destination URL
          </label>
        </div>

        {/* Submit Button with Loading State */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-6 rounded-xl 
                   font-semibold text-lg shadow-lg hover:shadow-xl 
                   hover:from-emerald-700 hover:to-green-700 
                   focus:outline-none focus:ring-4 focus:ring-emerald-200 
                   disabled:from-stone-400 disabled:to-stone-500 disabled:cursor-not-allowed
                   transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                   flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Growing your link...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Plant This Link
            </>
          )}
        </button>

        {/* Error Message Display */}
        {isError && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
            <p className="text-red-700 text-sm font-medium">🍂 Oops! {error.message}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddLinkForm;
