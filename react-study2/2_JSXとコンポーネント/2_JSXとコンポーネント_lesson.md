# 2. JSXとコンポーネント

## JSXとは何か

JSX（JavaScript XML）は、Reactで使用するJavaScriptの拡張構文です。HTMLのようなコードをJavaScriptファイル内に直接書くことができます。

```jsx
const element = <h1>こんにちは、世界！</h1>;
```

このコードは一見HTMLのように見えますが、実際はJavaScriptです。Reactでは、このJSX構文を使用してUIがどのように見えるべきかを記述します。

### なぜJSXが重要なのか

JSXを使用する利点：

1. **直感的なUI記述**: HTMLに似た構文で、UIの構造が視覚的に理解しやすい
2. **JavaScriptの機能を活用**: 中括弧`{}`を使って式を埋め込める
3. **コンポーネントの表現**: JSXは他のコンポーネントを参照できる

## JSXの基本構文

### 基本的なルール

1. **すべてのタグは閉じる必要がある**
   ```jsx
   <div>コンテンツ</div>  // 通常のタグ
   <img src="image.jpg" />  // 自己終了タグ
   ```

2. **HTML属性はキャメルケースで記述**
   ```jsx
   <div className="container">  // classではなくclassName
     <label htmlFor="name">名前</label>  // forではなくhtmlFor
   </div>
   ```

3. **JavaScript式の埋め込み**
   ```jsx
   const name = "ユーザー";
   const element = <h1>こんにちは、{name}さん！</h1>;
   ```

4. **JSXもJavaScript式**
   ```jsx
   function getGreeting(user) {
     if (user) {
       return <h1>こんにちは、{user.name}さん！</h1>;
     }
     return <h1>こんにちは、ゲストさん！</h1>;
   }
   ```

5. **スタイルの適用**
   ```jsx
   const style = {
     color: 'blue',
     fontSize: '16px'  // font-sizeではなくfontSize
   };
   const element = <h1 style={style}>スタイル付きテキスト</h1>;
   ```

## Reactコンポーネント

Reactでは、UIを独立した再利用可能な部品である「コンポーネント」として構築します。

### コンポーネントの種類

1. **関数コンポーネント**（現在の推奨方法）
   ```jsx
   function Welcome(props) {
     return <h1>こんにちは、{props.name}さん</h1>;
   }
   ```

2. **クラスコンポーネント**（旧スタイル、現在は関数コンポーネントが推奨）
   ```jsx
   class Welcome extends React.Component {
     render() {
       return <h1>こんにちは、{this.props.name}さん</h1>;
     }
   }
   ```

### TypeScriptでのコンポーネント定義

TypeScriptを使う場合は、型定義も含めます：

```tsx
type WelcomeProps = {
  name: string;
};

const Welcome: React.FC<WelcomeProps> = ({ name }) => {
  return <h1>こんにちは、{name}さん</h1>;
};
```

### コンポーネントの再利用

コンポーネントを定義したら、他の場所で再利用できます：

```jsx
function App() {
  return (
    <div>
      <Welcome name="太郎" />
      <Welcome name="花子" />
      <Welcome name="次郎" />
    </div>
  );
}
```

### コンポーネントの分割

大きなUIを小さなコンポーネントに分割することで、保守性が向上します：

```tsx
function TodoApp() {
  return (
    <div>
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
}
```

ここでは、`Header`、`TodoList`、`Footer`はそれぞれ独自のコンポーネントです。

## コンポーネントファイルの作成方法

通常、各コンポーネントは独自のファイルに配置します。例えば：

```tsx
// src/components/Header.tsx
import React from 'react';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
```

そして、他のファイルからインポートして使用します：

```tsx
// src/App.tsx
import React from 'react';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header title="ToDoリストアプリ" />
      {/* 他のコンポーネント */}
    </div>
  );
}

export default App;
```

## まとめ

- **JSX**: HTMLライクな構文でReactのUIを記述するための拡張構文
- **コンポーネント**: 再利用可能なUI部品
- **コンポーネントの分割**: 大きなUIを管理しやすい小さな部品に分割

次の学習では、これらのコンポーネントに「プロップス」を使ってデータを渡す方法を学びます。
