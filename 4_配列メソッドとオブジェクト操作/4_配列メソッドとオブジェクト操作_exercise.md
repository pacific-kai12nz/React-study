# 配列メソッドとオブジェクト操作 練習問題

この練習問題では、JavaScript/TypeScriptの配列メソッドとオブジェクト操作の理解を深めましょう。

## 問題1：map メソッド
以下の配列を使って、mapメソッドで各要素を2倍にした新しい配列を作成してください。

```javascript
const numbers = [3, 7, 11, 15, 19];

// ここにmapメソッドを使ったコードを記述
const doubledNumbers = numbers.map(num => num * 2);
```

## 問題2：filter メソッド
以下の配列から、偶数だけを抽出した新しい配列を作成してください。

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ここにfilterメソッドを使ったコードを記述
const evenNumbers = number.filter(num => num % 2 === 0);
```

## 問題3：配列メソッドの組み合わせ
以下のユーザー配列を使って：

1. 18歳以上のユーザーだけを抽出し
2. その中から名前だけを取り出した配列を作成してください

```javascript
const users = [
  { id: 1, name: "山田", age: 22 },
  { id: 2, name: "佐藤", age: 17 },
  { id: 3, name: "鈴木", age: 31 },
  { id: 4, name: "田中", age: 15 },
  { id: 5, name: "伊藤", age: 25 }
];

// ここにfilterとmapの組み合わせを使ったコードを記述
const adultNames = users
.filter(user => user.age >= 18)
.map(user => user.name):

console.log(adlutNames);
```

## 問題4：reduce メソッド
以下の配列の数値の合計を計算するために、reduceメソッドを使ってください。

```javascript
const numbers = [10, 20, 30, 40, 50];

// ここにreduceメソッドを使ったコードを記述
const sum = number.reduce(num => num + 2);
```

## 問題5：スプレッド演算子（配列）
以下の2つの配列を結合して、新しい配列を作成してください。

```javascript
const fruits = ["りんご", "バナナ", "オレンジ"];
const vegetables = ["にんじん", "じゃがいも", "たまねぎ"];

// ここにスプレッド演算子を使ったコードを記述
const foodItems = [...ftuits, ...vegetables];
```

## 問題6：スプレッド演算子（オブジェクト）
以下の2つのオブジェクトを結合して、新しいオブジェクトを作成してください。

```javascript
const person = { name: "太郎", age: 28 };
const job = { title: "エンジニア", company: "テック株式会社" };

// ここにスプレッド演算子を使ったコードを記述
const personWithJob = [...person, ...job];
```

## 問題7：分割代入（配列）
以下の配列から、最初の2つの要素をそれぞれ別々の変数に代入し、残りの要素をまとめて別の変数に代入してください。

```javascript
const rainbow = ["赤", "オレンジ", "黄", "緑", "青", "藍", "紫"];

// ここに分割代入を使ったコードを記述
// 変数名は first, second, restColors としてください
const [first, second, ...restColors] = rainbow;
console.log(first); 
console.log(second);  
console.log(restColors); 
```

## 問題8：分割代入（オブジェクト）
以下のオブジェクトから、nameとageのプロパティを分割代入で取り出してください。

```javascript
const student = { 
  id: "S001", 
  name: "花子", 
  age: 19, 
  grade: "A", 
  subject: "数学" 
};

// ここに分割代入を使ったコードを記述
const {name,age} = student;
console.log(name);
console.log(age);
```

## 問題9：オブジェクトの分割代入と名前変更
以下のオブジェクトから、companyプロパティをworkplaceという変数名で、yearプロパティをexperienceという変数名で取り出してください。

```javascript
const employee = {
  name: "山本",
  company: "ABCコーポレーション",
  department: "マーケティング",
  year: 5
};

// ここに分割代入と名前変更を使ったコードを記述
const {company, workplace} = employee;
console.log(company);
console.log(workplace);
```

## 問題10：実践的な例（React風）
以下のReactコンポーネント風のコードで、分割代入を使ってpropsの各プロパティにアクセスするように書き換えてください。

```tsx
const UserProfile = (props) => {
  return (
    <div>
      <h2>{props.name}のプロフィール</h2>
      <p>年齢: {props.age}</p>
      <p>職業: {props.occupation}</p>
      <p>趣味: {props.hobbies.join(", ")}</p>
    </div>
  );
};

// ここに分割代入を使った書き換えコードを記述
const UserProfileWithDestructuring = ({name, age, occupation, hobbies}) => {
  return (
    <div>
    <h2>{name}のプロフィール</h2>
      <p>年齢: {age}</p>
      <p>職業: {occupation}</p>
      <p>趣味: {hobbies.join(", ")}</p>
    </div>
  )
}
```

## 回答の提出方法
上記の問題に対する回答をこのファイルに直接記入してください。
