# 6. イベント処理（onClick, onChange）練習問題

## 概要

この練習問題では、Reactでのイベント処理について学んだ知識を実践します。ToDoリストアプリをさらに拡張して、より多くのユーザーインタラクションを実装していきましょう。

## 問題1: タスク編集機能の実装

ToDoリストアプリに、タスクの内容を編集できる機能を追加します。

1. まず、`src/components`ディレクトリにある`TodoItem.tsx`を修正して、編集モードを追加してください：

```tsx
import React, { useState } from 'react';

type TodoItemProps = {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  // 編集用のコールバック関数を追加
  onEdit: (newText: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ text, completed, onToggle, onDelete, onEdit }) => {
  // 編集モードかどうかを管理するstate
  const [isEditing, setIsEditing] = useState(false);
  // 編集中のテキストを管理するstate
  const [editText, setEditText] = useState(text);

  // 編集完了時の処理
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 編集内容が空でなければ保存
    if (editText.trim() !== '') {
      onEdit(editText);
      setIsEditing(false);
    }
  };

  // 通常表示モード
  const normalMode = (
    <li>
      <span
        style={{
          textDecoration: completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
        onClick={onToggle}
      >
        {text}
      </span>
      <button
        onClick={() => setIsEditing(true)}
        style={{ marginLeft: '10px' }}
      >
        編集
      </button>
      <button
        onClick={onDelete}
        style={{ marginLeft: '10px' }}
      >
        削除
      </button>
    </li>
  );

  // 編集モード
  const editMode = (
    <li>
      <form onSubmit={handleEditSubmit}>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          autoFocus
        />
        <button type="submit">保存</button>
        <button type="button" onClick={() => setIsEditing(false)}>キャンセル</button>
      </form>
    </li>
  );

  return isEditing ? editMode : normalMode;
};

export default TodoItem;
```

2. 次に、`TodoList.tsx`を修正して、編集機能を追加してください：

```tsx
type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  // 編集用のコールバック関数を追加
  onEdit: (id: number, newText: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
          onEdit={(newText) => onEdit(todo.id, newText)}
        />
      ))}
    </ul>
  );
};
```

3. 最後に、`App.tsx`にタスク編集機能を追加してください：

```tsx
// タスクの編集関数
const editTodo = (id: number, newText: string) => {
  setTodos(
    todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    )
  );
};

// TodoListにonEdit関数を渡す
<TodoList
  todos={filteredTodos}
  onToggle={toggleTodo}
  onDelete={deleteTodo}
  onEdit={editTodo}
/>
```

## 問題2: ダブルクリック編集機能

タスクをダブルクリックすると編集モードに切り替わるように機能を追加してください。

1. `TodoItem.tsx`にダブルクリックイベントを追加してください：

```tsx
// 通常表示モード
const normalMode = (
  <li>
    <span
      style={{
        textDecoration: completed ? 'line-through' : 'none',
        cursor: 'pointer'
      }}
      onClick={onToggle}
      onDoubleClick={() => setIsEditing(true)} // ダブルクリックで編集モードに
    >
      {text}
    </span>
    {/* ボタン部分は変更なし */}
  </li>
);
```

## 問題3: キーボードイベントの処理

編集モード中にEscapeキーを押すとキャンセル、Enterキーを押すと保存されるように機能を追加してください。

1. `TodoItem.tsx`の編集モードにキーボードイベント処理を追加してください：

```tsx
// キーボードイベント処理
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Escape') {
    // Escキーでキャンセル
    setIsEditing(false);
    setEditText(text); // 元のテキストに戻す
  }
  // Enterキーは既にformのonSubmitで処理されています
};

// 編集モード
const editMode = (
  <li>
    <form onSubmit={handleEditSubmit}>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={handleKeyDown} // キーボードイベントを追加
        autoFocus
      />
      <button type="submit">保存</button>
      <button type="button" onClick={() => {
        setIsEditing(false);
        setEditText(text); // キャンセル時は元のテキストに戻す
      }}>
        キャンセル
      </button>
    </form>
  </li>
);
```

## 問題4: フォーカスイベントの使用

タスク入力フォームにフォーカスイベントを追加して、フォーカスを得た時と失った時に視覚的なフィードバックを提供してください。

1. `src/components`ディレクトリにある`TodoForm.tsx`を修正してください：

```tsx
import React, { useState } from 'react';

type TodoFormProps = {
  onAddTodo: (text: string) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [inputText, setInputText] = useState('');
  // フォーカス状態を管理
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') return;
    onAddTodo(inputText);
    setInputText('');
  };

  // 入力フィールドのスタイル
  const inputStyle = {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: `2px solid ${isFocused ? '#4a90e2' : '#ddd'}`,
    outline: 'none',
    transition: 'border-color 0.2s ease'
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="新しいタスクを入力"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={inputStyle}
      />
      <button 
        type="submit"
        style={{
          marginLeft: '10px',
          padding: '8px 16px',
          backgroundColor: '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        追加
      </button>
    </form>
  );
};

export default TodoForm;
```

## 提出方法

上記の問題を実装して、アプリが正常に動作することを確認してください。特に以下の点に注意してください：

1. すべての新しいイベント処理（onClick, onDoubleClick, onKeyDown, onFocus, onBlur）が正しく動作すること
2. TypeScriptでのイベント型が適切に設定されていること
3. タスクの編集機能が正しく動作すること

実装が完了したら、各問題について説明し、どのようにイベント処理を実装したか解説してください。
