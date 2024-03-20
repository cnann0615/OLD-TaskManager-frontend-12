import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import { tabCategoryContext } from "./TaskList";

const ListTab = () => {
  // カテゴリStateを取得
  const categories = useSelector((state) => state.categories);

  //   タブカテゴリ管理State
  const { tabCategory, setTabCategory } = useContext(tabCategoryContext);
  
  const switchTab = (id) => {
    setTabCategory(id);
  };

  return (
    <>
      <button onClick={() => switchTab(0)}>全てのタスク</button>
      {categories.categories.map((category) => (
        <button
          key={category.id}
          value={category.name}
          onClick={() => switchTab(category.id)}
        >
          {category.name}
        </button>
      ))}
    </>
  );
};

export default ListTab;
