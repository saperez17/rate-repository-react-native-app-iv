import React from "react";
import { Pressable as NativePressable, StyleSheet } from "react-native";
import theme from "../theme";

const Button = ({ style, children, expand, ...props }) => {

  const combinedStyles = [
      styles.button,
      expand && styles.expanded,
      style && style];
  return <NativePressable style={combinedStyles} {...props}>{children}</NativePressable>;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textPrimary,
    alignSelf: "flex-start",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 3,
  },
  expanded: {
      width: '100%'
  }
});

export default Button;
