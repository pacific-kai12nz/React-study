# 練習問題: リストとキー

## 問題1: シンプルなリスト表示

次の配列データを使用して、商品リストを表示するコンポーネントを作成してください。

要件:
- 商品データから商品名と価格を表示する
- 各リスト項目には正しくキーを設定する
- 価格は3桁ごとにカンマ区切りで表示する

```tsx
// ここにコードを記述してください
import React from 'react';

// 商品データ
const products = [
  { id: 1, name: 'ノートパソコン', price: 85000 },
  { id: 2, name: 'タブレット', price: 45000 },
  { id: 3, name: 'スマートウォッチ', price: 32000 },
  { id: 4, name: 'ワイヤレスイヤホン', price: 15000 }
];

const ProductList = () => {
  // ここにリスト表示のコードを記述してください

  return (
    <div>
      <h2>商品リスト</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}: ¥{product.price.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
```

## 問題2: フィルタリングを活用したリスト表示

先ほどの商品データを使って、2万円以上の商品だけを表示する「高額商品リスト」コンポーネントを作成してください。

要件:
- filter()メソッドを使用して2万円以上の商品をフィルタリングする
- フィルタリングされた商品のみを表示する
- 各リスト項目には正しくキーを設定する

```tsx
// ここにコードを記述してください
import React from 'react';

// 商品データ
const products = [
  { id: 1, name: 'ノートパソコン', price: 85000 },
  { id: 2, name: 'タブレット', price: 45000 },
  { id: 3, name: 'スマートウォッチ', price: 32000 },
  { id: 4, name: 'ワイヤレスイヤホン', price: 15000 },
  { id: 5, name: 'マウス', price: 5000 },
  { id: 6, name: 'キーボード', price: 8000 }
];

const ExpensiveProductList = () => {
  const expensiveProducts = products.filter(product => product.price >= 20000);
  return (
    <div>
      <h2>高額商品リスト（2万円以上）</h2>
      <ul>
        {expensiveProducts.map(product => (
          <li key={product.id}>
            {product.name}: ¥{product.price.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensiveProductList;
```

## 問題3: リストと条件付きレンダリング

次のTodoリストデータを使用して、完了済みと未完了のタスクを視覚的に区別して表示するコンポーネントを作成してください。

要件:
- 完了済みのタスクは取り消し線で表示する
- 各タスクの横にはチェックボックスを表示し、クリックすると完了状態が切り替わる
- 未完了のタスク数を表示する
- useState フックを使用して、タスクの状態を管理する

```tsx
// ここにコードを記述してください
import React, { useState } from 'react';

// 初期のTodoデータ
const initialTodos = [
  { id: 1, text: 'Reactの基礎を学ぶ', completed: true },
  { id: 2, text: 'コンポーネントを作成する', completed: true },
  { id: 3, text: 'リストレンダリングを実装する', completed: false },
  { id: 4, text: 'スタイリングを追加する', completed: false }
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id){
          return {...todo, completed: !todo.completed};
        }
        return todo;
      })
    );
  };

  const incompleteTasks = todos.filter(todo => !todo.completed).length;

  return (
    <div>
      <h2>Todoリスト</h2>
      <p>未完了のタスク: {incompleteTasks}件</p>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              marginLeft: '8px'
            }}>
              {todo.text}
            </span>
          </li>
      ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

## 問題4: ネストしたリストの表示

次のカテゴリと商品のネストされたデータを使用して、カテゴリ別に商品を表示するコンポーネントを作成してください。

要件:
- カテゴリごとに見出しを表示し、その下に商品リストを表示する
- 各カテゴリと各商品に正しくキーを設定する
- リストは階層構造（ネスト）を持つようにする

```tsx
// ここにコードを記述してください
import React from 'react';

// カテゴリと商品のデータ
const categories = [
  {
    id: 'electronics',
    name: '電子機器',
    products: [
      { id: 'e1', name: 'ノートパソコン', price: 85000 },
      { id: 'e2', name: 'タブレット', price: 45000 },
      { id: 'e3', name: 'スマートフォン', price: 60000 }
    ]
  },
  {
    id: 'accessories',
    name: 'アクセサリー',
    products: [
      { id: 'a1', name: 'ワイヤレスイヤホン', price: 15000 },
      { id: 'a2', name: 'スマートウォッチ', price: 32000 }
    ]
  },
  {
    id: 'peripherals',
    name: '周辺機器',
    products: [
      { id: 'p1', name: 'マウス', price: 5000 },
      { id: 'p2', name: 'キーボード', price: 8000 },
      { id: 'p3', name: '外付けHDD', price: 12000 }
    ]
  }
];

const CategoryProductList = () => {
  return (
    <div>
      <h1>カテゴリ別商品リスト</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <h2>{category.name}</h2>
            <ul>
              {category.products.map(product => (
                <li key={product.id}>
                  {product.name}: ¥{product.price.toLocaleString()}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProductList;
```

## 問題5: コンポーネント分割とリスト

次の商品データを使用して、商品リストと商品アイテムを別々のコンポーネントに分割してください。さらに、各商品にユーザーアクション（例: カートに追加）の機能を追加してください。

要件:
- `ProductItem`コンポーネントと`ProductList`コンポーネントの2つに分割する
- 各商品にはアクションボタン（カートに追加など）を追加する
- ボタンクリック時にはコンソールに「[商品名]をカートに追加しました」と表示する
- `ProductItem`コンポーネントには適切なpropsで型を定義する

```tsx
// ここにコードを記述してください
import React from 'react';

// 商品データ
const products = [
  { id: 1, name: 'ノートパソコン', price: 85000, stock: 3 },
  { id: 2, name: 'タブレット', price: 45000, stock: 5 },
  { id: 3, name: 'スマートウォッチ', price: 32000, stock: 8 },
  { id: 4, name: 'ワイヤレスイヤホン', price: 15000, stock: 12 }
];

// 商品アイテムコンポーネント
interface ProductItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const handleAddToCart = () => {
    console.log(`${product.name}をカートに追加しました`);
  };

  return (
    <li className="product-item">
      <div>
        <h3>{product.name}</h3>
        <p>価格: ¥{product.price.toLocaleString()}</p>
        <p>在庫: {product.stock}個</p>
      </div>
      <button onClick={handleAddToCart}>カートに追加</button>
    </li>
  );
};

// 商品リストコンポーネント 
const ProductList = () => {
  return (
    <div>
      <h1>商品一覧</h1>
      <ul className="product-list">
      {products.map(product => (
        <ProductItem key={product.id} product={product}/>
      ))}
      </ul>
    </div>
  );
};

export default ProductList;
```

## 提出

すべての問題が完了したら、learning_path.md を更新して、このセクションに対応するチェックボックスにチェックを入れてください。
