import { Category } from "@/@types";
import { createSlice } from "@reduxjs/toolkit";

// カテゴリを管理するスライスの初期状態
const initialState: { categories: Category[] } = {
  categories: [],
};

// カテゴリを管理
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // カテゴリ追加
    categoryAdd: (state, action) => {
      state.categories.push(action.payload);
    },
    // カテゴリ更新

    // カテゴリ削除
    categoryDelete: (state, action) => {
      const deleteCategory = action.payload;
      state.categories = state.categories.filter(
        (category) => category.id !== deleteCategory.id
      );
    },
  },
});

export const { categoryAdd, categoryDelete } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
