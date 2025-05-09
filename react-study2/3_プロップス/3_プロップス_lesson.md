# 3. プロップス（Props）

## プロップスとは

プロップス（Props）は「Properties（プロパティ）」の略で、親コンポーネントから子コンポーネントにデータを渡すための仕組みです。HTMLの属性のように、コンポーネントに情報を渡すことができます。

プロップスの特徴：
- **読み取り専用**：子コンポーネントではプロップスを変更できません（単方向データフロー）
- **階層的**：親から子へ、さらにその子へと渡すことができます
- **任意の値**：文字列、数値、配列、オブジェクト、関数など様々な値を渡せます

## プロップスの基本的な使い方

### プロップスの渡し方（親コンポーネント）

HTMLの属性のように、JSXタグの中でプロップスを指定します：

```tsx
// App.tsx（親コンポーネント）
import React from 'react';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <Welcome name="太郎" />
      <Welcome name="花子" />
    </div>
  );
}
```

### プロップスの受け取り方（子コンポーネント）

#### 関数コンポーネントでの受け取り方

```tsx
// Welcome.tsx（子コンポーネント）
import React from 'react';

// 方法1：propsオブジェクトとして受け取る
function Welcome(props) {
  return <h1>こんにちは、{props.name}さん</h1>;
}

// 方法2：分割代入で個別のプロップスとして受け取る（推奨）
function Welcome({ name }) {
  return <h1>こんにちは、{name}さん</h1>;
}

export default Welcome;
```

## TypeScriptでのプロップスの型定義

TypeScriptを使う場合、プロップスの型を明示的に定義することで、型安全性を確保できます：

```tsx
// Welcome.tsx
import React from 'react';

// プロップスの型を定義
type WelcomeProps = {
  name: string;
  age?: number; // ?をつけると省略可能なプロップスになる
};

// 型定義を適用した関数コンポーネント
const Welcome: React.FC<WelcomeProps> = ({ name, age }) => {
  return (
    <div>
      <h1>こんにちは、{name}さん</h1>
      {age && <p>あなたは{age}歳です</p>}
    </div>
  );
};

export default Welcome;
```

## 複数のプロップスを渡す

コンポーネントには複数のプロップスを渡すことができます：

```tsx
// App.tsx
<UserProfile 
  name="山田太郎" 
  age={30} 
  email="yamada@example.com" 
  isAdmin={true} 
/>
```

```tsx
// UserProfile.tsx
type UserProfileProps = {
  name: string;
  age: number;
  email: string;
  isAdmin: boolean;
};

const UserProfile: React.FC<UserProfileProps> = ({ name, age, email, isAdmin }) => {
  return (
    <div className="user-profile">
      <h2>{name}</h2>
      <p>年齢: {age}歳</p>
      <p>メール: {email}</p>
      {isAdmin && <p className="admin-badge">管理者</p>}
    </div>
  );
};
```

## オブジェクトや配列をプロップスとして渡す

複雑なデータ構造もプロップスとして渡すことができます：

```tsx
// App.tsx
const user = {
  id: 1,
  name: '山田太郎',
  email: 'yamada@example.com',
  tasks: ['買い物', '勉強', '運動']
};

function App() {
  return (
    <div className="App">
      <UserProfile user={user} />
    </div>
  );
}
```

```tsx
// UserProfile.tsx
type Task = string;

type User = {
  id: number;
  name: string;
  email: string;
  tasks: Task[];
};

type UserProfileProps = {
  user: User;
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>メール: {user.email}</p>
      <h3>タスク一覧:</h3>
      <ul>
        {user.tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};
```

## 関数をプロップスとして渡す

イベントハンドラなどの関数もプロップスとして渡すことができます：

```tsx
// App.tsx
function App() {
  const handleClick = (message: string) => {
    alert(message);
  };

  return (
    <div className="App">
      <Button onClick={() => handleClick('ボタンがクリックされました！')} text="クリック" />
    </div>
  );
}
```

```tsx
// Button.tsx
type ButtonProps = {
  onClick: () => void;
  text: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};
```

## 子要素をプロップスとして渡す（children）

Reactでは、タグの間に配置された要素は`children`というプロップスとして自動的に渡されます：

```tsx
// App.tsx
function App() {
  return (
    <div className="App">
      <Card>
        <h2>カードのタイトル</h2>
        <p>カードの内容がここに入ります。</p>
      </Card>
    </div>
  );
}
```

```tsx
// Card.tsx
type CardProps = {
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  );
};
```

## プロップスのデフォルト値

プロップスにデフォルト値を設定することもできます：

```tsx
type GreetingProps = {
  name: string;
  greeting?: string;
};

const Greeting: React.FC<GreetingProps> = ({ name, greeting = 'こんにちは' }) => {
  return (
    <h1>{greeting}、{name}さん</h1>
  );
};
```

## まとめ

- **プロップス**は親コンポーネントから子コンポーネントにデータを渡す仕組み
- プロップスは**読み取り専用**で、子コンポーネントで変更不可（単方向データフロー）
- TypeScriptでは**型定義**でプロップスの構造を明確にできる
- 文字列、数値、オブジェクト、配列、関数など**様々な値**をプロップスとして渡せる
- `children`プロップスを使って**入れ子構造**のコンポーネントを作れる

次の章では、コンポーネントの内部状態を管理する「状態管理（useState）」について学びます。
