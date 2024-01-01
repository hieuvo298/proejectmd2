import ServiceError from "../errorHandler/service.error";
import  ProductRepository  from "../repositories/product.repository";
import UserRepository from "../repositories/user.repository";
import { ICart, IProduct, IUser } from "../types/types";

class UserService {
  private userRepository: UserRepository;
  private productRepository: ProductRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.productRepository=new ProductRepository();
  }

  public async register(formRequestModel: IUser): Promise<any> {
    try {
      this._validate(formRequestModel);
      return await this.userRepository.register(formRequestModel);
    } catch (error: any) {
      throw error;
    }
  }

  public async login(formRequestModel: any): Promise<any> {
    try {
      this._validate(formRequestModel);
      return await this.userRepository.login(formRequestModel);
    } catch (error) {
      throw error;
    }
  }

  public async getInformation(id: number): Promise<any> {
    return await this.userRepository.getInformation(id);
  }

  private _validate(formRequestModel: any) {
    if (!formRequestModel.email) {
      throw new ServiceError("email is wrong");
    }
    if (!formRequestModel.password) {
      throw new Error("password is wrong");
    }
  }
  public async addToCart(idUser: number, idProduct:number ,quantityInput:number,selectSize:number) {
    const usersDb = await this.userRepository.getUserById(idUser);
    const user: IUser = usersDb.data;
    let cartUser: ICart[] = user.cart;
    const checkCart: ICart | undefined = cartUser.find(
      (item: ICart) => item.id === idProduct
    );
    const productDb=await this.productRepository.getProductsById(idProduct);
    if (checkCart&&checkCart.shoeSize===selectSize) {
      cartUser.map((item: ICart) => {
        return item.id === idProduct
          ? { ...item, quantity: item.quantity+=quantityInput,shoeSize:selectSize}
          : item;
      });
    } else {
      cartUser = [...cartUser, { ...productDb.data, quantity: +quantityInput ,shoeSize: selectSize}];
    }
    await this.userRepository.patchCart(idUser, cartUser);
  }
  
  public async getUserById(id: number): Promise<IUser> {
    const result = await this.userRepository.getUserById(id);
    return result;
  }
  public async onDelete(itemCart:ICart,idUser:number) {
    const result = await this.userRepository.getUserById(idUser)
    const carts:ICart[] = result.data.cart
    let newCarts:ICart[] = carts.filter((item:ICart) => item.id !== itemCart.id)
    await this.userRepository.patchCart(Number(idUser),newCarts);
  }
  public async removeCarts(idUser:number):Promise<any> {
    await this.userRepository.patchCart(idUser, []);
  }
}
export default UserService;
