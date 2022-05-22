import Component, { Template } from '@/core/component/component';

type OrderCellProps = {
  title: string;
  content: string;
  isEditable: boolean;
};

class OrderCell extends Component<any, OrderCellProps> {
  constructor() {
    super(undefined, undefined);
  }

  template: () => Template = () => {
    const cellWrapper = document.createElement('div');
    cellWrapper.classList.add('cell');

    if (!this.props?.isEditable) {
      cellWrapper.removeAttribute('editable');
    } else {
      cellWrapper.setAttribute('editable', '');
    }

    if (this.props) {
      cellWrapper.setAttribute('data-title', this.props.title);
    }

    return {
      parent: cellWrapper,
      children: [document.createTextNode(this.props!.content)],
    };
  };
}

export default OrderCell;
