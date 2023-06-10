import { useRouter, Link } from "expo-router";
import React, { useCallback, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const Register = () => {
  const router = useRouter(); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [name, setName] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",


        },
        body: JSON.stringify({
          name, 
          password, 
          email,
        })
      })

      if(response.ok) {
        alert("successfully registered");
        router.push("/auth/login"); 
      }

    } catch(error) {
      alert(error.message)
      console.log(error); 

    } finally {
      setIsLoading(false); 

    }
  }
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
          <Text
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Register
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: "20px" }}>Name</Text>
          <TextInput
            onChangeText={setName}
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
      <Button title={isLoading ? "Creating" : "Submit"} onPress={handleRegister} />

      <View
        style={{
          borderTop: "1px solid black",

          
        }}
      >
        <Text>
          Already Have an Account? <Link style={{color: "blue", textDecoration: "underline"}} href="/auth/login">
            Login
          </Link>
        </Text>
        

      </View>
    </View>
  );
};

export default Register;
