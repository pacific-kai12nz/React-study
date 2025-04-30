# JSXとコンポーネント

Reactの中心的な概念である「JSX」と「コンポーネント」について学びます。これらはReactアプリケーション開発の基礎となる重要な概念です。

## JSXの基本

### JSXとは何か

JSXは「JavaScript XML」の略で、JavaScriptの拡張構文です。HTMLに似た構文をJavaScriptコードの中に直接書くことができます。

JSXの例：
```jsx
const element = <h1>こんにちは、世界！</h1>;
```

これは一見HTMLのように見えますが、実際にはJavaScriptのコードです。

### なぜJSXを使うのか

Reactでは、見た目（マークアップ）とロジック（JavaScript）を分離せず、「コンポーネント」という単位で両方を含めることができます。JSXはその橋渡しをする構文です。

JSXを使うことで：
- UIの構造が視覚的に理解しやすくなる
- HTMLとJavaScriptの自然な統合ができる
- コンポーネントの作成と再利用が簡単になる

### JSXの基本ルール

1. **すべての要素は閉じる必要がある**：
   ```jsx
   // 正しい
   <div>コンテンツ</div>
   <img src="image.jpg" alt="画像" />
   
   // 誤り
   <div>コンテンツ  // 閉じタグがない
   <img src="image.jpg" alt="画像">  // 自己閉じていない
   ```

2. **要素は必ず1つのルート要素で囲む必要がある**：
   ```jsx
   // 正しい
   const element = (
     <div>
       <h1>タイトル</h1>
       <p>段落</p>
     </div>
   );
   
   // または React.Fragment を使用（<> </>）
   const element = (
     <>
       <h1>タイトル</h1>
       <p>段落</p>
     </>
   );
   
   // 誤り
   const element = (
     <h1>タイトル</h1>
     <p>段落</p>
   );
   ```

3. **JavaScript式は中括弧 `{}` で囲む**：
   ```jsx
   const name = "太郎";
   const element = <h1>こんにちは、{name}さん！</h1>;
   ```

4. **属性名はキャメルケース**：
   HTML: `onclick`, `tabindex`
   JSX: `onClick`, `tabIndex`

5. **`class` 属性は `className` に**：
   ```jsx
   // HTMLではclass
   <div class="container">...</div>
   
   // JSXではclassName
   <div className="container">...</div>
   ```

### JSXでのスタイリング

インラインスタイルはオブジェクトとして渡します：

```jsx
const style = {
  color: 'blue',
  fontSize: '20px',  // ハイフンではなくキャメルケース
  marginTop: '10px'
};

const element = <div style={style}>スタイル付きテキスト</div>;

// または直接記述
const element = <div style={{ color: 'blue', fontSize: '20px' }}>スタイル付きテキスト</div>;
```

### JSXでの条件付きレンダリング

```jsx
// 三項演算子を使用
const element = (
  <div>
    {isLoggedIn ? <LogoutButton /> : <LoginButton />}
  </div>
);

// 論理演算子を使用
const element = (
  <div>
    {isLoggedIn && <WelcomeMessage />}
  </div>
);
```

## コンポーネントの基本

### コンポーネントとは

コンポーネントは、UIの独立した再利用可能な部品です。概念的には、JavaScriptの関数に似ています。入力（props）を受け取り、画面に表示される要素を返します。

### コンポーネントの種類

Reactには主に二種類のコンポーネントがあります：

1. **関数コンポーネント**：
   ```jsx
   function Welcome(props) {
     return <h1>こんにちは、{props.name}さん！</h1>;
   }
   ```

2. **クラスコンポーネント**：
   ```jsx
   class Welcome extends React.Component {
     render() {
       return <h1>こんにちは、{this.props.name}さん！</h1>;
     }
   }
   ```

最近のReactでは、Hooksの導入により、関数コンポーネントが推奨されています。このレッスンでは関数コンポーネントに焦点を当てます。

### 関数コンポーネント

関数コンポーネントは、propsを引数に取り、React要素を返す関数です：

```jsx
function Greeting(props) {
  return <h1>こんにちは、{props.name}さん！</h1>;
}
```

ES6のアロー関数を使うこともできます：

```jsx
const Greeting = (props) => {
  return <h1>こんにちは、{props.name}さん！</h1>;
};

// 単純な場合は、さらに簡潔に書けます
const Greeting = props => <h1>こんにちは、{props.name}さん！</h1>;
```

### TypeScriptでのコンポーネント

