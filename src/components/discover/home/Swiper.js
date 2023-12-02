import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Colors from "../../../constants/Colors";
import {useNavigation} from '@react-navigation/native'
import NoImage from "../../shared/NoImage";
import * as React from "react";
import NoData from "../../shared/NoData";

const App = ({data, title}) => {
    const navigation = useNavigation();

    const renderImage = (item) => {
        if (item.image) {
            return <Image source={{uri: item.image}} style={styles.image}/>;
        } else {
            return <NoImage/>;
        }
    };

    // 没有数据时
    if (!data || data.length === 0) {
        return <NoData/>;
    }

    const renderItem = ({item, index}) => (
        <TouchableWithoutFeedback
            onPress={() =>
                navigation.navigate('Courses', {
                    id: item.id,
                    title: item.name,
                })
            }>
            <View style={[styles.default, index === 0 && styles.first, index === data.length - 1 && styles.last]}>
                {renderImage(item)}
                <View style={styles.titleWrapper}>
                    <Text style={styles.title} numberOfLines={2}>
                        {item.name}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );


    return (
        <>
            <View style={styles.box}>
                <View style={styles.content}>
                    <Text style={styles.heading}>{title}</Text>
                </View>
                {data ? <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                /> : <NoData />}

            </View>
        </>
    )


}

const styles = StyleSheet.create({
    box: {
        marginTop: 30,
        marginBottom: 30
    },

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
export default App