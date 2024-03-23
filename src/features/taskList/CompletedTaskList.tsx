import taskApi from "@/pages/api/task";
import { taskAdd, taskDelete } from "@/slices/completedTaskSlice";
import { taskAdd as inCompletedTaskAdd } from "@/slices/inCompletedTaskSlice";

import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";
import { TaskItem } from "@/@types";

// 完了タスクリスト
const CompletedTaskList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // APIを経由してデータベースから完了タスクを取得し、完了タスクStateに反映
    (async () => {
      const completedTaskItems: TaskItem[] = await taskApi.completedTaskGet();
      completedTaskItems.forEach((completedTaskItem) =>
        dispatch(taskAdd(completedTaskItem))
      );
    })();
  }, []);

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
    // 未完了タスクStateに追加
    dispatch(inCompletedTaskAdd(updateTask));
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">完了タスク</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Check</th>
            <th className="px-4 py-2">タイトル</th>
            <th className="px-4 py-2">期日</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompletedTaskItems?.map((filteredCompletedTaskItem) => (
            <tr key={filteredCompletedTaskItem.id} className="bg-white">
              <td className="border px-4 py-2">
                <button
                  onClick={() => switchInCompleted(filteredCompletedTaskItem)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ◻︎
                </button>
              </td>
              <td className="border px-4 py-2">
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
