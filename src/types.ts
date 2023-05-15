export interface Pokemon {
    id: number;
    name: string;
    description: string;
    image: string;
    [key: string]: number | string | string[];
  }