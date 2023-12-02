import {StyleSheet, ScrollView, Text, View, RefreshControl, FlatList} from 'react-native';
import Loading from "../../components/shared/Loading";
import NetworkError from "../../components/shared/NetworkError";
import Colors from "../../constants/Colors";
import {useEffect, useState} from "react";
import {fetchHomeList} from "../../api/home";
import Slide from "../../components/discover/home/Slide";
import Swiper from "../../components/discover/home/Swiper";
import DividerTitle from "../../components/discover/home/DividerTitle";

const HomeScreen = ({navigation}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const init = async () => {
        try {
            setLoading(true);
            const res = await fetchHomeList();
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


    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <View style={styles.course}>

                {/*推荐课程*/}
                <Slide data={data.recommendedCourses} title={"推荐课程"}></Slide>

                {/*课程发布时间*/}
                <Swiper data={data.calendarCourses} title={"课程发布日历"}></Swiper>

                {/*文字栏*/}
                <DividerTitle title={'视频区域'} SubTitle={'VIDEO'}></DividerTitle>
                {/*点赞数课程*/}
                <Swiper data={data.likesCourses} title={"最受欢迎的课程"}></Swiper>
                {/*入门课程*/}
                <Swiper data={data.introductoryCourses} title={"入门课程"}></Swiper>

                {/*文字栏*/}
                <DividerTitle title={'开发教程'} SubTitle={'DOCUMENT'}></DividerTitle>
                {/*推荐课程*/}
                <Swiper data={data.recommendedCourses} title={"推荐课程"}></Swiper>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});


export default HomeScreen;

