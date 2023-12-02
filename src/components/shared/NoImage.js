import {Image, StyleSheet} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const NoImage = () => {
    return (
        <Image
            source={require("../../../assets/images/noImage.png")}
            style={styles.image}
        />
    );
};
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 160,
        borderRadius: 5,
    },
});
export default NoImage;