// カテゴリ型
export interface Category {
  id?: number;
  name: string;
}
// タスク型
export interface TaskItem {
  id?: number;
  title: string;
  deadLine: string;
  category: Category;
  memo: string;
  isCompleted: boolean;
}

// form入力時のタスク型
export interface inputTaskItem {
  title: "";
  deadLine: "";
  category: "";
  memo: "";
  isCompleted: false;
}
