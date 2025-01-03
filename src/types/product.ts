
  // src/types/product.ts

import { Category } from "./category";

  
  export interface Product {
    id: number;
    title: string;
    balance: number;
    price: number;
    describe: string;
    location: string;
    fundraise_min_price: number;
    fundraise_max_price: number;
    picture: string;
    category_id: number;
    category?: Category;
  }