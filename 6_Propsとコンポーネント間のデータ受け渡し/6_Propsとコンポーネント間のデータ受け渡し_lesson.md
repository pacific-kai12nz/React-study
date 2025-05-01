# 6. Propsとコンポーネント間のデータ受け渡し

## 6.1 Propsとは

Propsは「Properties（プロパティ）」の略で、Reactコンポーネント間でデータを受け渡すための仕組みです。前のレッスンで作成したCardコンポーネントでも使用しました。

### なぜPropsが重要なのか

- **コンポーネントの再利用性**：同じコンポーネントを異なるデータで再利用できます
- **一方向のデータフロー**：親コンポーネントから子コンポーネントへ一方向にデータが流れることで、アプリケーションの状態を予測しやすくなります
- **コンポーネント間の疎結合**：コンポーネント同士が直接依存せず、propsを通じてのみやり取りすることで、独立した開発・テストが可能になります

### Props の基本的な使い方

#### 親コンポーネントからのPropの渡し方

```tsx
// App.tsx（親コンポーネント）
import React from 'react';
import Greeting from './components/Greeting';

function App() {
  return (
    <div className="App">
      <Greeting name="まゆ" age={25} isLoggedIn={true} />
    </div>
  );
}

export default App;
```

上記の例では、`Greeting`コンポーネントに以下のpropsを渡しています：
- `name`: 文字列型のプロパティ
- `age`: 数値型のプロパティ（波括弧`{}`で囲む）
- `isLoggedIn`: 真偽値型のプロパティ（波括弧`{}`で囲む）

#### 子コンポーネントでのPropの受け取り方

```tsx
// components/Greeting.tsx（子コンポーネント）
import React from 'react';

// プロップスの型定義
type GreetingProps = {
  name: string;
  age: number;
  isLoggedIn: boolean;
};

// 方法1: props引数として受け取り、props.nameのように使用
const Greeting = (props: GreetingProps) => {
  return (
    <div>
      <h2>こんにちは、{props.name}さん！</h2>
      <p>あなたは{props.age}歳です。</p>
      <p>{props.isLoggedIn ? 'ログイン中です' : 'ログインしていません'}</p>
    </div>
  );
};

export default Greeting;
```

#### 分割代入を使用した方法（より一般的）

```tsx
// components/Greeting.tsx（分割代入バージョン）
import React from 'react';

type GreetingProps = {
  name: string;
  age: number;
  isLoggedIn: boolean;
};

// 方法2: 分割代入を使って直接プロパティ名でアクセス（より一般的）
const Greeting = ({ name, age, isLoggedIn }: GreetingProps) => {
  return (
    <div>
      <h2>こんにちは、{name}さん！</h2>
      <p>あなたは{age}歳です。</p>
      <p>{isLoggedIn ? 'ログイン中です' : 'ログインしていません'}</p>
    </div>
  );
};

export default Greeting;
```

## 6.2 Props のデフォルト値

コンポーネントで受け取るpropsにデフォルト値を設定することができます。これにより、propが渡されなかった場合にフォールバック値を使用できます。

### デフォルト値の設定方法

```tsx
// 方法1: 分割代入でデフォルト値を設定
const Greeting = ({ name, age = 20, isLoggedIn = false }: GreetingProps) => {
  // ...
};

// 方法2: defaultPropsを使用（古い方法）
Greeting.defaultProps = {
  age: 20,
  isLoggedIn: false
};
```

### TypeScriptでのオプショナルプロップス

TypeScriptでは、必須ではないpropを`?`を使って表現できます：

```tsx
type GreetingProps = {
  name: string;       // 必須
  age?: number;       // オプショナル
  isLoggedIn?: boolean; // オプショナル
};

// オプショナルプロップスとデフォルト値の組み合わせ
const Greeting = ({ name, age = 20, isLoggedIn = false }: GreetingProps) => {
  // ...
};
```

## 6.3 子要素の受け渡し（children prop）

Reactには、コンポーネントの開始タグと終了タグの間に配置された要素を受け取るための特別なpropとして`children`があります。

### childrenの基本的な使い方

```tsx
// 親コンポーネント（App.tsx）
import React from 'react';
import Container from './components/Container';

function App() {
  return (
    <Container>
      <h1>これはタイトルです</h1>
      <p>これは段落です</p>
    </Container>
  );
}
```

```tsx
// Container.tsx
import React, { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode; // ReactNodeは任意のReact要素を表す型
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container" style={{ 
      margin: '20px', 
      padding: '20px', 
      border: '1px solid #ddd'
    }}>
      {children}
    </div>
  );
};

export default Container;
```

このパターンはよく使われ、ラッパーコンポーネントやレイアウトコンポーネントを作成する際に活用されます。

## 6.4 Props の活用パターン

### 条件付きレンダリング

propの値に基づいて異なるUIを表示できます：

```tsx
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'danger'; // 文字列リテラル型
  label: string;
};

const Button = ({ variant, label }: ButtonProps) => {
  // variantに基づいてスタイルを変更
  let buttonStyle = {};
  
  if (variant === 'primary') {
    buttonStyle = { backgroundColor: '#007bff', color: 'white' };
  } else if (variant === 'secondary') {
    buttonStyle = { backgroundColor: '#6c757d', color: 'white' };
  } else if (variant === 'danger') {
    buttonStyle = { backgroundColor: '#dc3545', color: 'white' };
  }
  
  return (
    <button style={{ 
      padding: '8px 16px', 
      border: 'none', 
      borderRadius: '4px',
      ...buttonStyle
    }}>
      {label}
    </button>
  );
};
```

### コンポーネントの合成

複数のコンポーネントを組み合わせて、より複雑なUIを構築できます：

```tsx
// ProfileCard.tsx
import React from 'react';
import Avatar from './Avatar';
import UserInfo from './UserInfo';

type ProfileCardProps = {
  username: string;
  imageUrl: string;
  bio: string;
};

const ProfileCard = ({ username, imageUrl, bio }: ProfileCardProps) => {
  return (
    <div className="profile-card">
      <Avatar imageUrl={imageUrl} />
      <UserInfo username={username} bio={bio} />
    </div>
  );
};
```

## 6.5 Props のバケツリレー問題と解決策

Reactアプリケーションが大きくなると、深い階層のコンポーネントにデータを渡すために、中間コンポーネントを経由してpropsをバケツリレーのように渡す必要が出てくることがあります。これを「Propドリリング」または「Propsのバケツリレー」と呼びます。

この問題の解決策については、次のステートとコンテキストのレッスンで詳しく学びます。

## まとめ

- Propsはコンポーネント間でデータを渡すための主要な仕組みです
- 親コンポーネントから子コンポーネントへ一方向にデータが流れます
- TypeScriptを使うと型安全なpropsの受け渡しが可能になります
- childrenプロップを使うことで、コンポーネントの中に別のコンポーネントや要素を入れ子にできます
- propsを活用することで、再利用可能で柔軟なコンポーネントを作成できます
