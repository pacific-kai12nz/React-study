# 8. 最終プロジェクト - 演習2

## タスクのカテゴリ分けと優先度設定

リファクタリングが完了したので、次はタスクの管理機能を強化します。具体的には以下の機能を実装します：

1. **タスクのカテゴリ分け**（仕事、買い物、勉強など）
2. **タスクの優先度設定**（高、中、低）

### 演習2-1: データ構造の拡張

まず、`Todo`の型定義を拡張して、カテゴリと優先度のフィールドを追加します。

1. `src/types/index.ts` ファイルを開き、`Todo`インターフェースを以下のように修正してください：

```tsx
// Todo型定義
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;  // カテゴリを追加
  priority: 'high' | 'medium' | 'low';  // 優先度を追加
}
```

2. カテゴリの定数を定義するファイルを作成します。`src/constants/categories.ts` を作成し、以下のように実装してください：

```tsx
// 利用可能なカテゴリ
export const CATEGORIES = [
  '仕事',
  '買い物',
  '勉強',
  '家事',
  'その他'
];

// デフォルトカテゴリ
export const DEFAULT_CATEGORY = 'その他';
```

3. 優先度の定数を定義するファイルを作成します。`src/constants/priorities.ts` を作成し、以下のように実装してください：

```tsx
// 利用可能な優先度
export const PRIORITIES = {
  HIGH: 'high' as const,
  MEDIUM: 'medium' as const,
  LOW: 'low' as const
};

// デフォルト優先度
export const DEFAULT_PRIORITY = PRIORITIES.MEDIUM;

// 優先度の表示名
export const PRIORITY_LABELS = {
  [PRIORITIES.HIGH]: '高',
  [PRIORITIES.MEDIUM]: '中',
  [PRIORITIES.LOW]: '低'
};
```

### 演習2-2: カスタムフックの更新

`useTodos`フックを更新して、カテゴリと優先度を扱えるようにします。

1. `src/hooks/useTodos.ts` を以下のように修正してください：

```tsx
import { useState, useEffect } from 'react';
import { Todo } from '../types';
import { DEFAULT_CATEGORY } from '../constants/categories';
import { DEFAULT_PRIORITY } from '../constants/priorities';

export const useTodos = () => {
  // Todoの状態管理
  const [todos, setTodos] = useState<Todo[]>(() => {
    // ローカルストレージからデータを取得
    const savedTodos = localStorage.getItem('todos');
    // データがあれば解析して返し、なければ初期値を返す
    return savedTodos ? JSON.parse(savedTodos) : [
      {id: 1, text:'買い物に行く', completed: false, category: '買い物', priority: 'medium'},
      {id: 2, text:'Reactの勉強をする', completed: true, category: '勉強', priority: 'high'},
      {id: 3, text:'部屋の掃除をする', completed: false, category: '家事', priority: 'low'}
    ];
  });

  // ローカルストレージへの保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Todo追加関数
  const addTodo = (text: string, category = DEFAULT_CATEGORY, priority = DEFAULT_PRIORITY) => {
    if (text.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: text,
        completed: false,
        category,
        priority
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

  // Todo編集関数（テキスト、カテゴリ、優先度の変更に対応）
  const editTodo = (
    id: number, 
    updates: {
      text?: string;
      category?: string;
      priority?: 'high' | 'medium' | 'low';
    }
  ) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
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

### 演習2-3: TodoFormコンポーネントの拡張

タスク追加フォームを拡張して、カテゴリと優先度を選択できるようにします。

1. `src/components/TodoList/TodoForm.tsx` を以下のように修正してください：

```tsx
import React, { useState } from 'react';
import { TodoFormProps } from '../../types';
import { CATEGORIES } from '../../constants/categories';
import { PRIORITIES, PRIORITY_LABELS } from '../../constants/priorities';

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(PRIORITIES.MEDIUM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onAddTodo(text, category, priority);
      setText('');
      // カテゴリと優先度はリセットしないで最後の選択を維持
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力..."
          style={{ width: '70%', padding: '8px', marginRight: '10px' }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          追加
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <div>
          <label htmlFor="category">カテゴリ: </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '6px' }}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="priority">優先度: </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            style={{ padding: '6px' }}
          >
            {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};
