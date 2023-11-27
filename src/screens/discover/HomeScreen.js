import {StyleSheet, ScrollView, Text, View, RefreshControl, FlatList} from 'react-native';
import Loading from "../../components/shared/Loading";
import NetworkError from "../../components/shared/NetworkError";
import Colors from "../../constants/Colors";
import axios from "axios";

const url = "/home"
const HomeScreen = ({navigation}) => {


    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(url)}/>}>
            <View style={styles.course}>
                <View style={styles.content}>
                    <Text style={styles.heading}>推荐课程</Text>
                </View>
                <FlatList
                    data={data.calendar_courses}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    course: {
        marginTop: 20,
    },
    content: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    default: {
        position: 'relative',
        width: 206,
        marginLeft: 8,
    },
    first: {
        marginLeft: 15,
    },
    last: {
        marginRight: 15,
    },
    image: {
        width: 206,
        height: 160,
        borderRadius: 5,
    },
    titleWrapper: {
        marginTop: 6,
        height: 48,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
    },
    date: {
        fontSize: 12,
        marginTop: 6,
        color: Colors.date,
    },
});

export default HomeScreen;

