import taskApi from "@/pages/api/task";
import { completedTaskDelete } from "@/slices/completedTaskSlice";
import { inCompletedTaskAdd } from "@/slices/inCompletedTaskSlice";
import { showTaskDetailContext } from "@/pages";
import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";
import { TaskItem } from "@/@types";

import { useContext } from "react";
import { useDispatch } from "react-redux";

// 完了タスクリスト
const CompletedTaskList: React.FC = () => {
  const dispatch = useDispatch();

  // 完了タスクStateを取得
  const completedTaskItems = useSelector((state) => state.completedTaskItems);

  //   タブカテゴリ管理Stateの値を取得
  const { tabCategory } = useContext(tabCategoryContext);

  // リストに表示するタスクをtabCategoryの値で絞って抽出(tabCategory「０（全てのタスク）」の時は絞り込まない。）
  const filteredCompletedTaskItems =
    tabCategory === 0
      ? completedTaskItems.completedTaskItems
      : completedTaskItems.completedTaskItems.filter(
          (completedTaskItem) => completedTaskItem.category.id == tabCategory
        );

  // タスク未完了処理（buttonのonClick時に発火）
  const switchInCompleted = async (updateTask: TaskItem) => {
    // 完了タスクStateから削除
    dispatch(completedTaskDelete(updateTask));
    //タスク完了フラグを反転
    const _updateTask = { ...updateTask, completed: false };
    // 完了タスクStateに追加
    dispatch(inCompletedTaskAdd(_updateTask));
    // APIを経由してデータベースを更新
    await taskApi.updateTask(_updateTask);
  };

  // タスク詳細表示処理（タイトルのonClick時に発火）
  //   詳細表示対象タスクState
  const { setShowTaskDetail } = useContext(showTaskDetailContext);
  const openTaskDetail = (taskItem: TaskItem) => {
    setShowTaskDetail(taskItem);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">完了タスク</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 w-12 text-center">Check</th>
            <th className="px-4 py-2">タイトル</th>
            <th className="px-4 py-2 w-32">期日</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompletedTaskItems?.map((filteredCompletedTaskItem) => (
            <tr key={filteredCompletedTaskItem.id} className="bg-white">
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => switchInCompleted(filteredCompletedTaskItem)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ☑︎
                </button>
              </td>
              <td
                className="border px-4 py-2 cursor-pointer hover:bg-gray-100 line-through"
                onClick={() => openTaskDetail(filteredCompletedTaskItem)}
              >
                {filteredCompletedTaskItem.title}
              </td>
              <td className="border px-4 py-2">
                {filteredCompletedTaskItem.deadLine
                  ? filteredCompletedTaskItem.deadLine
                  : "なし"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedTaskList;
