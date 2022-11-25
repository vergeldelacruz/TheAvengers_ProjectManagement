import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { lightColors } from "../theme/colors";
import Checkbox from "expo-checkbox";
import BackButton from "../components/common/back-button";
import { commonStyles, formStyles } from "../theme/styles";
import { useSelector } from "react-redux";

const FilterScreen = ({ navigation, route }) => {
  const [sortBy, setSortBy] = useState([]);
  const { theme } = useSelector((state) => state.commonReducer);

  useEffect(() => {
    if (route.params?.sortBy) {
      setSortBy(route.params?.sortBy);
    }
  }, [route.params?.sortBy]);

  const onApply = () => {
    navigation.navigate({
      name: "Search",
      params: {
        sortBy: sortBy,
      },
      merge: true,
    });
  };
  const handleChangeSortBy = (id) => {
    let temp = sortBy.map((item) => {
      if (id === item.id) {
        return { ...item, isChecked: !item.isChecked };
      } else {
        return { ...item, isChecked: false };
      }
      return item;
    });
    setSortBy(temp);
  };
  const renderSortBy = (data) => {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleChangeSortBy.bind(this, item.id)}>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                color={item.isChecked ? lightColors.dark : undefined}
                onValueChange={() => {
                  handleChangeSortBy(item.id);
                }}
              />
              <Text style={{ ...styles.text, color: theme.dark }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View
      style={{
        ...commonStyles.mainContainer,
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <BackButton navigation={navigation} />
        <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
          Sort By
        </Text>
        <View style={{ ...styles.itemWrapper, backgroundColor: theme.light }}>
          <View>{renderSortBy(sortBy)}</View>
        </View>
        <TouchableOpacity onPress={onApply} style={styles.buttonWrapper}>
          <Text style={formStyles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  itemWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    padding: 15,
    borderRadius: lightColors.borderRadius,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
    borderRadius: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: commonStyles.fontRegular,
    textAlign: "center",
  },
  buttonWrapper: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 20,
    backgroundColor: lightColors.primary,
    borderRadius: lightColors.borderRadius,
  },
  button: {
    color: lightColors.light,
  },
});
