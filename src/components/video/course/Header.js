import {TouchableOpacity, View, StyleSheet, Image} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = (props) => {
    const image = props?.data?.image
    const userId = props?.data?.userId
    const courseId = props?.data?.id
    const id = props.courseId

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
                        >
                            <Ionicons
                                name="ios-heart-outline"
                                size={24} color="gray"
                                style={styles.iconFlex}
                            />
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