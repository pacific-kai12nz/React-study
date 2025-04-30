# 開発環境のセットアップ

Reactアプリケーションを開発するには、いくつかのツールをインストールし、環境を整える必要があります。このレッスンでは、必要なツールとその設定方法について学びます。

## Node.jsとnpm

### Node.jsとは

Node.jsは、JavaScriptをブラウザの外（サーバーやデスクトップなど）で実行するための環境です。簡単に言うと、「JavaScriptを使ってサーバーサイドのプログラムが書ける」ようにするツールです。


### npmとは

npm（Node Package Manager）は、JavaScriptのパッケージ管理ツールです。これを使うと、他の開発者が作ったJavaScriptのライブラリやツールを簡単にインストールして使うことができます。

Reactもnpmを使ってインストールして使います。

### インストール方法

1. [Node.jsの公式サイト](https://nodejs.org/)から、推奨版（LTS：Long Term Support）をダウンロードしてインストールします。
2. npmはNode.jsと一緒に自動的にインストールされます。

### 確認方法

インストールが完了したら、ターミナル（コマンドプロンプト）で以下のコマンドを実行して、正しくインストールされているか確認します：

```bash
node -v
npm -v
```

それぞれのバージョンが表示されれば成功です。

## TypeScriptの設定

### TypeScriptとは

TypeScriptは、JavaScriptを拡張したプログラミング言語です。JavaScriptに「型」を追加することで、プログラムの安全性を高め、バグを減らすことができます。

### なぜTypeScriptを使うのか

- エラーを早期に発見できる
- コードの読みやすさと保守性が向上する
- IDEの補完機能が強化され、開発効率が上がる

### TypeScriptのインストール

npmを使ってTypeScriptをグローバルにインストールします：

```bash
npm install -g typescript
```

### 確認方法

インストールが完了したら、以下のコマンドでバージョンを確認できます：

```bash
tsc --version
```

## Create React App

### Create React Appとは

Create React App（CRA）は、Reactアプリケーションを簡単に作成するためのツールです。

このツールを使うと、Reactアプリケーションの開発に必要な環境（Webpack、Babel、ESLintなど）を自動的に設定してくれるので、初心者でも簡単にReactの開発を始められます。

### Create React Appを使ったプロジェクトの作成

TypeScriptを使ったReactプロジェクトを作成するには、以下のコマンドを実行します：

```bash
npx create-react-app my-app --template typescript
```

または、ディレクトリが既に存在する場合は、その中にReactアプリを作成することもできます：

```bash
npx create-react-app . --template typescript
```

`my-app`の部分は任意のプロジェクト名に変更できます。`--template typescript`オプションによって、TypeScriptを使ったプロジェクトが作成されます。

### プロジェクトの実行

作成したプロジェクトのディレクトリに移動して、開発サーバーを起動します：

```bash
cd my-app
npm start
```

これで、ブラウザが自動的に開き、Reactアプリケーションが表示されます。通常は`http://localhost:3000`というURLで確認できます。

## よく使うnpmコマンド

- `npm install` - package.jsonにリストされた依存関係をインストール
- `npm start` - 開発サーバーを起動
- `npm run build` - 本番用のビルドを作成
- `npm test` - テストを実行
- `npm run eject` - Create React Appの設定を取り出す（注：一度実行すると元に戻せません）

## プロジェクト構造の理解

Create React Appで作成したプロジェクトのフォルダ構造は大体次のようになっています：

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.tsx
    index.tsx
    logo.svg
    App.css
    index.css
```

- `node_modules/` - プロジェクトの依存関係（ライブラリ）が格納されるフォルダ
- `package.json` - プロジェクトの依存関係や設定が記述されたファイル
- `public/` - 静的ファイルが格納されるフォルダ
- `src/` - ソースコードが格納されるフォルダ（主に編集するのはここ）

Reactアプリケーションを開発する際は、主に`src/`フォルダ内のファイルを編集していきます。
