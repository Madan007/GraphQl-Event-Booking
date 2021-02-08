const UserContextProvider = {
  Handlers: {
    token: null,
    userId: null,
    login: async (userInfo) => {
      const { token, userId } = userInfo;
      this.setState({
        token,
        userId,
      });
    },

    logout: () => {
      return true;
    },
  },
};

export default UserContextProvider;
