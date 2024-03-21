import { Category } from "@/@types";
import taskApi from "@/pages/api/task";
import { categoryAdd } from "@/slices/categorySlice";

import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";


// 新規カテゴリ追加画面
const CategoryAdd: React.FC = () => {
  const dispatch = useDispatch();

  // フォーム入力値をStateで管理
  const [category, setCategory] = useState<Category>({ name: "" });

  // カテゴリ名の変更ハンドラ
  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, name: e.target.value });
  };

  // 送信ボタン押下時のアクション
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // ページのリロードを防ぐ
    e.preventDefault();
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
    // フォームの入力値をリセット
    setCategory({
      name: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          カテゴリ名：
          <input
            type="text"
            value={category.name}
            onChange={handleCategoryNameChange}
          />
        </label>
      </div>
      <div>
        <button type="submit">送信</button>
      </div>
    </form>
  );
};

export default CategoryAdd;
