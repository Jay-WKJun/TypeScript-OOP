import Component, { Template } from '@/core/component/component';

type ButtonType = 'update' | 'delete';

type OrderCellButtonProps = {
  type: ButtonType;
  onClick: (e: MouseEvent) => void;
};

class OrderCellButton extends Component<any, OrderCellButtonProps> {
  constructor() {
    super();
  }

  createButtonAttribute(type: ButtonType) {
    if (type === 'update') {
      return {
        icon: 'fa-pen',
        title: '수정하기',
      };
    }

    return {
      icon: 'fa-trash-can',
      title: '삭제하기',
    };
  }

  protected template: () => Template = () => {
    const { icon, title } = this.createButtonAttribute(this.props!.type);

    const cellWrapper = document.createElement('div');
    cellWrapper.classList.add('cell');
    cellWrapper.setAttribute('data-title', title);

    const span = document.createElement('span');
    span.setAttribute('class', 'edit-order');
    span.addEventListener('click', this.props!.onClick);
    const iconEl = document.createElement('i');
    iconEl.setAttribute('class', `fa-solid ${icon}`);

    return {
      parent: cellWrapper,
      children: [{ parent: span, children: [iconEl] }],
    };
  };
}

export default OrderCellButton;
