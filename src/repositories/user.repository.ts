import ApiService from "../api/apiService";
import { ICart } from "../types/types";

class UserRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }

  async register(formRequestModel: any): Promise<any> {
    const res = await this.apiService.Post("register", formRequestModel);
    return res;
  }

  async login(formRequestModel: any): Promise<any> {
    const res = await this.apiService.Post("login", formRequestModel);
    return res;
  }

  async getInformation(id: number): Promise<any> {
    const res = await this.apiService.GetById("users", id);
    return res;
  }
  async getUserById(id: number): Promise<any> {
    const result = await this.apiService.GetById('users', id)
    return result
}
async patchCart(idUser:number,formRequest:ICart[]){
    await this.apiService.Patch('users', idUser,"cart", formRequest)
}
}

export default UserRepository;
