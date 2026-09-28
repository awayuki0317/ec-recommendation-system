import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getProduct,
  type Product,
} from "../api/products";


function ProductDetail() {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const id = Number(productId);

      if (!Number.isInteger(id) || id <= 0) {
        setError("商品IDが正しくありません");
        setLoading(false);
        return;
      }

      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("商品が見つかりませんでした");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error || !product) {
    return (
      <main className="container">
        <p>{error ?? "商品が見つかりませんでした"}</p>
        <Link to="/">商品一覧へ戻る</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <Link to="/">← 商品一覧へ戻る</Link>

      <article className="product-detail">
        {product.image_url && (
          <img
            className="product-image"
            src={product.image_url}
            alt={product.name}
          />
        )}

        <h1>{product.name}</h1>

        <p className="price">
          ¥{Number(product.price).toLocaleString()}
        </p>

        {product.description && (
          <p>{product.description}</p>
        )}

        <p>在庫：{product.stock}</p>

        <button type="button">
          カートに入れる
        </button>
      </article>
    </main>
  );
}

export default ProductDetail;