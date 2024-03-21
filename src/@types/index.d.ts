// カテゴリタスク
export interface Category  {
    id?: number;
    name: string;
  }
  // 完了タスク
 export interface TaskItem  {
    id?: number;
    title: string;
    deadLine: string;
    category: Category;
    memo: string;
    isComplete: boolean;
  }