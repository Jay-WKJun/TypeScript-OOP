import Component, { Template } from '@/core/component/component';

import NewOrderRow from '@/View/OrderList/OrderRow/NewOrderRow';
import type Drink from '@/Model/Drink';
import OrderController from '@/Controller/OrderController';

type OrderListState = {
  drinks: Drink[];
};

class OrderList extends Component<OrderListState, any> {
  constructor() {
    super({ drinks: [] });
  }

  orderController = OrderController;

  componentShouldMount: () => void = () => {
    const newOrderButton = document.getElementById('new-order');
    newOrderButton?.addEventListener('click', () => {
      const newDrink = this.orderController.addDrink();

      //const newRowNumber = this.orderTable.children.length;
      //const newOrderRow = new OrderRow(newRowNumber, drink);

      // new NewOrderRow().render({ id: 1, drink })
      this.setState(prev => ({
        ...prev,
        drinks: [...prev.drinks, newDrink],
      }));
    });
  };

  protected template: () => Template = () => {
    const orderTable = document.getElementById('order-table')!;

    this.localState.drinks.forEach((drink) => {
      const newOrderRow = new NewOrderRow().render({ id: 1, drink });
      orderTable.appendChild(newOrderRow);
    });
  };
}

export default OrderList;
