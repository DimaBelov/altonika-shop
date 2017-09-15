import { OrderDetail } from '@entities/order-detail';

export class Order {
    id: number;
    details: Array<OrderDetail>;
    createDate: Date;
}
