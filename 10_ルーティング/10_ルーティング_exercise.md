# 練習問題: ルーティング

## 問題1: 基本的なルーティング

シンプルなナビゲーションを持つWebサイトを実装してください。ホーム、プロフィール、お問い合わせの3つのページを持つようにしてください。

要件:
- React Routerを使用して3つのページ間を遷移できるようにする
- 各ページには適切なコンテンツを表示する
- ナビゲーションメニューを実装する

```tsx
// ここにコードを記述してください
import React from 'react';
// 必要なReact Routerのコンポーネントをインポートしてください

// ホームページコンポーネント
const HomePage = () => {
  return (
    <div>
      <h2>ホームページ</h2>
      <p>これはホームページです。ようこそ！</p>
    </div>
  );
};

// プロフィールページコンポーネント
const ProfilePage = () => {
  return (
    <div>
      <h2>プロフィールページ</h2>
      <p>ここにはユーザー情報が表示されます。</p>
    </div>
  );
};

// お問い合わせページコンポーネント
const ContactPage = () => {
  return (
    <div>
      <h2>お問い合わせページ</h2>
      <p>ご質問やお問い合わせはこちらからお願いします。</p>
    </div>
  );
};

// メインのアプリケーションコンポーネント
const App = () => {
  // ここにルーティングの実装を追加してください
  
  return (
    <div>
      {/* ナビゲーションメニューとルーティングの設定を実装してください */}
    </div>
  );
};

export default App;
```

## 問題2: URLパラメータの使用

ユーザーIDに基づいてユーザー情報を表示するページを実装してください。

要件:
- URLパラメータを使用してユーザーIDを取得する
- ユーザーの詳細情報を表示する
- ユーザーリストページからユーザー詳細ページへのリンクを実装する

```tsx
// ここにコードを記述してください
import React from 'react';
// 必要なReact Routerのコンポーネントをインポートしてください

// ダミーユーザーデータ
const users = [
  { id: 1, name: '田中太郎', email: 'tanaka@example.com', job: 'エンジニア' },
  { id: 2, name: '鈴木花子', email: 'suzuki@example.com', job: 'デザイナー' },
  { id: 3, name: '佐藤一郎', email: 'sato@example.com', job: 'マーケター' }
];

// ユーザーリストページコンポーネント
const UserListPage = () => {
  return (
    <div>
      <h2>ユーザー一覧</h2>
      <ul>
        {/* ここにユーザーリストとリンクを実装してください */}
      </ul>
    </div>
  );
};

// ユーザー詳細ページコンポーネント
const UserDetailPage = () => {
  // URLパラメータからユーザーIDを取得する
  
  // IDに基づいてユーザーを検索
  
  return (
    <div>
      <h2>ユーザー詳細</h2>
      {/* ここにユーザー情報の表示を実装してください */}
      
      {/* ユーザーリストに戻るリンクを実装してください */}
    </div>
  );
};

// メインのアプリケーションコンポーネント
const App = () => {
  return (
    <div>
      {/* ルーティングの設定を実装してください */}
    </div>
  );
};

export default App;
```

## 問題3: ネストされたルート

共通のレイアウトを持つブログサイトを実装してください。

要件:
- 共通のヘッダーとフッターを持つレイアウトを作成する
- ブログ記事一覧ページと記事詳細ページを実装する
- ネストされたルートを使用してレイアウトを共有する

```tsx
// ここにコードを記述してください
import React from 'react';
// 必要なReact Routerのコンポーネントをインポートしてください

// ダミーブログ記事データ
const blogPosts = [
  { id: 1, title: 'Reactの基礎', content: 'Reactはコンポーネントベースのライブラリです...' },
  { id: 2, title: 'React Routerの使い方', content: 'React Routerを使うとSPAでも...' },
  { id: 3, title: 'カスタムフックの作成', content: 'カスタムフックを使うとロジックを...' }
];

// レイアウトコンポーネント
const Layout = () => {
  return (
    <div>
      {/* ヘッダー */}
      <header>
        <h1>マイブログ</h1>
        <nav>
          {/* ナビゲーションリンクを実装してください */}
        </nav>
      </header>
      
      {/* メインコンテンツ */}
      <main>
        {/* ここに子ルートの内容を表示するためのOutletを追加してください */}
      </main>
      
      {/* フッター */}
      <footer>
        <p>© 2025 マイブログ</p>
      </footer>
    </div>
  );
};

// ブログ記事一覧ページコンポーネント
const BlogListPage = () => {
  return (
    <div>
      <h2>ブログ記事一覧</h2>
      <ul>
        {/* ここにブログ記事のリストとリンクを実装してください */}
      </ul>
    </div>
  );
};

// ブログ記事詳細ページコンポーネント
const BlogPostPage = () => {
  // URLパラメータから記事IDを取得する
  
  // IDに基づいて記事を検索
  
  return (
    <div>
      <h2>ブログ記事詳細</h2>
      {/* ここに記事の詳細を表示してください */}
      
      {/* 記事一覧に戻るリンクを実装してください */}
    </div>
  );
};

// ホームページコンポーネント
const HomePage = () => {
  return (
    <div>
      <h2>ブログへようこそ</h2>
      <p>このブログではReactに関する情報を発信しています。</p>
    </div>
  );
};

// メインのアプリケーションコンポーネント
const App = () => {
  return (
    <div>
      {/* ネストされたルートを実装してください */}
    </div>
  );
};

export default App;
```

