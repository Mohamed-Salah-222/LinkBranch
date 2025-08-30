import { useUpdateAppearance } from "../hooks/useUser";
import type { User } from "../../../packages/types";
import { Palette, Type, Save, Sparkles } from "lucide-react";

// 1. Define the props this component now expects
interface AppearanceTabProps {
  appearance: User["appearance"];
  setAppearance: React.Dispatch<React.SetStateAction<User["appearance"]>>;
}

const AppearanceTab = ({ appearance, setAppearance }: AppearanceTabProps) => {
  const { mutate: updateAppearance, isPending } = useUpdateAppearance();

  // Predefined nature color palettes
  const naturePresets = [
    { name: "Forest Dawn", bg: "#f0f9f0", button: "#22c55e" },
    { name: "Earth & Sky", bg: "#fefce8", button: "#84cc16" },
    { name: "Woodland", bg: "#f7f3f0", button: "#059669" },
    { name: "Autumn Leaves", bg: "#fef7ed", button: "#ea580c" },
    { name: "Deep Forest", bg: "#ecfdf5", button: "#065f46" },
    { name: "Clay & Moss", bg: "#f5f5f4", button: "#16a34a" },
  ];

  const handleSave = () => {
    updateAppearance(appearance);
  };

  const handleInputChange = (field: keyof User["appearance"], value: string) => {
    // 2. This now updates the state that lives in the parent dashboard component
    setAppearance((prev) => ({ ...prev, [field]: value }));
  };

  const applyPreset = (preset: { bg: string; button: string }) => {
    setAppearance((prev) => ({
      ...prev,
      backgroundColor: preset.bg,
      buttonColor: preset.button,
    }));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200/50 space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-stone-600 rounded-lg">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-stone-800">Customize Your Grove</h3>
      </div>
      <p className="text-stone-600 text-sm">Create a unique natural atmosphere for your link tree</p>

      {/* Nature Color Presets */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <h4 className="font-semibold text-stone-800">Nature Presets</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {naturePresets.map((preset) => (
            <button key={preset.name} onClick={() => applyPreset(preset)} className="p-4 rounded-xl border-2 border-stone-200 hover:border-emerald-400 transition-all duration-200 transform hover:scale-105 group hover:shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: preset.bg }}></div>
                <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: preset.button }}></div>
              </div>
              <p className="text-xs font-medium text-stone-700 group-hover:text-emerald-700 transition-colors duration-200">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <input id="backgroundColor" type="color" value={appearance.backgroundColor} onChange={(e) => handleInputChange("backgroundColor", e.target.value)} className="w-full h-12 rounded-xl border-2 border-stone-200 cursor-pointer hover:border-stone-300 transition-all duration-200 peer" />
          <label
            htmlFor="backgroundColor"
            className="absolute left-4 -top-2 bg-white px-2 text-stone-500 text-sm font-semibold tracking-wide
                     transition-all duration-200 peer-hover:text-stone-700"
          >
            Background Color
          </label>
        </div>

        <div className="relative">
          <input id="buttonColor" type="color" value={appearance.buttonColor} onChange={(e) => handleInputChange("buttonColor", e.target.value)} className="w-full h-12 rounded-xl border-2 border-stone-200 cursor-pointer hover:border-stone-300 transition-all duration-200 peer" />
          <label
            htmlFor="buttonColor"
            className="absolute left-4 -top-2 bg-white px-2 text-stone-500 text-sm font-semibold tracking-wide
                     transition-all duration-200 peer-hover:text-stone-700"
          >
            Button Color
          </label>
        </div>
      </div>

      {/* Font Selection */}
      <div className="relative">
        <select
          id="font"
          value={appearance.font}
          onChange={(e) => handleInputChange("font", e.target.value)}
          className="w-full px-4 py-3 pt-6 bg-white/80 border-2 border-stone-200 rounded-xl shadow-sm 
                   focus:outline-none focus:ring-3 focus:ring-emerald-200 focus:border-emerald-400 
                   text-stone-800 font-medium transition-all duration-200
                   hover:border-stone-300 peer appearance-none"
        >
          <option value="Inter">Inter — Clean & Modern</option>
          <option value="Roboto Slab">Roboto Slab — Elegant Serif</option>
          <option value="Fira Code">Fira Code — Technical Mono</option>
        </select>
        <label
          htmlFor="font"
          className="absolute left-4 top-3 text-stone-500 text-sm font-semibold tracking-wide
                   transition-all duration-200 pointer-events-none
                   peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-emerald-600"
        >
          Typography Style
        </label>
        <Type className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
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
            Cultivating changes...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Cultivate Your Style
          </>
        )}
      </button>
    </div>
  );
};

export default AppearanceTab;
