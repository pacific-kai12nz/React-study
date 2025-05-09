# 7. 副作用（useEffect）練習問題

## 概要

この練習問題では、Reactの`useEffect`フックを使って副作用を管理する方法を学びます。ToDoリストアプリにさらに機能を追加し、外部データの取得、ローカルストレージを使ったデータの永続化、そして自動保存機能を実装します。

## 問題1: ローカルストレージを使ったタスクの永続化

現在のToDoリストアプリでは、ページをリロードするとすべてのタスクが初期状態に戻ってしまいます。ローカルストレージを使って、タスクを保存・復元する機能を実装しましょう。

```tsx
// App.tsxを修正して、ローカルストレージ機能を追加してください

// 1. todosの初期値をローカルストレージから取得するように修正
// 現在の実装
const [todos, setTodos] = useState<Todo[]>([
  {id: 1, text:'買い物に行く', completed: false},
  {id: 2, text:'Reactの勉強をする', completed: true},
  {id: 3, text:'部屋の掃除をする', completed: false}
]);

// 修正後のイメージ
const [todos, setTodos] = useState<Todo[]>(() => {
  // ローカルストレージからデータを取得
  const savedTodos = localStorage.getItem('todos');
  // データがあれば解析して返し、なければ初期値を返す
  return savedTodos ? JSON.parse(savedTodos) : [
    {id: 1, text:'買い物に行く', completed: false},
    {id: 2, text:'Reactの勉強をする', completed: true},
    {id: 3, text:'部屋の掃除をする', completed: false}
  ];
});

// 2. todosが変更されたときに、ローカルストレージに保存するuseEffectを追加
useEffect(() => {
  localStorage.setItem
}, [/* 依存配列 */]);
```

## 問題2: 天気情報の取得と表示

外部APIから天気情報を取得し、ToDoリストアプリに表示する機能を実装しましょう。

1. まず、`src/components`ディレクトリに`WeatherWidget.tsx`ファイルを作成してください：

