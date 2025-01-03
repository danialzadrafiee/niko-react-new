// src/features/category/store/categoryStore.ts

import { create } from "zustand";
import * as categoryService from "../services/categoryService";
import { handleError, showSuccessToast } from "@/utils/errorHandler";
import { Category } from "@/types/category";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  fetchCategories: () => Promise<void>;
  createCategory: (data: FormData) => Promise<void>;
  updateCategory: (id: number, data: FormData) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const categories = await categoryService.fetchCategories();
      set({ categories, loading: false });
    } catch (error) {
      handleError(error, "Error fetching categories");
      set({ loading: false });
    }
  },

  createCategory: async (data: FormData) => {
    try {
      const newCategory = await categoryService.createCategory(data);
      set((state) => ({ categories: [...state.categories, newCategory] }));
      showSuccessToast("Category created successfully");
    } catch (error) {
      handleError(error, "Error creating category");
    }
  },

  updateCategory: async (id: number, data: FormData) => {
    try {
      const updatedCategory = await categoryService.updateCategory(id, data);
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? updatedCategory : cat
        ),
      }));
      showSuccessToast("Category updated successfully");
    } catch (error) {
      handleError(error, "Error updating category");
    }
  },

  deleteCategory: async (id: number) => {
    try {
      await categoryService.deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
      }));
      showSuccessToast("Category deleted successfully");
    } catch (error) {
      handleError(error, "Error deleting category");
    }
  },
}));

export default useCategoryStore;