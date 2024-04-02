import { useContext, useState } from "react";

import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";
import { useDispatch } from "react-redux";
import { categoryDelete } from "@/slices/categorySlice";
import { Category } from "@/@types";
import { deleteAppClientCache } from "next/dist/server/lib/render-server";

const ListTab: React.FC = () => {
  const dispatch = useDispatch();

  // カテゴリStateを取得
  const categories = useSelector((state) => state.categories);

  //   タブカテゴリ管理State
  const { tabCategory, setTabCategory } = useContext(tabCategoryContext);

  const switchTab = (id: number) => {
    setTabCategory(id);
  };

  // カテゴリの削除
  const deleteCategory = () => {
    // 確認ポップアップを表示
    const isConfirmed = window.confirm("本当にこのカテゴリを削除しますか？");
    if (isConfirmed) {
      console.log("削除");
      // setTabCategory(0);
      // dispatch(categoryDelete(deleteCategory));
    }
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
        <button
          key={category.id}
          value={category.name}
          onClick={() => switchTab(category.id!)}
          className={`bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-t focus:outline-none focus:shadow-outline m-1 ${
            tabCategory === category.id ? "font-bold" : ""
          }`}
        >
          <div className="flex">
            <p>{category.name}</p>
            <p
              className="text-xs my-0 ml-3 opacity-50 hover:opacity-100"
              onClick={deleteCategory}
            >
              ⛔️
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ListTab;
