# 7. Stateとイベント処理

## 7.1 Reactにおける状態（State）とは

Reactアプリケーションでは、「状態（State）」は時間の経過とともに変化するデータを保持するために使用されます。例えば、ユーザーの入力、サーバーからのレスポンス、または時間の経過によって変わる値などです。

### なぜStateが重要なのか

- **インタラクティブなUI**: ユーザーアクションに応じて画面を更新するために必要です
- **コンポーネントの記憶**: コンポーネントが持つべき「現在の状態」を保持します
- **再レンダリングのトリガー**: Stateが変更されると、コンポーネントが自動的に再レンダリングされます

### Props vs State

| Props | State |
|-------|-------|
| 親コンポーネントから渡される | コンポーネント自身が管理する |
| 読み取り専用 | 変更可能（専用の更新関数を通して） |
| コンポーネントの外から渡される | コンポーネントの内部で初期化・更新される |

## 7.2 useState フック

React Hooksは、関数コンポーネントでStateなどの機能を使えるようにする特別な関数です。その中でも`useState`は最も基本的で重要なフックです。

### 基本的な使い方

```tsx
import React, { useState } from 'react';

const Counter: React.FC = () => {
  // useState(初期値)を呼び出すと、[現在の状態, 状態を更新する関数]の配列が返される
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        増加
      </button>
    </div>
  );
};
```

### useState の型定義（TypeScript）

TypeScriptでは、useStateの型を明示的に指定できます：

```tsx
// 数値型のState
const [count, setCount] = useState<number>(0);

// 文字列型のState
const [text, setText] = useState<string>('');

// 真偽値型のState
const [isActive, setIsActive] = useState<boolean>(false);

// オブジェクト型のState
type User = {
  name: string;
  age: number;
};
const [user, setUser] = useState<User>({ name: '', age: 0 });

// 配列型のState
const [items, setItems] = useState<string[]>([]);
```

### 複数のStateを扱う

コンポーネントは複数のStateを持つことができます：

```tsx
const Form: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // ...
};
```

### StateとしてオブジェクトまたはNestedオブジェクトを扱う

複雑な状態を管理する場合は、オブジェクトをStateとして使用できます：

```tsx
// フォーム状態をオブジェクトとして管理
const [formData, setFormData] = useState({
  name: '',
  email: '',
  age: 0
});

// 状態を更新する（イミュータブルに）
const updateName = (newName: string) => {
  setFormData({
    ...formData,  // スプレッド演算子で既存の値をコピー
    name: newName // 特定のフィールドだけを更新
  });
};
```

> **重要**: Stateの更新は常にイミュータブル（不変）に行う必要があります。直接Stateオブジェクトを変更するのではなく、新しいオブジェクトを作成して更新関数に渡します。

## 7.3 イベント処理

Reactでは、DOMイベント（クリック、変更、送信など）を処理するために、イベントハンドラ関数を使用します。

### 基本的なイベントハンドラ

```tsx
const Button: React.FC = () => {
  const handleClick = () => {
    alert('ボタンがクリックされました！');
  };
  
  return (
    <button onClick={handleClick}>クリックしてください</button>
  );
};
```

### インラインで定義するイベントハンドラ

```tsx
const Button: React.FC = () => {
  return (
    <button onClick={() => alert('インラインハンドラ')}>
      クリックしてください
    </button>
  );
};
```

### TypeScriptでのイベントの型

TypeScriptを使用する場合、イベントの型を明示的に定義できます：

```tsx
import React, { useState } from 'react';

const InputForm: React.FC = () => {
  const [text, setText] = useState('');
  
  // イベントの型を指定
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  
  // フォーム送信イベントの型
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // デフォルトの送信動作を防止
    console.log('送信されたテキスト:', text);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={text}
        onChange={handleChange}
      />
      <button type="submit">送信</button>
    </form>
  );
};
```

### 一般的なReactイベント型（TypeScript）

