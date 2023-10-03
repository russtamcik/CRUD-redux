const initialState = {
  users: [],
  loading: false,
  selected: null,
  error: null,
  total: 0,
  activePage: 1,
  isModalOpen: false,
  btnLoading: false,
};

// const userReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case "getUsers":
//       return { ...state, ...payload };
//     case "usersLoading":
//       return { ...state, loading: payload };
//     case "usersError":
//       return { ...state, error: payload };
//     case "userPagination":
//       return { ...state, activePage: payload };
//     case "userModal":
//       return { ...state, isModalOpen: !state.isModalOpen };
//     default:
//       return state;
//   }
// };

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "userStateChange":
      return { ...state, ...payload };
    case "userModal":
      return { ...state, isModalOpen: !state.isModalOpen };
    case "deleteUser":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload),
      };
    case "editUser":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload.id ? { ...user, ...payload.data } : user
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
