import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";
import { TaskItem } from "@/@types";
import { completedTaskDelete } from "@/slices/completedTaskSlice";
import { inCompletedTaskAdd } from "@/slices/inCompletedTaskSlice";
import { showTaskDetailContext } from "@/pages";
import taskApi from "@/pages/api/task";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// 完了タスクリスト
const CompletedTaskList: React.FC = () => {
  const dispatch = useDispatch();

  // 完了タスクStateを取得
  const completedTaskItems = useSelector((state) => state.completedTaskItems);

  // タブカテゴリ管理Stateの値を取得
  const { tabCategory } = useContext(tabCategoryContext);

  // リストに表示するタスクをtabCategoryの値で絞って抽出
  const filteredCompletedTaskItems =
    tabCategory === 0
      ? completedTaskItems.completedTaskItems
      : completedTaskItems.completedTaskItems.filter(
          (completedTaskItem) => completedTaskItem.category.id == tabCategory
        );

  // タスク未完了処理
  const switchInCompleted = async (updateTask: TaskItem) => {
    dispatch(completedTaskDelete(updateTask));
    const _updateTask = { ...updateTask, isCompleted: false };
    dispatch(inCompletedTaskAdd(_updateTask));
    await taskApi.updateTask(_updateTask);
  };

  // タスク詳細表示処理
  const { setShowTaskDetail } = useContext(showTaskDetailContext);
  const openTaskDetail = (taskItem: TaskItem) => {
    setShowTaskDetail(taskItem);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">完了タスク</h2>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="completedTasks">
          {(provided) => (
            <table className="table-auto w-full" {...provided.droppableProps} ref={provided.innerRef}>
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 w-12 text-center">Check</th>
                  <th className="px-4 py-2">タイトル</th>
                  <th className="px-4 py-2 w-32">期日</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompletedTaskItems.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <tr {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="bg-white">
                        <td className="border px-4 py-2 text-center">
                          <button
                            onClick={() => switchInCompleted(task)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            ☑︎
                          </button>
                        </td>
                        <td
                          className="border px-4 py-2 cursor-pointer hover:bg-gray-100 line-through"
                          onClick={() => openTaskDetail(task)}
                        >
                          {task.title}
                        </td>
                        <td className="border px-4 py-2">
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

export default CompletedTaskList;
