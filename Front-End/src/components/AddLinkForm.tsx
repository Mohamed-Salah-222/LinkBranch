import { useState, type FormEvent } from "react";
import { useCreateLink } from "../hooks/useLinks";
import { Plus, Link } from "lucide-react";

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
    <div className="mb-6 p-6 bg-white rounded-lg shadow-sm border border-stone-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-stone-500 rounded-lg">
          <Link className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-stone-800">Add New Link</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-stone-700 mb-2">
            Link Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-400 
             text-stone-800 font-medium transition-all duration-200
             hover:border-stone-300"
            placeholder="Enter link title"
            required
          />
        </div>

        {/* URL Input */}
        <div>
          <label htmlFor="url" className="block text-sm font-bold text-stone-700 mb-2">
            Destination URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-400 
             text-stone-800 font-medium transition-all duration-200
             hover:border-stone-300"
            placeholder="https://example.com"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-stone-700 text-white py-3 px-6 rounded-lg 
                   font-bold text-sm shadow-sm
                   hover:bg-stone-800 
                   focus:outline-none focus:ring-2 focus:ring-stone-300 
                   disabled:bg-stone-400 disabled:cursor-not-allowed
                   transition-all duration-200
                   flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Adding Link...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add Link
            </>
          )}
        </button>

        {/* Error Message Display */}
        {isError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium">Error: {error.message}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddLinkForm;
