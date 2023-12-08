import {StyleSheet, Text, TextInput, View} from "react-native";
import Colors from "../../../constants/Colors";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {useState} from "react";

const signIn = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const {signUpParams, setSignUpParams} = props
    return (
        <>
            <View style={styles.form}>
                <Text>用户名/电子邮箱</Text>
                <TextInput
                    onChangeText={(username) =>
                        setSignUpParams({...signUpParams, username})
                    }
                    placeholder="用户名/电子邮箱"
                    style={{backgroundColor: "#eee", borderRadius: 3, paddingLeft: 5, fontSize: 12, marginTop: 5}}
                />

                <Text style={{marginTop: 20}}>密码</Text>
                <TextInput
                    onChangeText={(password) =>
                        setSignUpParams({...signUpParams, password})
                    }
                    placeholder="密码" secureTextEntry={true}
                    style={{backgroundColor: "#eee", borderRadius: 3, paddingLeft: 5, fontSize: 12, marginTop: 5}}
                />
                <Text style={{marginTop: 20}}>性别</Text>
                <View style={styles.container}>
                    <SegmentedControl
                        values={['男', '女']}
                        selectedIndex={selectedIndex}
                        tintColor={Colors.primary}
                        style={styles.segmented}
                        fontStyle={{color: Colors.black}}
                        activeFontStyle={{color: Colors.white}}
                        onChange={event => {
                            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                        }}
                    />
                </View>
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
        backgroundColor: 'white'
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