import { Category, TaskItem } from "@/@types";
import { createSlice } from "@reduxjs/toolkit";

// カテゴリを管理するスライスの初期状態
const initialState: { completedTaskItems: TaskItem[] } = {
  completedTaskItems: [],
};

// 完了タスクを管理
export const completedTaskItemsSlice = createSlice({
  name: "completedTaskItems",
  initialState,
  reducers: {
    // タスク追加
    completedTaskAdd: (state, action) => {
      state.completedTaskItems.push(action.payload);
    },

    // タスク更新
    completedTaskUpdate: (state, action) => {
      // action.payloadからidと更新するデータを取得
      const { id, ...updatedData } = action.payload;

      // 更新するタスクのインデックスを見つける
      const index = state.completedTaskItems.findIndex(
        (task) => task.id === id
      );

      // インデックスが見つかった場合、そのタスクを更新
      if (index !== -1) {
        state.completedTaskItems[index] = {
          ...state.completedTaskItems[index],
          ...updatedData,
        };
      }
    },

    // 特定のタスクのカテゴリ名を更新
    completedTaskUpdateCategory: (state, action) => {
      const updateCategory = action.payload;
      state.completedTaskItems.forEach(completedTaskItem => {
        if (completedTaskItem.category.id === updateCategory.id) {
          completedTaskItem.category.name = updateCategory.name;
        }
      });
    },

    // タスク削除
    completedTaskDelete: (state, action) => {
      const deleteTask = action.payload;
      state.completedTaskItems = state.completedTaskItems.filter(
        (completedTaskItem) => completedTaskItem.id !== deleteTask.id
      );
    },
  },
});

export const {
  completedTaskAdd,
  completedTaskUpdate,
  completedTaskUpdateCategory,
  completedTaskDelete,
} = completedTaskItemsSlice.actions;
export default completedTaskItemsSlice.reducer;
