const filterReducer = (state = "ALL", action) => {
  if (action.type === "SET_FILTER") {
    return action.data;
  }
  return state;
};

export const setFilter = (filter) => {
  if (filter === "")
    return {
      type: "SET_FILTER",
      data: "ALL",
    };
  return {
    type: "SET_FILTER",
    data: filter,
  };
};

export default filterReducer;
