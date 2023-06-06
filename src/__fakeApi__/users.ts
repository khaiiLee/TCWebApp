import Mock from "__fakeApi__/mock";
import axios from "axios";
import jwt from "jsonwebtoken";



const JWT_SECRET = "jwt_secret_key";
const JWT_VALIDITY = "7 days";

const userList = [
  {
    id: 1,
    role: "SA",
    name: "Jason Alexander",
    username: "jason_alexander",
    email: "demo@example.com",
    avatar: "/static/avatar/001-man.svg",
    age: 25,
    // password: 'v&)3?2]:'
  },
];

Mock.onPost("/api/auth/login").reply(async (config) => {
  try {
    let API_ENDPOINT = "https://tcportalbackend.azurewebsites.net/mssql";
    let TOKEN = "123456";
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { email,password } = JSON.parse(config.data);
    const user = userList.find((user) => user.email === email);

    let query = `SELECT userId, email, password FROM [dbo].[users] WHERE email = '${email}' AND password = '${password}'`;
    let response = await axios.get(API_ENDPOINT, {
      params: {
        query: query,
        token: TOKEN,
      },
    })
    
    if (response.data.data.length==0) {
      return [400, { message: "Invalid email or password" }];
    }
    else{
      console.log(response.data.data)
      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("email", response.data.data[0].email);
      const accessToken = jwt.sign({ userId: response.data.data.id }, JWT_SECRET, {
        expiresIn: JWT_VALIDITY,
      });
      return [
        200,
        {
          accessToken,
          user: {
            id: response.data.data.id,
            avatar: "/static/avatar/001-man.svg",
            email: response.data.data.email,
            name: response.data.data.fullName,
            role: response.data.data.role,
          },
        },
      ];
    }
    
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

Mock.onPost("/api/auth/register").reply(async (config) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { email, username } = JSON.parse(config.data);
    const user = userList.find((user) => user.email === email);
    if (user) {
      return [400, { message: "User already exists!" }];
    }

    const newUser = {
      id: 2,
      role: "GUEST",
      name: "",
      username: username,
      email: email,
      avatar: "/static/avatar/001-man.svg",
      age: 25,
    };
    userList.push(newUser);

    const accessToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });

    return [
      200,
      {
        accessToken,
        user: {
          id: newUser.id,
          avatar: newUser.avatar,
          email: newUser.email,
          name: newUser.name,
          username: newUser.username,
          role: newUser.role,
        },
      },
    ];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/auth/profile").reply((config) => {
  try {
    //@ts-ignore
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: "Invalid Authorization token" }];
    }
    const accessToken = Authorization.split(" ")[1];
    const { userId }: any = jwt.verify(accessToken, JWT_SECRET);
    const user = userList.find((u) => u.id === userId);

    if (!user) {
      return [401, { message: "Invalid authorization token" }];
    }

    return [
      200,
      {
        user: {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});
