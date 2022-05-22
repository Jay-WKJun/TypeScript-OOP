import Component, { Template } from '@/core/component/component';

import Drink from '@/Model/Drink';
import OrderCell from './OrderCell/OrderCell';
import OrderCellButton from './OrderCellButton/OrderCellButton';

type OrderRowProps = {
  id: number;
  drink: Drink;
};

type OrderRowState = {
  isEditable: boolean;
};

class NewOrderRow extends Component<OrderRowState, OrderRowProps> {
  constructor() {
    super({ isEditable: false }, undefined);
  }

  template: () => Template = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('table-row');

    const idCell = new OrderCell().render({
      content: this.props?.id,
      title: 'id',
      isEditable: false,
    });

    const newDrink = this.props!.drink;
    const title = new OrderCell().render({
      content: newDrink.getName(),
      title: newDrink.getName(),
      isEditable: false,
    });
    const options = newDrink.getOptions().map(option => new OrderCell().render({
      content: option.name,
      title: option.getSelectedOption(),
      isEditable: this.localState.isEditable,
    }));
    const updateButton = new OrderCellButton().render({ type: 'update', onClick: () => this.setState((prev) => ({ ...prev, isEditable: !prev.isEditable })) });
    const deleteButton = new OrderCellButton().render({ type: 'delete', onClick: () => console.log('delete') });

    return {
      parent: wrapper,
      children: [idCell, title, ...options, updateButton, deleteButton],
    };
  };
}

export default NewOrderRow;
