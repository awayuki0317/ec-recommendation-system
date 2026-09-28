import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getProducts,
  type Product,
} from "../api/products";


function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("商品の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="container">
      <h1>商品一覧</h1>

      <div className="product-grid">
        {products.map((product) => (
          <article
            className="product-card"
            key={product.id}
          >
            {product.image_url && (
              <img
                className="product-image"
                src={product.image_url}
                alt={product.name}
              />
            )}

            <h2>{product.name}</h2>

            {product.description && (
              <p>{product.description}</p>
            )}

            <p className="price">
              ¥{Number(product.price).toLocaleString()}
            </p>

            <p>在庫：{product.stock}</p>

            <Link to={`/products/${product.id}`}>
              商品詳細を見る
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

export default ProductList;