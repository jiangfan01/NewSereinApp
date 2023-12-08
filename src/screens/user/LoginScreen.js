import {useState, useCallback, useLayoutEffect, useContext} from 'react'
import {View, StyleSheet, Button, Text, TouchableWithoutFeedback, TextInput} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import Colors from '../../constants/Colors';
import Sign from "../../components/user/auth/SignIn";
import SignUp from "../../components/user/auth/SignUp";
import AuthContext from "../../components/user/auth/AuthContext";

const LoginScreen = ({navigation, props}) => {
    const {signIn, signUp} = useContext(AuthContext);

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [signInParams, setSignInParams] = useState({username: "", password: ""})
    const [signUpParams, setSignUpParams] = useState({username: "1111111", password: "", sex: 0})
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <SegmentedControl
                    values={['登录', '会员注册']}
                    selectedIndex={selectedIndex}
                    tintColor={Colors.primary}
                    style={styles.segmented}
                    fontStyle={{color: Colors.headerTitle}}
                    activeFontStyle={{color: Colors.white}}
                    onChange={event => {
                        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                    }}
                />
            ),
            headerTitleStyle: {
                color: '#fff',
            },
            headerRight: () => (
                <TouchableWithoutFeedback
                    onPress={() => submit()}
                >
                    <Text style={styles.submit}>提交</Text>
                </TouchableWithoutFeedback>
            ),
            headerTintColor: Colors.primary, // 设置标题栏颜色
        });
    }, [navigation, selectedIndex, submit, signInParams, signUpParams]);

    // 提交
    const submit = useCallback(() => {
        if (selectedIndex === 0) {
            signIn(signInParams)
        } else {
            signUp(signUpParams)
        }
    }, [signInParams, signUpParams])

    return (
        <View style={styles.container}>
            {selectedIndex === 0 ? (
                <Sign signInParams={signInParams} setSignInParams={setSignInParams}/>
            ) : (
                <>
                    <Text>
                        {}
                    </Text>
                    <SignUp signUpParams={signUpParams} setSignUpParams={setSignUpParams}/>
                </>
            )}
        </View>
    );
};

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

export default LoginScreen;