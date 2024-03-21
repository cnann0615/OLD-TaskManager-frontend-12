import { TaskItem } from "@/@types";
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
    taskAdd: (state, action) => {
      state.completedTaskItems.push(action.payload);
    },
    // タスク更新

    // タスク削除
    taskDelete: (state, action) => {
      const deleteTask = action.payload;
      state.completedTaskItems = state.completedTaskItems.filter(
        (completedTaskItem) => completedTaskItem.id !== deleteTask.id
      );
    },
  },
});

export const { taskAdd, taskDelete } =
  completedTaskItemsSlice.actions;
export default completedTaskItemsSlice.reducer;
