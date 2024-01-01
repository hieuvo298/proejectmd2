import ApiService from "../api/apiService"
import { IOrder } from "../types/types"



class OrderRepository {
    private apiService: ApiService
    constructor(){
        this.apiService = new ApiService()
    }

    async postOrder(formOrders:IOrder) {
       const result = await this.apiService.Post("orders", formOrders)
       console.log("🚀 ~ file: oders.repository.ts:16 ~ OrderRepository ~ postOrder ~ result:", result) 
       return result
    }
    
    async getOrder(): Promise<any> {
        const result = await this.apiService.getAll("orders")
        return result
    }
}
export default OrderRepository