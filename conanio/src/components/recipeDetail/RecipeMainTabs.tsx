import type { RecipeTab, RecipeTabItem } from "@/types/recipeDetail";

const RECIPE_TAB_ITEMS: RecipeTabItem[] = [
  {
    id: "useit",
    label: "Use it",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: "packages",
    label: "Packages",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    id: "deps",
    label: "Dependencies",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={5} cy={12} r={2} />
        <circle cx={19} cy={6} r={2} />
        <circle cx={19} cy={12} r={2} />
        <circle cx={19} cy={18} r={2} />
        <path d="M7 12h3M10 12l7-6M10 12l7 6M10 12h7" />
      </svg>
    ),
  },
  {
    id: "versions",
    label: "Versions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <circle cx={7} cy={7} r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "audit",
    label: "Audit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l9 4.5v6c0 5-3.5 9.5-9 11-5.5-1.5-9-6-9-11v-6L12 2z" />
      </svg>
    ),
  },
  {
    id: "badges",
    label: "Badges",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={8} r={6} />
        <path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5" />
      </svg>
    ),
  },
];

export default function RecipeMainTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: RecipeTab;
  onTabChange: (tab: RecipeTab) => void;
}) {
  return (
    <div className="tabs-wrap">
      <div className="tabs" id="tabs">
        {RECIPE_TAB_ITEMS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab${activeTab === tab.id ? " active" : ""}`}
            data-tab={tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
