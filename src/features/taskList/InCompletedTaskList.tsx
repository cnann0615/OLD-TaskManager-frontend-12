import taskApi from "@/pages/api/task";
import { taskAdd, taskDelete } from "@/slices/inCompletedTaskSlice";
import { taskAdd as completedTaskAdd } from "@/slices/completedTaskSlice";

import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { tabCategoryContext } from "./TaskList";

// 未完了タスクリスト
const InCompletedTaskList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // APIを経由してデータベースから未完了タスを取得し、未完了Stateに反映
    (async () => {
      const inCompletedTaskItems = await taskApi.inCompletedTaskGet();
      inCompletedTaskItems.map((inCompletedTaskItem) =>
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
  const switchCompleted = async (updateTask) => {
    // APIを経由してデータベースを更新
    await taskApi.switchIsCompleted(updateTask.id);
    // 未完了タスクStateから削除
    dispatch(taskDelete(updateTask));
    // 完了タスクStateに追加
    dispatch(completedTaskAdd(updateTask));
  };

  return (
    <div>
      <h2>未完了タスク</h2>
      <table>
        <thead>
          <tr>
            <th>Check</th>
            <th>タイトル</th>
            <th>期日</th>
          </tr>
        </thead>
        <tbody>
          {filteredInCompletedTaskItems?.map((filteredInCompletedTaskItem) => (
            <tr key={filteredInCompletedTaskItem.id}>
              <td>
                <button
                  onClick={() => switchCompleted(filteredInCompletedTaskItem)}
                >
                  ◻︎
                </button>
              </td>
              <td>{filteredInCompletedTaskItem.title}</td>
              <td>{filteredInCompletedTaskItem.deadLine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InCompletedTaskList;
