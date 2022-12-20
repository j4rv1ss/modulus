import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Img,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import blogLogo from "../assets/blog-logo.png";

import { loginUser } from "../service/api.js";

const defaultValues = {
 
  email: "",
  password: "",
};

const Login = () => {
  const [values, setValues] = useState(defaultValues);

  const heandleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values);

  const submitData=()=>{
    loginUser(values)
  }


  return (
    <Container h={"100vh"} bg={"gray.100"} maxW={"container.xl"} p={16}>
      <Container h={"70vh"} bg={"white"}>
        <Box p={"3rem"}>
          <Img src={blogLogo} m={"auto"} h={"80px"} />
        </Box>
        <FormControl h={"60vh"} p={"1rem"}>
          <Box m={"1rem 0"}>
            <FormLabel>Email</FormLabel>
            <Input
              type={"email"}
              placeholder={"Enter email.."}
              onChange={(e) => {
                heandleChange(e);
              }}
              name="email"
            />
          </Box>
          <Box m={"1rem 0"}>
            <FormLabel>Password</FormLabel>
            <Input
              type={"password"}
              placeholder={"Enter password.."}
              onChange={(e) => {
                heandleChange(e);
              }}
              name="password"
            />
          </Box>
          <Text>
            <Link to="/forgetPassword">Forget password?</Link>
          </Text>
          <Button
            m={"1rem 0"}
            variant={"outline"}
            colorScheme={"orange"}
            w={"full"}
            onClick={()=>{submitData(values)}}
          >
            Login
          </Button>
          <Text textAlign={"right"}>New User?</Text>
          <Button
            m={"1rem 0"}
            variant={"ghost"}
            colorScheme={"orange"}
            w={"full"}
          >
            <Link to={"/signup"}>Signup</Link>
          </Button>
        </FormControl>
      </Container>
    </Container>
  );
};

export default Login;
