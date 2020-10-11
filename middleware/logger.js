const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("action: ", action);
  const val = next(action);
  console.log("new state: ", store.getState());
  console.groupEnd();
  return val;
};

export default logger;
