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
  /** Name of the license/topic: the backend filters by name. */
  id: string;
  filter: string;
}
