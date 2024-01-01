export interface IUser {
    username: string;
    id?: number;
    email: string;
    password: string;
    role: number;
    status: boolean;
    phone: string;
    address: string;
    confirm?:string
    createAt?:string;
    cart:ICart[]
  }
  export interface IProduct {
    id?: number;
    productname: string;
    desc: string;
    price: number;
    img: string;
    isDelete: boolean;
    category: string;
    size:ISize[]
  }
  
  export interface ISize{
    sizeNumber:number;
    stock:number;
  }
  
  export interface ICart extends IProduct {
    quantity: number
    shoeSize: number
  }
  export interface IOrder {
    id?: number
    idUser: number
    userName:string
    phone:string
    address: string
    totalPrice: number
    status: number
    date: string
    paymentMethod: string
    orderDetails: any
  }
  export interface IOrderDetail {
    id: number;
    productName: string;
    quantity: number;
    price: number;
    shoeSize: number;
    desc: string;
    img: string;
  }
  