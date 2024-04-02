// POINT axiosを用いたAPI
import axios from "axios";

const ENDPOINT_URL = "http://localhost:8080/taskAPI";

//型定義
// カテゴリ
type Category = {
  id?: number;
  name: string;
};
// 完了タスク
type TaskItem = {
  id?: number;
  title: string;
  deadLine: string;
  category: Category;
  memo: string;
  isComplete: boolean;
};

const taskApi = {
  // 取得
  // 全タスク取得
  async taskGetAll() {
    const result = await axios.get(ENDPOINT_URL + "/task");
    return result.data;
  },
  // 未完了タスク取得
  async inCompletedTaskGet() {
    const result = await axios.get(ENDPOINT_URL + "/inCompletedTask");
    return result.data;
  },
  // 未完了タスクをカテゴリIDから取得
  async inCompletedTaskGetByCategoryId(categoryId: number) {
    const result = await axios.get(
      ENDPOINT_URL + "/inCompletedTask/" + categoryId
    );
    return result.data;
  },
  // 完了タスク取得
  async completedTaskGet() {
    const result = await axios.get(ENDPOINT_URL + "/completedTask");
    return result.data;
  },
  // 最新のタスク取得
  async latestTaskGet() {
    const result = await axios.get(ENDPOINT_URL + "/latestTask");
    return result.data;
  },
  // 全カテゴリ取得
  async categoryGetAll() {
    const result = await axios.get(ENDPOINT_URL + "/category");
    return result.data;
  },
  // 最新のカテゴリ取得
  async latestCategoryGet() {
    const result = await axios.get(ENDPOINT_URL + "/latestCategory");
    return result.data;
  },
  // カテゴリをidから取得
  async categoryGetById(id: number) {
    const result = await axios.get(ENDPOINT_URL + "/category/" + id);
    return result.data;
  },

  // 追加
  // タスク追加
  async taskAdd(taskItem: TaskItem) {
    const result = await axios.post(ENDPOINT_URL + "/task", taskItem);
    return result.data;
  },
  // カテゴリ追加（カテゴリ名が重複した場合は、nullを返す。）
  async categoryAdd(category: Category) {
    const result = await axios.post(ENDPOINT_URL + "/category", category);
    return result.data;
  },

  // 削除
  // タスク削除
  async taskDelete(taskItem: TaskItem) {
    const result = await axios.delete(ENDPOINT_URL + "/task/" + taskItem.id);
    return result.data;
  },
  // カテゴリ削除
  async categoryDelete(taskItem: Category) {
    const result = await axios.delete(ENDPOINT_URL + "/task/" + taskItem.id);
    return result.data;
  },

  // 更新
  // タスク完了フラグ切り替え
  async switchIsCompleted(id: number) {
    await axios.put(ENDPOINT_URL + "/switchIsCompleted/" + id);
  },
  // 詳細表示画面からの編集
  async updateTask(taskItem: TaskItem) {
    await axios.put(ENDPOINT_URL + "/updateTask", taskItem);
  },
};

export default taskApi;
