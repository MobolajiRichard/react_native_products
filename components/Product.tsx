import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useCallback } from "react";
import { COLOR, IMAGE } from "../constant";
import ArrowLeft from "../assets/icons/ArrowLeft";
import { products } from "./products";
import ProductCard from "./ProductCard";
import { Entypo } from "@expo/vector-icons";
import { showAlert } from "./Alert";

export default function Products() {
  //states
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(products.slice(0, 6));
  const [selectedProducts, setSelectedProducts] = useState([]);

  const maxPage = Math.ceil(products?.length / 6); // get the total number of pages based on data

  const handleData = useCallback((currentPage) => {
    setData(products.slice(currentPage * 6 - 6, currentPage * 6));
  }, []);

  const handleNextPage = useCallback(() => {
    if (currentPage < maxPage) {
      setCurrentPage((prev) => {
        const newPage = prev + 1;
        handleData(newPage);
        return newPage;
      });
    }
  }, [currentPage, handleData]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => {
        const newPage = prev - 1;
        handleData(newPage);
        return newPage;
      });
    }
  }, [currentPage, handleData]);

  console.log(selectedProducts);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 8,
        }}
        renderItem={({ item }) => <ProductCard product={item} setSelectedProducts={setSelectedProducts}/>}
        showsVerticalScrollIndicator={false}
        keyExtractor={(product) => product.id}
      />
      <View style={styles.pagination}>
        <Pressable onPress={handlePrevPage}>
          <Entypo
            name="chevron-thin-left"
            size={24}
            color={COLOR.secondary}
            style={{ marginRight: 10 }}
          />
        </Pressable>

        {/* display correct dots based on the number of page available */}
        {new Array(maxPage).fill(0).map((_, i) => (
          <View key={i} style={[styles.circle, currentPage === i + 1 && styles.current]}></View>
        ))}

        <Pressable onPress={handleNextPage}>
          <Entypo
            name="chevron-thin-right"
            size={24}
            color={COLOR.secondary}
            style={{ marginLeft: 10 }}
          />
        </Pressable>

      </View>
      <Pressable style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}> Select products</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    color: COLOR.black,
    fontFamily: "outfit_medium",
    fontSize: 17,
  },
  button: {
    backgroundColor: COLOR.primary,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: COLOR.neutral,
    marginHorizontal: 5,
  },
  current:{
    backgroundColor: COLOR.secondary,
  },
  pagination: {
    marginBottom: 32,
    marginTop: 17,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
