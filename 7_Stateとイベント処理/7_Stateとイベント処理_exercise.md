# 練習問題: Stateとイベント処理

## 問題1: カウンターコンポーネントの作成

シンプルなカウンターコンポーネントを作成してください。

要件:
- useStateフックを使用してカウント値を管理する
- 「増加」と「減少」ボタンを作成する
- カウント値が0未満にならないようにする（最小値は0）

```tsx
import React, { useState } from 'react';

const Counter = () => {
  // ここにuseStateを使ったカウント状態の宣言を記述してください
  const [count, setCount] = useState(0);
  
  // 増加ボタンのハンドラを記述してください
  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  // 減少ボタンのハンドラを記述してください
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div>
    <h2>カウンター</h2>
    <p><カウント:{count}/p>
    <button onClick={handleIncrement}>増加</button>
    <button onClick={handleDecrement}>減少</button>
    </div>
  );
};

export default Counter;
```

## 問題2: テキスト入力と表示

テキスト入力フィールドと、入力されたテキストを表示するコンポーネントを作成してください。

要件:
- useStateを使用して入力テキストを管理する
- 入力フィールドと表示領域を用意する
- 入力した内容がリアルタイムで表示領域に反映される

```tsx
import React, { useState } from 'react';

const TextDisplay = () => {
  // ここにuseStateを使ったテキスト状態の宣言を記述してください
  const [text, setText] = useState('');
  
  // 入力変更時のハンドラを記述してください
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  
  return (
    <div>
      <h2>テキスト入力と表示</h2>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="テキストを入力してください"
      />
      <div style={{ marginTop: '10px' }}>
        <strong>入力内容:</strong> {text}
      </div>
    </div>
  );
};

export default TextDisplay;
```

## 問題3: トグルボタンの作成

表示/非表示を切り替えるトグルボタンを作成してください。

要件:
- useStateを使用して表示状態（真偽値）を管理する
- クリックするたびに表示/非表示が切り替わるボタンを作成する
- 状態に応じて異なるテキストやコンテンツを表示する

```tsx
import React, { useState } from 'react';

const ToggleButton = () => {
  // ここにuseStateを使った表示状態の宣言を記述してください
  const [isVisible, setIsVisible] = useState(false);

  // ボタンクリック時のハンドラを記述してください
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <h2>トグルボタン</h2>
      <button onClick={toggleVisibility}>
        {isVisible ? '非表示にする' : '表示する'}
      </button>
      {isVisible && (
        <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc'}}>
          表示されるコンテンツです。ボタンをクリックすると非表示になります。
        </div>
      )}
    </div>
  );
};

export default ToggleButton;
```

## 問題4: フォームの作成と送信

名前、メールアドレス、メッセージを入力できるお問い合わせフォームを作成してください。

要件:
- 複数の入力フィールドの状態を管理する
- フォームの送信時にデータを処理する
- バリデーション（名前とメールは必須）を実装する
- 送信後にフォームをクリアする

```tsx
import React, { useState } from 'react';

const ContactForm = () => {
  // ここにフォームの状態管理用のuseStateを記述してください
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // 入力変更時のハンドラを記述してください
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

    if (value.trim() !== '') {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // フォーム送信時のハンドラを記述してください
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let tempErrors = {
      name: '',
      email: ''
    };
    let isValid = true;

    // 名前の検証
    if (formData.name.trim() === '') {
      tempErrors.name = '名前は必須です';
      isValid = false;
    }
    
    // メールの検証
    if (formData.email.trim() === '') {
      tempErrors.email = 'メールアドレスは必須です';
      isValid = false;
    }
    
    setErrors(tempErrors);

    if (isValid) {
      console.log('送信データ:', formData);

      setSubmitSuccess(true);
      
      // フォームをクリア
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }
  };

  return (
    <div>
      <h2>お問い合わせフォーム</h2>
      {submitSuccess && (
        <div style={{color: 'green', marginBottom: '10px'}}>
          送信に成功しました!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px'}}>
          <label htmlFor="name">名前 (必須):</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div style={{color: 'red'}}>{errors.name}</div>}
        </div>
        
        <div style={{ marginBottom: '10px'}}>
          <label htmlFor="email">メールアドレス (必須):</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div style={{ color: 'red'}}>{errors.email}</div>}
        </div>
        
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="message">メッセージ:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default ContactForm;
```

## 問題5: 実践的なコンポーネント作成とアプリへの統合

あなたの learning-app プロジェクトに「ToDo」リストコンポーネントを実装してください。

要件:
1. `src/components/todo-list.tsx` に ToDoリストコンポーネントを作成
2. 以下の機能を実装する:
   - タスクの追加
   - タスクの完了/未完了のトグル
   - タスクの削除
3. `App.tsx` を更新して ToDoリストコンポーネントを表示する

```tsx
// 参考実装例（これをカスタマイズしてください）:
import React, { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // タスク追加のハンドラ
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  // タスク完了状態トグルのハンドラ
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  };

  // タスク削除のハンドラ
  const removeTodo = (id: number) => {
    // ここにコードを記述してください
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h2>ToDo リスト</h2>
      {/* 入力フォーム */}
      <div className="todo-form">
        <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="新しいタスクを入力"
        />
        <button onClick={addTodo}>追加</button>
      </div>
      
      {/* ToDo リスト */}
      <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={todo.complete ? 'completed' :  ''}>
        <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
        >
        {todo.text}
        </span>
        <button onClick={() => removeTodo(todo.id)}>削除</button>
        <?li>
      ))}
      </ul>
      {todos.length === 0 && (
        <p>タスクがありません。新しいタスクを追加してください。</p>
      )}
    </div>
  );
};
```

## 提出

すべての問題が完了したら、learning_path.md を更新して、このセクションに対応するチェックボックスにチェックを入れてください。
