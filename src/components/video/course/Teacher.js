import {StyleSheet, TouchableWithoutFeedback, View, Text, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Teacher = (props) => {
    const navigation = useNavigation()
    return (
        <>
            <TouchableWithoutFeedback
                onPress={() =>
                    navigation.navigate('Teacher', {
                        title: props?.data?.user?.username
                    })
                }
            >
                <View style={styles.teacher}>
                    <Text style={styles.lectures}>授课老师</Text>
                    <View style={styles.teacherIntroduce}>
                        <Image style={styles.avatar} source={{uri: props?.data?.user?.avatar}}></Image>
                        <View style={styles.teacherInfo}>
                            <Text style={styles.name}>{props?.data?.user?.username}</Text>
                            <Text style={styles.introduce}>{props?.data?.user?.signature}</Text>
                        </View>
                    </View>

                </View>

            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    teacher: {
        marginLeft: 15,
    },
    lectures: {
        fontSize: 20,
        fontWeight: "bold"
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        marginTop: 20,
    },
    name: {
        position: "absolute",
        top: 0,
        fontSize: 14,
        fontWeight: "bold"
    },
    teacherIntroduce: {
        display: "flex",
        flexDirection: "row"
    },
    teacherInfo: {
        position: "relative",
        width: 100,
        marginTop: 20,
        marginLeft: 15,
        height: 60
    },
    introduce: {
        position: "absolute",
        bottom: 0,
        color: '#6f6f6f'
    }


})
export default Teacher