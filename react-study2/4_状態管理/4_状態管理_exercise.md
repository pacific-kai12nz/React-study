# 4. 状態管理（useState） - 練習問題

この練習問題では、Reactの状態管理（useState）を使って、ToDoリストアプリに実際の機能を実装していきます。

## 問題1: カウンターコンポーネントの作成

まずは基本的な状態管理の練習として、シンプルなカウンターコンポーネントを作成しましょう。

1. `src/components`ディレクトリに`Counter.tsx`ファイルを作成してください。
2. 以下の要件を満たすコンポーネントを実装してください：
   - 現在のカウント値を表示する
   - 「プラス」ボタンを押すとカウントが増える
   - 「マイナス」ボタンを押すとカウントが減る

```tsx
// src/components/Counter.tsx
import React, { useState } from 'react';

const Counter: React.FC = () => {
  // カウントの状態を管理するuseStateを定義してください
  // 初期値は0にします

  return (
    <div className="counter">
      <h2>カウンター</h2>
      <p>カウント: {/* ここにカウント値を表示 */}</p>
      <button onClick={/* プラスボタンのクリックハンドラ */}>プラス</button>
      <button onClick={/* マイナスボタンのクリックハンドラ */}>マイナス</button>
    </div>
  );
};

export default Counter;
```

## 問題2: タスク入力フォームの作成

ToDoリストアプリにタスクを追加するための入力フォームを作成しましょう。

1. `src/components`ディレクトリに`TodoForm.tsx`ファイルを作成してください。
2. 以下の要件を満たすコンポーネントを実装してください：
   - テキスト入力フィールドがある
   - 「追加」ボタンがある
   - 入力内容を状態（state）として管理する
   - 追加ボタンを押すと、入力されたテキストがコンソールに表示される
   - 追加ボタンを押すと、入力フィールドがクリアされる

```tsx
// src/components/TodoForm.tsx
import React, { useState } from 'react';

const TodoForm: React.FC = () => {
  // 入力テキストの状態を管理するuseStateを定義してください
  // フォーム送信時の処理を実装してください
  const handleSubmit = (e: React.FormEvent) => {
    // フォームのデフォルト送信動作を防止
    e.preventDefault();
    
    // 入力が空の場合は何もしない

    // 入力内容をコンソールに表示

    // 入力フィールドをクリア
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="新しいタスクを入力"
        // 入力値とonChange処理を実装してください
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default TodoForm;
```

## 問題3: App.tsxでカウンターとフォームを使用する

作成したコンポーネントをApp.tsxで使用してみましょう。

1. `App.tsx`ファイルを開き、以下の変更を行ってください：
   - CounterコンポーネントとTodoFormコンポーネントをインポートする
   - これらのコンポーネントをHeaderとTodoListの間に配置する

```tsx
// App.tsxの修正内容
import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
// 新しいコンポーネントをインポートしてください

function App() {
  const todos = [
    {id: 1, text:'買い物に行く', completed: false},
    {id: 2, text:'Reactの勉強をする', completed: true},
    {id: 3, text:'部屋の掃除をする', completed: false}
  ];
  
  return (
    <div className="App">
      <Header title="Todoリストアプリ" description="日々のタスクを管理しましょう" />
      {/* ここにCounterコンポーネントを配置 */}
      {/* ここにTodoFormコンポーネントを配置 */}
      <TodoList todos={todos} />
      <Footer copyright="© 2025" author="あなたの名前" />
    </div>
  );
}

export default App;
```

## 問題4: タスクリストの状態管理

今までTodoListコンポーネントには、App.tsxから固定のtodosデータを渡していました。これを、App.tsxで状態として管理するように変更しましょう。

1. `App.tsx`ファイルをさらに修正して、todosを状態として管理するようにします：
   - useStateを使って、todosを状態として定義する
   - TodoFormから新しいタスクを追加できるようにする
   - （発展）タスクを削除する機能も追加する

