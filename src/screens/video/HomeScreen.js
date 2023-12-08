import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'clwy-expo-scrollable-tab-view';
import Colors from '../../constants/Colors';
import Loading from "../../components/shared/Loading";
import NetworkError from "../../components/shared/NetworkError";
import Course from "../../components/video/home/Course";
import {fetchCategoriesList} from "../../api/categories";

const HomeScreen = ({navigation}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(null);
    const init = async () => {
        try {
            setLoading(true)
            const res = await fetchCategoriesList()
            setData(res.data)
            setDataLoaded(true);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        init().then();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    if (!dataLoaded || !data) {
        return null;
    }

    if (error) {
        return <NetworkError/>
    }

    return (
        <ScrollableTabView
            initialPage={0}
            style={styles.container}
            renderTabBar={() => <ScrollableTabBar/>}
            tabBarUnderlineStyle={{backgroundColor: Colors.primary}}
            tabBarBackgroundColor={Colors.white}
            tabBarInactiveTextColor={Colors.tabBarInactiveText}
            tabBarActiveTextColor={Colors.tabBarActiveText}
            tabBarTextStyle={{fontWeight: '400'}}
        >
            {data.categories.map(item => (
                <Course
                    tabLabel={item.name} categoryId={item.id} key={item.id}/>
            ))}
        </ScrollableTabView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});


export default HomeScreen;