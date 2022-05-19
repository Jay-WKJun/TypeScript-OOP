// 처음 시작 할 때, dispatch 이벤트를 받는 리스너를 단다.
// dispatch 이벤트가 떨어지면, 등록된 type에 일치하는 행동을 한다. 그에 따른 state 갱신
// 갱신된 state 전체를 어떤 특정 event 이름으로 dispatch한다.
// 그 이름의 listener를 가지고 있는 model, controller, view가 store 안에서 필요한 데이터를 가져다가 사용한다.

// shallow equal을 통해 render를 할 수 있도록 해야 비교 비용을 최소화 할 수 있다.

// store를 등록하는 방법을 제공해야한다.

// store는 closure로 관리된다.
// store parameter를 통해 사용자로 부터 받은 store 설계도를 통해 store를 등록한다.
// 동시에 store를 통해 나온 것들로 action creator를 만들어 준다.
function createStore<T>(callback: (store: T, action: { type: string; payload: unknown }) => T) {
  // 초기화는 init dispatch를 통해 이루어짐.
  let currentStore: T;
  const reducer = callback;

  // 어디서든 dispatch 이벤트가 일어나면 이곳에서 listen한다.
  // dispatch 이벤트 안에선 store에 접근할 수 있다.
  // dispatch 이벤트 안에선 createStore를 통해 들어온 callback을 실행시킨다.
  window.addEventListener('dispatch', (e: Event) => {
    // action은 dispatch 이벤트와 함께 온 것을 읽는다.
    currentStore = reducer(currentStore, e.store);
    // callback을 통해 갱신된 store를 특정 이벤트를 통해 방출한다.

    if (e.store.type === 'init') return;

    const publish = new CustomEvent<T>('publish', {
      detail: currentStore,
    });
    dispatchEvent(publish);
  });

  function dispatch({ type, payload }) {
    const dispatch = new CustomEvent('dispatch');
    dispatch.store = {
      type,
      payload,
    };
    dispatchEvent(dispatch);
  }

  const getStore = () => {
    return currentStore;
  };

  dispatch({ type: 'init' });
  // scope에 접근할 수 있는 dispatch 함수를 제공
  return {
    dispatch,
    getStore,
  };
}

export default createStore;
