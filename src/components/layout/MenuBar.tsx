import React from "react"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar"
import { ChevronDown } from "lucide-react"
import { Category } from "@/types/category"
import { CategoryItem } from "@/components/shared/CategoryItem"

interface MenuBarProps {
  categories: Category[]
  onCategoryClick: (category: Category) => void
}

export default function MenuBar({ categories, onCategoryClick }: MenuBarProps) {
  const renderMenuItems = (items: Category[]) => {
    return items.map((item: Category) => (
      <MenubarMenu key={item.id}>
        <MenubarTrigger className="px-3 rounded-full py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center">
          {item.name}
          <ChevronDown className="ml-1 h-4 w-4" />
        </MenubarTrigger>
        {item.children && item.children.length > 0 && (
          <MenubarContent>
            {item.children.map((child: Category) => (
              <React.Fragment key={child.id}>
                {child.children && child.children.length > 0 ? (
                  <MenubarSub>
                    <MenubarSubTrigger>{child.name}</MenubarSubTrigger>
                    <MenubarSubContent>
                      {child.children.map((subChild: Category) => (
                        <MenubarItem key={subChild.id} onClick={() => onCategoryClick(subChild)}>
                          <CategoryItem 
                            category={subChild} 
                            isActive={false} 
                            variant="navbar" 
                            onClick={() => onCategoryClick(subChild)}
                          />
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                ) : (
                  <MenubarItem onClick={() => onCategoryClick(child)}>
                    <CategoryItem 
                      category={child} 
                      isActive={false} 
                      variant="navbar" 
                      onClick={() => onCategoryClick(child)}
                    />
                  </MenubarItem>
                )}
              </React.Fragment>
            ))}
          </MenubarContent>
        )}
      </MenubarMenu>
    ))
  }

  return (
    <div className="relative mr-5">
      <div className="flex items-center  cursor-pointer gap-2">
        <Menubar className="border-none shadow-none">{renderMenuItems(categories)}</Menubar>
      </div>
    </div>
  )
}