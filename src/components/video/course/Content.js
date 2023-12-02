import {Dimensions, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {LinearGradient} from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../../constants/Colors';
import {useState} from "react";

const screen = Dimensions.get('window');
const Content = (props) => {
    const content = props?.data?.content
    const [collapsed, setCollapsed] = useState(true);
    return (
        <View style={styles.container}>
            <View style={styles.chapterNumber}><Text
                style={styles.NumberText}>全{props?.data?.chapters?.length}回</Text></View>
            <View style={styles.title}><Text style={styles.titleText}>{props?.data?.name}</Text></View>
            <View style={{position: 'relative'}}>
                <Collapsible collapsed={collapsed} collapsedHeight={62} duration={300}>
                    <Text style={styles.body}>
                        {content}
                    </Text>
                </Collapsible>

                <LinearGradient
                    colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255,1)']}
                    style={[styles.linearGradient, {height: collapsed ? 42 : 0}]}
                />
            </View>

            <TouchableOpacity onPress={() => setCollapsed(!collapsed)} style={{marginTop: 12}}>
                <Ionicons
                    name={collapsed ? 'chevron-down' : 'chevron-up'}
                    size={25}
                    color={collapsed ? Colors.primary : '#8F8C90'}
                    style={styles.collapseIcon}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15
    },
    body: {
        fontSize: 13,
        color: '#241F25',
        lineHeight: 20,
        marginBottom: 5
    },
    linearGradient: {
        position: 'absolute',
        bottom: 0,
        width: screen.width,
    },
    collapseIcon: {
        textAlign: 'center',
    },
    chapterNumber: {
        backgroundColor: Colors.primary,
        width: 50,

    },
    NumberText: {
        color: "white",
        textAlign: "center"
    },
    title: {
        marginTop: 10,
        marginRight: 10
    },
    titleText: {
        fontSize: 18,
        color: Colors.navbarBottom,
        fontWeight: "bold"

    },
});


export default Content