import { useContext } from "react";

import { useSelector } from "@/store/store";
import { tabCategoryContext } from "./TaskList";

const ListTab: React.FC = () => {
  // カテゴリStateを取得
  const categories = useSelector((state) => state.categories);

  //   タブカテゴリ管理State
  const { setTabCategory } = useContext(tabCategoryContext);

  const switchTab = (id: number) => {
    setTabCategory(id);
  };

  return (
    <>
      <button
        onClick={() => switchTab(0)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-1"
      >
        全てのタスク
      </button>
      {categories.categories.map((category) => (
        <button
          key={category.id}
          value={category.name}
          onClick={() => switchTab(category.id!)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-1"
        >
          {category.name}
        </button>
      ))}
    </>
  );
};

export default ListTab;
