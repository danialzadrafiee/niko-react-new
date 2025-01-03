import React from "react";
import { Category } from "@/types/category";
import { CategoryItem } from "@/components/shared/CategoryItem";

interface SideMenuProps {
  categories: Category[];
}

const SideMenu: React.FC<SideMenuProps> = ({ categories }) => {
  return (
    <main className="w-full md:w-auto md:shrink-0">
      <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <CategoryItem 
            key={category.id} 
            category={category} 
            isActive={false}
            variant="rounded"
            openModal={true}
          />
        ))}
      </div>
    </main>
  );
};

export default SideMenu;