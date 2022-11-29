import { React, useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { commonStyles } from "../theme/styles";
import SearchInput from "../components/common/search";
import ProjectCard from "../components/search/ProjectCard";
import SearchHint from "../components/search/SearchHint";
import CategoryList from "../components/search/CategoryList";
import { STATUS, SORT } from "../helpers/common";
import { lightColors } from "../theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { getProjects } from "../store/admin/project/projectActions";

export default function Search({ navigation, route, props }) {
  const { theme } = useSelector((state) => state.commonReducer);
  const { auth } = useSelector((state) => state.authReducer);
  const styles = getStyles(theme);
  const [searchString, setSearchString] = useState("");
  const { projects } = useSelector((state) => state.projectReducer);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([
    { name: "All", id: STATUS.ALL },
    { name: "Not Started", id: STATUS.NOT_STARTED },
    { name: "In Progress", id: STATUS.IN_PROGRESS },
    { name: "In Review", id: STATUS.IN_REVIEW },
    { name: "Completed", id: STATUS.COMPLETED },
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(STATUS.ALL);
  const [sortBy, setSortBy] = useState([
    { name: "Title: Asc", id: SORT.TITLE_ASC, isChecked: true },
    { name: "Title: Desc", id: SORT.TITLE_DESC, isChecked: false },
    { name: "Cost: Low-High", id: SORT.COST_LOW_HIGH, isChecked: false },
    { name: "Cost: High-Low", id: SORT.COST_HIGH_LOW, isChecked: false },
  ]);

  const onSelectedCategory = (item) => {
    setSelectedCategoryId(item.id);
  };

  const onFilter = () => {
    navigation.navigate({
      name: "SearchSortModal",
      params: {
        sortBy,
      },
    });
  };

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProjects());
  // }, []);

  useEffect(() => {
    if (route.params?.sortBy) {
      setSortBy(route.params?.sortBy);
    }
  }, [route.params?.sortBy]);

  useEffect(() => {
    let searchedProjects = projects.filter((a) => a.members.includes(auth?.user._id));
    searchedProjects = searchedProjects.filter(
      (a) =>
        a.name.toLowerCase().includes(searchString.toLowerCase()) ||
        a.description.toLowerCase().includes(searchString.toLowerCase())
    );
    if (selectedCategoryId !== STATUS.ALL) {
      searchedProjects = searchedProjects.filter(
        (a) => a.status === selectedCategoryId
      );
    }
    let currentSortBy = sortBy.filter((a) => a.isChecked === true);
    if (currentSortBy[0].id === SORT.TITLE_ASC) {
      //console.log("Sort by Title Ascending");
      searchedProjects = searchedProjects.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    } else if (currentSortBy[0].id === SORT.TITLE_DESC) {
      //console.log("Sort by Title Descending");
      searchedProjects = searchedProjects.sort(function (a, b) {
        return b.name.localeCompare(a.name);
      });
    } else if (currentSortBy[0].id === SORT.COST_LOW_HIGH) {
      ///console.log("Sort by Cost Low to High");
      searchedProjects = searchedProjects.sort(function (a, b) {
        return a.cost - b.cost;
      });
    } else if (currentSortBy[0].id === SORT.COST_HIGH_LOW) {
      //console.log("Sort by Cost High to Low");
      searchedProjects = searchedProjects.sort(function (a, b) {
        return b.cost - a.cost;
      });
    }
    setData([...searchedProjects]);
  }, [projects, searchString, selectedCategoryId, sortBy]);

  function header() {
    return (
      <View
        style={{
          ...commonStyles.container,
          backgroundColor: theme.background,
        }}
      >
        <SearchInput
          searchString={searchString}
          onSearch={(item) => setSearchString(item)}
        />
        <SearchHint count={data === null ? 0 : data.length} />
        <CategoryList
          data={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectedCategory={onSelectedCategory}
        />
      </View>
    );
  }
  const emptyList = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.emptyListText}>No Data Found</Text>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: theme.background, flex: 1, paddingTop: 10 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={theme.barStyle} />
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={emptyList}
            ListHeaderComponent={header()}
            stickyHeaderHiddenOnScroll={true}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            numColumns={2}
            data={data}
            renderItem={({ item }) => <ProjectCard projectId={item._id} navigation={navigation} />}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
        <View>
          <TouchableOpacity onPress={onFilter} style={styles.fab}>
            <MaterialIcons name="sort" style={styles.fabIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      height: "100%",
      padding: 20,
      paddingTop: 40,
    },
    itemList: {
      width: "100%",
    },
    buttonWrapper: {
      marginTop: 10,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonLabel: {
      color: "black",
      fontWeight: "bold",
    },
    linkWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 10,
      marginTop: 10,
      paddingBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
    link: {
      color: theme.dark,
      fontSize: 16,
      fontFamily: commonStyles.fontMedium,
    },
    fab: {
      position: "absolute",
      width: 56,
      height: 56,
      alignItems: "center",
      justifyContent: "center",
      right: 20,
      bottom: 20,
      backgroundColor: lightColors.primary,
      borderRadius: 30,
      elevation: 8,
    },
    fabIcon: {
      fontSize: 30,
      color: "white",
    },
    emptyListText: {
      textAlign: "center",
      fontSize: 16,
      fontFamily: commonStyles.fontRegular,
    },
  });
};
