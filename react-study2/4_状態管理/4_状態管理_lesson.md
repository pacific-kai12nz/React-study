# 4. 状態管理（useState）

## 状態（State）とは

Reactにおける「状態（State）」とは、コンポーネントが内部で保持する、時間とともに変化しうるデータのことです。例えば、以下のようなものが状態として管理されます：

- フォームの入力値
- ユーザーの選択状態（チェックボックス、ラジオボタンなど）
- データの読み込み状態
- UIの表示/非表示の切り替え
- リストの項目（追加/削除される可能性がある）

状態が変更されると、Reactは自動的に関連するコンポーネントを再レンダリングして、UIを最新の状態に保ちます。

## useStateフックとは

関数コンポーネントで状態を扱うために、Reactは「フック（Hook）」という仕組みを提供しています。中でも`useState`は最も基本的なフックで、コンポーネント内で状態を宣言するために使用します。

### useStateの基本的な使い方

```tsx
import React, { useState } from 'react';

function Counter() {
  // countという状態変数と、それを更新するsetCount関数を宣言
  // 0は初期値
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        プラス
      </button>
      <button onClick={() => setCount(count - 1)}>
        マイナス
      </button>
    </div>
  );
}
```

### useState構文の説明

```tsx
const [state, setState] = useState(initialValue);
```

- `state`: 現在の状態値
- `setState`: 状態を更新するための関数
- `initialValue`: 状態の初期値

`useState`は配列を返し、その配列は分割代入で通常2つの要素に分解します：

1. 現在の状態値
2. その状態を更新するための関数

## 状態の更新

状態を更新するには、`useState`から取得した更新関数を呼び出します：

```tsx
// 単純な更新
setCount(10);

// 現在の値に基づく更新
setCount(count + 1);

// 関数形式の更新（前の状態に基づいて更新する場合に推奨）
setCount(prevCount => prevCount + 1);
```

### 関数形式の更新を使うべき場面

特に、前の状態に基づいて更新する場合は、関数形式を使うべきです：

```tsx
// 関数形式（安全）
setCount(prevCount => prevCount + 1);

// 直接値を使用（場合によっては問題が起きる可能性あり）
setCount(count + 1);
```

関数形式を使うと、最新の状態を確実に参照できるため、特に連続した更新や非同期処理の中で状態を更新する場合に重要です。

## 複雑な状態の管理

### オブジェクトの状態管理

状態がオブジェクトの場合：

```tsx
const [user, setUser] = useState({ name: '', age: 0 });

// 更新方法
setUser({ ...user, name: '山田太郎' });
```

オブジェクトを更新する際は、スプレッド構文（`...`）を使って既存のプロパティを維持しながら、更新したいプロパティだけを変更するのが一般的です。

### 配列の状態管理

状態が配列の場合：

```tsx
const [items, setItems] = useState([]);

// 配列に要素を追加
setItems([...items, newItem]);

// 配列から要素を削除
setItems(items.filter(item => item.id !== idToRemove));

// 配列の要素を更新
setItems(items.map(item => 
  item.id === itemToUpdate.id ? { ...item, ...itemToUpdate } : item
));
```

## イベントハンドリングと状態の更新

ユーザーのアクションに応じて状態を更新するのが一般的です：

```tsx
function TodoForm() {
  const [inputText, setInputText] = useState('');
  
  // テキスト入力の変更を処理
  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  
  // フォーム送信を処理
  const handleSubmit = (e) => {
    e.preventDefault();
    // 何らかの処理（例：タスク追加）
    console.log('Submit:', inputText);
    setInputText(''); // 入力フィールドをクリア
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={inputText} 
        onChange={handleChange} 
        placeholder="新しいタスクを入力" 
      />
      <button type="submit">追加</button>
    </form>
  );
}
```

## TypeScriptでの型付け

TypeScriptでuseStateを使う場合、状態の型を明示的に指定できます：

```tsx
// 基本型
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>('');
const [isActive, setIsActive] = useState<boolean>(false);

// 複雑な型
type User = {
  id: number;
  name: string;
  email: string;
};

const [user, setUser] = useState<User | null>(null);

// 配列
const [items, setItems] = useState<string[]>([]);
```

## 複数の状態変数

1つのコンポーネントで複数の状態を管理することができます：

```tsx
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  
  // フォーム送信処理
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, age };
    console.log('User Data:', userData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 名前入力 */}
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="名前" 
      />
      
      {/* メール入力 */}
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="メール" 
      />
      
      {/* 年齢入力 */}
      <input 
        type="number" 
        value={age} 
        onChange={(e) => setAge(Number(e.target.value))} 
        placeholder="年齢" 
      />
      
      <button type="submit">送信</button>
    </form>
  );
}
```

## ToDoリストアプリでの状態管理

ToDoリストアプリを例に、状態管理を具体的に見てみましょう：

```tsx
import React, { useState } from 'react';

// Todo型定義
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function TodoApp() {
  // Todo項目の配列を状態として管理
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // 新しいタスクの入力テキスト
  const [inputText, setInputText] = useState('');
  
  // タスク追加処理
  const addTodo = () => {
    if (inputText.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),  // 一意のIDとして現在時刻のタイムスタンプを使用
      text: inputText,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputText('');  // 入力フィールドをクリア
  };
  
  // タスク完了状態切り替え処理
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  // タスク削除処理
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <h1>ToDoリスト</h1>
      
      {/* タスク入力フォーム */}
      <div>
        <input 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="新しいタスクを入力"
        />
        <button onClick={addTodo}>追加</button>
      </div>
      
      {/* タスクリスト */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 状態管理のベストプラクティス

1. **必要な状態だけを管理する**：
   - 派生データは状態として持たず、既存の状態から計算する
   - 例：タスク総数はタスク配列の長さから計算できる

2. **状態の配置場所を適切に選ぶ**：
   - 複数のコンポーネントで共有する状態は、共通の親コンポーネントで管理する

3. **状態の更新は常に新しいオブジェクトとして行う**：
   - オブジェクトや配列を直接変更せず、新しい参照を作成する

4. **関連する状態はまとめて管理を検討する**：
   - 密接に関連する複数の状態は、オブジェクトとしてまとめることを検討する

## まとめ

- **状態（State）** はコンポーネントが保持する変化するデータ
- **useState** は関数コンポーネントで状態を扱うためのフック
- 状態が変更されると、コンポーネントは再レンダリングされる
- オブジェクトや配列の状態を更新する際は、イミュータブル（不変）に扱う
- TypeScriptを使うと、状態の型を明示的に指定できる
- イベントハンドラを通じて、ユーザーのアクションに応じて状態を更新する

次の章では、コンポーネントがマウント、更新、アンマウントされるタイミングで処理を実行するための「副作用（useEffect）」について学びます。
