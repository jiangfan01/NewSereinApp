import {StyleSheet, Text, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";
import * as React from "react";

const WebViewError = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.title}>
                    <MaterialIcons
                        name="error-outline"
                        size={48} color="gray"/>
                    <Text style={styles.titleText}>因为服务器，域名到期，webView暂时无法访问！</Text>
                </View>
            </View>
        </>
    )

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 200
    },
    title: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 24,
        marginTop: 10,
        fontWeight: "bold",
        width: 300,
        textAlign: "center"
    },
});
export default WebViewError