import { TaskItem } from "@/@types";
import { createSlice } from "@reduxjs/toolkit";

// カテゴリを管理するスライスの初期状態
const initialState: { inCompletedTaskItems: TaskItem[] } = {
  inCompletedTaskItems: [],
};

// 未完了タスクを管理
export const inCompletedTaskItemsSlice = createSlice({
  name: "inCompletedTaskItems",
  initialState,
  reducers: {
    // タスク追加
    taskAdd: (state, action) => {
      state.inCompletedTaskItems.push(action.payload);
    },
    // タスク更新

    // タスク削除
    taskDelete: (state, action) => {
      const deleteTask = action.payload;
      state.inCompletedTaskItems = state.inCompletedTaskItems.filter(
        (inCompletedTaskItem) => inCompletedTaskItem.id !== deleteTask.id
      );
    },
  },
});

export const { taskAdd, taskDelete } =
  inCompletedTaskItemsSlice.actions;
export default inCompletedTaskItemsSlice.reducer;