TypeScriptを使うと、propsの型を明示的に定義できます：

```tsx
// propsの型を定義
type GreetingProps = {
  name: string;
  age?: number;  // ? はオプショナルを意味する
};

// 関数コンポーネント
const Greeting: React.FC<GreetingProps> = (props) => {
  return (
    <div>
      <h1>こんにちは、{props.name}さん！</h1>
      {props.age && <p>あなたは{props.age}歳です。</p>}
    </div>
  );
};

// または、分割代入を使って
const Greeting = ({ name, age }: GreetingProps) => {
  return (
    <div>
      <h1>こんにちは、{name}さん！</h1>
      {age && <p>あなたは{age}歳です。</p>}
    </div>
  );
};
```

### コンポーネントの使用

コンポーネントは、HTMLタグのように使用できます：

```jsx
// 使用例
const element = <Greeting name="花子" />;

// 他のコンポーネント内で使用する例
function App() {
  return (
    <div>
      <Greeting name="太郎" />
      <Greeting name="次郎" />
    </div>
  );
}
```

### コンポーネントの分割と構成

複雑なUIは、小さなコンポーネントに分割して構築するのがベストプラクティスです。

例えば、以下のようなユーザープロフィールカードを考えてみましょう：

```tsx
// UserAvatar コンポーネント
type UserAvatarProps = {
  src: string;
  alt: string;
};

const UserAvatar = ({ src, alt }: UserAvatarProps) => {
  return <img src={src} alt={alt} className="user-avatar" />;
};

// UserInfo コンポーネント
type UserInfoProps = {
  name: string;
  occupation: string;
};

const UserInfo = ({ name, occupation }: UserInfoProps) => {
  return (
    <div className="user-info">
      <h2>{name}</h2>
      <p>{occupation}</p>
    </div>
  );
};

// UserProfileCard コンポーネント（上記コンポーネントを組み合わせる）
type UserProfileCardProps = {
  user: {
    name: string;
    occupation: string;
    avatarSrc: string;
  };
};

const UserProfileCard = ({ user }: UserProfileCardProps) => {
  return (
    <div className="user-profile-card">
      <UserAvatar src={user.avatarSrc} alt={user.name} />
      <UserInfo name={user.name} occupation={user.occupation} />
    </div>
  );
};
```

## 実際のコード例

learning-appプロジェクトでコンポーネントを作成してみましょう。

まず、`src/components` ディレクトリを作成して、そこにコンポーネントを配置することが一般的です。シンプルな `Button` コンポーネントを作成してみましょう。

### Buttonコンポーネントの作成

`src/components/Button.tsx` ファイルを作成：

```tsx
import React from 'react';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
};

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary' }) => {
  // スタイルをバリアントに基づいて決定
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: '#007bff', color: 'white' };
      case 'secondary':
        return { backgroundColor: '#6c757d', color: 'white' };
      case 'danger':
        return { backgroundColor: '#dc3545', color: 'white' };
      default:
        return { backgroundColor: '#007bff', color: 'white' };
    }
  };

  const buttonStyle = {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    ...getButtonStyle()
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
```

### Appコンポーネントでの使用

`src/App.tsx` を更新して、作成したButtonコンポーネントを使用：

```tsx
import React from 'react';
import './App.css';
import Button from './components/Button';

function App() {
  const handleClick = () => {
    alert('ボタンがクリックされました！');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>JSXとコンポーネントの学習</h1>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <Button text="クリックしてね" onClick={handleClick} variant="primary" />
          <Button text="セカンダリーボタン" variant="secondary" />
          <Button text="危険ボタン" variant="danger" />
        </div>
      </header>
    </div>
  );
}

export default App;
```

## まとめ

このレッスンでは、以下の内容を学びました：

1. **JSXの基本**：
   - JSXはJavaScriptの拡張構文で、HTMLライクな記述ができる
   - 閉じタグ、ルート要素、中括弧の使用など、基本的なルールがある
   - スタイリングや条件付きレンダリングの方法

2. **コンポーネントの基本**：
   - コンポーネントはUIの再利用可能なパーツ
   - 関数コンポーネントの書き方と使用法
   - TypeScriptでのpropsの型定義
   - コンポーネントの分割と構成

これらの概念を組み合わせることで、再利用可能で保守しやすいReactアプリケーションを構築することができます。

次のレッスンでは、コンポーネント間でのデータの受け渡しに使われる「Props」について詳しく学んでいきます。
