/** Shared DTOs for Conan Center API / UI (listings, filters, llms). */

export interface RecipeBasic {
  name: string;
  version?: string;
  total_downloads?: number;
}

export interface RecipeReference {
  references: number;
  recipes: number;
}

export interface FilterItem {
  id: number;
  filter: string;
}
