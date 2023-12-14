import {StyleSheet, Text,} from "react-native";
import ScrollableTabView, {ScrollableTabBar} from 'clwy-expo-scrollable-tab-view';
import Colors from "../../constants/Colors";
import React from "react";
import History from "../../components/user/home/History";
import Likes from "../../components/user/home/likes";
import UserHome from "../../components/user/home/UserHome";

const HomeScreen = () => {
    return (
        <>
            <ScrollableTabView
                style={styles.container}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarUnderlineStyle={{backgroundColor: Colors.primary}}
                tabBarBackgroundColor={Colors.white}
                tabBarInactiveTextColor={Colors.tabBarInactiveText}
                tabBarActiveTextColor={Colors.tabBarActiveText}
                tabBarTextStyle={{fontWeight: '400'}}
            >
                {/*主页*/}
                <UserHome tabLabel="我的主页"></UserHome>

                {/*浏览历史*/}
                <History tabLabel="浏览历史"/>

                {/*点赞记录*/}
                <Likes tabLabel="我的点赞"/>

            </ScrollableTabView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
export default HomeScreen