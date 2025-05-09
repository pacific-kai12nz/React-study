# 5. リスト表示とキー

## 5.1 mapを使ったリスト表示

Reactでは、配列データを元にしてリスト要素を表示することが非常によくあるパターンです。JavaScriptのmap関数を使うことで、配列の各要素をReactの要素（JSX）に変換できます。

### map関数の基本

map関数は配列の各要素に対して関数を適用し、新しい配列を返します。

```javascript
// 基本的なmap関数の使い方
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### Reactでのmap関数の利用

Reactでは、map関数を使って配列データからJSX要素のリストを生成します。

```tsx
const fruits = ['りんご', 'バナナ', 'みかん'];

// fruitsをリスト表示するコンポーネント
function FruitList() {
  return (
    <ul>
      {fruits.map(fruit => <li>{fruit}</li>)}
    </ul>
  );
}
```

上記のコードは、次のようなHTMLを生成します：

```html
<ul>
  <li>りんご</li>
  <li>バナナ</li>
  <li>みかん</li>
</ul>
```

## 5.2 keyの重要性

ここで注意が必要なのは、Reactのリスト要素には一意の「key」プロパティを指定する必要があります。keyは、Reactが各要素を識別するために使用されます。

### なぜkeyが必要か？

Reactは仮想DOMを使って効率的にUIを更新します。リスト内の要素が変更された場合（例：要素の追加、削除、順序変更）、Reactはkeyを使って変更された要素だけを特定し、効率的に再レンダリングします。

keyがないと、Reactはリスト全体を再レンダリングする必要があり、パフォーマンスが低下します。また、状態を持つコンポーネントでは、keyがないとコンポーネントの状態が予期せぬ動作をすることがあります。

### 良いkeyの選び方

良いkeyは以下の条件を満たすものです：

1. リスト内で一意であること
2. 安定していること（再レンダリング間で変わらないこと）

通常、データベースからのIDや、安定した一意の値を使用します。

```tsx
const tasks = [
  { id: 1, text: '買い物に行く' },
  { id: 2, text: 'レポートを書く' },
  { id: 3, text: '部屋を掃除する' }
];

function TaskList() {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.text}</li>
      ))}
    </ul>
  );
}
```

### インデックスをkeyとして使う場合の注意

配列のインデックスをkeyとして使うことも可能ですが、リストの順序が変わる可能性がある場合は避けるべきです。

```tsx
// 非推奨のパターン（順序が変わる可能性がある場合）
{fruits.map((fruit, index) => (
  <li key={index}>{fruit}</li>
))}
```

インデックスをkeyとして使うべき場合：
- リストが静的で変更されない場合
- リストに一意のIDがない場合
- リストが並べ替えられたり、フィルターされたりしない場合

## 5.3 TypeScriptでのリスト処理

TypeScriptを使う場合、配列の型を定義することで型安全性を高めることができます。

```tsx
// タスクの型定義
type Task = {
  id: number;
  text: string;
  completed: boolean;
};

// タスク配列の定義
const tasks: Task[] = [
  { id: 1, text: '買い物に行く', completed: false },
  { id: 2, text: 'レポートを書く', completed: true },
  { id: 3, text: '部屋を掃除する', completed: false }
];

function TaskList() {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
        </li>
      ))}
    </ul>
  );
}
```

## 5.4 実際のコンポーネントへの応用

実際のアプリケーションでは、リスト項目は単なる`<li>`要素ではなく、カスタムコンポーネントであることが多いです。

```tsx
type Task = {
  id: number;
  text: string;
  completed: boolean;
};

// 個々のタスク項目コンポーネント
const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      {task.text}
    </li>
  );
};

// タスクリストコンポーネント
const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
```

このパターンは、リストの各項目に複雑な機能や独自のスタイルが必要な場合に特に役立ちます。

## まとめ

- `map`関数を使って配列データからJSX要素のリストを生成します
- リスト要素には必ず一意の`key`プロパティを指定します
- keyには安定した一意の値（通常はID）を使用します
- TypeScriptで型定義することで型安全性が高まります
- 複雑なリスト項目は独自のコンポーネントとして分離すると良いでしょう

実際のToDoリストアプリでは、これらの知識を活用して効率的なリスト表示を実現しています。
