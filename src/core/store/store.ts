interface DisPatch {
  type: string;
  payload?: unknown;
}

function createStore<T>(callback: (store: T, action: DisPatch) => T) {
  let currentStore: T;
  const reducer = callback;

  window.addEventListener('dispatch', (e: CustomEventInit<DisPatch>) => {
    currentStore = reducer(currentStore, e.detail!);

    const publish = new CustomEvent<T>('publish', {
      detail: currentStore,
    });
    dispatchEvent(publish);
  });

  function dispatch({ type, payload }: DisPatch) {
    const dispatch = new CustomEvent('dispatch', {
      detail: {
        type,
        payload,
      },
    });
    dispatchEvent(dispatch);
  }

  const getStore = () => {
    return currentStore;
  };

  // init!
  dispatch({ type: 'init' });

  return {
    dispatch,
    getStore,
  };
}

export default createStore;
