# 3. プロップス（Props） - 練習問題

この練習問題では、プロップスを使ってコンポーネント間でデータを受け渡す方法を学び、ToDoリストアプリのコンポーネントをより柔軟にします。

## 問題1: ヘッダーコンポーネントにプロップスを追加

`Header`コンポーネントを修正して、タイトルをプロップスとして受け取れるようにしましょう。

1. `src/components/Header.tsx`を開き、以下の変更を行ってください：
   - `HeaderProps`型を定義（タイトルと説明文をプロップスとして受け取れるように）
   - コンポーネントの引数で、プロップスを分割代入で受け取る
   - ハードコードされたタイトルと説明文をプロップスで置き換える

```tsx
// 現在のHeader.tsxを以下のように修正してください

import React from 'react';

// ここにHeaderProps型を定義してください


const Header: React.FC<HeaderProps> = ({title, description}) => {
  return (
    <header className='app-header'>
    <h1>{tittle}</h1>
    <p>{description}</p>

      <h1>ToDoリストアプリ</h1>
      <p>日々のタスクを管理しましょう</p>
    </header>
  );
};

export default Header;
```

## 問題2: App.tsxでプロップスを渡す

`App.tsx`を修正して、`Header`コンポーネントにプロップスを渡すようにしましょう。

```tsx
// App.tsxを以下のように修正してください

import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      {/* Headerコンポーネントにプロップスとしてtitleとdescriptionを渡してください */}
      <Header title="Todoリストアプリ" description="日々のタスクを管理しましょう"/>
      <Footer />
    </div>
  );
}

export default App;
```

## 問題3: フッターコンポーネントにプロップスを追加

同様に、`Footer`コンポーネントも修正して、著作権テキストとリンクをプロップスとして受け取れるようにしましょう。

1. `src/components/Footer.tsx`を開き、以下の変更を行ってください：
   - `FooterProps`型を定義（著作権テキストと製作者名をプロップスとして受け取れるように）
   - コンポーネントの引数で、プロップスを分割代入で受け取る
   - ハードコードされた著作権テキストをプロップスに置き換える

```tsx
// 現在のFooter.tsxを以下のように修正してください

import React from 'react';

// ここにFooterProps型を定義してください

const Footer: React.FC<FooterProps> = ({copyright, author }) => {
  return (
    <footer className="app-footer">
      {/* ハードコードされたテキストをプロップスに置き換えてください */}
      <p>© {copyright}{author}</p>
    </footer>
  );
};

export default Footer;
```

## 問題4: TodoItemコンポーネントの作成

ToDoリストアプリのための新しいコンポーネントとして、`TodoItem`コンポーネントを作成しましょう。

1. `src/components`ディレクトリに`TodoItem.tsx`ファイルを作成してください。
2. 以下の要件に従ってコンポーネントを実装してください：
   - `text`（タスクのテキスト）と`completed`（完了状態）をプロップスとして受け取る
   - `completed`の値に応じて、テキストの見た目を変える（完了の場合は取り消し線を表示）

```tsx
// src/components/TodoItem.tsx

import React from 'react';

// ここにTodoItemProps型を定義してください
type TodoItemProps = {
  text: string;
  completed: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({text, completed}) => {
  // ここにコンポーネントの実装を追加してください
  const style = {
    textDecoration: completed ? 'line-through' : 'none'
  };
  return (
    <li style={style}>
    {text}
    </li>
  );
  // ヒント: completedがtrueの場合は取り消し線スタイルを適用
};

export default TodoItem;
```

## 問題5: TodoListコンポーネントの作成

最後に、TodoItemコンポーネントを使用するTodoListコンポーネントを作成しましょう。

1. `src/components`ディレクトリに`TodoList.tsx`ファイルを作成してください。
2. 以下の要件に従ってコンポーネントを実装してください：
   - todoItems配列をプロップスとして受け取る（各アイテムはテキストと完了状態を持つ）
   - 配列の各要素をmapを使ってTodoItemコンポーネントに変換して表示する

```tsx
// src/components/TodoList.tsx

import React from 'react';
import TodoItem from './TodoItem';

// Todo型を定義
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

// TodoListProps型を定義

const TodoList: React.FC<TodoListProps> = ({todos}) => {
  return (
    <ul>
    {todos.map(todo => (
      <TodoItem
      key={todo.id}
      text={todo.text}
      completed={todo.completed}
      />
    ))}
    </ul>
  );
  // ここにコンポーネントの実装を追加してください
  // ヒント: todos配列をmapでTodoItemコンポーネントに変換

};

export default TodoList;
```

## 問題6: App.tsxでTodoListを使用する

`App.tsx`を修正して、作成したTodoListコンポーネントを使用しましょう。

```tsx
// App.tsxに追加のコードを追加

import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';

function App() {
  // サンプルのTodo配列を定義
  const todos = [
    { id: 1, text: '買い物に行く', completed: false },
    { id: 2, text: 'Reactの勉強をする', completed: true },
    { id: 3, text: '部屋の掃除をする', completed: false }
  ];

  return (
    <div className="App">
      <Header title="ToDoリストアプリ" description="日々のタスクを管理しましょう" />
      {/* TodoListコンポーネントにtodosを渡す */}
      <TodoList /* ここにプロップスを追加 */ />
      <Footer copyright="© 2025" author="あなたの名前" />
    </div>
  );
}

export default App;
```

## ヒント

- TypeScriptの型定義では、必須のプロップスはそのまま定義し、省略可能なプロップスには`?`を付けます
- プロップスは親コンポーネントから子コンポーネントへの単方向のデータフローです
- 条件付きスタイルを適用するには、三項演算子や&&演算子を使用できます
- 配列をコンポーネントのリストに変換する際は、必ず各要素に一意のkeyプロップスを指定してください

## 提出方法

課題が完了したら、ブラウザでアプリを確認してください（`npm start`コマンドが実行されている状態）。プロップスを使って、各コンポーネントが正しく情報を表示していれば成功です！
