# 6. イベント処理（onClick, onChange）

## 6.1 Reactのイベント処理の基本

Reactでは、DOMイベントを処理するための独自のイベントシステムを提供しています。このシステムは標準のDOMイベントとよく似ていますが、いくつかの違いがあります。

### イベント名の命名規則

Reactでは、イベント名はキャメルケース（camelCase）で記述します。例えば、HTMLでは`onclick`ですが、Reactでは`onClick`と書きます。

```jsx
// HTMLの例
<button onclick="handleClick()">クリック</button>

// Reactの例
<button onClick={handleClick}>クリック</button>
```

### イベントハンドラの渡し方

Reactでは、イベントハンドラを関数として渡します。文字列としては渡しません。また、関数を実行結果ではなく、関数自体を渡すことに注意してください。

```jsx
// 正しい例
<button onClick={handleClick}>クリック</button>

// 間違った例（関数の実行結果を渡している）
<button onClick={handleClick()}>クリック</button>
```

### イベントオブジェクト

Reactのイベントハンドラには、イベントに関する情報を持つイベントオブジェクトが自動的に渡されます。このオブジェクトは標準のDOMイベントオブジェクトと互換性がありますが、Reactによって合成（synthetic）されています。

```jsx
function handleClick(event) {
  // イベントオブジェクトを使用
  console.log('クリックされました！');
  console.log(event.target); // イベントが発生した要素
  
  // デフォルトの挙動を防止（例：フォームの送信）
  event.preventDefault();
}
```

## 6.2 よく使うイベント

### クリックイベント（onClick）

ボタンや他の要素のクリックを処理します。

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={handleIncrement}>増加</button>
    </div>
  );
}
```

### フォーム入力イベント（onChange）

テキスト入力やセレクトボックスなどのフォーム要素の値の変更を処理します。

```jsx
function NameForm() {
  const [name, setName] = useState('');
  
  const handleChange = (event) => {
    setName(event.target.value);
  };
  
  return (
    <div>
      <input 
        type="text" 
        value={name} 
        onChange={handleChange} 
        placeholder="名前を入力"
      />
      <p>こんにちは、{name}さん！</p>
    </div>
  );
}
```

### フォーム送信イベント（onSubmit）

フォームの送信を処理します。通常、`preventDefault()`と組み合わせて使用し、ページのリロードを防ぎます。

```jsx
function SearchForm() {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault(); // デフォルトの送信動作を防止
    alert(`検索クエリ: ${query}`);
    // ここで検索処理を実行
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="検索..."
      />
      <button type="submit">検索</button>
    </form>
  );
}
```

### その他のよく使うイベント

- `onBlur`: 要素がフォーカスを失ったとき
- `onFocus`: 要素がフォーカスを得たとき
- `onMouseOver`: マウスが要素の上に乗ったとき
- `onMouseOut`: マウスが要素から離れたとき
- `onKeyDown`: キーボードのキーが押されたとき
- `onKeyUp`: キーボードのキーが離されたとき

## 6.3 TypeScriptでのイベント型

TypeScriptを使用する場合、イベントオブジェクトに適切な型を指定することが重要です。Reactは様々なイベント型を提供しています。

### 基本的なイベント型

```tsx
// マウスイベント
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log('クリックされました！', event.clientX, event.clientY);
};

// キーボードイベント
const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    console.log('Enterキーが押されました！');
  }
};

// フォーム要素の変更イベント
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log('入力値:', event.target.value);
};

// フォーム送信イベント
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log('フォームが送信されました！');
};
```

### 一般的なイベント型の例

| イベント型 | 説明 |
|------------|------|
| `React.MouseEvent<T>` | マウスイベント（クリックなど） |
| `React.KeyboardEvent<T>` | キーボードイベント |
| `React.ChangeEvent<T>` | 入力や選択の変更 |
| `React.FormEvent<T>` | フォームイベント |
| `React.FocusEvent<T>` | フォーカスイベント |
| `React.DragEvent<T>` | ドラッグイベント |

## 6.4 イベント処理のパターン

### インラインで定義する方法

シンプルな処理の場合、JSX内に直接関数を定義することもできます。

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>増加</button>
      <button onClick={() => setCount(count - 1)}>減少</button>
    </div>
  );
}
```

### パラメータを渡す方法

イベントハンドラに追加のパラメータを渡したい場合、アロー関数を使います。

```tsx
function ItemList() {
  const items = ['りんご', 'バナナ', 'オレンジ'];
  
  const handleItemClick = (item: string) => {
    alert(`選択されたアイテム: ${item}`);
  };
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => handleItemClick(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
}
```

### イベント伝播（Event Propagation）

Reactでも標準DOMと同様に、イベントはバブリング（子要素から親要素へ伝播）します。これを止めたい場合は`stopPropagation()`を使用します。

```tsx
function NestedButtons() {
  const handleParentClick = () => {
    alert('親がクリックされました');
  };
  
  const handleChildClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 親へのイベント伝播を止める
    alert('子がクリックされました');
  };
  
  return (
    <div onClick={handleParentClick} style={{ padding: '20px', backgroundColor: 'lightgray' }}>
      親要素
      <button 
        onClick={handleChildClick}
        style={{ margin: '10px' }}
      >
        子要素
      </button>
    </div>
  );
}
```

## まとめ

- Reactのイベント名はキャメルケースで記述する（例：`onClick`, `onChange`）
- イベントハンドラには関数自体を渡す（実行結果ではない）
- TypeScriptを使う場合は適切なイベント型を指定する
- イベントオブジェクトを使って、デフォルト動作の防止（`preventDefault()`）やイベント伝播の停止（`stopPropagation()`）ができる
- 複雑なロジックは別の関数として定義し、シンプルな場合はインラインで記述することもできる

これらの知識を活用することで、ユーザーの操作に応じて適切にインタラクションするReactアプリケーションを作成できます。
