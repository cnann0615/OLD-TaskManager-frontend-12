// カテゴリタスク
export interface Category  {
    id?: number;
    name: string;
  }
  // タスク
 export interface TaskItem  {
    id?: number;
    title: string;
    deadLine: string;
    category: Category;
    memo: string;
    isComplete: boolean;
  }

  // 入力タスク（formからタスクを追加する時の型）
  export interface inputTaskItem{
    title: "",
    deadLine: "",
    category: "",
    memo: "",
    isComplete: false,
  };