# 5. リスト表示とキー 練習問題

## 概要

この練習問題では、Reactでのリスト表示とkeyの重要性について学んだ知識を実践します。ToDoリストアプリを拡張して、より洗練された機能を実装していきましょう。

## 問題1: フィルター機能の実装

ToDoリストアプリに、タスクのフィルター機能を追加しましょう。「すべて」「完了」「未完了」の3つのフィルターを実装します。

1. まず、`src/components`ディレクトリに`TodoFilter.tsx`ファイルを作成してください：

```tsx
import React from 'react';

type TodoFilterProps = {
  // フィルター種別の型定義
  currentFilter: 'all' | 'active' | 'completed';
  // フィルター変更時のコールバック関数
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
};

const TodoFilter: React.FC<TodoFilterProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="todo-filter">
      <button 
        className={currentFilter === 'all' ? 'active' : ''}
        // クリック時のイベントハンドラを実装してください
      >
        すべて
      </button>
      <button 
        className={currentFilter === 'active' ? 'active' : ''}
        // クリック時のイベントハンドラを実装してください
      >
        未完了
      </button>
      <button 
        className={currentFilter === 'completed' ? 'active' : ''}
        // クリック時のイベントハンドラを実装してください
      >
        完了
      </button>
    </div>
  );
};

export default TodoFilter;
```

2. 次に、App.tsxファイルを修正して、フィルター状態を管理し、フィルターに基づいてタスクをフィルタリングする機能を実装してください：

```tsx
// App.tsxに追加する内容
import TodoFilter from './components/TodoFilter';

function App() {
  // 既存のtodos状態

  // フィルター状態を管理するuseStateを追加してください
  // 'all' | 'active' | 'completed'の3種類のフィルターがあります

  // フィルターを変更する関数を実装してください

  // 現在のフィルターに基づいてタスクをフィルタリングする関数を実装してください
  // フィルター結果をTodoListコンポーネントに渡します

  return (
    <div className="App">
      <Header title="Todoリストアプリ" description="日々のタスクを管理しましょう" />
      <Counter />
      <TodoForm onAddTodo={addTodo} />
      {/* ここにTodoFilterコンポーネントを追加 */}
      <TodoList 
        todos={/* フィルタリングされたtodos */} 
        onToggle={toggleTodo} 
      />
      <Footer copyright="© 2025" author="あなたの名前" />
    </div>
  );
}
```

## 問題2: タスク削除機能の追加

各タスクに削除ボタンを追加して、タスクを削除できるようにしましょう。

1. まず、`TodoItem.tsx`コンポーネントを修正して、削除ボタンを追加してください：

```tsx
type TodoItemProps = {
  text: string;
  completed: boolean;
  onToggle: () => void;
  // 削除用のコールバック関数を追加
  onDelete: () => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ text, completed, onToggle, onDelete }) => {
  const style = {
    textDecoration: completed ? 'line-through' : 'none',
    cursor: 'pointer'
  };

  return (
    <li>
      <span style={style} onClick={onToggle}>
        {text}
      </span>
      {/* 削除ボタンを追加してください */}
      <button 
        onClick={/* 削除処理を実装 */}
        style={{ marginLeft: '10px' }}
      >
        削除
      </button>
    </li>
  );
};
```

2. 次に、`TodoList.tsx`コンポーネントを修正して、削除機能を追加してください：

```tsx
type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  // 削除用のコールバック関数を追加
  onDelete: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={() => onToggle(todo.id)}
          // 削除処理を追加
          onDelete={/* ここに削除処理を実装 */}
        />
      ))}
    </ul>
  );
};
```

3. `App.tsx`に、タスクを削除する関数を追加してください：

```tsx
// タスク削除関数
const deleteTodo = (id: number) => {
  // 指定されたidのタスクを配列から削除する処理を実装してください
  // ヒント: filter関数を使うと良いでしょう
};

// TodoListにonDelete関数を渡します
<TodoList 
  todos={filteredTodos} 
  onToggle={toggleTodo} 
  onDelete={deleteTodo} 
/>
```

## 問題3: タスク統計情報の表示

ToDoリストアプリに統計情報を表示するコンポーネントを追加しましょう。

1. `src/components`ディレクトリに`TodoStats.tsx`ファイルを作成してください：

```tsx
import React from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoStatsProps = {
  todos: Todo[];
};

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  // 完了タスク数の計算
  // ヒント: filterを使って完了タスクの数を計算
  
  // 未完了タスク数の計算
  // ヒント: 同様にfilterを使うか、全体数から完了数を引く
  
  // 完了率の計算（%）
  // ヒント: 全体が0の場合は0%とする

  return (
    <div className="todo-stats">
      <p>全タスク数: {/* 全タスク数 */}</p>
      <p>完了: {/* 完了タスク数 */}</p>
      <p>未完了: {/* 未完了タスク数 */}</p>
      <p>完了率: {/* 完了率 */}%</p>
    </div>
  );
};

export default TodoStats;
```

2. `App.tsx`に`TodoStats`コンポーネントを追加してください：

```tsx
import TodoStats from './components/TodoStats';

// JSXの適切な場所にTodoStatsコンポーネントを追加
<TodoFilter currentFilter={filter} onFilterChange={setFilter} />
<TodoStats todos={todos} />
<TodoList 
  todos={filteredTodos} 
  onToggle={toggleTodo} 
  onDelete={deleteTodo} 
/>
```

## 提出方法

上記の問題を実装して、アプリが正常に動作することを確認してください。特に以下の点に注意してください：

1. すべてのコンポーネントに適切なキー（key）が設定されていること
2. フィルター機能が正しく動作すること
3. 削除機能が正しく動作すること
4. 統計情報が正しく表示されること

実装が完了したら、コードを提出してください。