## 問題4: クエリパラメータと検索機能

商品リストページに検索機能とフィルター機能を実装してください。

要件:
- クエリパラメータを使用して検索キーワードとカテゴリフィルターを管理する
- 検索フォームとカテゴリ選択を実装する
- クエリパラメータに基づいて商品リストをフィルタリングする

```tsx
// ここにコードを記述してください
import React, { useState } from 'react';
// 必要なReact Routerのコンポーネントをインポートしてください

// ダミー商品データ
const products = [
  { id: 1, name: 'ノートパソコン', category: 'electronics', price: 80000 },
  { id: 2, name: 'スマートフォン', category: 'electronics', price: 60000 },
  { id: 3, name: 'コーヒーメーカー', category: 'kitchen', price: 12000 },
  { id: 4, name: '掃除機', category: 'household', price: 35000 },
  { id: 5, name: 'ワイヤレスイヤホン', category: 'electronics', price: 15000 },
  { id: 6, name: '電気ケトル', category: 'kitchen', price: 5000 },
];

// 商品リストページコンポーネント
const ProductListPage = () => {
  // 検索パラメータの管理
  
  // フォーム送信ハンドラー
  
  // フィルタリングされた商品リスト
  
  return (
    <div>
      <h2>商品リスト</h2>
      
      {/* 検索フォームを実装してください */}
      
      {/* カテゴリフィルターを実装してください */}
      
      {/* 商品リストを表示してください */}
    </div>
  );
};

// メインのアプリケーションコンポーネント
const App = () => {
  return (
    <div>
      {/* ルーティングの設定を実装してください */}
    </div>
  );
};

export default App;
```

## 問題5: プログラムによる画面遷移

ログインフォームを実装し、ログイン成功後にダッシュボードページにプログラムで遷移するようにしてください。

要件:
- ログインフォームを作成する
- ログイン処理後に`useNavigate`を使用してダッシュボードページに遷移する
- ログアウト機能も実装する
- 保護されたページ（ダッシュボード）へのアクセス制御を実装する

```tsx
// ここにコードを記述してください
import React, { useState } from 'react';
// 必要なReact Routerのコンポーネントをインポートしてください

// 認証コンテキスト
const AuthContext = React.createContext(null);

// 認証プロバイダーコンポーネント
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // ログイン関数
  const login = (username, password) => {
    // ダミーの認証処理
    if (username === 'user' && password === 'password') {
      setUser({ username });
      return true;
    }
    return false;
  };
  
  // ログアウト関数
  const logout = () => {
    setUser(null);
  };
  
  const value = { user, login, logout };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 認証コンテキストを使用するカスタムフック
const useAuth = () => {
  return React.useContext(AuthContext);
};

// ログインページコンポーネント
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // 認証コンテキストとナビゲーション関数を取得
  
  // フォーム送信ハンドラー
  
  return (
    <div>
      <h2>ログイン</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* ログインフォームを実装してください */}
    </div>
  );
};

// ダッシュボードページコンポーネント
const DashboardPage = () => {
  // 認証コンテキストとナビゲーション関数を取得
  
  return (
    <div>
      <h2>ダッシュボード</h2>
      <p>ログイン成功！このページは認証されたユーザーのみ閲覧できます。</p>
      {/* ログアウトボタンを実装してください */}
    </div>
  );
};

// 保護されたルートコンポーネント
const ProtectedRoute = ({ children }) => {
  // 認証状態を確認し、未認証の場合はリダイレクト
  
  return children;
};

// ホームページコンポーネント
const HomePage = () => {
  return (
    <div>
      <h2>ホームページ</h2>
      <p>ログインしてダッシュボードにアクセスしてください。</p>
    </div>
  );
};

// メインのアプリケーションコンポーネント
const App = () => {
  return (
    <AuthProvider>
      <div>
        {/* ナビゲーションとルーティングを実装してください */}
      </div>
    </AuthProvider>
  );
};

export default App;
```

## 提出

すべての問題が完了したら、learning_path.md を更新して、このセクションに対応するチェックボックスにチェックを入れてください。
