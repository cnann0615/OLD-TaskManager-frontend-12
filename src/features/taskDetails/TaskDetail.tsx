import { Category, TaskItem } from "@/@types";
import { showTaskDetailContext } from "@/pages";
import { useSelector } from "@/store/store";

import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";

// タスク詳細（モーダル）コンポーネント
const TaskDetail = () => {
  const dispatch = useDispatch();

  const { showTaskDetail, setShowTaskDetail } = useContext(
    showTaskDetailContext
  );

  // 未完了タスクStateを取得
  const inCompletedTaskItems = useSelector(
    (state) => state.inCompletedTaskItems
  );
  // 完了タスクStateを取得
  const completedTaskItems = useSelector((state) => state.completedTaskItems);
  // カテゴリStateを取得
  const categories = useSelector((state) => state.categories);

  // 各項目の編集状態を管理するステート
  const [editing, setEditing] = useState({
    title: false,
    deadLine: false,
    category: false,
    memo: false,
  });

  // 編集モードをトグルする関数
  const toggleEdit = (field: string) => {
    console.log("toggle");
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // 編集内容を保存し、編集モードを終了する関数
  const saveEdit = (field: string, value: any) => {
    // 編集対象がカテゴリの場合、選択されたカテゴリidに一致するカテゴリオブジェクトを取得
    if (field === "category") {
      const selectedCategory = categories.categories.find(
        (category) => category.id == value
      );
      console.log(selectedCategory);
      // Contextの更新（この例では簡単のため、Contextを直接更新しています）
      setShowTaskDetail((prev) => ({ ...prev, [field]: selectedCategory }));
      // 編集状態のトグル
      toggleEdit(field);
    }else{
      // Contextの更新（この例では簡単のため、Contextを直接更新しています）
      setShowTaskDetail((prev) => ({ ...prev, [field]: value }));
      // 編集状態のトグル
      toggleEdit(field);
    }

  };

  console.log(showTaskDetail);
  console.log(editing);

  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="w-1/4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              項目
            </th>
            <th className="w-3/4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              内容
            </th>
          </tr>
        </thead>
        <tbody>
          {/* タイトル */}
          <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              タイトル
            </td>
            <td
              className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
            >
              {editing.title ? (
                <input
                  type="text"
                  defaultValue={showTaskDetail.title}
                  onBlur={(e) => saveEdit("title", e.target.value)}
                  autoFocus
                  className="rounded-md border-none focus:outline-none bg-gray-50"
                />
              ) : (
                <div onClick={() => toggleEdit("title")}>
                  {showTaskDetail.title}
                </div>
              )}
            </td>
          </tr>
          {/* 期日 */}
          <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              期日
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {editing.deadLine ? (
                <input
                  type="date"
                  defaultValue={showTaskDetail.deadLine}
                  onBlur={(e) => saveEdit("deadLine", e.target.value)}
                  autoFocus
                  className="rounded-md border-gray-300 focus:outline-none bg-gray-50"
                />
              ) : (
                <div onClick={() => toggleEdit("deadLine")}>
                  {showTaskDetail.deadLine}
                </div>
              )}
            </td>
          </tr>
          {/* カテゴリ */}
          <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              カテゴリ
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {editing.category ? (
                <select
                  defaultValue={showTaskDetail.category.id}
                  onChange={(e) => {
                    saveEdit("category", e.target.value);
                  }}
                  autoFocus
                  className="rounded-md border-gray-300 focus:outline-none bg-gray-50"
                >
                  {categories.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div onClick={() => toggleEdit("category")}>
                  {showTaskDetail.category.name}
                </div>
              )}
            </td>
          </tr>
          {/* メモ */}
          <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              メモ
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {editing.memo ? (
                <textarea
                  defaultValue={showTaskDetail.memo}
                  onBlur={(e) => saveEdit("memo", e.target.value)}
                  autoFocus
                  className="w-full rounded-md border-gray-300 focus:outline-none bg-gray-50"
                />
              ) : (
                // \nを改行タグ(<br />)に変換して表示
                <div onClick={() => toggleEdit("memo")}>
                  {showTaskDetail.memo.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaskDetail;
