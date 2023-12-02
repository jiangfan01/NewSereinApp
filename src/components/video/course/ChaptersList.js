import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import Colors from "../../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ChaptersList = (props) => {
    const navigation = useNavigation()
    const ListItem = props?.data?.chapters.map(item => (
        <TouchableWithoutFeedback
            key={item.id}
            onPress={() => {
                navigation.navigate('ChapterStack', {
                    screen: "Chapters",
                    params: {
                        id: item.id,
                        title: item.title
                    }
                })
            }
            }
        >
            <View style={[styles.item]}>
                <View style={styles.left}>
                    <Feather
                        style={styles.icon}
                        name="play"
                        size={24} color={Colors.primary}
                    />
                </View>
                <View style={styles.right}>
                    <Text style={styles.numberText}>{item.sort}</Text>
                    <View style={styles.chapter}>
                        <View>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View style={styles.introduce}>
                            <Text style={styles.free}>免费</Text>
                            <Text style={styles.time}>{item.createdAt}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    ))
    return (
        <>
            {props?.data?.chapters && props?.data?.chapters.length > 0 ? (
                [...ListItem]
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>暂无视频</Text>
                    <MaterialCommunityIcons
                        name="database-remove-outline"
                        size={50} color="gray"
                    />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        height: 80,
        borderBottomWidth: 1,
        borderColor: "#dfdfdf",
        display: "flex",
        flexDirection: "row"
    },
    icon: {
        lineHeight: 80
    },

    left: {
        marginLeft: 30,
    },
    right: {
        display: "flex",
        flexDirection: "row"
    },
    numberText: {
        lineHeight: 80,
        marginLeft: 30
    },
    chapter: {
        marginLeft: 15
    },

    introduce: {
        display: "flex",
        flexDirection: "row",
        marginTop: 15
    },
    title: {
        marginTop: 10,
        fontSize: 14,
        width: 320
    },
    free: {
        backgroundColor: Colors.primary,
        color: "white",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 2,
        fontSize: 12
    },
    time: {
        marginLeft: 10,
        color: '#807a7a'
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 20,
        color: '#999',
        marginTop: 10,
        marginBottom:20
    },
});

export default ChaptersList