# 練習問題: 副作用とデータフェッチ

## 問題1: ウィンドウサイズの監視

ブラウザのウィンドウサイズを監視し、現在のウィンドウの幅と高さを表示するコンポーネントを作成してください。

要件:
- useEffectを使用してウィンドウのresizeイベントをリッスンする
- ウィンドウのサイズが変わるたびに、表示を更新する
- コンポーネントがアンマウントされるときに、イベントリスナーをクリーンアップする

```tsx
// ここにコードを記述してください
import React, { useState, useEffect } from 'react';

const WindowSizeTracker = () => {
  // ここにステート変数を定義してください
  const [windowSize, setWindowsSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  // ここにリサイズを監視するuseEffectを実装してください
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {

      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <h2>ウィンドウサイズトラッカー</h2>
      <p>現在のウィンドサイズ:</p>
      <p>幅:{windowSize.width}px / 高さ:{windowSize.height}px</p>
    </div>
  );
};

export default WindowSizeTracker;
```

## 問題2: タイマーとクリーンアップ

指定した秒数からカウントダウンするタイマーコンポーネントを作成してください。

要件:
- useStateでカウントダウンの秒数を管理する
- useEffectでタイマーを設定し、1秒ごとにカウントを減らす
- カウントが0になったら「時間切れ！」と表示する
- コンポーネントがアンマウントされるときに、タイマーをクリーンアップする
- リセットボタンを押すと、初期値に戻る

```tsx
// ここにコードを記述してください
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  // 初期値は10秒
  // ここにステート変数を定義してください
  const [count, setCount] = useState(10);
  const [isFinished, setIsFinished] = useState(false);
  // ここにタイマーを実装するuseEffectを記述してください
  useEffect (() => {
    if (count <= 0) {
      setIsFinished(true);
      return;
    }

    const timerId = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [count]);

  // リセット機能を実装してください
  const resetTimer = () => {
    setCount(10);
    setIsFinished(false);
  };

  return (
    <div>
      <h2>カウントダウンタイマー</h2>
      <div>
      {isFinished ? (
        <p>時間切れ！</p>
      ) : (
        <p>残り時間: {count}秒</p>
      )}
      <button onClick={resetTimer}>リセット</button>
      </div>
    </div>
  );
};

export default CountdownTimer;
```

## 問題3: 基本的なデータフェッチング

JSONPlaceholderのAPIを使用して、投稿のリストを取得して表示するコンポーネントを作成してください。

要件:
- useEffectを使用してデータを取得する
- データ取得中はローディングインジケータを表示する
- エラーが発生した場合はエラーメッセージを表示する
- 取得したデータをリストとして表示する

```tsx
// ここにコードを記述してください
import React, { useState, useEffect } from 'react';



// 投稿データの型定義
interface Post {
  id: number;
  title: string;
  body: string;
}

const PostList = () => {
  // ここにステート変数を定義してください
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ここにデータフェッチを行うuseEffectを実装してください
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
          throw new Error('データ取得に失敗しました');
        }

        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError('エラーが発生しました：' + (err instanceof Error ? err.message : String(err)));
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // ローディング中の表示
  if (loading) {
    return<div>読み込み中...</div>;
  }
  
  // エラー時の表示
  if (error) {
    return <div>エラー: {error}</div>;
  }
  
  return (
    <div>
      <h2>投稿リスト</h2>
      <ul>
      {posts.map(post => (
        <li key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default PostList;
```

## 問題4: 依存配列を活用したデータフェッチング

ユーザーが選択したIDに基づいて、特定の投稿の詳細とそのコメントを取得して表示するコンポーネントを作成してください。

要件:
- ユーザーが選択できるIDのドロップダウンを表示する（1〜10）
- 選択されたIDに基づいて、対応する投稿とコメントを取得する
- IDが変更されるたびに、データを再取得する
- データ取得中はローディングインジケータを表示する
- 取得したデータを適切に表示する

