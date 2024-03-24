import { useContext } from "react";

import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";

const ListTab: React.FC = () => {
  // カテゴリStateを取得
  const categories = useSelector((state) => state.categories);

  //   タブカテゴリ管理State
  const { tabCategory, setTabCategory } = useContext(tabCategoryContext);

  const switchTab = (id: number) => {
    setTabCategory(id);
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
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default ListTab;
