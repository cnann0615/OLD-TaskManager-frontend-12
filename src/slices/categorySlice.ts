import taskApi from "@/pages/api/task";

import { createSlice } from "@reduxjs/toolkit";

// カテゴリを管理
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    // カテゴリ追加
    categoryAdd: (state, action) => {
      state.categories.push(action.payload);
    },
    // カテゴリ更新

    // カテゴリ削除
    categoryDelete: (state, action) => {
      const deleteCategory = action.payload;
      state.category = state.category.filter(
        (category) => category.id !== deleteCategory.id
      );
    },
  },
});

export const { categoryAdd, categoryUpdate, categoryDelete } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
