export interface Template {
  parent: Element | Node;
  children?: (Template | Element | Node | DocumentFragment)[];
}

interface PropState {
  [type: string]: unknown;
}

abstract class Component<T extends PropState, P extends PropState> {
  // 실제로 화면에 렌더되지는 않지만, event나 classname등의 HTMLElement가 할 수 있는 것들은 모두 가능하다.
  protected wrapper = document.createDocumentFragment();
  protected props?: P;
  protected localState: T;
  private isMounted = false;
  private dependency?: boolean[] = [];
  private shouldRender = false;

  // 처음에는 빈 껍데기로 instance 생성
  // 그 다음에 render 순서대로 state를 심어가며 다시 생성
  // 이렇게 하는 이유는 diff를 통한 re-render flow를 하나로 합치기 위해
  // 만약 new를 사용하면,,, diff와 상관없이 항상 새로운 instance가 만들어지고 그걸 막기위해선 별개의 저장소가 필요하다.
  constructor(initState?: T, props?: P) {
    this.props = props!;
    this.localState = initState!;
  }

  componentShouldMount = () => {
    // override
  };
  componentShouldUpdate = () => {
    // override
  };
  componentShouldUnmount = () => {
    // override
  };

  // 내부 state 만을 책임짐
  protected setState = (callback: (prevState: T) => T) => {
    const newState = callback(this.localState);
    const isDiff = this.localState !== newState;

    if (isDiff) {
      this.localState = { ...this.localState, ...newState };
      this.shouldRender = true;
      this.render(this.props, this.dependency);
    }
  };

  // 해당 컴포넌트의 렌더 과정은 모두 이곳에서
  // 각자의 렌더링이 어떻게 될지는 알아서
  // 사용자의 요청, 이걸 렌더해주세요!
  protected abstract template: () => Template;

  private composeComponents = (newTemplates: Template): Element | Node => {
    const parent = newTemplates.parent;
    const children = newTemplates.children;

    if (children && children.length > 0) {
      children.forEach(el => {
        const child: Element | Node = el instanceof Element || el instanceof Node ? el : this.composeComponents(el);
        return parent.appendChild(child);
      });
    }

    return parent;
  };

  // Component의 최종 결과물은 항상 이 함수를 통해야 한다.
  // 바깥의 component들은 이 component를 render하기 위해 이 함수를 사용한다.
  render = (props?: P, dependency?: boolean[]): DocumentFragment => {
    this.dependency = dependency;
    // unmount
    if (dependency && dependency.length > 0 && dependency.every(el => !el)) {
      this.componentShouldUnmount();
      this.wrapper = document.createDocumentFragment();

      return this.wrapper;
    }

    this.shouldRender = this.shouldRender || this.props === props;
    if (this.isMounted && !this.shouldRender) return this.wrapper;

    if (!this.isMounted) {
      this.componentShouldMount();
      this.isMounted = true;
    } else {
      this.componentShouldUpdate();
    }

    // render에서 만들어 준 element를 기준으로 렌더링을 진행한다.
    // recursion으로 가장 아래 array가 끝나면 그 바로 위의 Element의 append되는 방식으로 render
    this.props = props;

    this.wrapper = document.createDocumentFragment();
    const newTemplate = this.template();
    const rootElement = this.composeComponents(newTemplate);
    this.wrapper.replaceChildren(rootElement);

    this.shouldRender = false;
    // 최종 결과물은 wrapper에 사용자가 적어준 element들이 합쳐져서 끝난다.
    return this.wrapper;
  };
}

export default Component;