```tsx
import React, { useState, useEffect } from 'react';

// 天気情報の型定義
interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  name: string;
}

const WeatherWidget: React.FC = () => {
  // 天気データを管理するstate
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  // ローディング状態を管理するstate
  const [loading, setLoading] = useState<boolean>(true);
  // エラー状態を管理するstate
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 天気データを取得する関数
    const fetchWeather = async () => {
      // ローディング状態をtrueに設定
      setLoading(true);
      
      try {
        // 以下のAPIキーとURLは例です。実際のAPIキーは各自で取得してください
        // OpenWeatherMapの無料APIを使用: https://openweathermap.org/api
        const API_KEY = '今回は例として天気APIを使わず模擬データを使います';
        
        // 模擬データを使用（実際のAPIを使用する場合はコメントアウトしてください）
        // 実際のAPIリクエスト例:
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${API_KEY}&units=metric`);
        // const data = await response.json();
        
        // 模擬データ（実際のAPIを使用する場合は削除してください）
        const mockData: WeatherData = {
          main: { temp: 21.5 },
          weather: [{ description: '晴れ', icon: '01d' }],
          name: '東京'
        };
        
        // 天気データを設定
        // setWeatherData(data); // 実際のAPIを使用する場合
        setWeatherData(mockData); // 模擬データを使用
        
        // エラー状態をクリア
        setError(null);
      } catch (err) {
        // エラー状態を設定
        setError('天気データの取得に失敗しました');
        // 天気データをクリア
        setWeatherData(null);
      } finally {
        // ローディング状態をfalseに設定
        setLoading(false);
      }
    };

    // コンポーネントのマウント時に天気データを取得
    fetchWeather();
    
    // 一定時間ごとに天気データを更新（オプション）
    // ここにコードを追加してください（タイマーの設定と解除）
    
  }, []); // 空の依存配列 - マウント時のみ実行

  // ローディング中の表示
  if (loading) return <div>天気データを読み込み中...</div>;
  
  // エラー時の表示
  if (error) return <div>エラー: {error}</div>;
  
  // 天気データがない場合の表示
  if (!weatherData) return <div>天気データがありません</div>;

  return (
    <div className="weather-widget" style={{ 
      padding: '10px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '5px',
      marginBottom: '20px'
    }}>
      <h3>現在の天気: {weatherData.name}</h3>
      <div>
        <p>気温: {weatherData.main.temp}°C</p>
        <p>天気: {weatherData.weather[0].description}</p>
        {/* 天気アイコンがある場合は表示 */}
        {weatherData.weather[0].icon && (
          <img 
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
            alt="天気アイコン" 
          />
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
```

2. `App.tsx`を修正して、WeatherWidgetを表示してください：

```tsx
import WeatherWidget from './components/WeatherWidget';

// JSXの表示部分
return (
  <div className="App">
    <Header title="Todoリストアプリ" description="日々のタスクを管理しましょう" />
    <WeatherWidget /> {/* 天気ウィジェットを追加 */}
    <Counter/>
    {/* 以下は既存のコンポーネント */}
  </div>
);
```

## 問題3: タスクの自動保存機能

タスクが編集されたとき、一定時間後に自動的に保存される機能を実装しましょう。

1. `TodoItem.tsx`を修正して、自動保存機能を追加してください：

```tsx
// 編集中のテキストを管理するstate
const [editText, setEditText] = useState(text);
// 自動保存のタイマーIDを保持する参照を作成
const [isSaving, setIsSaving] = useState(false);

// 編集テキストが変更されたときに実行されるハンドラ
const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEditText(e.target.value);
  setIsSaving(true);
};

// 自動保存のuseEffectを追加
useEffect(() => {
  // 編集テキストが変更されたときだけ処理を実行
  if (isSaving) {
    // タイマーを設定（1.5秒後に保存）
    const saveTimer = setTimeout(() => {
      if (editText.trim() !== '' && editText !== text) {
        onEdit(editText);
        setIsSaving(false);
      }
    }, 1500);
    
    // クリーンアップ関数（タイマーの解除）
    return () => {
      clearTimeout(saveTimer);
    };
  }
}, [editText, isSaving, onEdit, text]);

// 編集モードの部分を修正
const editMode = (
  <li>
    <form onSubmit={handleEditSubmit}>
      <input
        type="text"
        value={editText}
        onChange={handleEditChange} // 変更ハンドラを修正
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button type="submit">保存</button>
      <button type="button" onClick={() => {
        setIsEditing(false);
        setEditText(text);
        setIsSaving(false); // 保存状態をリセット
      }}>
        キャンセル
      </button>
      {isSaving && <span style={{ marginLeft: '10px', color: '#888' }}>自動保存中...</span>}
    </form>
  </li>
);
```

## 問題4: タスク完了時の効果音

タスクを完了状態に変更したときに効果音を再生する機能を実装しましょう。

1. `App.tsx`にタスク完了効果音の機能を追加してください：

```tsx
// toggleTodo関数を修正
const toggleTodo = (id: number) => {
  // 変更前のtodoを取得
  const targetTodo = todos.find(todo => todo.id === id);
  
  // todoの状態を更新
  setTodos(
    todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed } : todo
    )
  );
  
  // タスクが未完了から完了に変わる場合は効果音を再生
  if (targetTodo && !targetTodo.completed) {
    // 効果音を再生する関数
    const playCompleteSound = () => {
      // AudioContextを使って簡単な効果音を生成
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.3;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 短い効果音を再生
        oscillator.start();
        
        // 0.2秒後に停止
        setTimeout(() => {
          oscillator.stop();
        }, 200);
      } catch (err) {
        console.error('効果音の再生に失敗しました:', err);
      }
    };
    
    playCompleteSound();
  }
};
```

## 問題5: useEffectを使ったデバッグロギング

アプリの状態変化をコンソールにログ出力する機能を実装しましょう。これはデバッグに役立ちます。

1. `App.tsx`に以下のuseEffectを追加してください：

```tsx
// 開発モードでのみログを出力するuseEffect
useEffect(() => {
  console.log('ToDo状態が更新されました:', todos);
}, [todos]);

// フィルター状態が変更されたときのログ
useEffect(() => {
  console.log('現在のフィルター:', filter);
}, [filter]);

// フィルタリング後のtodos数のログ
useEffect(() => {
  console.log('フィルタリング後のタスク数:', filteredTodos.length);
}, [filteredTodos]);
```

## 提出方法

上記の問題を実装して、アプリが正常に動作することを確認してください。特に以下の点に注意してください：

1. ローカルストレージにタスクが正しく保存・復元されるか
2. 天気ウィジェットが正しく表示されるか
3. タスクの自動保存機能が正しく動作するか
4. タスク完了時に効果音が再生されるか
5. コンソールに適切なログが出力されるか

実装が完了したら、useEffectを使った副作用処理についての理解と、実装方法について説明してください。
