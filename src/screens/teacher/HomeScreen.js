import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import {Avatar} from "react-native-paper";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            {/* 背景颜色 */}
            <View style={styles.overlay}/>


            {/* 头像居中 */}
            <View style={styles.avatarContainer}>
                <Avatar.Image
                    style={styles.avatar}
                    source={{uri: "http://s49b16nfk.hn-bkt.clouddn.com/47c91d5c-42a8-4511-b25f-64ee98cc8590.jpeg"}}
                    size={150}
                />
            </View>

            {/* 老师名字 */}
            <Text style={styles.teacherName}>教师名</Text>
            <Text style={styles.teacherName}>Serein</Text>
            {/* 介绍卡片 */}
            <View style={styles.introCard}>
                <View style={styles.introText}>
                    <Text style={styles.intro}>一名苦命的前端开发工程师</Text>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    blurContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    teacherName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
        marginLeft: 20,
        textAlign: "center"
    },
    introCard: {
        backgroundColor: 'rgba(200,194,194,0.5)',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        marginTop: 80,
    },
    introText: {
        display: "flex",
        flexDirection: "column"
    },
    intro: {
        fontSize: 16,
        marginTop: 10
    }
});

export default HomeScreen;