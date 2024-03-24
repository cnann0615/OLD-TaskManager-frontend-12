import { NextPage } from "next";

import TaskAdd from "@/features/taskAdd/TaskAdd";
import CategoryAdd from "@/features/categoryAdd/CategoryAdd";
import TaskList from "@/features/taskList/TaskList";

const Home: NextPage = () => {
  return (
    <div className="md:flex">
      <div className="md:w-1/3 p-4">
        <TaskAdd />
        <CategoryAdd />
      </div>
      <div className="md:w-2/3 p-4">
        <TaskList />
      </div>
      
    </div>
  );
};

export default Home;
