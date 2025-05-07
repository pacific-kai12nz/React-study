# 9. 副作用とデータフェッチ

## 9.1 副作用（Side Effects）とは

React コンポーネントにおける「副作用」とは、レンダリング以外の処理のことを指します。例えば次のような操作が副作用に含まれます：

- データの取得（API呼び出し、データフェッチング）
- DOM の直接操作
- タイマーの設定（setTimeout, setInterval）
- イベントリスナーの登録・解除
- localStorage などのブラウザ API の利用
- 外部サービスとの連携

これらの操作は、コンポーネントのレンダリング処理とは別に扱う必要があります。

## 9.2 useEffect フックの基本

React では、副作用を処理するために `useEffect` フックを使用します。

### 基本的な使い方

```tsx
import React, { useEffect, useState } from 'react';

const Timer: React.FC = () => {
  const [count, setCount] = useState(0);

  // useEffect の基本的な使い方
  useEffect(() => {
    // この中に副作用のコードを書く
    console.log('コンポーネントがレンダリングされました');
    
    // タイマーを設定（副作用の例）
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);
    
    // クリーンアップ関数（コンポーネントがアンマウントされる時や
    // 依存配列の値が変わって再実行される前に呼ばれる）
    return () => {
      clearTimeout(timer); // タイマーをクリア
    };
  }, [count]); // 依存配列 - count が変わるたびに useEffect が再実行される

  return <div>カウント: {count}</div>;
};
```

### useEffect の構成要素

useEffect は主に3つの要素で構成されています：

1. **エフェクト関数**：実行したい副作用のコードを含む関数
2. **クリーンアップ関数**（オプション）：エフェクトのクリーンアップ（後片付け）を行う関数
3. **依存配列**：エフェクトが依存する値のリスト

## 9.3 依存配列（Dependency Array）

useEffect の第2引数として渡す配列を「依存配列」と呼びます。この配列に含まれる値が変更されると、エフェクトが再実行されます。

### 依存配列の使い方

```tsx
// レンダリングの度に実行（依存配列なし）
useEffect(() => {
  console.log('毎回のレンダリングで実行されます');
});

// マウント時のみ実行（空の依存配列）
useEffect(() => {
  console.log('コンポーネントがマウントされた時だけ実行されます');
}, []);

// 特定の値が変わった時に実行
useEffect(() => {
  console.log(`count の値が ${count} に変わりました`);
}, [count]);

// 複数の値を監視
useEffect(() => {
  console.log('count または name が変更されました');
}, [count, name]);
```

### 依存配列を適切に設定する重要性

依存配列を正しく設定することは、バグを防ぎ、パフォーマンスを向上させるために非常に重要です。特に、エフェクト内で使用しているステート変数や props は依存配列に含める必要があります。

React の ESLint ルール（eslint-plugin-react-hooks）は、依存配列に含めるべき値が抜けている場合に警告を出してくれます。

```tsx
// 警告が出る例（count を使っているのに依存配列に含めていない）
useEffect(() => {
  console.log(`count の値: ${count}`);
}, []); // ESLint: React Hook useEffect has a missing dependency: 'count'
```

## 9.4 クリーンアップ関数

エフェクト関数から関数を返すことで、「クリーンアップ関数」を定義できます。このクリーンアップ関数は以下のタイミングで実行されます：

1. コンポーネントがアンマウントされる時（DOM から削除される時）
2. 依存配列の値が変わって、エフェクトが再実行される前

クリーンアップ関数は、エフェクトで設定したものを「後片付け」するために使います。例えば：

- タイマーのクリア（clearTimeout, clearInterval）
- イベントリスナーの解除
- WebSocket 接続の切断
- データ購読（subscription）の解除

```tsx
useEffect(() => {
  // イベントリスナーを追加
  window.addEventListener('resize', handleResize);
  
  // クリーンアップ関数でイベントリスナーを削除
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // マウント時に追加、アンマウント時に削除
```

クリーンアップ関数を適切に実装することで、メモリリークやバグを防ぐことができます。

## 9.5 データフェッチング

useEffect の最も一般的な使用例の一つが、APIからのデータ取得（データフェッチング）です。

### 基本的なデータ取得の例

```tsx
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 非同期関数を定義
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
        setError('エラーが発生しました: ' + (err instanceof Error ? err.message : String(err)));
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    // 関数を実行
    fetchUsers();
    
    // クリーンアップ関数は特に必要ない場合もある
    return () => {
      // 必要に応じてアボートコントローラーなどでリクエストをキャンセル
    };
  }, []); // 空の依存配列 - コンポーネントがマウントされた時だけ実行

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error}</div>;
  }

  return (
    <div>
      <h1>ユーザーリスト</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
```

