# 配列メソッドとオブジェクト操作

JavaScriptとTypeScriptにおける配列メソッドとオブジェクト操作について学びます。これらはReactでデータを扱う際に非常に重要な概念です。

## 配列メソッド

JavaScriptには、配列を効率的に操作するための便利なメソッドが多数あります。その中でも特に重要な`map`、`filter`、`reduce`について詳しく見ていきましょう。

### map メソッド

`map`メソッドは、配列の各要素に対して関数を実行し、その結果から新しい配列を作成します。

**基本構文**:
```javascript
const 新しい配列 = 元の配列.map((要素, インデックス, 配列) => {
  // 各要素に対する処理
  return 変換後の要素;
});
```

**例**:
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

**TypeScriptでの型指定**:
```typescript
const numbers: number[] = [1, 2, 3, 4, 5];
const doubled: number[] = numbers.map((num: number): number => num * 2);
```

**Reactでの使用例**:
```tsx
const UserList = () => {
  const users = [
    { id: 1, name: "田中" },
    { id: 2, name: "鈴木" },
    { id: 3, name: "佐藤" }
  ];

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

### filter メソッド

`filter`メソッドは、条件に一致する要素だけを抽出して新しい配列を作成します。

**基本構文**:
```javascript
const 新しい配列 = 元の配列.filter((要素, インデックス, 配列) => {
  // 条件式（trueなら要素を残す、falseなら除外）
  return 条件式;
});
```

**例**:
```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
```

**TypeScriptでの型指定**:
```typescript
const numbers: number[] = [1, 2, 3, 4, 5];
const evenNumbers: number[] = numbers.filter((num: number): boolean => num % 2 === 0);
```

**Reactでの使用例**:
```tsx
const AdultUserList = () => {
  const users = [
    { id: 1, name: "田中", age: 25 },
    { id: 2, name: "鈴木", age: 17 },
    { id: 3, name: "佐藤", age: 30 }
  ];

  const adults = users.filter(user => user.age >= 18);

  return (
    <div>
      <h2>成人ユーザー</h2>
      <ul>
        {adults.map(user => (
          <li key={user.id}>{user.name} ({user.age}歳)</li>
        ))}
      </ul>
    </div>
  );
};
```

### reduce メソッド

`reduce`メソッドは、配列の要素を順番に処理して、単一の値にまとめます。

**基本構文**:
```javascript
const 結果 = 配列.reduce((アキュムレータ, 現在の要素, インデックス, 配列) => {
  // アキュムレータと現在の要素を使った処理
  return 次のアキュムレータ;
}, 初期値);
```

**例**:
```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15 (= 1 + 2 + 3 + 4 + 5)
```

**TypeScriptでの型指定**:
```typescript
const numbers: number[] = [1, 2, 3, 4, 5];
const sum: number = numbers.reduce((total: number, num: number): number => total + num, 0);
```

**より複雑な例**:
```javascript
// オブジェクトの配列から特定のプロパティの合計を計算
const cart = [
  { id: 1, name: "リンゴ", price: 100, quantity: 2 },
  { id: 2, name: "バナナ", price: 80, quantity: 3 },
  { id: 3, name: "オレンジ", price: 120, quantity: 1 }
];

const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
console.log(totalPrice); // 460 (= 100*2 + 80*3 + 120*1)
```

## スプレッド演算子

スプレッド演算子（`...`）は、配列やオブジェクトの要素を展開するために使用します。

### 配列での使用

**配列の結合**:
```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combined = [...array1, ...array2];
console.log(combined); // [1, 2, 3, 4, 5, 6]
```

**配列のコピー**:
```javascript
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]
```

**関数の引数に配列を展開**:
```javascript
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6 (= 1 + 2 + 3)
```

### オブジェクトでの使用

**オブジェクトのプロパティをマージ**:
```javascript
const person = { name: "田中", age: 30 };
const details = { job: "エンジニア", country: "日本" };
const completeProfile = { ...person, ...details };
console.log(completeProfile); 
// { name: "田中", age: 30, job: "エンジニア", country: "日本" }
```

**オブジェクトのコピーと特定のプロパティの上書き**:
```javascript
const user = { id: 1, name: "鈴木", age: 25 };
const updatedUser = { ...user, age: 26 };
console.log(updatedUser); // { id: 1, name: "鈴木", age: 26 }
```

### Reactでの使用例

**コンポーネントのpropsの展開**:
```tsx
const UserCard = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>年齢: {props.age}</p>
    </div>
  );
};

