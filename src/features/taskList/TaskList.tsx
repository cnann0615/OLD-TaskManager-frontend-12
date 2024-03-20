import React, { useState, createContext } from "react";
import CompletedTaskList from "./CompletedTaskList";
import InCompletedTaskList from "./InCompletedTaskList";
import ListTab from "./ListTab";

// 現在のタブカテゴリを管理するStateを作成
export const tabCategoryContext = createContext();

const TaskList = () => {
  // 現在のタブカテゴリを管理するStateを作成
  const [tabCategory, setTabCategory] = useState(0);

  return (
    <tabCategoryContext.Provider value={{ tabCategory, setTabCategory }}>
      <ListTab />
      <InCompletedTaskList />
      <CompletedTaskList />
    </tabCategoryContext.Provider>
  );
};

export default TaskList;
