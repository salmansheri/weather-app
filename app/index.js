import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  
} from "react-native";
import { BiUser } from 'react-icons/bi'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import ForeCast from "./ForeCast";
import { Redirect, useRouter } from "expo-router";
import { LuFileSearch2 } from 'react-icons/lu'; 

const App = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [location, setLocation] = useState([
    "Hosur",
    "Krishnagiri",
    "Bangalore",
    "Chennai",
  ]);
  const [weatherData, setWeatherData] = useState([]);
  const [searchLocation, setSearchLocation] = useState("Hosur");
  const router = useRouter();
  



  

  // const handleLocation = useCallback((loc) => {}, []);


  useEffect(() => {
    const fetchTemp = async () => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchLocation}%20?unitGroup=metric&key=WP9J6TZ76WZDMHLRW7W3FD2R5&contentType=json`
        );

        const data = await response.json();

        setWeatherData(data);
      } catch (error) {
        alert("NO Data");
      }
    };
    fetchTemp();
  }, []);

  // if (!email) {
  //   return <Redirect href="/auth/login" />;
  // }

  

  const email = localStorage.getItem("email"); 

  if(!email) {
    return <Redirect href="/auth/login" />
  }

  return (
    <View
      style={{
        flex: "1",
        position: "relative",
      }}
    >
     
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/bg.png")}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
        blurRadius={60}
      />
      <SafeAreaView
        style={{
          display: "flex",
          flex: "1",
        }}
      >
        <View
          style={{
            height: "7%",
            margin: "0 4px",
            position: "relative",
            zIndex: 999,
          }}
        >
          
          <View
            style={{
              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              alignItems: "center ",
              borderRadius: "50%",
              flexDirection: "row",

              paddingLeft: "4px ",
              paddingRight: "4px",
              gap: "5px",
            }}
          >


          
            {toggleSearch ? (
              <>
                <TextInput
                  placeholder="Search City"
                  placeholderTextColor={"lightgray"}
                  style={{
                    flex: "1",
                    color: "white",
                    marginTop: "10px",
                    height: "16px",
                    borderRadius: "5px",
                    padding: "20px",
                    border: "1px solid white",
                  }}
                  onChangeText={(text) => setSearchLocation(text)}
                />
                <Button
                  title="Search"
                  onPress={() => router.push(`/search/${searchLocation}`)}
                />
              </>
            ) : (
              <View></View>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: theme.bgWhite(0.3),
                borderRadius: "50%",
                padding: "10px",
                marginTop: "8px",
              }}
              onPress={() => setToggleSearch((toggleSearch) => !toggleSearch)}
            >
              <MagnifyingGlassIcon color="white" />
            </TouchableOpacity>
          </View>
          {location.length > 0 && toggleSearch ? (
            <View
              style={{
                position: "absolute",
                width: "100%",
                backgroundColor: "white",
                top: "50px",
                borderRadius: "10px",
                margin: "10px",
              }}
            >
            
            </View>
          ) : (
            <View></View>
          )}
          <View
            style={{
              width: "fit-content", 
              padding: "10px", 
              display: "flex", 
              flexDirection: "column", 
              gap: "10px", 
            }}
          >
           <Button 
            title={<BiUser size={30} />}
            onPress={() => router.push("/profile")}
            
            
           />
           <Button 
              title={<LuFileSearch2 size={30} />}
              onPress={() => router.push("/search-by-day")}

           />
          </View>

          
        </View>
        <ForeCast data={weatherData} />
      </SafeAreaView>
    </View>
  );
};

export default App;
