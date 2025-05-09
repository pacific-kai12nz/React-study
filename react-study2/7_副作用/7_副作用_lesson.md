# 7. 副作用（useEffect）

## 7.1 副作用（Side Effects）とは何か

Reactコンポーネントの主な役割はUIをレンダリングすることですが、アプリケーションでは外部データの取得や購読、DOMの手動操作など、UIレンダリング以外の処理（副作用）も必要になります。

**副作用（Side Effects）の例：**
- データの取得（APIからのデータフェッチング）
- イベントリスナーの登録
- 手動でのDOMの変更
- タイマーの設定と解除
- ローカルストレージの使用
- 外部サービスや機能の購読と解除

これらの処理はReactのレンダリングサイクルの外で実行する必要があり、そのためのフックが `useEffect` です。

## 7.2 useEffectフックの基本

`useEffect`を使うと、関数コンポーネント内で副作用を扱うことができます。

```jsx
import React, { useState, useEffect } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  // useEffectの基本的な使い方
  useEffect(() => {
    // この処理はコンポーネントがマウント時と更新時に実行される
    document.title = `カウント: ${count}回クリックされました`;
  });

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        クリック
      </button>
    </div>
  );
}
```

上記の例では、コンポーネントがレンダリングされるたびに、`useEffect`内の処理が実行され、ドキュメントのタイトルが更新されます。

## 7.3 依存配列の使い方

`useEffect`の第2引数には「依存配列」を指定できます。この配列に含まれる値が変わったときだけ、`useEffect`内の処理が実行されます。

```jsx
// 依存配列を空にした場合（マウント時のみ実行）
useEffect(() => {
  console.log('コンポーネントがマウントされました');
  // クリーンアップ関数（アンマウント時に実行）
  return () => {
    console.log('コンポーネントがアンマウントされました');
  };
}, []); // 空の依存配列

// 依存配列に値を指定した場合（値が変わった時のみ実行）
useEffect(() => {
  console.log(`countが変更されました: ${count}`);
}, [count]); // countが変わった時だけ実行

// 依存配列を省略した場合（毎回のレンダリング時に実行）
useEffect(() => {
  console.log('コンポーネントがレンダリングされました');
}); // 毎回実行
```

依存配列の使い分け：
- **依存配列なし**: 毎回のレンダリング後に実行
- **空の依存配列 `[]`**: マウント時のみ実行（アンマウント時にはクリーンアップ関数が実行）
- **値を含む依存配列 `[value1, value2]`**: 指定した値が変わった時に実行

## 7.4 クリーンアップ関数

`useEffect`の中で登録したイベントリスナーやタイマーなどは、コンポーネントがアンマウントされるときにクリーンアップ（解除）する必要があります。そのために、`useEffect`内で関数を返します。

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // タイマーを設定
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // クリーンアップ関数
    return () => {
      clearInterval(timer); // タイマーを解除
    };
  }, []); // マウント時のみタイマーを設定

  return <p>経過時間: {seconds}秒</p>;
}
```

クリーンアップ関数は以下のタイミングで実行されます：
- コンポーネントがアンマウントされる時
- 依存配列の値が変わって、次の`useEffect`が実行される前

## 7.5 useEffectの実践的な例

### 1. APIからのデータ取得

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // マウント時のみデータを取得

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 2. イベントリスナーの登録

```jsx
function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // リサイズイベントのハンドラ
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // イベントリスナーを登録
    window.addEventListener('resize', handleResize);

    // クリーンアップでイベントリスナーを解除
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // マウント時のみイベントリスナーを登録

  return (
    <p>
      ウィンドウサイズ: {windowSize.width} x {windowSize.height}
    </p>
  );
}
```

### 3. ローカルストレージの使用

```jsx
function SavedCounter() {
  // 初期値をローカルストレージから取得
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('count');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  // countが変わったらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('count', count.toString());
  }, [count]);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>増加</button>
      <button onClick={() => setCount(count - 1)}>減少</button>
    </div>
  );
}
```

## 7.6 useEffectを使用する際の注意点

### 1. 無限ループに注意

依存配列の設定を誤ると、無限ループが発生する可能性があります。

```jsx
// 悪い例
function BadExample() {
  const [count, setCount] = useState(0);

  // この副作用は無限ループを引き起こす
  useEffect(() => {
    setCount(count + 1); // stateを更新
  }); // 依存配列がない、または [count] を指定した場合

  return <p>{count}</p>;
}
```

### 2. 依存配列の正確な指定

依存配列には、副作用内で使用するすべての値を含める必要があります。

```jsx
// よくある間違い
function Example({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(id).then(result => {
      setData(result);
    });
  }, []); // 誤り: idが変わっても再フェッチされない

  // 正しい方法
  useEffect(() => {
    fetchData(id).then(result => {
      setData(result);
    });
  }, [id]); // 正しい: idが変わったら再フェッチ

  return data ? <p>{data.name}</p> : <p>Loading...</p>;
}
```

### 3. リント（ESLint）ルールの活用

`eslint-plugin-react-hooks`の`exhaustive-deps`ルールを活用すると、依存配列の誤りを検出できます。

## 7.7 useEffectとTypeScript

TypeScriptで`useEffect`を使用する場合、型を適切に扱うことが重要です。

```tsx
// TypeScriptでのuseEffectの例
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error('ユーザー取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // userIdが変わったら再フェッチ

  if (loading) return <p>読み込み中...</p>;
  if (!user) return <p>ユーザーが見つかりません</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

## まとめ

- `useEffect`は関数コンポーネント内で副作用を扱うためのフックです
- 依存配列を使って副作用の実行タイミングを制御できます
- クリーンアップ関数を返すことで、リソースのクリーンアップができます
- APIからのデータ取得、イベントリスナーの登録、ローカルストレージの使用など、多くの実践的なケースで活用できます
- 無限ループを避けるため、依存配列の設定には注意が必要です

`useEffect`を適切に使うことで、関数コンポーネントでも複雑な副作用を効果的に処理できるようになります。
