# 8. リストとキー

## 8.1 Reactにおけるリスト表示の基本

Reactでは、データの配列をJSX要素のリストに変換して表示することが非常に一般的です。例えば、商品リスト、ユーザーリスト、ToDoリストなど、多くのWebアプリケーションではデータのコレクションを表示する必要があります。

### 配列のマッピング

JavaScriptの`map()`メソッドを使用して、データ配列をJSX要素のリストに変換するのが一般的なアプローチです。

```tsx
import React from 'react';

// 商品データの配列
const products = [
  { id: 1, name: 'パソコン', price: 89800 },
  { id: 2, name: 'スマートフォン', price: 54000 },
  { id: 3, name: 'ヘッドフォン', price: 12800 }
];

// 商品リストコンポーネント
const ProductList: React.FC = () => {
  return (
    <div>
      <h2>商品リスト</h2>
      <ul>
        {/* productsをmapメソッドでJSX要素に変換 */}
        {products.map(product => (
          <li key={product.id}>
            {product.name}: ¥{product.price.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
```

上記の例では、`products`配列を`map()`メソッドでループし、各アイテムを`<li>`要素に変換しています。

## 8.2 キー（Key）の重要性

### なぜキーが必要なのか

配列からJSX要素のリストを生成する際、Reactは各要素を一意に識別するための「キー」が必要です。キーは以下の理由で重要です：

1. **効率的な更新**: Reactがリストの更新を最適化するために必要
2. **要素の識別**: リストの要素が追加、削除、並べ替えられたときに、どの要素が変更されたかを特定
3. **状態の保持**: 正しいキーを設定することで、コンポーネントの状態が予期しない形でリセットされるのを防ぐ

キーが無い（または不適切な）場合、Reactは非効率的な更新を行ったり、予期しない動作を引き起こす可能性があります。

### 良いキーの選び方

良いキーの条件：

- **一意性**: 兄弟要素間で一意であること
- **安定性**: データが再レンダリングされても同じ要素に対して同じキーが使用されること

```tsx
// 良い例：一意のIDをキーに使用
{users.map(user => (
  <UserItem key={user.id} user={user} />
))}

// 避けるべき例：インデックスをキーに使用（項目の順序が変わる可能性がある場合）
{users.map((user, index) => (
  <UserItem key={index} user={user} />
))}
```

インデックスをキーとして使用することは、以下の場合に問題になる可能性があります：

- リストの順序が変わる可能性がある場合
- 要素が追加または削除される可能性がある場合
- リスト項目が状態を持つ場合

### 注意: キーはグローバルではなく兄弟間で一意であればよい

キーは全アプリケーションで一意である必要はなく、同じ兄弟要素のリスト内でのみ一意であれば十分です。異なるリストでは同じキー値を再利用できます。

```tsx
// 2つの異なるリストで同じキー値を使用しても問題ない
<ul>
  {fruits.map(fruit => <li key={fruit.id}>{fruit.name}</li>)}
</ul>

<ul>
  {vegetables.map(vegetable => <li key={vegetable.id}>{vegetable.name}</li>)}
</ul>
```

## 8.3 リスト内のフィルタリングと変換

実際のアプリケーションでは、リストをフィルタリングしたり、表示前にデータを変換したりすることがよくあります。

### フィルタリングの例

```tsx
const HighPriceProductList: React.FC = () => {
  // 高額商品のみをフィルタリング
  const expensiveProducts = products.filter(product => product.price > 50000);
  
  return (
    <div>
      <h2>高額商品リスト</h2>
      <ul>
        {expensiveProducts.map(product => (
          <li key={product.id}>
            {product.name}: ¥{product.price.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

### データ変換の例

```tsx
const DiscountedProductList: React.FC = () => {
  // 各商品に20%割引を適用
  const discountedProducts = products.map(product => ({
    ...product,
    discountedPrice: Math.round(product.price * 0.8)
  }));
  
  return (
    <div>
      <h2>セール商品リスト</h2>
      <ul>
        {discountedProducts.map(product => (
          <li key={product.id}>
            {product.name}: <s>¥{product.price.toLocaleString()}</s> → ¥{product.discountedPrice.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## 8.4 ネストしたリスト

リストはネストすることもできます。その場合、各リストレベルでキーを正しく設定することが重要です。

```tsx
const CategoryList: React.FC = () => {
  const categories = [
    { 
      id: 'electronics', 
      name: '電化製品', 
      products: [
        { id: 'e1', name: 'パソコン' },
        { id: 'e2', name: 'スマートフォン' }
      ]
    },
    { 
      id: 'clothing', 
      name: '衣類', 
      products: [
        { id: 'c1', name: 'Tシャツ' },
        { id: 'c2', name: 'ジーンズ' }
      ]
    }
  ];

  return (
    <div>
      <h1>商品カテゴリ</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <h2>{category.name}</h2>
            <ul>
              {category.products.map(product => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## 8.5 リストとコンポーネントの分割

リストが複雑になる場合、リスト項目を別のコンポーネントに分割することをお勧めします。

```tsx
// 商品項目コンポーネント
interface ProductItemProps {
  product: {
    id: number;
    name: string;
    price: number;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <li className="product-item">
      <h3>{product.name}</h3>
      <p>価格: ¥{product.price.toLocaleString()}</p>
      <button>カートに追加</button>
    </li>
  );
};

// 商品リストコンポーネント
const ProductList: React.FC = () => {
  return (
    <div>
      <h2>商品リスト</h2>
      <ul className="product-list">
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
```

この方法のメリット:
- コードがより整理され、読みやすくなる
- 各項目の複雑なロジックを分離できる
- 再利用性が向上する

### 注意: キーはコンポーネントに渡す属性（props）ではない

`key`は特別な属性で、Reactが内部で使用するために予約されています。コンポーネント内では`props.key`としてアクセスできません。コンポーネントに一意の識別子を渡したい場合は、別の属性名（例: `id`）を使用してください。

```tsx
// 正しい例
<ProductItem key={product.id} id={product.id} product={product} />

// ProductItemコンポーネント内では:
const ProductItem: React.FC<{ id: number, product: Product }> = ({ id, product }) => {
  // idは使用できるが、keyはpropsとして受け取れない
  console.log('製品ID:', id);
  
  return <li>{product.name}</li>;
};
```
