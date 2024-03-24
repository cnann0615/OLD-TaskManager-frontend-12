import taskApi from "@/pages/api/task";
import { taskAdd, taskDelete } from "@/slices/completedTaskSlice";
import { taskAdd as inCompletedTaskAdd } from "@/slices/inCompletedTaskSlice";
import { showTaskDetailContext } from "@/pages";

import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";
import { TaskItem } from "@/@types";

// 完了タスクリスト
const CompletedTaskList: React.FC = () => {
  const dispatch = useDispatch();

  // 完了タスクStateを取得
  const completedTaskItems = useSelector((state) => state.completedTaskItems);

  //   タブカテゴリ管理State
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
    // APIを経由してデータベースを更新
    await taskApi.switchIsCompleted(updateTask.id);
    // 完了タスクStateから削除
    dispatch(taskDelete(updateTask));
    //タスク完了フラグをfalseにし、未完了タスクStateに追加
    updateTask = { ...updateTask, isComplete: false };
    dispatch(inCompletedTaskAdd(updateTask));
  };

  // タスク詳細（モーダル）表示処理（タイトルのonClick時に発火）
  //   詳細表示対象タスクState
  const { setShowTaskDetail } = useContext(showTaskDetailContext);
  const openTaskDetail = (taskItem: TaskItem) => {
    console.log(taskItem);
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
                className="border px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => openTaskDetail(filteredCompletedTaskItem)}
              >
                {filteredCompletedTaskItem.title}
              </td>
              <td className="border px-4 py-2">
                {filteredCompletedTaskItem.deadLine}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedTaskList;
