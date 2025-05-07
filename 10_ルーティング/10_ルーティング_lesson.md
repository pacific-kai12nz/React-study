# Reactのルーティング

## 1. ルーティングとは？

ルーティングとは、ウェブアプリケーションにおいて**URLに基づいて表示する画面を切り替える仕組み**です。従来のWebサイトでは、ページごとに異なるHTMLファイルがサーバーから送信されていましたが、シングルページアプリケーション（SPA）では、JavaScript（React）が画面の表示を制御します。

ルーティングを使うことで、以下のようなメリットがあります：

- **ブックマーク可能**：特定の画面に直接アクセスできる
- **ブラウザの戻る・進むボタン**が使える
- **URLで状態を共有**できる
- **SEO対策**にも役立つ

## 2. React Router

Reactでルーティングを実装するためのライブラリとして、**React Router**が広く使われています。

### 2.1 基本的なコンポーネント

React Routerの主要なコンポーネントは以下の通りです：

- **BrowserRouter**: ルーティングの基盤となるコンポーネント
- **Routes**: ルートを定義するためのコンテナ
- **Route**: 個別のルートを定義
- **Link**: ページ遷移のためのリンク
- **Navigate**: プログラムによる画面遷移
- **Outlet**: ネストされたルートのコンテンツを表示

### 2.2 基本的な使い方

```tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// ページコンポーネント
const Home = () => <h2>ホームページ</h2>;
const About = () => <h2>会社概要ページ</h2>;
const Contact = () => <h2>お問い合わせページ</h2>;

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">ホーム</Link> | 
        <Link to="/about">会社概要</Link> | 
        <Link to="/contact">お問い合わせ</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

## 3. URLパラメータとクエリパラメータ

### 3.1 URLパラメータ

URLパラメータは、URLの一部として値を渡す方法です。例えば、`/users/123`というURLで、`123`というIDのユーザー情報を表示する場合などに使います。

```tsx
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// URLパラメータを使用するコンポーネント
const UserProfile = () => {
  const { userId } = useParams(); // URLパラメータを取得
  
  return (
    <div>
      <h2>ユーザープロフィール</h2>
      <p>ユーザーID: {userId}</p>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">ホーム</Link> | 
        <Link to="/users/1">ユーザー1</Link> | 
        <Link to="/users/2">ユーザー2</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:userId" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};
```

### 3.2 クエリパラメータ

クエリパラメータは、URLの末尾に`?key=value`の形式で追加される値です。例えば、検索機能や並び替え、フィルタリングなどに使用します。

```tsx
import { BrowserRouter, Routes, Route, Link, useSearchParams } from 'react-router-dom';

// クエリパラメータを使用するコンポーネント
const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  
  return (
    <div>
      <h2>商品リスト</h2>
      <p>カテゴリ: {category}</p>
      
      <button onClick={() => setSearchParams({ category: 'electronics' })}>
        電化製品を表示
      </button>
      <button onClick={() => setSearchParams({ category: 'books' })}>
        書籍を表示
      </button>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">ホーム</Link> | 
        <Link to="/products">全商品</Link> | 
        <Link to="/products?category=electronics">電化製品</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
};
```

## 4. ネストされたルート

React Router v6では、ルートをネストする（入れ子にする）ことができます。これにより、複数のページでレイアウトを共有したり、サブページを実装したりすることが容易になります。

```tsx
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

// レイアウトコンポーネント
const Layout = () => {
  return (
    <div>
      <header>
        <h1>ウェブサイトのヘッダー</h1>
        <nav>
          <Link to="/">ホーム</Link> | 
          <Link to="/about">会社概要</Link> | 
          <Link to="/products">商品</Link>
        </nav>
      </header>
      
      <main>
        {/* ここに子ルートの内容が表示される */}
        <Outlet />
      </main>
      
      <footer>
        <p>© 2025 サンプル株式会社</p>
      </footer>
    </div>
  );
};

// 商品関連のレイアウト
const ProductsLayout = () => {
  return (
    <div>
      <h2>商品ページ</h2>
      <nav>
        <Link to="/products/list">商品一覧</Link> | 
        <Link to="/products/new">新着商品</Link>
      </nav>
      
      {/* ここに子ルートの内容が表示される */}
      <Outlet />
    </div>
  );
};

const ProductList = () => <h3>商品一覧ページ</h3>;
const NewProducts = () => <h3>新着商品ページ</h3>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          
          <Route path="products" element={<ProductsLayout />}>
            <Route index element={<ProductList />} />
            <Route path="list" element={<ProductList />} />
            <Route path="new" element={<NewProducts />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
```

## 5. プログラムによる画面遷移

フォーム送信後の遷移やログイン後のリダイレクトなど、ユーザーのアクションに応じてプログラムで画面を遷移させたい場合は、`useNavigate`フックを使用します。

```tsx
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // ログイン処理...
    
    // ログイン成功後にダッシュボードに遷移
    navigate('/dashboard');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* フォームの内容 */}
      <button type="submit">ログイン</button>
    </form>
  );
};
```

## まとめ

ルーティングは、モダンなReactアプリケーションでは欠かせない機能です。React Routerを使うことで、シングルページアプリケーションでも、複数のページを持つようなユーザー体験を提供できます。

- **基本的な画面切り替え**には`Routes`と`Route`を使う
- **リンク**には`Link`コンポーネントを使う
- **動的なパラメータ**には`useParams`フックを使う
- **クエリパラメータ**には`useSearchParams`フックを使う
- **共通レイアウト**には`Outlet`を使ったネストされたルートを使う
- **プログラムでの画面遷移**には`useNavigate`フックを使う

これらの機能を使いこなすことで、ユーザーにとって使いやすく、開発者にとっても管理しやすいアプリケーションを作ることができます。
