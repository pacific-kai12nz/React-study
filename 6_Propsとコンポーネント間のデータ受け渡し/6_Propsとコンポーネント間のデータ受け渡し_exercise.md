# 練習問題: Propsとコンポーネント間のデータ受け渡し

## 問題1: TypeScript で Props の型定義を作成する

次のコンポーネントに適切な Props の型定義を追加してください。

```tsx
// ここにコードを記述してください
import React from 'react';

// ここに ProductCardProps 型を定義してください

const ProductCard = ({ name, price, inStock }) => {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>${price}</p>
      <p>{inStock ? '在庫あり' : '在庫なし'}</p>
    </div>
  );
};

export default ProductCard;
```

## 問題2: デフォルト値とオプショナルプロップスの設定

次のコンポーネントに適切なデフォルト値とオプショナルプロップスを設定してください。
- `avatarUrl`はオプショナルで、デフォルト値は'default-avatar.png'
- `showDetails`はオプショナルで、デフォルト値はfalse

```tsx
// ここにコードを記述してください
import React from 'react';

type UserProfileProps = {
  username: string;
  avatarUrl: string;
  showDetails: boolean;
};

const UserProfile = ({ username, avatarUrl, showDetails }: UserProfileProps) => {
  return (
    <div className="user-profile">
      <img src={avatarUrl} alt={username} />
      <h2>{username}</h2>
      {showDetails && (
        <div className="details">
          <p>ユーザー詳細情報</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
```

## 問題3: Children Prop の利用

次のコードを参考に、`Panel`コンポーネントを作成してください。
このコンポーネントは、タイトルと子要素を受け取ります。

要件:
- `title` プロパティと `children` プロパティを受け取ります
- パネルはborderを持ち、タイトルは上部に表示され、その下に子要素を表示します

```tsx
// ここにコードを記述してください
import React from 'react';

// ここに PanelProps 型を定義してください

const Panel = () => {
  // ここにコードを記述してください
};

export default Panel;
```

レッスンの内容を参考に、App.tsxでの使用例も示します：

```tsx
// 使用例（これは実装の参考です）
import React from 'react';
import Panel from './components/Panel';

function App() {
  return (
    <div className="App">
      <Panel title="重要なお知らせ">
        <p>これはパネルの中身です。</p>
        <button>詳細を見る</button>
      </Panel>
    </div>
  );
}
```

## 問題4: Props を用いた実践的なコンポーネント作成

あなたの learning-app プロジェクト内に、新しい実践的なコンポーネントを作成しましょう。

### タスク: コンポーネント間のデータ受け渡しを実装する

learning-app プロジェクトに次のコンポーネントを作成してください：

1. `src/components/user.tsx` に User コンポーネントを作成
2. `src/components/user-list.tsx` に UserList コンポーネントを作成

要件:
- `User` コンポーネントは以下のプロップスを受け取ります：
  - `id`: number (必須)
  - `name`: string (必須)
  - `email`: string (必須)
  - `role`: string (オプショナル、デフォルト値は 'User')

- `UserList` コンポーネントは:
  - `users` 配列を prop として受け取ります（User の型と一致するオブジェクトの配列）
  - 各ユーザーに対して `User` コンポーネントをレンダリングします

- App.tsx を更新して、`UserList` コンポーネントを表示します

以下は参考のユーザーデータです:

```tsx
const usersData = [
  { id: 1, name: '山田太郎', email: 'taro@example.com', role: 'Admin' },
  { id: 2, name: '佐藤花子', email: 'hanako@example.com' },
  { id: 3, name: '鈴木一郎', email: 'ichiro@example.com', role: 'Editor' }
];
```

## 提出

すべての問題が完了したら、learning_path.md を更新して、このセクションに対応するチェックボックスにチェックを入れてください。
