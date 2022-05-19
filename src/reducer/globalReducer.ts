import createStore from '@/core/store/store';

const initStore = {
  counter: 0,
  other: false,
};

const globalStore = createStore<typeof initStore>((store = initStore, action) => {
  switch (action.type) {
    case 'plus': {
      store.counter += 1;
      return {
        ...store,
      };
    }
    case 'minus': {
      store.counter -= 1;
      return {
        ...store,
      };
    }
    case 'toggle': {
      store.other = !store.other;
      return {
        ...store,
      };
    }
    default: {
      return store;
    }
  }
});

export default { ...globalStore };
