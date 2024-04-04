import { useContext, useState } from "react";

import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";
import { useDispatch } from "react-redux";
import { Category } from "@/@types";
import { categoryUpdate } from "@/slices/categorySlice";
import taskApi from "@/pages/api/task";
import { showTaskDetailContext } from "@/pages";

const ListTab: React.FC = () => {
  const dispatch = useDispatch();

  // カテゴリStateを取得
  const categories = useSelector((state) => state.categories);

  // タブカテゴリ管理State
  const { tabCategory, setTabCategory } = useContext(tabCategoryContext);

  // 編集中のカテゴリIDとカテゴリ名を保持するためのState
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const switchTab = (id: number) => {
    setTabCategory(id);
  };

  // 編集モードを開始し、選択したカテゴリのIDと名前をStateにセット
  const editCategory = (category: Category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.name);
  };

  // 編集内容を確定し、Stateを更新（ここでAPI呼び出し等の更新処理を実装）
  const commitEdit = async() => {
    // カテゴリStateの更新
    const updateCategory = {
      id: editCategoryId,
      name: editCategoryName
    }
    dispatch(categoryUpdate(updateCategory));

    // // 詳細表示されているタスクのカテゴリを動的に更新
    // const { showTaskDetail, setShowTaskDetail } = useContext(
    //   showTaskDetailContext
    // );
    // if (showTaskDetail.category.id === updateCategory.id) {
    //   setShowTaskDetail((prev) => ({...prev, name: updateCategory.name}))
    // }

    // APIを経由してデータベースに保存（更新）
    await taskApi.updateCategory(updateCategory);
    // 編集状態をクリア
    setEditCategoryId(null);
  };

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={() => switchTab(0)}
        className={`bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-t focus:outline-none focus:shadow-outline m-1 ${
          tabCategory === 0 ? " font-bold" : ""
        }`}
      >
        全てのタスク
      </button>
      {categories.categories.map((category) => (
        <div key={category.id} className="inline-block">
          {editCategoryId === category.id ? (
            <input
              type="text"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              onBlur={commitEdit}
              autoFocus
              className="py-2 px-4 rounded-t m-1"
            />
          ) : (
            <button
              onClick={() => switchTab(category.id)}
              className={`bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-t focus:outline-none focus:shadow-outline m-1 ${
                tabCategory === category.id ? "font-bold" : ""
              }`}
            >
              {category.name}
              <span
                onClick={(e) => {
                  e.stopPropagation(); // ボタン内のボタンのクリックイベントを阻止
                  editCategory(category);
                }}
                className="text-xs my-0 ml-3 opacity-50 hover:opacity-100 cursor-pointer"
              >
                ✏️
              </span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListTab;
