import React, { useState, useEffect } from 'react'
import { Text, Button, View } from 'react-native'; 
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import Day from './Day';
import { BiHomeAlt } from 'react-icons/bi'; 

const DayPage = () => {
    const searchParams = useLocalSearchParams();
    const router = useRouter();  
    const location = searchParams.location; 
    const day = searchParams.day; 
    console.log(location); 
    const [weatherData, setWeatherDate] = useState([]); 

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${day}?unitGroup=metric&key=WP9J6TZ76WZDMHLRW7W3FD2R5&contentType=json`)
                const data = response.data; 
                setWeatherDate(data); 

            } catch(error) {
                console.log(error); 
                
            }
        }
        fetchData(); 

    }, [])

    console.log(weatherData); 

    


  
  return (
    <View
        style={{
            padding: "20px",
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
                marginVertical: "30px",
                textAlign: "center",
            }}
        >
            <Text
                style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                }}
            >
                {weatherData?.resolvedAddress}
            </Text>
        </View>
        

            <Day 
                days={weatherData.days}
            />
        
    </View>
  )
}

export default DayPage