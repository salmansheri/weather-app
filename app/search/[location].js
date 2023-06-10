import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import ForeCast from "../ForeCast";
import { useLocalSearchParams, usePathname } from "expo-router";

const App = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [locations, setLocation] = useState([1, 2, 3]);
  const [weatherData, setWeatherData] = useState([]);
  const [searchLocation, setSearchLocation] = useState("Hosur");
  const pathname = usePathname();
  const queryLocation = pathname.split("/")[2];
  console.log(queryLocation);
  const { location } = useLocalSearchParams();

  const handleLocation = useCallback((loc) => {}, []);

  useEffect(() => {
    const fetchTemp = async () => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}%20?unitGroup=metric&key=WP9J6TZ76WZDMHLRW7W3FD2R5&contentType=json`
        );

        const data = await response.json();

        setWeatherData(data);
      } catch (error) {
        alert("NO Data");
      }
    };
    fetchTemp();
  }, []);

  return (
    <View
      style={{
        flex: "1",
        position: "relative",
      }}
    >
      <StatusBar style="light" />
      <Image
        source={require("../../assets/images/bg.png")}
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
                    padding: "10px",
                    border: "1px solid white",
                  }}
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
          {locations.length > 0 && toggleSearch ? (
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
              {locations?.map((loc, index) => {
                let showBorder = index + 1 != location.length;
                let borderClass = showBorder ? "" : "";
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={loc}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      border: "1px solid",
                      padding: "10px",
                      paddingLeft: "40px",
                      paddingRight: "40px",
                      borderBottomColor: "black",
                    }}
                  >
                    <MapPinIcon size="20" color="gray" />
                    <Text
                      style={{
                        color: "black",
                        fontSize: "20px",
                        marginLeft: "20px",
                      }}
                    >
                      {loc}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <ForeCast data={weatherData} />
      </SafeAreaView>
    </View>
  );
};

export default App;
