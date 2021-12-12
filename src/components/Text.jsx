import React from "react";
import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.textPrimary,
  },
  colorWhite: {
    color: theme.colors.white,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  whiteShadow1: { color: theme.colors.whiteShadow1 },
  centered: {
    display: "flex",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  mt,
  mr,
  mb,
  ml,
  centered,
  style,
  ...props
}) => {
  const margins = (marginKey, value) => {
    switch (marginKey) {
      case "mt":
        return {
          marginTop: value,
        };
      case "mr":
        return {
          marginRight: value,
        };
      case "mb":
        return {
          marginBottom: value,
        };
      case "ml":
        return {
          marginLeft: value,
        };
      default:
        null;
    }
  };
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    color === "white" && styles.colorWhite,
    color == "whiteShadow1" && styles.whiteShadow1,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    mt && margins("mt", mt),
    mr && margins("mr", mr),
    mb && margins("mb", mb),
    ml && margins("ml", ml),
    centered && styles.centered,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