```

### 演習2-4: TodoItemコンポーネントの拡張

タスク表示を拡張して、カテゴリと優先度を表示できるようにします。

1. `src/components/TodoList/TodoItem.tsx` を以下のように修正してください：

```tsx
import React, { useState, useEffect } from 'react';
import { TodoItemProps } from '../../types';
import { CATEGORIES } from '../../constants/categories';
import { PRIORITIES, PRIORITY_LABELS } from '../../constants/priorities';

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [isSaving, setIsSaving] = useState(false);

  // Todoが変更されたらフォーム状態を更新
  useEffect(() => {
    setEditText(todo.text);
    setEditCategory(todo.category);
    setEditPriority(todo.priority);
  }, [todo]);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim() !== '') {
      onEdit(todo.id, {
        text: editText,
        category: editCategory,
        priority: editPriority
      });
      setIsEditing(false);
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
      setEditCategory(todo.category);
      setEditPriority(todo.priority);
      setIsSaving(false);
    }
  };

  // 編集内容が変更されたときに自動保存タイマーを開始
  const handleEditChange = () => {
    setIsSaving(true);
  };

  // 自動保存のuseEffect
  useEffect(() => {
    if (isSaving) {
      const saveTimer = setTimeout(() => {
        if (
          editText.trim() !== '' && 
          (editText !== todo.text || 
           editCategory !== todo.category || 
           editPriority !== todo.priority)
        ) {
          onEdit(todo.id, {
            text: editText,
            category: editCategory,
            priority: editPriority
          });
          setIsSaving(false);
        }
      }, 1500);
      
      return () => {
        clearTimeout(saveTimer);
      };
    }
  }, [editText, editCategory, editPriority, isSaving, onEdit, todo.id, todo.text, todo.category, todo.priority]);

  // 優先度に基づいて色を決定
  const getPriorityColor = () => {
    switch (todo.priority) {
      case 'high': return '#ffcccc'; // 赤っぽい色
      case 'medium': return '#ffffcc'; // 黄色っぽい色
      case 'low': return '#ccffcc'; // 緑っぽい色
      default: return 'transparent';
    }
  };

  const normalMode = (
    <li style={{ 
      backgroundColor: getPriorityColor(),
      padding: '10px',
      marginBottom: '5px',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          style={{ marginRight: '10px' }}
        />
        <div>
          <span
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              marginRight: '10px'
            }}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
          <span style={{ 
            fontSize: '0.8em', 
            backgroundColor: '#eee', 
            padding: '2px 5px',
            borderRadius: '3px',
            marginRight: '5px'
          }}>
            {todo.category}
          </span>
          <span style={{ 
            fontSize: '0.8em', 
            backgroundColor: '#ddd',
            padding: '2px 5px',
            borderRadius: '3px'
          }}>
            {PRIORITY_LABELS[todo.priority]}
          </span>
        </div>
      </div>
      <button 
        onClick={() => onDelete(todo.id)}
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
      >
        削除
      </button>
    </li>
  );

  const editMode = (
    <li style={{ 
      padding: '10px',
      marginBottom: '5px',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }}>
      <form onSubmit={handleEditSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={editText}
            onChange={(e) => { 
              setEditText(e.target.value);
              handleEditChange();
            }}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <div>
            <label htmlFor={`category-${todo.id}`}>カテゴリ: </label>
            <select
              id={`category-${todo.id}`}
              value={editCategory}
              onChange={(e) => { 
                setEditCategory(e.target.value);
                handleEditChange();
              }}
              style={{ padding: '6px' }}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor={`priority-${todo.id}`}>優先度: </label>
            <select
              id={`priority-${todo.id}`}
              value={editPriority}
              onChange={(e) => { 
                setEditPriority(e.target.value as 'high' | 'medium' | 'low');
                handleEditChange();
              }}
              style={{ padding: '6px' }}
            >
              {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <button 
              type="submit"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '3px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              保存
            </button>
            <button 
              type="button" 
              onClick={() => {
                setIsEditing(false);
                setEditText(todo.text);
                setEditCategory(todo.category);
                setEditPriority(todo.priority);
                setIsSaving(false);
              }}
              style={{
                backgroundColor: '#ccc',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              キャンセル
            </button>
          </div>
          {isSaving && (
            <span style={{ color: '#888' }}>自動保存中...</span>
          )}
        </div>
      </form>
    </li>
  );

  return isEditing ? editMode : normalMode;
};
```

### 演習2-5: インターフェースの更新

最後に、Todoコンポーネントのインターフェース（Props）も更新します。

1. `src/types/index.ts` の `TodoFormProps` インターフェースを次のように更新します：

```tsx
export interface TodoFormProps {
  onAddTodo: (text: string, category: string, priority: 'high' | 'medium' | 'low') => void;
}
```

2. `TodoItemProps` の `onEdit` 関数の型も更新します：

```tsx
export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, updates: {
    text?: string;
    category?: string;
    priority?: 'high' | 'medium' | 'low';
  }) => void;
}
```

### 演習2-6: App.tsxの更新

App.tsxファイルでも更新された関数を正しく呼び出せるように修正しましょう。

1. `src/App.tsx` を確認し、必要に応じて更新してください。特に、editTodo関数の呼び出し部分を修正することが重要です。

### 提出方法

1. 必要なすべてのファイルを作成または更新してください。
2. アプリケーションを実行して、カテゴリと優先度の機能が正常に動作することを確認してください。
3. 以下の操作ができることを確認してください：
   - 新しいタスクを追加する際にカテゴリと優先度を選択できる
   - タスクの表示にカテゴリと優先度が含まれている
   - タスクの編集でカテゴリと優先度を変更できる
   
## 次のステップ

この演習が完了したら、次はタスクの期限設定機能と検索機能に取り組みます。カテゴリと優先度の実装により、TodoListアプリケーションがさらに使いやすくなりました！
