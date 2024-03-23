import { Category } from "@/@types";
import taskApi from "@/pages/api/task";
import { categoryAdd } from "@/slices/categorySlice";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// 新規カテゴリ追加画面
const CategoryAdd: React.FC = () => {
  const dispatch = useDispatch();

  // フォームの処理
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });

  const onSubmit = async (category: Category) => {
    // 新しいカテゴリオブジェクトを作成
    const newCategory: Category = { name: category.name };
    // 新しいカテゴリをAPI経由でデータベースに追加
    const categoryAddSuccess: Category = await taskApi.categoryAdd(newCategory);
    // カテゴリ名が重複せず追加された場合のみ処理を行う。（重複した場合、nullが返されるため以下の処理は行われない。）
    categoryAddSuccess &&
      (async () => {
        // IDが設定された新しいカテゴリを再度APIを経由してデータベースから取得
        const _newCategory: Category = await taskApi.latestCategoryGet();
        // 新しいカテゴリをカテゴリのStateに追加
        dispatch(categoryAdd(_newCategory));
      })();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          カテゴリ名：
          <input
            type="text"
            {...register("name", { required: "カテゴリ名は必須です。" })}
          />
          <p>{errors.name?.message as React.ReactNode}</p>
        </label>
      </div>
      <div>
        <button type="submit">送信</button>
      </div>
    </form>
  );
};

export default CategoryAdd;
