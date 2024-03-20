import { configureStore } from "@reduxjs/toolkit";
import completedTaskItemsReducer from "@/slices/completedTaskSlice";
import inCompletedTaskItemsReducer from "@/slices/inCompletedTaskSlice";
import categoriesReducer from "@/slices/categorySlice";

export const store = configureStore({
  reducer: {
    // 完了タスクを管理
    completedTaskItems: completedTaskItemsReducer,
    // 未完了タスクを管理
    inCompletedTaskItems: inCompletedTaskItemsReducer,
    // カテゴリを管理
    categories: categoriesReducer,
  },
});