### データ取得のベストプラクティス

1. **ローディング状態の管理**：データ取得中はローディングインジケータを表示
2. **エラーハンドリング**：失敗した場合はエラーメッセージを表示
3. **依存配列の適切な設定**：必要に応じてデータを再取得
4. **アボートコントローラー**：必要に応じてリクエストをキャンセル

```tsx
useEffect(() => {
  // AbortController を使ってフェッチをキャンセルできるようにする
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        signal: controller.signal // アボートシグナルを渡す
      });
      // 以下データ処理...
    } catch (err) {
      // AbortError は通常のエラーとして扱わない
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
  
  // クリーンアップ時にリクエストをキャンセル
  return () => {
    controller.abort();
  };
}, [url]); // url が変わるたびにデータを再取得
```

## 9.6 useEffect の使用ケース

useEffect は様々なシナリオで使用できます：

### 1. ドキュメントタイトルの変更

```tsx
useEffect(() => {
  document.title = `${count} 回クリックされました`;
}, [count]);
```

### 2. イベントリスナーの登録

```tsx
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [onClose]);
```

### 3. アニメーションの制御

```tsx
useEffect(() => {
  if (isVisible) {
    // アニメーションの開始
    animation.start();
  }
  
  return () => {
    // アニメーションの停止
    animation.stop();
  };
}, [isVisible, animation]);
```

### 4. WebSocket 接続

```tsx
useEffect(() => {
  const socket = new WebSocket('wss://example.com/socket');
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setMessages(prev => [...prev, data]);
  };
  
  socket.onclose = () => {
    console.log('WebSocket 接続が閉じられました');
  };
  
  return () => {
    socket.close();
  };
}, []);
```

### 5. フォームの自動保存

```tsx
useEffect(() => {
  // 入力が変わってから500ミリ秒後に自動保存
  const timer = setTimeout(() => {
    saveFormData(formValues);
  }, 500);
  
  return () => {
    clearTimeout(timer);
  };
}, [formValues, saveFormData]);
```

## 9.7 useEffectの使用に関する注意点

### 1. 無限ループを避ける

useEffect の依存配列が正しく設定されていないと、無限ループが発生する可能性があります。

```tsx
// 🔴 無限ループの例
const [count, setCount] = useState(0);

useEffect(() => {
  // エフェクト内でステートを更新
  setCount(count + 1);
  // count が依存配列にあるため、ステートが更新されるたびに
  // エフェクトが再実行され、無限ループになる
}, [count]);
```

### 2. レースコンディションの対処

非同期処理を含むエフェクトでは、レースコンディション（競合状態）に注意が必要です。

```tsx
useEffect(() => {
  let isMounted = true; // コンポーネントがマウントされているかを追跡
  
  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    
    // コンポーネントがまだマウントされている場合のみステートを更新
    if (isMounted) {
      setData(data);
    }
  };
  
  fetchData();
  
  // クリーンアップ関数
  return () => {
    isMounted = false; // コンポーネントがアンマウントされたことをマーク
  };
}, [url]);
```

### 3. 過剰なレンダリングを避ける

依存配列に不要な値を含めると、コンポーネントが過剰にレンダリングされる可能性があります。

### 4. ESLintのルールを活用する

React の ESLint ルール（eslint-plugin-react-hooks）を使用して、useEffect の依存配列に関する問題を検出できます。

## 9.8 useEffect vs. useLayoutEffect

React には `useEffect` の他に `useLayoutEffect` というフックもあります。基本的な構文は同じですが、実行のタイミングが異なります。

- **useEffect**: レンダリング後に非同期で実行（ほとんどのケースで使用）
- **useLayoutEffect**: レンダリング後、ブラウザが画面を更新する前に同期的に実行（DOM測定や条件によるレイアウト調整など）

```tsx
// レイアウトの測定と調整
useLayoutEffect(() => {
  // DOM要素の測定
  const { height } = ref.current.getBoundingClientRect();
  
  // 測定結果に基づいてスタイルを調整
  if (height > maxHeight) {
    setStyle({ overflow: 'auto', height: `${maxHeight}px` });
  }
}, [maxHeight]);
```

一般的に、`useEffect` で十分な場合がほとんどであり、パフォーマンスの問題がない限り `useLayoutEffect` は必要ありません。
