import { taskAdd } from "../../slices/inCompletedTaskSlice";
import { categoryAdd } from "@/slices/categorySlice";
import taskApi from "@/pages/api/task";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "@/store/store";

//型定義
// カテゴリ
type Category = {
  id?: number;
  name: string;
};
// 完了タスク
type TaskItem = {
  id?: number;
  title: string;
  deadLine: string;
  category: Category;
  memo: string;
  isComplete: boolean;
};


// 新規タスク追加画面
const TaskAdd: React.FC = () => {
  const dispatch = useDispatch();

  // カテゴリStateを取得
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    // APIを経由してデータベースからカテゴリを取得し、カテゴリStateに反映
    (async () => {
      const categories: Category[] = await taskApi.categoryGetAll();
      categories.map((category) => dispatch(categoryAdd(category)));
    })();
  }, []);

  // タスク追加フォームのカテゴリ項目の初期値を設定
  useEffect(() => {
    // カテゴリStateが空でない＆タスク追加フォームのカテゴリ項目が未選択の場合、カテゴリStateの先頭のカテゴリを初期値に設定
    // categories.categoriesが更新されたらその都度変わる。
    if (categories.categories.length > 0 && !taskItem.category) {
      setTaskItem((state) => ({
        ...state,
        category: categories.categories[0].id!.toString(),
      }));
    }
  }, [categories.categories]);

  // フォーム入力値をStateで管理
  const [taskItem, setTaskItem] = useState({
    title: "",
    deadLine: "",
    category: "",
    memo: "",
    isComplete: false,
  });

  // タイトルの変更ハンドラ
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskItem({ ...taskItem, title: e.target.value });
  };
  // 期日の変更ハンドラ
  const handleDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskItem({ ...taskItem, deadLine: e.target.value });
  };
  // カテゴリの変更ハンドラ
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTaskItem({ ...taskItem, category: e.target.value });
  };
  // メモの変更ハンドラ
  const handleMemoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskItem({ ...taskItem, memo: e.target.value });
  };

  // 送信ボタン押下時のアクション
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // ページのリロードを防ぐ
    e.preventDefault();

    const category = await taskApi.categoryGetById(Number(taskItem.category));

    // 新しいタスクオブジェクトを作成
    const newTask: TaskItem = {
      title: taskItem.title,
      deadLine: taskItem.deadLine,
      category: category,
      memo: taskItem.memo,
      isComplete: false,
    };

    // 新しいタスクをAPI経由でデータベースに追加
    await taskApi.taskAdd(newTask);
    // IDが設定された新しいタスクを再度APIを経由してデータベースから取得
    const _newTask = await taskApi.latestTaskGet();
    // 新しいタスクを未完了タスクのStateに追加
    dispatch(taskAdd(_newTask));
    // フォームの入力値をリセット
    setTaskItem({
      title: "",
      deadLine: "",
      category: "",
      memo: "",
      isComplete: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          タイトル：
          <input
            type="text"
            value={taskItem.title}
            onChange={handleTitleChange} />
        </label>
      </div>
      <div>
        <label>
          期日：
          <input
            type="date"
            value={taskItem.deadLine}
            onChange={handleDeadlineChange} />
        </label>
      </div>
      <div>
        <label>
          カテゴリ：
          <select value={taskItem.category} onChange={handleCategoryChange}>
            {categories.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          メモ：
          <textarea
            value={taskItem.memo}
            onChange={handleMemoChange}
          ></textarea>
        </label>
      </div>
      <div>
        <button type="submit">送信</button>
      </div>
    </form>
  );
};

export default TaskAdd;