```tsx
// ここにコードを記述してください
import React, { useState, useEffect } from 'react';

// 投稿データの型定義
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// コメントの型定義
interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const PostDetails = () => {
  // IDの選択、投稿データ、コメント、ローディング状態のステートを定義してください
  const [selectedId, setSelectedId] = useState<number>(1);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // IDが変更されたときにデータを取得するuseEffectを実装してください
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 投稿を取得
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${selectedId}`);
        if (!postResponse.ok) {
          throw new Error('投稿の取得に失敗しました');
        }
        const postData = await postResponse.json();
        setPost(postData);

        // コメントを取得
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${selectedId}/comments`);
        if (!commentsResponse.ok) {
          throw new Error('コメントの取得に失敗しました');
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
        
      } catch (err) {
        setError('エラーが発生しました: ' + (err instanceof Error ? err.message : String(err)));
        setPost(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedId]); // selectedIdが変わったときに再取得
  
  return (
    <div>
      <h2>投稿詳細</h2>
      <div>
        <label htmlFor="post-select">投稿ID: </label>
        <select 
          id="post-select"
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map(id => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <div>読み込み中...</div>
      ) : error ? (
        <div>エラー: {error}</div>
      ) : (
        <div>
          {post && (
            <div className="post">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          )}
          
          <h4>コメント</h4>
          {comments.length > 0 ? (
            <ul className="comments">
              {comments.map(comment => (
                <li key={comment.id}>
                  <strong>{comment.name}</strong> ({comment.email})
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>コメントはありません</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
```

## 問題5: ローカルストレージとuseEffect

ユーザーの好みの設定（ダークモード/ライトモード）を管理するコンポーネントを作成してください。設定はローカルストレージに保存され、ページをリロードしても維持されるようにします。

要件:
- ダークモード/ライトモードを切り替えるトグルボタンを実装する
- 現在のモード設定をuseStateで管理する
- 設定が変更されたら、ローカルストレージに保存する
- コンポーネントがマウントされたときに、ローカルストレージから設定を読み込む
- 選択されたモードに応じて、適切なスタイル（背景色とテキスト色）を適用する

```tsx
// ここにコードを記述してください
import React, { useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';

const ThemeToggler = () => {
  // テーマモードのステートを定義してください
  const [theme, setTheme] = useState<ThemeMode>('light');
  
  // コンポーネントマウント時にローカルストレージから設定を読み込むuseEffectを実装してください
  useEffect(() => {
    // ローカルストレージから保存されたテーマを取得
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    // 保存されたテーマがあれば、それを適用
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []); // マウント時のみ実行
  
  // テーマ変更時にローカルストレージに保存するuseEffectを実装してください
  useEffect(() => {
    // テーマの変更をローカルストレージに保存
    localStorage.setItem('theme', theme);
  }, [theme]); // themeが変わるたびに実行
  
  // テーマを切り替える関数を実装してください
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // 現在のテーマに基づいたスタイルを定義してください
  const themeStyles = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
    color: theme === 'light' ? '#333333' : '#ffffff',
    padding: '20px',
    borderRadius: '5px',
    transition: 'all 0.3s ease'
  };
  
  return (
    <div style={themeStyles}>
      <h2>テーマ設定</h2>
      <button 
        onClick={toggleTheme}
        style={{
          padding: '8px 16px',
          backgroundColor: theme === 'light' ? '#333333' : '#ffffff',
          color: theme === 'light' ? '#ffffff' : '#333333',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {theme === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}
      </button>
      
      <div style={{ marginTop: '20px' }}>
        <p>これはテーマの例です。背景色とテキスト色が現在のモードに基づいて変わります。</p>
      </div>
    </div>
  );
};

export default ThemeToggler;
```

## 提出

すべての問題が完了したら、learning_path.md を更新して、このセクションに対応するチェックボックスにチェックを入れてください。
