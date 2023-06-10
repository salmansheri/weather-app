import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import { theme } from "../theme";
import { weatherImages } from "../constants";

const ForeCast = ({ data }) => {
  console.log(data);

  return (
    <View
      style={{
        marginLeft: "20px",
        marginRight: "20px",
        display: "flex",
        justifyContent: "space-around",
        flex: 1,
        marginBotton: "20px",
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        {data?.resolvedAddress}
      </Text>
      {/* Weather Image */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <Image
          source={weatherImages[data?.currentConditions?.conditions]}
          style={{
            width: "200px",
            height: "200px",
          }}
        />
        {/* Degree Celsius */}
        <View
          style={{
            display: "flex",

            gap: "20px",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
              fontSize: "50px",
              marginLeft: "50px",
            }}
          >
            {data?.currentConditions?.temp}&#176;
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
              fontSize: "20px",
              marginLeft: "50px",
            }}
          >
            {data?.currentConditions?.conditions}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "40px",
            marginRight: "40px",
          }}
        >
          {/* other stats */}
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "40px",
              marginRight: "40px",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/mist.png")}
                style={{
                  height: "40px",
                  width: "40px",
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {data?.currentConditions?.humidity}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/partlycloudy.png")}
                style={{
                  height: "40px",
                  width: "40px",
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {data?.currentConditions?.windspeed}km
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/cloud.png")}
                style={{
                  height: "40px",
                  width: "40px",
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {data?.currentConditions?.solarradiation}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* forecast section for nextdays  */}
      <View
        style={{
          marginBotton: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginRight: "20px",
          marginLeft: "20px",
          gap: "8px",
          color: "white",
        }}
      >
        <CalendarDaysIcon size="22" color="white" />
        <Text
          style={{
            color: "white",
            marginVertical: "30px",
          }}
        >
          Daily ForeCast
        </Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {data?.days?.map((day, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              width: "24px",
              borderRadius: "20%",
              height: "150px",
              paddingHorizontal: "40px",
              marginTop: "20px",
              paddingVertical: "10px",
              marginHorizontal: "10px",

              gap: "10px",
              backgroundColor: theme.bgWhite(0.15),
            }}
          >
            <Image
              source={weatherImages[day?.conditions]}
              style={{
                height: "50px",
                width: "50px",
              }}
            />
            <Text
              style={{
                color: "white",
              }}
            >
              {day?.datetime}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: "10px",
                fontWeight: "900",
              }}
            >
              {day?.temp}&#126;
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ForeCast;
