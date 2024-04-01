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
    inCompletedTaskAdd: (state, action) => {
      state.inCompletedTaskItems.push(action.payload);
    },
    
    // タスク更新
    inCompletedTaskUpdate: (state, action) => {
      // action.payloadからidと更新するデータを取得
      const { id, ...updatedData } = action.payload;

      // 更新するタスクのインデックスを見つける
      const index = state.inCompletedTaskItems.findIndex(
        (task) => task.id === id
      );

      // インデックスが見つかった場合、そのタスクを更新
      if (index !== -1) {
        state.inCompletedTaskItems[index] = {
          ...state.inCompletedTaskItems[index],
          ...updatedData,
        };
      }
    },

    // タスク削除
    inCompletedTaskDelete: (state, action) => {
      const deleteTask = action.payload;
      state.inCompletedTaskItems = state.inCompletedTaskItems.filter(
        (inCompletedTaskItem) => inCompletedTaskItem.id !== deleteTask.id
      );
    },
  },
});

export const {
  inCompletedTaskAdd,
  inCompletedTaskUpdate,
  inCompletedTaskDelete,
} = inCompletedTaskItemsSlice.actions;
export default inCompletedTaskItemsSlice.reducer;
