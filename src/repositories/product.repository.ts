import ApiService from "../api/apiService";
import { IProduct } from "../types/types";

export default class ProductRepository {
  apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async getProduct(): Promise<IProduct[]> {
    const data = await this.apiService.getAll("products");
    return data;
  }
  async getPaginatedProducts(page: number, limit: number): Promise<IProduct[]> {
    const data = await this.apiService.getAll(
      `products?_page=${page}&_limit=${limit}`
    );
    return data;
  }async getProductByName(name: string): Promise<IProduct[]>{
    const data = await this.apiService.getAll(`products?_name=${name}`);
    return data
  }
  async getAllProducts(): Promise<any> {
    const result: any = await this.apiService.getAll("products");
    return result.data;
  }
  async getProductsByCategory(category: string): Promise<IProduct[]> {
    const data = await this.apiService.getAll(`products?category=${category}`);
    return data;
  }

  async getProductsById(id: number): Promise<any> {
    const result: Response = await this.apiService.GetById("products", id);
    return result;
  }
  async onMinusStock(id: number, data: any): Promise<any> {
    const result: Response = await this.apiService.Patch(
      "products",
      id,
      "stock",
      data
    );
    return result;
  }
}
