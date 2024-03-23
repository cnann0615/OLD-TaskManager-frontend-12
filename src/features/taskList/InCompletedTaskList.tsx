import taskApi from "@/pages/api/task";
import { taskAdd, taskDelete } from "@/slices/inCompletedTaskSlice";
import { taskAdd as completedTaskAdd } from "@/slices/completedTaskSlice";

import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";
import { TaskItem } from "@/@types";

// 未完了タスクリスト
const InCompletedTaskList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // APIを経由してデータベースから未完了タスを取得し、未完了Stateに反映
    (async () => {
      const inCompletedTaskItems: TaskItem[] =
        await taskApi.inCompletedTaskGet();
      inCompletedTaskItems.forEach((inCompletedTaskItem) =>
        dispatch(taskAdd(inCompletedTaskItem))
      );
    })();
  }, []);

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
    // 完了タスクStateに追加
    dispatch(completedTaskAdd(updateTask));
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">未完了タスク</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Check</th>
            <th className="px-4 py-2">タイトル</th>
            <th className="px-4 py-2">期日</th>
          </tr>
        </thead>
        <tbody>
          {filteredInCompletedTaskItems?.map((filteredInCompletedTaskItem) => (
            <tr key={filteredInCompletedTaskItem.id} className="bg-white">
              <td className="border px-4 py-2">
                <button
                  onClick={() => switchCompleted(filteredInCompletedTaskItem)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ◻︎
                </button>
              </td>
              <td className="border px-4 py-2">
                {filteredInCompletedTaskItem.title}
              </td>
              <td className="border px-4 py-2">
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
