import TaskAdd from "@/features/taskAdd/TaskAdd";
import CategoryAdd from "@/features/categoryAdd/CategoryAdd";
import TaskList from "@/features/taskList/TaskList";

import taskApi from "./api/task";

export default function Home() {
  return (
    <>
    <TaskAdd />
    <CategoryAdd />
    <TaskList />
    </>
  );
};
