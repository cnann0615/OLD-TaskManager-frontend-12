import { createSlice } from "@reduxjs/toolkit";

// 完了タスクを管理
export const completedTaskItemsSlice = createSlice({
  name: "completedTaskItems",
  initialState: {
    completedTaskItems: [],
  },
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

export const { taskAdd, taskUpdate, taskDelete } =
  completedTaskItemsSlice.actions;
export default completedTaskItemsSlice.reducer;
