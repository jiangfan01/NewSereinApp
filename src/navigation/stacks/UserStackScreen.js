import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/user/HomeScreen';
import LoginScreen from '../../screens/user/LoginScreen';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardOption from "../options/CardOption";
import {useEffect, useMemo, useReducer, useState} from "react";
import SplashScreen from "../../screens/user/SplashScreen";
import AuthContext from "../../components/user/auth/AuthContext";
import noLogin from "../../screens/user/NoLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignOut from "../../screens/user/SignOut";
import {Alert} from "react-native";
import {sign_in, sign_up} from "../../api/auth";
import {fetchMe} from "../../api/user";
import Colors from "../../constants/Colors";

const UserStack = createNativeStackNavigator();

const UserStackScreen = ({navigation}) => {

    const [stateToken, setStateToken] = useState("")

    /**
     * 登录状态管理
     */
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    useEffect(() => {
        // 重新进入App时从cookie恢复token
        const bootstrapAsync = async () => {
            // 恢复token后，需要验证token是否过期，重新读取任意验证接口，过期销毁
            let userToken = await AsyncStorage.getItem('token')
            const res = await fetchMe()
            if (!res) {
                await AsyncStorage.removeItem('token')
                userToken = null
            }
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        };

        bootstrapAsync().then(r => {
        });
    }, []);

    const authContext = useMemo(
        () => ({
            signIn: async (data) => {
                const usernameOrEmail = data.usernameOrEmail
                const password = data.password
                const confirmPassword = data.confirmPassword
                const res = await sign_in({usernameOrEmail, password, confirmPassword})
                await AsyncStorage.setItem('token', res.data.token)
                setStateToken(res.data.token)
                dispatch({type: 'SIGN_IN', token: res.data.token}); //修改dispatch状态并修改token字段
            },
            signOut: async () => {
                await AsyncStorage.removeItem("token")
                dispatch({type: 'SIGN_OUT'})
                Alert.alert('提示', '退出成功', [
                    {text: '好的', onPress: () => navigation.navigate("NoLogin")},
                ]);
            },
            signUp: async (data) => {
                // 注册,获取到表单值后读取接口存入storage
                const username = data.username
                const password = data.password
                const email = data.email
                const res = await sign_up({username, password, email})
                dispatch({type: 'SIGN_IN', token: ""});
                if (res.code !== 200) {
                    Alert.alert('提示', `${res.message}`, [
                        {text: '好的', onPress: () => navigation.navigate("Login")},
                    ]);
                } else {
                    Alert.alert('提示', `${res.message}，去登录`, [
                        {text: '好的', onPress: () => navigation.navigate("Login")},
                    ]);
                }
            },
        }),
        []
    );
    return (
        <AuthContext.Provider value={authContext}>
            <UserStack.Navigator
                screenOptions={({route, navigation}) => ({
                    headerTitleAlign: "center"
                })}
            >
                {state.isLoading ? (
                    // 没有登录之前加载loading
                    <UserStack.Screen name="Splash" component={SplashScreen}/>
                ) : state.userToken == null ? (
                    <>
                        {/*没有token页面*/}
                        <UserStack.Screen
                            name="NoLogin"
                            component={noLogin}
                            options={({navigation, route}) => ({
                                title: '登录',
                                ...HeaderButtonsOption(navigation),
                            })}
                        />
                        {/*注册表单页*/}
                        <UserStack.Screen
                            name="Login"
                            component={LoginScreen}
                            screenOptions={({route, navigation}) => ({
                                headerTintColor: Colors.primary,
                                animation: 'slide_from_left',
                            })}
                        />
                    </>
                ) : (
                    <>
                        <UserStack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={({navigation, route}) => ({
                                ...HeaderButtonsOption(navigation),
                                title: '我的',
                            })}
                        />
                        <UserStack.Screen
                            name="SignOut"
                            component={SignOut}
                            options={({navigation, route}) => ({})}
                        />
                    </>
                )}
            </UserStack.Navigator>
        </AuthContext.Provider>
    );
};

export default UserStackScreen;