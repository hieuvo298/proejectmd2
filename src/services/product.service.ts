import  ProductRepository  from "../repositories/product.repository";
import { ICart, IProduct } from "../types/types";

class ProductService {
  productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAll(): Promise<IProduct[]> {
    const data = await this.productRepository.getProduct();
    return data;
  }
  public async updateStock(data:any){
    const result =  await Promise.all(data.map( async (item:any) => {
     return await this.productRepository.onMinusStock(item.id,item.stock - item.quantity)
    }))
    return result
   }
  async getProductsByCategory(category: string): Promise<IProduct[]> {
    const data = await this.productRepository.getProductsByCategory(category);
    return data;
  }
  async getPaginatedProducts(page: number, limit: number): Promise<IProduct[]> {
    const data = await this.productRepository.getPaginatedProducts(page, limit);
    return data;
  }

  async getDetail(id: number): Promise<IProduct | null> {
    const productDetail = await this.productRepository.getProductsById(id);
    return productDetail;
  }

  public async getProductsById(id: number): Promise<any> {
    let result = await this.productRepository.getProductsById(id);
    return result;
  }
public async onSearch (value:string ){
  const result = await this.productRepository.getAllProducts()
  const searchProducts = result.filter((item:IProduct) => item.productname.toLowerCase().includes(value))
  return searchProducts;
}

  public async onMinusStock(carts:ICart[]){
    const products = await this.productRepository.getAllProducts()
    let productsNeed = products.reduce((result: any[], item: any) => {
      carts.forEach((el: any) => {
        if (item.id === el.id && !result.includes(item)) {
          result.push(item);
        }
      });
      return result;
    }, []); 
    let arrNeed:any = carts.reduce((result: any[], item: any) =>{
      productsNeed.forEach((e:any) => {
        if (item.id === e.id) {
          result.push({
            id:item.id,
            stock: item.stock,
            quantity: item.quantity
          });
        }
      })
      return result
    },[])
    this.updateStock(arrNeed)
    return arrNeed
  }
}
export default ProductService;
