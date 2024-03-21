import { NextPage } from "next";

import TaskAdd from "@/features/taskAdd/TaskAdd";
import CategoryAdd from "@/features/categoryAdd/CategoryAdd";
import TaskList from "@/features/taskList/TaskList";

import taskApi from "./api/task";

const Home: NextPage = ()  => {
  return (
    <>
    <TaskAdd />
    <CategoryAdd />
    <TaskList />
    </>
  );
};

export default Home;