import {useState} from 'react'
import {View, StyleSheet, Text, Button, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";

const NoLogin = () => {

    const navigation = useNavigation()

    return (
        <View style={[styles.container]}>
            <TouchableWithoutFeedback
                onPress={() =>
                    navigation.navigate('Login',)
                }
            >
                <Text style={styles.login}>登录</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.loginText}>请先登录</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "center"
    },
    login: {
        backgroundColor: Colors.primary,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 5,
        color: 'white'
    },
    loginText: {
        marginTop: 20,
        fontSize: 12,
        textAlign: "center"
    }

});

export default NoLogin;