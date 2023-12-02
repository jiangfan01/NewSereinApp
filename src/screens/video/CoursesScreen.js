import {View, Text, Button, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {useEffect, useState} from "react";
import {fetchHomeList} from "../../api/home";
import Loading from "../../components/shared/Loading";
import NetworkError from "../../components/shared/NetworkError";
import {fetchCourses} from "../../api/courses";
import Header from "../../components/video/course/Header";
import Content from "../../components/video/course/Content";
import ChaptersList from "../../components/video/course/ChaptersList";
import Teacher from "../../components/video/course/Teacher";

const CoursesScreen = ({navigation, route}) => {
    const courseId = route.params.id
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const init = async () => {
        try {
            setLoading(true);
            const res = await fetchCourses(courseId);
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
        <ScrollView style={styles.box}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

            {/*分享点赞*/}
            <View>
                <Header data={data.course} courseId={data?.course?.id}/>
            </View>

            {/*标题介绍*/}
            <Content data={data.course}/>

            {/*章节视频*/}
            <View style={styles.list}>
                <ChaptersList data={data.course}/>
            </View>

            {/*老师*/}
            <View style={styles.teacher}>
                <Teacher data={data.course}/>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#fff',
    },
    list: {
        marginTop: 50,
        marginBottom: 60
    },
    teacher: {
        marginBottom: 30
    }
});


export default CoursesScreen;