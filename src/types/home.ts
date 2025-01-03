import { Category } from './category';

export interface CarouselItem {
  id: number;
  image: File ;  
  route_link: string;
  order: number;
}

export interface HomePageData {
  carouselItems: CarouselItem[];
  selectedCategories: Category[];
}