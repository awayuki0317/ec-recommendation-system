export type Product = {
    id: number;
    category_id: number;
    name: string;
    description: string | null;
    price: string;
    stock: number;
    image_url: string | null;
    is_active: boolean;
  };
  
  export async function getProducts(): Promise<Product[]> {
    const response = await fetch("http://localhost:8000/products");
  
    if (!response.ok) {
      throw new Error("商品の取得に失敗しました");
    }
  
    return response.json();
  }

  export async function getProduct(id: number): Promise<Product> {
    const response = await fetch(
      `http://localhost:8000/products/${id}`
    );
  
    if (!response.ok) {
      throw new Error("商品の取得に失敗しました");
    }
  
    return response.json();
  }