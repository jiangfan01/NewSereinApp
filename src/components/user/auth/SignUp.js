import {StyleSheet, Text, TextInput, View} from "react-native";
import Colors from "../../../constants/Colors";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {useState} from "react";

const signUp = ({ signUpParams, setSignUpParams }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        // 简单的邮箱格式验证正则表达式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (email) => {
        setSignUpParams({ ...signUpParams, email });

        // 验证邮箱格式
        if (!validateEmail(email)) {
            setEmailError('请输入有效的邮箱地址');
        } else {
            setEmailError('');
        }
    };

    return (
        <>
            <View style={styles.form}>
                <Text>用户名</Text>
                <TextInput
                    onChangeText={(username) =>
                        setSignUpParams({ ...signUpParams, username })
                    }
                    placeholder="用户名"
                    style={{
                        backgroundColor: '#eee',
                        borderRadius: 3,
                        paddingLeft: 5,
                        fontSize: 12,
                        marginTop: 5,
                    }}
                />

                <Text style={{ marginTop: 20 }}>邮箱地址</Text>
                <TextInput
                    onChangeText={handleEmailChange}
                    placeholder="邮箱地址"
                    style={{
                        backgroundColor: '#eee',
                        borderRadius: 3,
                        paddingLeft: 5,
                        fontSize: 12,
                        marginTop: 5,
                    }}
                />
                {emailError ? (
                    <Text style={{ color: 'red' }}>{emailError}</Text>
                ) : null}

                <Text style={{ marginTop: 20 }}>密码</Text>
                <TextInput
                    onChangeText={(password) =>
                        setSignUpParams({ ...signUpParams, password })
                    }
                    placeholder="密码"
                    secureTextEntry={true}
                    style={{
                        backgroundColor: '#eee',
                        borderRadius: 3,
                        paddingLeft: 5,
                        fontSize: 12,
                        marginTop: 5,
                    }}
                />
                <Text style={{ marginTop: 20 }}>性别</Text>
                <View style={styles.container}>
                    <SegmentedControl
                        values={['男', '女']}
                        selectedIndex={selectedIndex}
                        tintColor={Colors.primary}
                        style={styles.segmented}
                        fontStyle={{ color: Colors.black }}
                        activeFontStyle={{ color: Colors.white }}
                        onChange={(event) => {
                            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                        }}
                    />
                </View>
            </View>
        </>
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

export default signUp