# 関数の基本とアロー関数 練習問題

この練習問題では、JavaScriptの関数と、特にアロー関数の理解を深めましょう。

## 問題1：従来の関数とアロー関数の変換
以下の通常の関数をアロー関数に書き換えてください。

```javascript
// 問題1-1：この関数をアロー関数に書き換えてください
function multiply(a, b) {
  return a * b;
}

// ここにアロー関数を記述
const multiplyArrow = (a, b) => {
  return a * b;
};

// 問題1-2：この関数をアロー関数に書き換えてください
function greet(name) {
  return "こんにちは、" + name + "さん！";
}

// ここにアロー関数を記述
const greetArrow = (name) => {
  return "こんにちは" + name + "さん!";
};
```

## 問題2：アロー関数の短縮形
以下のアロー関数を、可能な限り短縮形に書き換えてください。

```javascript
// 問題2-1：この関数を短縮形に書き換えてください
const square = (num) => {
  return num * num;
};

// ここに短縮形を記述
const squareShort = (num) => num * num;

// 問題2-2：この関数を短縮形に書き換えてください
const isEven = (num) => {
  return num % 2 === 0;
};

// ここに短縮形を記述
const isEvenShort = (num) => num % 2 === 0;
```

## 問題3：オブジェクトを返すアロー関数
以下の関数をアロー関数に書き換えてください。この関数はオブジェクトを返します。

```javascript
// 問題3：この関数をアロー関数に書き換えてください
function createUser(name, age) {
  return {
    name: name,
    age: age,
    isAdult: age >= 18
  };
}

// ここにアロー関数を記述
const createUserArrow = (name, age) => ({
  name: name,
  age: age,
  isAdult: age >= 18
});
```

## 問題4：TypeScriptでの関数
以下の関数にTypeScriptの型を追加してください。

```typescript
// 問題4-1：この関数に適切な型を追加してください
function divide(a, b) {
  if (b === 0) {
    return "ゼロで割ることはできません";
  }
  return a / b;
}

// ここに型付き関数を記述
function divideTyped(a:number, b:number) :number {
  if(b === 0){
    return "ゼロで割ることはできません";
  }
  return a / b;
}

// 問題4-2：このアロー関数に適切な型を追加してください
const concatenate = (str1, str2) => str1 + str2;

const concatenate = (str1:string, str2:string): string => str1 + str2;

// ここに型付きアロー関数を記述
const concatenateTyped = (str1:string, str2:string): string => str1 + str2;
```

## 問題5：Reactコンポーネントでの関数
以下のReactコンポーネントをアロー関数を使って書き換えてください。

```tsx
// 問題5：このReactコンポーネントをアロー関数を使って書き換えてください
function UserInfo(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>年齢: {props.age}</p>
      <p>{props.age >= 18 ? "成人です" : "未成年です"}</p>
    </div>
  );
}

// ここにアロー関数コンポーネントを記述
const UserInfoArrow = (props) => (
  <div>
  <h2>{props.name}</h2>
  <p>年齢: {props.age}</p>
  <p>{props.age >= 18 ? "成人です" : "未成年です"}<p>
  </div>
);
```

## 回答の提出方法
上記の問題に対する回答をこのファイルに直接記入してください。
