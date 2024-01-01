import OrderRepository from "../repositories/oders.repository";
import { IOrder } from "../types/types";

class OrderService {
  private orderRepository: OrderRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async postOrder(formOrders: IOrder) {
    try {
      return await this.orderRepository.postOrder(formOrders);
    } catch (error) {
      throw error;
    }
  }

  public async getOrder(idUser: number) {
    let data = await this.orderRepository.getOrder();
    let orders = data.data;
    let result: IOrder[] = orders.filter(
      (item: IOrder) => item.idUser === idUser
    );
    return result;
  }
}
export default OrderService;
