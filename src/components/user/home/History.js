import {View, Text, StyleSheet, TouchableWithoutFeedback, RefreshControl, FlatList, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import Colors from "../../../constants/Colors";
import Loading from "../../shared/Loading";
import NetworkError from "../../shared/NetworkError";
import React, {useEffect, useState} from "react";
import {fetchHistories, fetchMe} from "../../../api/user";
import LoadMore from "../../shared/LoadMore";


const History = () => {
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
            const res = await fetchHistories({currentPage});
            setData(res.data)
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
        if(noMoreData) return;

        try {
            currentPage++;
            setLoadingMore(true);
            const res = await fetchHistories({currentPage});
            console.log(res, 313211)
            if (res.data.histories.length === 0) {
                setNoMoreData(true)
            }
            setData({...data, histories: [...data?.histories, ...res?.histories]});
        } catch (e) {
            console.log(e)
        } finally {
            setLoadingMore(false);
        }
    };
    const renderItem = ({item, index}) => (
        <TouchableWithoutFeedback
            key={item.chapter.id}
            onPress={() =>
                navigation.navigate('Courses', {
                    id: item?.course?.id,
                    title: item?.course?.name
                })
            }
        >
            <View style={styles.item}>
                <Image source={{uri: item?.course?.image}} style={styles.image}/>
                <Text style={styles.date}>{item?.course?.name}</Text>
                <Text style={styles.title} numberOfLines={4}> {item?.chapter?.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );


    return (
        <>
            <FlatList
                data={data.histories}
                style={styles.container}
                keyExtractor={item => item?.chapter?.id.toString()}
                renderItem={renderItem}
                onEndReached={onLoadMore}
                onEndReachedThreshold={1}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
            <LoadMore loadingMore={loadingMore} noMoreData={noMoreData}/>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 30
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

export default History