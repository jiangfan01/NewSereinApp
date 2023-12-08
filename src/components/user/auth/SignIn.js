import {StyleSheet, Text, TextInput, View} from "react-native";
import Colors from "../../../constants/Colors";

const signIn = (props) => {
    const {signInParams, setSignInParams} = props
    return (
        <>
            <View style={styles.form}>
                <Text>用户名/电子邮箱</Text>
                <TextInput
                    placeholder="用户名/电子邮箱"
                    onChangeText={(username) =>
                        setSignInParams({...signInParams, username})
                    }
                    style={
                        {
                            backgroundColor: "#eee",
                            borderRadius: 3,
                            paddingLeft: 5,
                            fontSize: 12,
                            marginTop: 5
                        }}
                />

                <Text style={{marginTop: 20}}>密码</Text>
                <TextInput
                    placeholder="密码"
                    secureTextEntry={true}
                    onChangeText={(password) =>
                        setSignInParams({...signInParams, password})
                    }
                    style={
                        {
                            backgroundColor: "#eee",
                            borderRadius: 3,
                            paddingLeft: 5,
                            fontSize: 12,
                            marginTop: 5
                        }}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    segmented: {
        width: 220,
        backgroundColor: 'black'
    },
    submit: {
        fontSize: 18,
        color: Colors.primary
    },
    form: {
        marginTop: 30,
        marginLeft: 40,
        marginRight: 40
    }
});

export default signIn