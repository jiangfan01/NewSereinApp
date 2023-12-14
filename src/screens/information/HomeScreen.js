import {Text, View, Button, RefreshControl, FlatList, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import React, {useEffect, useState} from "react";
import {fetchArticlesList} from "../../api/articles";
import Loading from "../../components/shared/Loading";
import NetworkError from "../../components/shared/NetworkError";
import NoData from "../../components/shared/NoData";
import LoadMore from "../../components/shared/LoadMore";
import {fetchHistories} from "../../api/user";

const HomeScreen = ({navigation}) => {
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
            setLoading(true)
            const res = await fetchArticlesList()
            setData(res.data)
            setDataLoaded(true);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false)
        }
    }

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
        return <NoData/>;
    }

    const onLoadMore = async () => {
        try {
            currentPage++;
            setLoadingMore(true);
            const res = await fetchHistories({currentPage});
            console.log(res, 313211)
            if (res.data.articles.length === 0) {
                setNoMoreData(true)
                setData({articles: [...data?.articles, ...res?.articles]});
            } else {
                setData({articles: [...data?.articles, ...res?.articles]});
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
                navigation.navigate('Articles', {
                    id: item.id,
                    title: item.title
                })
            }
        >
            <View style={styles.box}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{item.createdAt}</Text>
            </View>
        </TouchableWithoutFeedback>
    );


    return (
        <>
            <FlatList
                data={data.articles}
                style={styles.container}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
            <LoadMore loadingMore={loadingMore} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15
    },
    box: {
        marginTop: 20,
        flex: 0.3,
        borderBottomWidth: 1,
        borderColor: '#dcdcdc',
    },
    time: {
        textAlign: "right",
        paddingTop: 20,
        paddingBottom: 15,
        color: '#767676',
    },
    content: {color: "#767676"},

});

export default HomeScreen;