import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import { COLOR } from "../constant";
import { products } from "../utils";
import ProductCard from "./ProductCard";
import { Entypo } from "@expo/vector-icons";
import { showAlert } from "../utils";
import { ProductProp } from "../types";

const Products = () => {
  //states
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ProductProp[]>(() => products.slice(0, 6)); //set data initially to the first six products
  const [selectedProducts, setSelectedProducts] = useState<ProductProp[]>([]);

  //get total number of possible page based on products data
  //taking into consideration each page must have at most 6 products
  const maxPage = useMemo(() => Math.ceil(products?.length / 6), [products]);

  //update the displayed data based on the current page
  const handleData = useCallback(
    (currentPage: number) => {
      const startIndex = (currentPage - 1) * 6;
      const endIndex = startIndex + 6;
      setData(products.slice(startIndex, endIndex));
    },
    [products]
  );

  //on page change, set current page to the current page and call handleData with the page,
  //only if the page is greater than zero an less tan the max possible page
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage > 0 && newPage <= maxPage) {
        setCurrentPage(newPage);
        handleData(newPage);
      }
    },
    [handleData, maxPage]
  );

  //on next icon click, increase current page
  const handleNextPage = useCallback(() => { handlePageChange(currentPage + 1); }, [currentPage, handlePageChange]);

  //on prev icon click, decrease current page
  const handlePrevPage = useCallback(() => { handlePageChange(currentPage - 1);}, [currentPage, handlePageChange]);

  return (
    <View style={styles.container}>
      {/* products card display */}
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 8,}}
        renderItem={({ item }: { item: ProductProp }) => (<ProductCard product={item} setSelectedProducts={setSelectedProducts} />)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(product: ProductProp) => product.id.toString()}
      />

      {/* pagination */}
      <View style={styles.pagination}>
        {/* Previous icon */}
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
          <Pressable
            onPress={() => handlePageChange(i + 1)}
            key={i}
            style={[styles.circle, currentPage === i + 1 && styles.current]}
          ></Pressable>
        ))}
        {/* Next icon */}
        <Pressable onPress={handleNextPage}>
          <Entypo
            name="chevron-thin-right"
            size={24}
            color={COLOR.secondary}
            style={{ marginLeft: 10 }}
          />
        </Pressable>
      </View>

       {/* select button */}
      <Pressable style={styles.button} onPress={() => showAlert(selectedProducts?.length > 0)}>
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
  current: {
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

export default Products