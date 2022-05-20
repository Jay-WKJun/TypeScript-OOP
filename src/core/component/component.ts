abstract class Component {
  // 실제로 화면에 렌더되지는 않지만, event나 classname등의 HTMLElement가 할 수 있는 것들은 모두 가능하다.
  private wrapper = document.createElement('template');
  protected localState: any;

  // 처음에는 빈 껍데기로 instance 생성
  // 그 다음에 render 순서대로 state를 심어가며 다시 생성
  // 이렇게 하는 이유는 diff를 통한 re-render flow를 하나로 합치기 위해
  // 만약 new를 사용하면,,, diff와 상관없이 항상 새로운 instance가 만들어지고 그걸 막기위해선 별개의 저장소가 필요하다.
  constructor(newState?: any) {
    this.localState = newState;
  }

  setState = (newState: any) => {
    if (this.localState !== newState) {
      this.localState = newState;
      this.composeElements();
    }
  };

  // 렌더 과정은 모두 이곳에서
  // 각자의 렌더링이 어떻게 될지는 알아서
  // 사용자의 요청, 이걸 렌더해주세요!
  public abstract render: () => (Element | Component | (Element | Component)[])[];

  // Component의 최종 결과물은 항상 이 함수를 통해야 한다.
  private composeElements = (): Element => {
    // render에서 만들어 준 element를 기준으로 렌더링을 진행한다.
    // recursion으로 가장 아래 array가 끝나면 그 바로 위의 Element의 append되는 방식으로 render
    this.render();

    // 최종 결과물은 wrapper에 사용자가 적어준 element들이 합쳐져서 끝난다.
    return this.wrapper;
  };
}