| イベント | 型 |
|---------|-----|
| クリックイベント | `React.MouseEvent<HTMLButtonElement>` |
| 入力変更イベント | `React.ChangeEvent<HTMLInputElement>` |
| フォーム送信イベント | `React.FormEvent<HTMLFormElement>` |
| キーボードイベント | `React.KeyboardEvent<HTMLInputElement>` |

## 7.4 フォーム処理

Reactでフォームを扱う際は、通常「制御コンポーネント（Controlled Components）」パターンを使用します。

### 制御コンポーネント

フォーム要素の値がReactのStateによって制御されるパターンです：

```tsx
import React, { useState } from 'react';

const SimpleForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('送信データ:', { name, email });
    // ここでAPIへの送信など処理を実行
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">名前:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="email">メール:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <button type="submit">送信</button>
    </form>
  );
};
```

### 複数の入力フィールドを扱う

複数の入力フィールドがある場合は、オブジェクトStateを使用するとコードが簡潔になります：

```tsx
import React, { useState } from 'react';

const AdvancedForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // 動的なname属性に基づいてStateを更新
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value // 計算されたプロパティ名（computed property name）を使用
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('送信データ:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">名前:</label>
        <input
          id="name"
          name="name" // name属性が重要
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="email">メール:</label>
        <input
          id="email"
          name="email" // name属性が重要
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="message">メッセージ:</label>
        <textarea
          id="message"
          name="message" // name属性が重要
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">送信</button>
    </form>
  );
};
```

## 7.5 Stateの更新に関する重要なポイント

### Stateの更新は非同期

`setState`関数を呼び出した直後に新しい状態値にアクセスしようとしても、反映されていない可能性があります：

```tsx
// 誤った使用例
const incrementAndLog = () => {
  setCount(count + 1);
  console.log(count); // 更新前の値が表示される
};
```

### 関数型更新

前の状態に基づいて更新する場合は、関数型の更新を使用することが安全です：

```tsx
// 正しい使用例
const increment = () => {
  // 前の状態（prevCount）を受け取り、新しい状態を返す関数を渡す
  setCount(prevCount => prevCount + 1);
};
```

### オブジェクトや配列のStateを更新する

オブジェクトや配列のStateを更新する場合は、イミュータビリティを保つために新しいコピーを作成します：

```tsx
// オブジェクトStateの更新
const [user, setUser] = useState({ name: 'Alice', age: 25 });

// 正しい更新方法
const updateAge = (newAge: number) => {
  setUser(prevUser => ({
    ...prevUser, // 既存のプロパティをコピー
    age: newAge  // 特定のプロパティだけを更新
  }));
};

// 配列Stateの更新
const [items, setItems] = useState<string[]>(['りんご', 'バナナ']);

// 要素を追加
const addItem = (newItem: string) => {
  setItems(prevItems => [...prevItems, newItem]);
};

// 要素を削除
const removeItem = (indexToRemove: number) => {
  setItems(prevItems => 
    prevItems.filter((_, index) => index !== indexToRemove)
  );
};

// 要素を更新
const updateItem = (indexToUpdate: number, newValue: string) => {
  setItems(prevItems => 
    prevItems.map((item, index) => 
      index === indexToUpdate ? newValue : item
    )
  );
};
```

## まとめ

- **State（状態）** はコンポーネントが時間の経過とともに変化するデータを保持するためのメカニズム
- **useState** フックを使って関数コンポーネントで状態を管理
- **イベントハンドラ** を定義してユーザー操作に応答
- **制御コンポーネント** パターンを使ってフォームの入力を処理
- **状態更新のルール**:
  - 常にイミュータブルに更新する（直接変更しない）
  - 関数型更新を使って前の状態に基づいた更新を安全に行う
  - 更新は非同期なので、更新後の値にすぐにアクセスしない

これらの概念を理解することで、インタラクティブなReactアプリケーションの構築が可能になります。次の練習問題では、これらの概念を実際に応用してみましょう。
