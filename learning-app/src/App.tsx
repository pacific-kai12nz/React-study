import React from 'react';
import './App.css';
import Card from './components/card';
import UserList from './components/UserList';

const usersData = [
  { id: 1, name: '山田太郎', email: 'taro@example.com', role: 'Admin' },
  { id: 2, name: '佐藤花子', email: 'hanako@example.com' },
  { id: 3, name: '鈴木一郎', email: 'ichiro@example.com', role: 'Editor' }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Props Demo</h1>
        <div style={{ width: '80%', maxWidth:'800px'}}>
          <Card
            title="React入門"
            content="Reactは、Facebookによって開発されたJavaScriptライブラリです。ユーザーインターフェース（UI）を構築するために使用されます。"
            borderColor="#61dafb"
          />
          <Card 
            title="JSXの基本"
            content="JSXは、JavaScriptの拡張構文です。HTMLに似た構文をJavaScriptコードの中に直接書くことができます。"
            borderColor="#ff6b6b"
          />
          <Card
            title="コンポーネント"
            content="コンポーネントは、UIの独立した再利用可能な部品です。入力（props）を受け取り、画面に表示される要素を返します。"
          />
        </div>
        
        {/* ユーザーリスト */}
        <div style={{ width: '80%', maxWidth:'800px', backgroundColor: 'white', color: 'black', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
          <UserList users={usersData} />
        </div>
      </header>
    </div>
  );
}

export default App;
export { App };
