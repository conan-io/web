export interface PackageBasicDTO {
  name: string;
  version: string;
}

export interface PackageInfoDTO {
  name: string;
  info: {
    age: number;
    description: string;
    downloads: number;
    homepage: string;
    labels: string[];
    licenses: string[];
    packages: any;
    readme?: string;
    recipe_revision?: string;
    status: string;
    timestamp: string;
    use_it?: any;
    version: string;
  };
}

export interface PackageDownloadsDTO {
  downloads: {
    date: string;
    downloads: number;
  };
  versions?: string[]; // Only 'all' key will have versions available
}

export interface ConanFilterResponseDTO {
  id: number;
  filter: string;
}

export interface ReferenceNumDTO {
  references: number;
  recipes: number;
}

export type ConanResponse<T> = { [key: string]: T };
