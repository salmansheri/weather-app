import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { Button, Text, View } from "react-native";
import { weekdays } from "../../constants";
import { convertDateToDay } from "../../lib/actions/dayToString";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [vacations, setVacations] = useState(userData?.vacations);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:5000/users/${email}`);

      const data = response.data;

      setUserData(data);
      setVacations(data?.vacations);
    };

    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/vacation/${id}`,
      );

      const data = response.data;

      const filteredVacations = userData?.vacations?.filter(
        (item) => item?.id !== id,
      );

      setVacations(filteredVacations);
      window.location.reload();
    } catch (error) {
      alert("something went wrong");
    }
  };

  const handleLogout = () => {
    if (!email) {
      return;
    }

    localStorage.removeItem("email");
    router.push("/");
  };

  return (
    <View
      style={{
        height: "100vh",
        padding: "20px",
        backgroundColor: "#ccc",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginVertical: "20px",
      }}
    >
      <View
        style={{
          width: "fit-content",
        }}
      >
        <Button
          title={<BiHomeAlt size={30} />}
          onPress={() => router.push("/")}
        />
      </View>
      <View
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0 2px 2px gray",
        }}
      >
        <Text
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Name: {userData?.name}
        </Text>
        <Text
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Email: {userData?.email}
        </Text>
        <View
          style={{
            display: "flex",
            alignItems: "end",
            paddingHorizontal: "10px",
            borderRadius: "10px",
            justifyContent: "flex-end",
            marginVertical: "10px",
          }}
        >
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </View>
      <View
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0 2px 2px gray",
        }}
      >
        <Text
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Vacations Added
        </Text>
        {vacations?.map((item) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              key={item?.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                fontSize: "20px",
              }}
            >
              <Text
                style={{
                  fontSize: "20px",
                }}
              >
                Date: {item?.date}{" "}
              </Text>
              <Text
                style={{
                  fontSize: "20px",
                }}
              >
                Day: {weekdays[convertDateToDay(item?.date)]}
              </Text>
              <Text
                style={{
                  fontSize: "20px",
                }}
              >
                Place: {item?.place}{" "}
              </Text>
            </View>
            <View>
              <Button
                title={<AiFillDelete size={30} color="red" />}
                color="white"
                onPress={() => handleDelete(item?.id)}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProfilePage;
