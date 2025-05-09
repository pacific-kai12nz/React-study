# 1. Reactの基本概念 - 練習問題

この練習問題では、Reactアプリの基本的な編集方法とJSXの基本を学びます。

## 問題1: Reactアプリの編集

`learning-app`プロジェクトの`src/App.tsx`ファイルを編集して、以下の変更を行ってください：

1. 「Learn React」というテキストを「ToDoリストアプリを作ろう！」に変更する
2. 「Edit src/App.tsx and save to reload.」という文を「これからReactでToDoリストアプリを作成します」に変更する
3. （オプション）画面の背景色を変更する（ヒント：`src/App.css`を編集します）

## 問題2: Reactの基本概念に関する質問

以下の質問に答えてください：

1. Reactの主要な特徴を3つ挙げてください。
2. 仮想DOM（Virtual DOM）とは何か、そしてなぜそれが重要なのかを説明してください。
3. create-react-appで生成されるプロジェクトの主要なフォルダ（public, src）の役割はそれぞれ何ですか？

・コンポーネントベース：UIを再利用可能な部品（コンポーネント）で構築できる。
・宣言的UI：状態に応じてUIを宣言的に定義でき、状態が変われば自動でUIが更新される。
・仮想DOM（Virtual DOM）：高速なUIの更新を可能にする仕組み。



## 問題3: JSXの基本

次のHTMLをJSXに変換してください。JSXでは、classではなくclassNameを使うことを忘れないでください：

```html
<div class="container">
  <h1 class="title">ToDoリスト</h1>
  <p>タスクを管理しましょう</p>
  <button class="add-button">新しいタスク</button>
</div>
```
<div className="container">
  <h1 className="title">ToDoリスト</h1>
  <p>タスクを管理しましょう</p>
  <button className="add-button">新しいタスク</button>
</div>

## ヒント

- JSXでは、HTMLの`class`属性は`className`に変更する必要があります
- 変数や式をJSXに埋め込むには、波括弧`{}`で囲みます
- `App.tsx`を編集後、保存すると自動的にブラウザが更新されます
