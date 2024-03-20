import taskApi from "@/pages/api/task";
import { taskAdd, taskDelete } from "@/slices/completedTaskSlice";
import { taskAdd as inCompletedTaskAdd } from "@/slices/inCompletedTaskSlice";

import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";

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

// 完了タスクリスト
const CompletedTaskList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // APIを経由してデータベースから完了タスクを取得し、完了タスクStateに反映
    (async () => {
      const completedTaskItems: TaskItem[] = await taskApi.completedTaskGet();
      completedTaskItems.map((completedTaskItem) =>
        dispatch(taskAdd(completedTaskItem))
      );
    })();
  }, []);

  // 完了タスクStateを取得
  const completedTaskItems = useSelector((state) => state.completedTaskItems);

  //   タブカテゴリ管理State
  const { tabCategory } = useContext(tabCategoryContext);

  // リストに表示するタスクをtabCategoryの値で絞って抽出(tabCategory「０（全てのタスク）」の時は絞り込まない。）
  const filteredCompletedTaskItems = tabCategory === 0
  ? completedTaskItems.completedTaskItems
  : completedTaskItems.completedTaskItems.filter(
      completedTaskItem => completedTaskItem.category.id == tabCategory
    );
  

  // タスク未完了処理（buttonのonClick時に発火）
  const switchInCompleted = async (updateTask: TaskItem) => {
    // APIを経由してデータベースを更新
    await taskApi.switchIsCompleted(updateTask.id);
    // 完了タスクStateから削除
    dispatch(taskDelete(updateTask));
    // 未完了タスクStateに追加
    dispatch(inCompletedTaskAdd(updateTask));
  };

  return (
    <div>
      <h2>完了タスク</h2>
      <table>
        <thead>
          <tr>
            <th>Check</th>
            <th>タイトル</th>
            <th>期日</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompletedTaskItems?.map((filteredCompletedTaskItem) => (
            <tr key={filteredCompletedTaskItem.id}>
              <td>
                <button
                  onClick={() => switchInCompleted(filteredCompletedTaskItem)}
                >
                  ◻︎
                </button>
              </td>
              <td>{filteredCompletedTaskItem.title}</td>
              <td>{filteredCompletedTaskItem.deadLine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedTaskList;
