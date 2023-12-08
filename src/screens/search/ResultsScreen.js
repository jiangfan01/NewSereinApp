import {View, Text, FlatList, RefreshControl, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';
import Loading from "../../components/shared/Loading";
import NetworkError from "../../components/shared/NetworkError";
import Colors from "../../constants/Colors";
import {useEffect, useState} from "react";
import {fetchCourses, fetchCoursesList} from "../../api/courses";
import {useNavigation} from "@react-navigation/native";

const ResultsScreen = ({route}) => {
    const navigation = useNavigation()
    const searchParams = route?.params?.name
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [endReached, setEndReached] = useState(false);

    const init = async () => {
        try {
            setLoading(true)
            const res = await fetchCoursesList({name: searchParams})
            setData(res.data)
            setDataLoaded(true);
            if (res.data.courses.length === 0) {
                setEndReached(true);
            }
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
        init().then()
    }, []);


    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <NetworkError onReload={init}/>;
    }

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
                data={data.courses}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                style={styles.container}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
        </>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
       margin:15
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
    },
    title: {
        fontSize: 14,
        color: '#b7b6b6'
    },
});
export default ResultsScreen;