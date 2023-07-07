import axios from "axios";
import { useRouter, Link } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      });

      const data = response.data;
      localStorage.setItem("email", data?.email);
      //  await AsyncStorage.setItem("email",data?.email);
      router.push("/");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "10px",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Login
        </Text>
      </View>
      <View></View>
      <View
        style={{
          width: "80%",
        }}
      >
        <View>
          <Text style={{ fontSize: "20px" }}>Email</Text>
          <TextInput
            onChangeText={setEmail}
            style={{
              marginVertical: "10px",
              border: "1px solid black",
              padding: "10px",
            }}
            placeholder="Enter Your Email"
          />
        </View>
        <View>
          <Text style={{ fontSize: "20px" }}>password</Text>
          <TextInput
            onChangeText={setPassword}
            style={{
              marginVertical: "10px",
              border: "1px solid black",
              padding: "10px",
            }}
            placeholder="Enter Your Password"
          />
        </View>
      </View>
      <Button
        title={isLoading ? "Logging in" : "Submit"}
        onPress={handleLogin}
      />
      <View
        style={{
          borderTop: "1px solid black",
        }}
      >
        <Text>
          New to Weather app?{" "}
          <Link
            style={{ color: "blue", textDecoration: "underline" }}
            href="/auth/register"
          >
            Register
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default Register;
