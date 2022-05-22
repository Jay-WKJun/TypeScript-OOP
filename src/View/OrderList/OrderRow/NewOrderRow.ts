import Component, { Template } from '@/core/component/component';

import Drink from '@/Model/Drink';
import OrderCell from './OrderCell/OrderCell';
import OrderCellButton from './OrderCellButton/OrderCellButton';

type OrderRowProps = {
  id: number;
  drink: Drink;
};

class NewOrderRow extends Component<any, OrderRowProps> {
  constructor() {
    super(undefined, undefined);
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
      isEditable: true,
    });
    const options = newDrink.getOptions().map(option => new OrderCell().render({
      content: option.name,
      title: option.getSelectedOption(),
      isEditable: true,
    }));
    const updateButton = new OrderCellButton().render({ type: 'update', onClick: () => console.log('update') });
    const deleteButton = new OrderCellButton().render({ type: 'delete', onClick: () => console.log('delete') });

    return {
      parent: wrapper,
      children: [idCell, title, ...options, updateButton, deleteButton],
    };
  };
}

export default NewOrderRow;
