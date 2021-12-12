import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  View,
  Pressable,
  Modal,
} from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories, {
  useRepositoriesWithQuery,
} from "../hooks/useRepositories";
import Text from "./Text";
import { useHistory } from "react-router-dom";
import {
  Paragraph,
  Dialog,
  Portal,
  Searchbar,
  Avatar,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const ORDERING_PRINCIPLES = {
  Latest: "Latest repositories",
  HighestRated: "Highest rated repositories",
  LowestRated: "Lowest rated repositories",
};
import useAuthStorage from "../hooks/useAuthStorage";
import { useDebounce } from "use-debounce";

const OrderPickerDialog = ({
  visibility,
  hideDialog,
  selectedOrder,
  onChangeOrder,
}) => {
  return (
    <Portal>
      <Dialog visible={visibility} onDismiss={hideDialog}>
        <Dialog.Content>
          <Picker
            selectedValue={selectedOrder}
            onValueChange={(itemValue, itemIndex) => onChangeOrder(itemValue)}
          >
            <Picker.Item
              label="Latest repositories"
              value={ORDERING_PRINCIPLES.Latest}
            />
            <Picker.Item
              label="Highest rated repositories"
              value={ORDERING_PRINCIPLES.HighestRated}
            />
            <Picker.Item
              label="Lowest rated repositories"
              value={ORDERING_PRINCIPLES.LowestRated}
            />
          </Picker>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const OrderPickerButton = ({ selectedOrder, changeOrder }) => {
  const authStorage = useAuthStorage();
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const hideDialog = () => setModalVisibility(false);

  return (
    <>
      <Pressable onPress={() => setModalVisibility(true)}>
        <View style={styles.OrderSelectorContainer}>
          <View>
            <Text fontWeight="bold">{selectedOrder}</Text>
          </View>
          <View>
            <Avatar.Icon
              size={18}
              icon="triangle"
              style={{
                backgroundColor: "transparent",
                color: "gray",
                transform: [{ rotateZ: "180deg" }],
              }}
            />
          </View>
        </View>
      </Pressable>
      <OrderPickerDialog
        visibility={modalVisibility}
        hideDialog={hideDialog}
        selectedOrder={selectedOrder}
        onChangeOrder={changeOrder}
      />
    </>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryList extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <>
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={props.onChangeSearch}
            value={props.searchQuery}
          />
          <OrderPickerButton
            refetchRepositories={props.refetch}
            selectedOrder={props.selectedOrder}
            changeOrder={props.changeOrder}
          />
        </View>
      </>
    );
  };

  render() {
    const props = this.props;
    return (
      <FlatList
        data={props.repositoryNodes}
        renderItem={props.renderItem}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
        testID="repositoryList"
      />
    );
  }
}

const RepositoryListContainer = () => {
  const history = useHistory();
  const authStorage = useAuthStorage();
  const [selectedOrder, setSelectedOrder] = useState(
    ORDERING_PRINCIPLES.Latest
  );
  const { data, loading, refetch, fetchMore} = useRepositoriesWithQuery({
    first: 5
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const changeOrder = (value) => {
    authStorage.setOrderSelection(value).then((value) => {
      setSelectedOrder(value);
    });
  };

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };

  useEffect(() => {
    authStorage.getOrderSelection().then((value) => {
        setSelectedOrder(value);
        switch (value) {
          case ORDERING_PRINCIPLES.Latest:
            refetch({
              orderDirection: "DESC",
              orderBy: "CREATED_AT",
              searchKeyword: debouncedSearchQuery,
            });
            break;
          case ORDERING_PRINCIPLES.HighestRated:
            refetch({
              orderDirection: "DESC",
              orderBy: "RATING_AVERAGE",
              searchKeyword: debouncedSearchQuery,
            });
            break;
          case ORDERING_PRINCIPLES.LowestRated:
            refetch({
              orderDirection: "ASC",
              orderBy: "RATING_AVERAGE",
              searchKeyword: debouncedSearchQuery,
            });
            break;
        }
    });
  }, [selectedOrder, debouncedSearchQuery]);

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          history.push(`repository/${item.id}`);
        }}
        key={item.id}
      >
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  // if (loading) return <Text>Loading ...</Text>;

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <RepositoryList
        repositoryNodes={repositoryNodes}
        renderItem={renderItem}
        onChangeSearch={onChangeSearch}
        searchQuery={searchQuery}
        refetch={refetch}
        selectedOrder={selectedOrder}
        changeOrder={changeOrder}
        onEndReach={onEndReach}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  buttonOrderingPicker: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "center",
    backgroundColor: "white",
  },
  OrderSelectorContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default RepositoryListContainer;
