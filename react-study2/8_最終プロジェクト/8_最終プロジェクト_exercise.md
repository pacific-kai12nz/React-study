# 8. 最終プロジェクト - 演習

## 演習1: コードのリファクタリングとカスタムフック

現在のToDoリストアプリは基本的な機能が実装できていますが、コードの整理とより良い構造にするリファクタリングが必要です。以下の手順で実装してみましょう。

### 1-1: プロジェクト構造の整理

まずは、関連するコンポーネントをフォルダにグループ化して整理します。

1. 以下の構造を作成してください：

```
src/
├── components/         # UIコンポーネント
│   ├── TodoList/      # TodoList関連コンポーネント
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoForm.tsx
│   ├── Filters/       # フィルター関連コンポーネント
│   │   └── TodoFilter.tsx
│   └── Statistics/    # 統計関連コンポーネント
│       └── TodoStats.tsx
├── hooks/              # カスタムフック
│   └── useTodos.ts     # Todo関連のロジックを抽出
└── types/              # 型定義
    └── index.ts
```

2. 既存のファイルを適切なディレクトリに移動し、必要に応じてimportパスを修正してください。

### 1-2: 型定義の集約

アプリケーション全体で使われる型定義を一箇所に集約します。

1. `src/types/index.ts` ファイルを作成し、以下の型定義を集約してください：

```tsx
// Todo型定義
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  // 後で拡張するフィールド（任意）
  // category?: string;
  // priority?: 'high' | 'medium' | 'low';
  // dueDate?: Date;
}

// 各コンポーネントのProps型定義
export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

export interface TodoStatsProps {
  todos: Todo[];
}
```

2. 各コンポーネントファイルから型定義をこの中央ファイルからインポートするように変更してください。

### 1-3: カスタムフックの作成

コンポーネントからロジックを分離するために、カスタムフックを作成します。

1. `src/hooks/useTodos.ts` ファイルを作成し、Todoの状態管理ロジックを抽出してください：

```tsx
import { useState, useEffect } from 'react';
import { Todo } from '../types';

export const useTodos = () => {
  // Todoの状態管理
  const [todos, setTodos] = useState<Todo[]>(() => {
    // ローカルストレージからデータを取得
    const savedTodos = localStorage.getItem('todos');
    // データがあれば解析して返し、なければ初期値を返す
    return savedTodos ? JSON.parse(savedTodos) : [
      {id: 1, text:'買い物に行く', completed: false},
      {id: 2, text:'Reactの勉強をする', completed: true},
      {id: 3, text:'部屋の掃除をする', completed: false}
    ];
  });

  // ローカルストレージへの保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Todo追加関数
  const addTodo = (text: string) => {
    if (text.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: text,
        completed: false
      };
      setTodos([...todos, newTodo]);
    }
  };

  // Todo削除関数
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Todo完了状態切り替え関数
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Todo編集関数
  const editTodo = (id: number, newText: string) => {
    if (newText.trim() !== '') {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
    }
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo
  };
};
```

2. `App.tsx`を修正して、このカスタムフックを使用するようにしてください。

### 1-4: App.tsxの修正

カスタムフックを使用して`App.tsx`をシンプルにします。

```tsx
import React, { useState } from 'react';
import './App.css';
// パスを修正してインポート
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoList/TodoForm';
import { TodoFilter } from './components/Filters/TodoFilter';
import { TodoStats } from './components/Statistics/TodoStats';
import { useTodos } from './hooks/useTodos';
import { Todo } from './types';

function App() {
  // カスタムフックからtodosの状態と関数を取得
  const { todos, addTodo, deleteTodo, toggleTodo, editTodo } = useTodos();
  
  // フィルター状態の管理
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // フィルタリングされたtodosを取得
  const getFilteredTodos = () => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="App">
      <h1>Todoリスト</h1>
      
      <TodoForm onAddTodo={addTodo} />
      
      <TodoFilter
        filter={filter}
        onFilterChange={setFilter}
      />
      
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
      
      <TodoStats todos={todos} />
    </div>
  );
}

export default App;
```

### 1-5: 各コンポーネントの修正

既存の各コンポーネントを、新しい型定義とファイル構造に合わせて修正してください。例えば：

- `TodoItem.tsx`：`Todo`型から必要なプロパティを直接取得するように変更
- `TodoList.tsx`：インポートパスと型を修正
- `TodoForm.tsx`：インポートパスと型を修正
- `TodoFilter.tsx`：インポートパスと型を修正
- `TodoStats.tsx`：インポートパスと型を修正

## 提出方法

1. プロジェクト構造を整理して、上記のファイル配置に変更してください。
2. 中央型定義ファイルを作成して、各コンポーネントから使用するように修正してください。
3. `useTodos`カスタムフックを実装して、`App.tsx`から使用するように変更してください。
4. アプリが正常に動作することを確認してください。

## 次のステップ

この演習が完了したら、次はタスクのカテゴリ分けと優先度設定機能に取り組みます。リファクタリングによって、今後の機能追加がより簡単になります。
