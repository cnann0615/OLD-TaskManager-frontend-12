// POINT axiosを用いたAPI
import axios from 'axios';

const ENDPOINT_URL = 'http://localhost:8080/taskAPI'

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
    async inCompletedTaskGetByCategoryId(categoryId) {
        const result = await axios.get(ENDPOINT_URL + "/inCompletedTask/" + categoryId);
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
    async categoryGetById(id) {
        const result = await axios.get(ENDPOINT_URL + "/category/" + id);
        return result.data;
    },

    // 追加
    // タスク追加
    async taskAdd(taskItem) {
        const result = await axios.post(ENDPOINT_URL + "/task", taskItem);
        return result.data;
    },
    // カテゴリ追加（カテゴリ名が重複した場合は、nullを返す。）
    async categoryAdd(category) {
        const result = await axios.post(ENDPOINT_URL + "/category", category);
        return result.data;
    },

    // 削除
    async taskDelete(taskItem) {
        const result = await axios.delete(ENDPOINT_URL + "/task/" + taskItem.id);
        return result.data;
    },

    // 更新
    // タスク完了フラグ切り替え
    async switchIsCompleted(id) {
        await axios.put(ENDPOINT_URL + "/switchIsCompleted/" + id);
    }
}

export default taskApi;