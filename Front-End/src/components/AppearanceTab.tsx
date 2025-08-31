import { useUpdateAppearance } from "../hooks/useUser";
import type { User } from "../../../packages/types";
import { Palette, Type, Save } from "lucide-react";

// 1. Define the props this component now expects
interface AppearanceTabProps {
  appearance: User["appearance"];
  setAppearance: React.Dispatch<React.SetStateAction<User["appearance"]>>;
}

const AppearanceTab = ({ appearance, setAppearance }: AppearanceTabProps) => {
  const { mutate: updateAppearance, isPending } = useUpdateAppearance();

  // Predefined color palettes
  const colorPresets = [
    { name: "Classic", bg: "#f9fafb", button: "#374151" },
    { name: "Emerald", bg: "#f0fdf4", button: "#059669" },
    { name: "Blue", bg: "#eff6ff", button: "#2563eb" },
    { name: "Purple", bg: "#faf5ff", button: "#7c3aed" },
    { name: "Rose", bg: "#fff1f2", button: "#e11d48" },
    { name: "Amber", bg: "#fffbeb", button: "#d97706" },
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
    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-stone-500 rounded-lg">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-stone-800">Customize Appearance</h3>
      </div>
      <p className="text-stone-600 text-sm font-medium">Personalize your link page design</p>

      {/* Color Presets */}
      <div className="space-y-3">
        <h4 className="font-bold text-stone-700 text-sm">Color Presets</h4>
        <div className="grid grid-cols-3 gap-3">
          {colorPresets.map((preset) => (
            <button key={preset.name} onClick={() => applyPreset(preset)} className="p-3 rounded-lg border border-stone-200 hover:border-stone-300 transition-all duration-200 hover:bg-stone-50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full border border-stone-200" style={{ backgroundColor: preset.bg }}></div>
                <div className="w-4 h-4 rounded-full border border-stone-200" style={{ backgroundColor: preset.button }}></div>
              </div>
              <p className="text-xs font-bold text-stone-700">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="backgroundColor" className="block text-sm font-bold text-stone-700 mb-2">
            Background Color
          </label>
          <input id="backgroundColor" type="color" value={appearance.backgroundColor} onChange={(e) => handleInputChange("backgroundColor", e.target.value)} className="w-full h-10 rounded-lg border border-stone-200 cursor-pointer hover:border-stone-300 transition-all duration-200" />
        </div>

        <div>
          <label htmlFor="buttonColor" className="block text-sm font-bold text-stone-700 mb-2">
            Button Color
          </label>
          <input id="buttonColor" type="color" value={appearance.buttonColor} onChange={(e) => handleInputChange("buttonColor", e.target.value)} className="w-full h-10 rounded-lg border border-stone-200 cursor-pointer hover:border-stone-300 transition-all duration-200" />
        </div>
      </div>

      {/* Font Selection */}
      <div>
        <label htmlFor="font" className="block text-sm font-bold text-stone-700 mb-2">
          Font Style
        </label>
        <div className="relative">
          <select
            id="font"
            value={appearance.font}
            onChange={(e) => handleInputChange("font", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-400 
                     text-stone-800 font-medium transition-all duration-200
                     hover:border-stone-300 appearance-none pr-10"
          >
            <option value="Inter">Inter — Clean & Modern</option>
            <option value="Roboto Slab">Roboto Slab — Elegant Serif</option>
            <option value="Fira Code">Fira Code — Technical Mono</option>
          </select>
          <Type className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
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
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Save Changes
          </>
        )}
      </button>
    </div>
  );
};

export default AppearanceTab;
