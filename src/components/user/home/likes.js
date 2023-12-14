import {View, Text, StyleSheet, TouchableWithoutFeedback, RefreshControl, FlatList, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import Colors from "../../../constants/Colors";
import Loading from "../../shared/Loading";
import NetworkError from "../../shared/NetworkError";
import React, {useEffect, useState} from "react";
import {fetchHistories, fetchLikes, fetchMe} from "../../../api/user";


const Likes = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false)
    const [noMoreData, setNoMoreData] = useState(false)
    let currentPage = `1`

    const init = async () => {
        try {
            setLoading(true);
            const res = await fetchLikes();
            console.log(res.data.courses, 312321)
            setData(res.data);
            setDataLoaded(true);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await init();
        setRefreshing(false);
    };

    useEffect(() => {
        init().then();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <NetworkError onReload={init}/>;
    }

    if (!dataLoaded || !data) {
        return null;
    }

    const onLoadMore = async () => {
        currentPage++;
        try {
            setLoadingMore(true);
            const res = await fetchLikes({currentPage});
            console.log(res, 321321321)
            if (res.data.courses.length === 0) {
                setNoMoreData(true)
                setData({courses: [...data?.courses, ...res?.courses]});
            } else {
                setData({courses: [...data?.courses, ...res?.courses]});
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoadingMore(false);
        }
    };


    const renderItem = ({item, index}) => (
        <TouchableWithoutFeedback
            key={item.id}
            onPress={() =>
                navigation.navigate('Courses', {
                    id: item.id,
                    title: item.name
                })
            }
        >
            <View style={styles.item}>
                <Image source={{uri: item.image}} style={styles.image}/>
                <Text style={styles.date}>{item.name}</Text>
                <Text style={styles.title} numberOfLines={4}> {item.content}</Text>
            </View>
        </TouchableWithoutFeedback>
    );


    return (
        <>
            <FlatList
                data={data?.courses}
                style={styles.container}
                keyExtractor={(item) => item?.course?.id.toString()}
                renderItem={renderItem}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.1}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15
    },
    item: {
        marginBottom: 30
    },
    slide: {
        marginLeft: 15,
        marginRight: 15,
        width: '100%',
    },
    image: {
        width: "100%",
        height: 210,
        resizeMode: "cover",
        borderRadius: 5,
    },
    date: {
        color: Colors.primary,
        fontSize: 12,
        marginTop: 6,
        marginBottom: 4,
        textAlign: "center"
    },
    title: {
        fontSize: 14,
        color: '#b7b6b6',
        textAlign: "center"
    },

});

export default Likes