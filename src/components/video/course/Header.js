import {TouchableOpacity, View, StyleSheet, Image, Alert} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {newLike} from "../../../api/likes";
import {fetchLiked} from "../../../api/user";

const Header = (props) => {
    const image = props?.data?.image
    const userId = props?.data?.userId
    const courseId = props?.data?.id
    const id = props.courseId
    const [isLike, setIsLike] = useState(Boolean)
    const [token, setToken] = useState("")

    const getToken = async () => {
        setToken(await AsyncStorage.getItem("token"))
    }

    const isLiked = async () => {
        const res = await fetchLiked({courseId})
        setIsLike(res.data.liked)
        console.log(res, 3333)
    }

    const onLike = async () => {
        if (!token) {
            Alert.alert('暂未登录', '请先登录', [
                {text: '好的',},
            ]);
        } else {
            await newLike({userId, courseId})
            setIsLike(!isLike)
        }
    }


    useEffect(() => {
        isLiked().then()
        getToken().then()
    }, []);

    return (
        <>
            <View style={styles.header}>
                <Image style={styles.image} source={{uri: image}}></Image>

                <View style={styles.icon}>
                    <TouchableOpacity
                    >
                        <View style={styles.icons}>
                            <Ionicons
                                name="share-social-outline"
                                size={24} color="gray"
                                style={styles.iconFlex}
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.icons}>
                        <TouchableOpacity
                            onPress={onLike}>
                            {isLike ?
                                <Ionicons
                                    name="ios-heart"
                                    size={24} color="pink"
                                    style={styles.iconFlex}
                                />
                                :
                                <Ionicons
                                    name="ios-heart-outline"
                                    size={24} color="gray"
                                    style={styles.iconFlex}
                                />
                            }

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        position: "relative",
    },
    icon: {
        flexDirection: "row",
        position: "absolute",
        bottom: -20,
        right: 20,
    },
    iconFlex: {},
    icons: {
        justifyContent: "center",
        alignItems: "center",
        width: 42,
        height: 42,
        borderWidth: 1,
        borderRadius: 21,
        backgroundColor: "#fff",
        borderColor: "#d1d1d1",
        marginRight: 5,
        zIndex: 99
    },

    image: {
        width: "100%",
        height: 210
    }
});


export default Header