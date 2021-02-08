const prepareSignUpPayload = (email, password) => {
  return `mutation {
    createUser(userInput: {email: "${email}",password: "${password}"}) {
      _id
      email
    }
  }
`;
};

const prepareLoginPayload = (email, password) => {
  return `query {
    login(email: "${email}",password: "${password}") {
      userId
      token
      tokenExpiration
    }
  }
`;
};

const UserService = async (userInfo, action) => {
  const { email, password } = userInfo;

  const payloadData = {
    query:
      action === "Signup"
        ? prepareSignUpPayload(email, password)
        : prepareLoginPayload(email, password),
  };

  const response = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    body: JSON.stringify(payloadData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed!");
  }
  return response.json();
};

export { UserService };
