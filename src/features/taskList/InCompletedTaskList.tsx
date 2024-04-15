import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";
import { TaskItem } from "@/@types";
import { inCompletedTaskDelete } from "@/slices/inCompletedTaskSlice";
import { completedTaskAdd } from "@/slices/completedTaskSlice";
import { showTaskDetailContext } from "@/pages";
import taskApi from "@/pages/api/task";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// 未完了タスクリスト
const InCompletedTaskList: React.FC = () => {
  const dispatch = useDispatch();

  // 未完了タスクStateを取得
  const inCompletedTaskItems = useSelector(
    (state) => state.inCompletedTaskItems
  );

  // タブカテゴリ管理State
  const { tabCategory } = useContext(tabCategoryContext);

  // リストに表示するタスクをtabCategoryの値で絞って抽出
  const filteredInCompletedTaskItems =
    tabCategory === 0
      ? inCompletedTaskItems.inCompletedTaskItems
      : inCompletedTaskItems.inCompletedTaskItems.filter(
          (inCompletedTaskItem) =>
            inCompletedTaskItem.category.id == tabCategory
        );

  // タスク完了処理（buttonのonClick時に発火）
  const switchCompleted = async (updateTask: TaskItem) => {
    dispatch(inCompletedTaskDelete(updateTask));
    const _updateTask = { ...updateTask, isCompleted: true };
    dispatch(completedTaskAdd(_updateTask));
    await taskApi.updateTask(_updateTask);
  };

  // タスク詳細表示処理
  const { setShowTaskDetail } = useContext(showTaskDetailContext);
  const openTaskDetail = (taskItem: TaskItem) => {
    setShowTaskDetail(taskItem);
  };


  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">未完了タスク</h2>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="incompleteTasks">
          {(provided, snapshot) => (
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 w-20">Check</th>
                  <th className="px-4 py-2 w-auto">タイトル</th>
                  <th className="px-4 py-2 w-32">期日</th>
                </tr>
              </thead>
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {filteredInCompletedTaskItems.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <tr
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="bg-white"
                      >
                        <td className="border px-4 py-2 w-20 text-center">
                          <button
                            onClick={() => switchCompleted(task)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            ◻︎
                          </button>
                        </td>
                        <td
                          className="border px-4 py-2 cursor-pointer hover:bg-gray-100 w-auto"
                          onClick={() => openTaskDetail(task)}
                        >
                          {task.title}
                        </td>
                        <td className="border px-4 py-2 w-32 text-center">
                          {task.deadLine ? task.deadLine : "なし"}
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default InCompletedTaskList;
