import React from "react";
import { StyleSheet, View, StatusBar, Image, Pressable, Linking } from "react-native";
import Text from "./Text";
import theme from "../theme";
import Button from "./Button";
import * as WebBrowser from "expo-web-browser";

const RepositoryItemHeader = ({
  fullName,
  description,
  language,
  avatarUrl,
}) => {
  return (
    <View style={styles.itemHeaderContainer}>
      <View style={styles.itemHeaderAvatarWrapper}>
        <Image
          style={styles.itemAvatar}
          source={{
            uri: avatarUrl,
          }}
        />
      </View>
      <View style={styles.itemHeaderBodyWrapper}>
        <Text fontSize="subheading" fontWeight="bold">
          {fullName}
        </Text>
        <Text color="textSecondary" mt={2}>
          {description}
        </Text>
        <Button>
          <Text color="white">{language}</Text>
        </Button>
      </View>
    </View>
  );
};

const RepositoryItemStats = ({
  starsCount,
  forksCount,
  reviewsCount,
  ratingAverage,
}) => {
  const formatNumber = (number) => {
    if (number >= 1000) {
      return `${parseFloat((number / 1000).toFixed(1))}k`;
    }
    return `${parseFloat(number)}`;
  };

  return (
    <View style={styles.itemStatsContainer}>
      <View style={styles.itemStatsColumn}>
        <Text fontWeight="bold">{formatNumber(starsCount)}</Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={styles.itemStatsColumn}>
        <Text>{forksCount}</Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={styles.itemStatsColumn}>
        <Text>{reviewsCount}</Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View style={styles.itemStatsColumn}>
        <Text>{ratingAverage}</Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item, showLink }) => {
  const githubLinkPressHandler = () => {
    // WebBrowser.openBrowserAsync(item.url);
    Linking.openURL(item.url)
  }

  return (
    <View style={styles.item} testID={`repo-item-${item.id}`}>
      <RepositoryItemHeader
        fullName={item.fullName}
        description={item.description}
        language={item.language}
        avatarUrl={item.ownerAvatarUrl}
      />
      <RepositoryItemStats
        starsCount={item.stargazersCount}
        forksCount={item.forksCount}
        reviewsCount={item.reviewCount}
        ratingAverage={item.ratingAverage}
      />
      {showLink && (
        <View style={styles.linkButtonContainer}>
          <Button style={styles.linkButton} onPress={githubLinkPressHandler}>
            <Text color="white">Open in Github</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: theme.colors.white,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    marginLeft: 0,
    marginRight: 0,
  },
  title: {
    fontSize: 12,
  },
  itemHeaderContainer: {
    display: "flex",
    flexDirection: "row",
  },
  itemHeaderAvatarWrapper: {
    flex: 0.3,
  },
  itemAvatar: {
    width: 50,
    height: 50,
  },
  itemHeaderBodyWrapper: {
    flex: 1,
  },
  itemStatsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  itemStatsColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linkButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  linkButton: {
    alignSelf: "auto",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default RepositoryItem;
