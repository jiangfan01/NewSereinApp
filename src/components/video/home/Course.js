import {Image, FlatList, RefreshControl, TouchableWithoutFeedback, View, StyleSheet, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {fetchCourses, fetchCoursesList} from "../../../api/courses";
import Loading from "../../shared/Loading";
import NetworkError from "../../shared/NetworkError";
import Colors from "../../../constants/Colors";
import * as React from "react";
import NoData from "../../shared/NoData";

const Course = (props) => {
    const navigation = useNavigation();
    const categoryId = props.categoryId;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const init = async () => {
        try {
            setLoading(true);
            const res = await fetchCoursesList({categoryId: categoryId});
            setDataLoaded(true);
            setData(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        init().then();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await init();
        setRefreshing(false);
    };

    if (error) {
        return <NetworkError onReload={init}/>;
    }

    if (!dataLoaded || !data) {
        return null;
    }

    const renderItem = ({item, index}) => (
        <TouchableWithoutFeedback
            key={item.id}
            onPress={() =>
                navigation.navigate('Courses', {
                    id: item.id,
                    title: item.name,
                })
            }
        >
            <View style={styles.item}>
                <Image
                    source={item.image ? {uri: item.image} : require('../../../../assets/images/noImage.png')}
                    style={styles.image}
                    defaultSource={require('../../../../assets/images/noImage.png')}
                />
                <Text style={styles.date}>{item.name}</Text>
                <Text style={styles.title} numberOfLines={4}> {item.content}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <>
            {data.courses && data.courses.length > 0 ? (
                <FlatList
                    data={data.courses}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    style={styles.container}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                />
            ) : (
                <NoData/>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
    },
    item: {
        marginBottom: 30,
    },
    slide: {
        marginLeft: 15,
        marginRight: 15,
        width: '100%',
    },
    image: {
        width: '100%',
        height: 210,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    date: {
        color: Colors.primary,
        fontSize: 12,
        marginTop: 6,
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        color: '#b7b6b6',
    },
});

export default Course;
