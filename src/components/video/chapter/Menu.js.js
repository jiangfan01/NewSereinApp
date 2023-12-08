import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableHighlight, RefreshControl,
} from 'react-native';
import Feather from "@expo/vector-icons/Feather";
import Colors from "../../../constants/Colors";
import {fetchCourses} from "../../../api/courses";

const Menu = (props) => {
    const {chapters, course, courseId, onItemSelected} = props;
    const [data, setData] = useState({})
    const [refreshing, setRefreshing] = useState(false);
    const init = async () => {
        const res = await fetchCourses(courseId)
        setData(res.data)
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await init();
        setRefreshing(false);
    };

    useEffect(() => {
        init().then()
    }, []);

    // 顶部标题
    const renderItem = ({item}) => {
        return (
            <>
                <TouchableHighlight
                    underlayColor="#ddd"
                    onPress={() => onItemSelected(item.id, item.title)}
                    key={item.id}
                >
                    <View style={styles.item}>
                        <Feather name="play" size={18} color={Colors.primary} style={styles.icon}/>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                </TouchableHighlight>
            </>
        )
    }

    const ListHeader = () => {
        return (
            <>
                <View style={styles.header}>
                    {/*<Text style={styles.headerText}>所属课程</Text>*/}
                    <Text style={styles.headerText}>{data?.course?.name}</Text>
                </View>
            </>
        )
    }

    const ItemSeparatorComponent = () => {
        return (
            <>
                <View style={{
                    backgroundColor: 'rgba(221,221,221,0.6)',
                    height: 1
                }}></View>
            </>
        )
    }

    return (
        <>
            <FlatList
                data={chapters}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                style={styles.container}
                ListHeaderComponent={ListHeader}
                ItemSeparatorComponent={ItemSeparatorComponent}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        marginLeft: 15,
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(221,221,221,0.6)',
    },
    title: {
        marginLeft: 10,
        fontSize: 15,
        width: 210
    },
    icon: {},
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        backgroundColor: 'rgba(221,221,221,0.6)',
        fontSize: 20,
        lineHeight: 42,
        height: 42,
        paddingLeft: 15,
        width: 300,
        textAlign: "center"
    }
});

export default Menu;