const EnhancedUserCard = (props) => {
  const enhancedProps = {
    ...props,
    border: "1px solid blue",
    padding: "10px"
  };
  
  return <UserCard {...enhancedProps} />;
};
```

**状態の更新**:
```tsx
import React, { useState } from 'react';

const UserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: 0
  });
  
  const handleNameChange = (e) => {
    setUser({
      ...user,  // 既存のプロパティを維持
      name: e.target.value  // name プロパティだけ更新
    });
  };
  
  return (
    <form>
      <input
        type="text"
        value={user.name}
        onChange={handleNameChange}
      />
      {/* 他のフォーム要素 */}
    </form>
  );
};
```

## 分割代入

分割代入（Destructuring）は、配列やオブジェクトから値を取り出して個別の変数に代入する方法です。

### 配列の分割代入

**基本的な使い方**:
```javascript
const colors = ["赤", "緑", "青"];
const [red, green, blue] = colors;
console.log(red);   // "赤"
console.log(green); // "緑"
console.log(blue);  // "青"
```

**デフォルト値の設定**:
```javascript
const [first = "デフォルト", second] = ["実際の値"];
console.log(first);  // "実際の値"
console.log(second); // undefined
```

**特定の要素のスキップ**:
```javascript
const numbers = [1, 2, 3, 4, 5];
const [first, , third, ...rest] = numbers;
console.log(first); // 1
console.log(third); // 3
console.log(rest);  // [4, 5]
```

### オブジェクトの分割代入

**基本的な使い方**:
```javascript
const person = { name: "山田", age: 30, job: "デザイナー" };
const { name, age } = person;
console.log(name); // "山田"
console.log(age);  // 30
```

**変数名の変更**:
```javascript
const person = { name: "佐藤", age: 25 };
const { name: fullName, age: yearsOld } = person;
console.log(fullName); // "佐藤"
console.log(yearsOld); // 25
```

**デフォルト値の設定**:
```javascript
const person = { name: "鈴木" };
const { name, age = 20 } = person;
console.log(name); // "鈴木"
console.log(age);  // 20
```

**ネストしたオブジェクトの分割代入**:
```javascript
const user = {
  id: 1,
  name: "田中",
  address: {
    city: "東京",
    zipcode: "100-0001"
  }
};

const { name, address: { city } } = user;
console.log(name); // "田中"
console.log(city); // "東京"
```

### Reactでの使用例

**propsの分割代入**:
```tsx
// 分割代入なし
const Greeting = (props) => {
  return <h1>こんにちは、{props.name}さん！</h1>;
};

// 分割代入あり
const GreetingWithDestructuring = ({ name, age }) => {
  return (
    <div>
      <h1>こんにちは、{name}さん！</h1>
      <p>あなたは{age}歳です。</p>
    </div>
  );
};
```

**Hooksの分割代入**:
```tsx
import React, { useState, useEffect } from 'react';

const Counter = () => {
  // useState からの分割代入
  const [count, setCount] = useState(0);
  
  // useEffect の使用
  useEffect(() => {
    document.title = `カウント: ${count}`;
  }, [count]);
  
  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        増やす
      </button>
    </div>
  );
};
```

## まとめ

JavaScriptとTypeScriptの以下の機能について学びました：

1. **配列メソッド**
   - `map`: 配列の各要素を変換して新しい配列を作成
   - `filter`: 条件に合う要素だけを抽出して新しい配列を作成
   - `reduce`: 配列の要素を1つの値にまとめる

2. **スプレッド演算子 (`...`)**
   - 配列やオブジェクトの要素を展開
   - 新しい配列やオブジェクトを作成する際に便利

3. **分割代入**
   - 配列やオブジェクトから値を取り出して個別の変数に代入
   - コードの可読性向上に役立つ

これらの機能は、Reactでのコンポーネント開発、特にデータの処理や状態管理において非常に重要な役割を果たします。
