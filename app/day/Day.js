import React, { useState } from "react";
import { Image, View } from "react-native";
import { Text } from "react-native";
import { weatherImages, weekdays } from "../../constants";
import { Button } from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { convertDateToDay } from "../../lib/actions/dayToString";

const Day = ({ days }) => {
    const router = useRouter(); 
  const { day, location } = useLocalSearchParams();
  const userEmail = localStorage.getItem("email");
  const [isLoading, setIsLoading] = useState(false);
  const handleVaction = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/vacation", {
        userEmail,
        place: location,
        date: day,
      });

      alert("Vacation has been successfully Created") 
      router.push("/profile"); 
    } catch (error) {
      alert("someting went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(days);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyCotent: "center",
        marginVertical: "100px",
      }}
    >
      {days?.map((day) => (
        <>
          <Text
            style={{
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            {day?.datetime}
          </Text>
          <Text
            style={{
              fontSize: "30px", 
              fontWeight: "bold", 
            }}
          >
            {weekdays[convertDateToDay(day?.datetime)]}
          </Text>
          <Text
            style={{
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            {day?.temp} Celsius
          </Text>

          <Image
            source={weatherImages[day?.conditions]}
            style={{
              height: "300px",
              width: "300px",
            }}
          />

          <Text
            style={{
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            {day?.description}
          </Text>
          <View>
            <Button
              onPress={handleVaction}
              title={isLoading ? "Adding..." : "Add this day to vacation"}
            />
          </View>
        </>
      ))}
    </View>
  );
};

export default Day;
