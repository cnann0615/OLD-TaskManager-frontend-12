import taskApi from "@/pages/api/task";
import { taskAdd, taskDelete } from "@/slices/inCompletedTaskSlice";
import { taskAdd as completedTaskAdd } from "@/slices/completedTaskSlice";
import { showTaskDetailContext } from "@/pages";

import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";
import { TaskItem } from "@/@types";

// 未完了タスクリスト
const InCompletedTaskList: React.FC = () => {
  const dispatch = useDispatch();


  // 未完了タスクStateを取得
  const inCompletedTaskItems = useSelector(
    (state) => state.inCompletedTaskItems
  );

  //   タブカテゴリ管理State
  const { tabCategory } = useContext(tabCategoryContext);

  // リストに表示するタスクをtabCategoryの値で絞って抽出(tabCategory「０（全てのタスク）」の時は絞り込まない。）
  const filteredInCompletedTaskItems =
    tabCategory === 0
      ? inCompletedTaskItems.inCompletedTaskItems
      : inCompletedTaskItems.inCompletedTaskItems.filter(
          (inCompletedTaskItem) =>
            inCompletedTaskItem.category.id == tabCategory
        );

  // タスク完了処理（buttonのonClick時に発火）
  const switchCompleted = async (updateTask: TaskItem) => {
    // APIを経由してデータベースを更新
    await taskApi.switchIsCompleted(updateTask.id);
    // 未完了タスクStateから削除
    dispatch(taskDelete(updateTask));
    //タスク完了フラグをtrueにし、完了タスクStateに追加
    updateTask = { ...updateTask, isComplete: true };
    dispatch(completedTaskAdd(updateTask));
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
      <h2 className="text-xl font-bold mb-2">未完了タスク</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 w-20">Check</th>
            <th className="px-4 py-2 w-auto">タイトル</th>
            <th className="px-4 py-2 w-32">期日</th>
          </tr>
        </thead>
        <tbody>
          {filteredInCompletedTaskItems?.map((filteredInCompletedTaskItem) => (
            <tr key={filteredInCompletedTaskItem.id} className="bg-white">
              <td className="border px-4 py-2 w-20 text-center">
                <button
                  onClick={() => switchCompleted(filteredInCompletedTaskItem)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ◻︎
                </button>
              </td>
              <td
                className="border px-4 py-2 cursor-pointer hover:bg-gray-100 w-auto"
                onClick={() => openTaskDetail(filteredInCompletedTaskItem)}
              >
                {filteredInCompletedTaskItem.title}
              </td>
              <td className="border px-4 py-2 w-32 text-center">
                {filteredInCompletedTaskItem.deadLine}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InCompletedTaskList;
