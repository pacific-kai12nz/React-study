# JSXとコンポーネント 練習問題

この練習問題では、JSXの基本とReactコンポーネントの作成について実践的に学びます。

## 問題1：JSXの基本

以下のHTMLコードをJSXに変換してください。JSXの基本ルールに従って変換してください。

```html
<div class="container">
  <h1>ユーザープロフィール</h1>
  <div class="profile-card">
    <img src="avatar.jpg" alt="ユーザーアバター">
    <div class="profile-info">
      <h2>山田太郎</h2>
      <p>職業: エンジニア</p>
      <p>年齢: 28歳</p>
    </div>
  </div>
</div>
```

JSXの書き方：
```jsx
// ここにJSXコードを記述してください
const userProfile = (
   <div className="container">
   <h1>ユーザープロフィール</h1>
   <div className="profile-info">
   <h2>山田太郎</h2>
   <p>職業: エンジニア</p>
   <p>年齢: 28歳</p>
   </div>
   </div>
   </div>
);
```

## 問題2：条件付きレンダリング

以下の条件に基づいて、ユーザーの年齢に応じて異なるメッセージを表示するJSXを作成してください。

- 18歳未満：「未成年です」
- 18歳以上65歳未満：「成人です」
- 65歳以上：「シニアです」

```jsx
// age という変数があると仮定して、三項演算子を使って条件分岐するJSXを記述してください
const age = 28;

const ageMessage = (
   <div>
   {age >= 18 ? <p>成人</p> : <p>未成年</p>}
   </div>
);
```

## 問題3：シンプルなコンポーネントの作成

以下の要件を満たす「UserGreeting」という名前のコンポーネントを作成してください。

- ユーザー名（name）と時間帯（timeOfDay）をpropsとして受け取る
- 時間帯に応じて異なる挨拶メッセージを表示する
  - 「morning」：「おはようございます、{name}さん！」
  - 「afternoon」：「こんにちは、{name}さん！」
  - 「evening」：「こんばんは、{name}さん！」
  - それ以外：「ようこそ、{name}さん！」

```tsx
// ここにUserGreetingコンポーネントを記述してください
// TypeScriptの型定義も含めてください
const userGreetingProps = {
   name: string;
   timeOfDay: string; 
};
const UserGreeting: React.FC<UserGreetingProps> = ({name, timeOfDay}) => {
   let greeting: string;

   switch (timeOfDay) {
      case 'morning':
         greeting = 'おはようございます';
         break;
         case 'afternoon':
            greeting = 'こんにちは';
            break;
            case 'evening':
               greeting = 'こんばんは';
               break;
               default:
                  greeting = 'ようこそ';
   }

   retun (
      <div>
      <p>{greeting},{name}さん！</p>
      </div>
   );
};
```

## 問題4：コンポーネントの組み合わせ

以下の要件を満たすコンポーネントを作成してください。

1. `Avatar` コンポーネント
   - 画像のURL（`src`）と代替テキスト（`alt`）をpropsとして受け取る
   - 丸い形の画像を表示する（スタイリングは自由）

2. `UserInfo` コンポーネント
   - ユーザー名（`name`）と自己紹介（`bio`）をpropsとして受け取る
   - 名前をh2見出しで、自己紹介をpタグで表示する

3. `ProfileCard` コンポーネント
   - `Avatar`と`UserInfo`コンポーネントを組み合わせて使用する
   - ユーザー情報（`user`）をpropsとして受け取る（`user`は`avatarSrc`, `avatarAlt`, `name`, `bio`プロパティを持つ）

```tsx
// ここに各コンポーネントを記述してください
type AvatarProps = {
   src: string;
   alt: string;
}

const Avatar: React.FC<AvatorProps> = ({src, alt}) => {
   const style = {
      width: '100px',
      height: '100ox',
      borderRadius: '50%',
      objectFit: 'cover' as const
   };

   return <img src={src} alt={alt} style={style} />;
};

type UserInfoProps = {
   name: string;
   bio: string;
};

const UserInfo: React.FC<UserInfoProps> = ({name, bio}) => {
   return (
      <div>
      <h2>{name}</h2>
      <p>{bio}</p>
      </div>
   );
};

type ProfileCardProps = {
   user: {
      avatarSrc: string;
      avatarAlt: string;
      name: string;
      bio: string;
   };
};

const ProfileCard: React.FC<ProfileCardProps> = ({user}) => {
   return (
      <div className = "profile-card">
      <Avatar src={user.avatarSrc} alt={user.avatarAlt} />
      <UserInfo name={user.name} bio={user.bio} />
      </div>
   );
};
```

## 問題5：実践的な課題

learning-appプロジェクトに、シンプルな「Card」コンポーネントを作成してください。

### 要件：
1. `src/components` ディレクトリを作成し、その中に `Card.tsx` ファイルを作成する
2. Cardコンポーネントは以下のpropsを受け取る：
   - `title`: カードのタイトル（文字列）
   - `content`: カードの内容（文字列）
   - `borderColor`: カードの枠線の色（文字列、オプショナル）
3. スタイリング：
   - カードにはパディング、マージン、枠線、角丸を適用する
   - 枠線の色は `borderColor` propsで指定し、指定がない場合はデフォルト値を使用する
   - タイトルは太字で表示する

4. 実装後、`App.tsx` を修正して、作成したCardコンポーネントを使用し、複数のカードを表示する

### 手順：

1. `src/components` ディレクトリを作成
   ```bash
   mkdir -p src/components
   ```

2. `Card.tsx` ファイルを作成し、要件に合わせて実装

3. `App.tsx` を修正して、Cardコンポーネントを使用

4. アプリケーションを起動して結果を確認
   ```bash
   npm start
   ```

## 回答の提出方法
問題1から4については、このファイルに直接回答を記入してください。問題5については、作成したファイルの内容と、実行結果のスクリーンショットまたは説明を提出してください。