```tsx
// App.tsxのさらなる修正
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import Counter from './components/Counter';
import TodoForm from './components/TodoForm';

// Todo型の定義（必要に応じて）
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  // todos状態の定義
  const [todos, setTodos] = useState<Todo[]>([
    {id: 1, text:'買い物に行く', completed: false},
    {id: 2, text:'Reactの勉強をする', completed: true},
    {id: 3, text:'部屋の掃除をする', completed: false}
  ]);
  
  // 新しいタスクを追加する関数を実装してください
  const addTodo = (text: string) => {
    // textが空の場合は何もしない
    
    // 新しいTodoオブジェクトを作成
    
    // setTodosを使ってtodosステートを更新
  };
  
  return (
    <div className="App">
      <Header title="Todoリストアプリ" description="日々のタスクを管理しましょう" />
      <Counter />
      {/* TodoFormにaddTodo関数を渡す */}
      <TodoForm /* ここにonAddTodoプロップスを追加 */ />
      <TodoList todos={todos} />
      <Footer copyright="© 2025" author="あなたの名前" />
    </div>
  );
}

export default App;
```

## 問題5: TodoFormを修正して親コンポーネントにタスクを渡す

TodoFormコンポーネントを修正して、入力されたタスクをApp.tsxに渡せるようにしましょう。

1. `TodoForm.tsx`ファイルを修正して、以下の変更を行ってください：
   - コンソールに表示するだけでなく、親コンポーネントに新しいタスクを渡す
   - そのためのプロップスとコールバック関数を追加する

```tsx
// TodoForm.tsxの修正版
import React, { useState } from 'react';

// onAddTodoプロップスの型を定義
type TodoFormProps = {
  onAddTodo: (text: string) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  // ここに実装を追加してください

  return (
    <form onSubmit={/* ハンドラ関数 */}>
      {/* フォームの内容 */}
    </form>
  );
};

export default TodoForm;
```

## 問題6: タスクの完了状態を切り替える機能の追加

最後に、ToDoリストアプリにタスクの完了状態を切り替える機能を追加しましょう。

1. `App.tsx`に、タスクの完了状態を切り替える関数を追加します：

```tsx
// タスクの完了状態を切り替える関数
const toggleTodo = (id: number) => {
  // todosの中から該当するidのタスクを見つけ、completedプロパティを反転させる
  setTodos(
    todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};
```

2. `TodoList.tsx`と`TodoItem.tsx`を修正して、タスクをクリックすると完了状態が切り替わるようにします：

```tsx
// TodoList.tsxの修正
type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={() => onToggle(todo.id)}
        />
      ))}
    </ul>
  );
};
```

```tsx
// TodoItem.tsxの修正
type TodoItemProps = {
  text: string;
  completed: boolean;
  onToggle: () => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ text, completed, onToggle }) => {
  const style = {
    textDecoration: completed ? 'line-through' : 'none',
    cursor: 'pointer'
  };

  return (
    <li style={style} onClick={onToggle}>
      {text}
    </li>
  );
};
```

3. 最後に、`App.tsx`でTodoListコンポーネントにtoggleTodo関数を渡します：

```tsx
<TodoList todos={todos} onToggle={toggleTodo} />
```

## ヒント

- useStateフックはReactからインポートする必要があります: `import React, { useState } from 'react';`
- 状態の更新は常に新しいオブジェクトや配列を作成して行います（元のオブジェクトを直接変更しない）
- イベントハンドラを書く際は、TypeScriptでイベントの型も指定すると良いでしょう（例: `React.ChangeEvent<HTMLInputElement>`）
- 新しいタスクのIDには、一意の値を使う必要があります。簡単な方法としては `Date.now()` が使えます
- フォームの入力値は `event.target.value` で取得できます

## 発展課題

時間に余裕がある場合は、以下の機能も追加してみましょう：

- タスクの削除機能
- タスクの編集機能
- タスクのフィルタリング機能（すべて/完了/未完了）
- ローカルストレージを使ってタスクを保存する機能

頑張ってください！状態管理を理解することで、Reactアプリケーションを動的で対話的にできるようになります。
