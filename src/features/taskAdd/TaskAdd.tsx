import { taskAdd } from "../../slices/inCompletedTaskSlice";
import { categoryAdd } from "@/slices/categorySlice";
import taskApi from "@/pages/api/task";
import { useSelector } from "@/store/store";
import { Category, TaskItem, inputTaskItem } from "@/@types";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

// 新規タスク追加画面
const TaskAdd: React.FC = () => {
  const dispatch = useDispatch();

  // カテゴリStateが最新化された状態でformを表示するための状態管理。
  const [isLoading, setIsLoading] = useState(true);

  // カテゴリStateを取得
  const categories = useSelector((state) => state.categories);

  // APIを経由してデータベースからカテゴリを取得し、カテゴリStateに反映
  useEffect(() => {
    (async () => {
      const categories: Category[] = await taskApi.categoryGetAll();
      categories.forEach((category) => dispatch(categoryAdd(category)));
      setIsLoading(false);
    })();
  }, []);

  // フォーム入力値をStateで管理(categoryは文字列型)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });

  const onSubmit = async (taskItem: inputTaskItem) => {
    // フォーム入力値のcategoryのidをもとに、APIでカテゴリを取得
    const category: Category = await taskApi.categoryGetById(
      Number(taskItem.category)
    );
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
    const _newTask: TaskItem = await taskApi.latestTaskGet();
    // 新しいタスクを未完了タスクのStateに追加
    dispatch(taskAdd(_newTask));
    reset();
  };

  // // タスク追加フォームのカテゴリ項目の初期値を設定
  // useEffect(() => {
  //   // カテゴリStateが空でない＆タスク追加フォームのカテゴリ項目が未選択の場合、カテゴリStateの先頭のカテゴリを初期値に設定
  //   // categories.categoriesが更新されたらその都度変わる。
  //   if (categories.categories.length > 0 && !taskItem.category) {
  //     setTaskItem((state) => ({
  //       ...state,
  //       category: categories.categories[0].id!.toString(),
  //     }));
  //   }
  // }, [categories]);

  if (!isLoading) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            タイトル：
            <input
              type="text"
              {...register("title", { required: "タイトルは必須です。" })}
            />
            <p>{errors.title?.message as React.ReactNode}</p>
          </label>
        </div>
        <div>
          <label>
            期日：
            <input type="date" {...register("deadLine")} />
          </label>
        </div>
        <div>
          <label>
            カテゴリ：
            <select {...register("category")}>
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
            <textarea {...register("deadLine")}></textarea>
          </label>
        </div>
        <div>
          <button type="submit">送信</button>
        </div>
      </form>
    );
  }
};

export default TaskAdd;
