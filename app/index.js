import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Text, View, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'; 
import { theme } from '../theme'; 
import { MagnifyingGlassIcon  } from 'react-native-heroicons/outline'


const App = () => {
    const [toggleSearch, setToggleSearch] = useState(false); 
  return (
    <View
        style={{
            flex: "1",
            position: "relative",
        }}
    >
        <StatusBar 
            style="light"

        />
        <Image 
            source={require('../assets/images/bg.png')}
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
                        gap: "5px"
                       

                    }}
                >
                    {toggleSearch ? (
                        <>
                        <TextInput 
                        placeholder="Search City"
                        placeholderTextColor={'lightgray'}
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


                    ): (
                        <View></View>
                    )}
                    <TouchableOpacity 
                        style={{
                            backgroundColor: theme.bgWhite(0.3),
                            borderRadius: "50%",
                            padding: "10px",
                            marginTop: "8px"
                            
                            
                        }}
                        onPress={() => setToggleSearch(toggleSearch => !toggleSearch)}>
                       
                          <MagnifyingGlassIcon  color="white" />  
                       
                    </TouchableOpacity>
                    
                </View>

            </View>

        </SafeAreaView>
       
        

    </View>
  )
}

export default App