import React from "react";
import { Button, Text, TextInput, View } from "react-native";

const Register = () => {
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
      <View
        style={{
          width: "80%",
        }}
      >
        <View>
          <Text style={{ fontSize: "20px" }}>Name</Text>
          <TextInput
            style={{
              marginVertical: "10px",
              border: "1px solid black",
              padding: "10px",
            }}
            placeholder="Enter Your Name"
          />
        </View>
        <View>
          <Text style={{ fontSize: "20px" }}>Email</Text>
          <TextInput
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
            style={{
              marginVertical: "10px",
              border: "1px solid black",
              padding: "10px",
            }}
            placeholder="Enter Your Password"
          />
        </View>
      </View>
      <Button title="Submit" />
    </View>
  );
};

export default Register;
