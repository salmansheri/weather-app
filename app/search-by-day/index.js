import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { BiHomeAlt } from "react-icons/bi";

const SearchByDay = () => {
  const [searchLocation, setSearchLocation] = useState();
  const [data, setDate] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  const router = useRouter();
  const handleSearch = () => {
    router.push(`/day?day=${searchDate}&location=${searchLocation}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Button
          title={<BiHomeAlt size={30} />}
          onPress={() => router.push("/")}
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Enter Date"
          onChangeText={setSearchDate}
          style={styles.input}
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Enter Location"
          onChangeText={setSearchLocation}
          style={styles.input}
        />
        <View style={styles.btn}>
          <Button title="Search" onPress={handleSearch} />
        </View>
      </View>
      <View>
        <Text>Search Format must be YYYY-MM-DD</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "20px",
    height: "100vh",
    backgroundColor: "#eee",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 2px 2px gray",
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: "10px",
  },
  resultsContainer: {
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 2px gray",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  resultTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    border: "1px solid black",
    width: "100%",
  },
  btn: {
    width: "fit-content",
  },
});

export default SearchByDay;
