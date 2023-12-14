import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/Colors";

const LoadMore = (props) => {
    if (props.loadingMore) {
        return <>
            <View style={styles.loadingMoreBox}>
                <ActivityIndicator size="small" color="#1f99b0"/>
                <Text style={styles.loadingMoreText}>正在加载</Text>
            </View>
        </>
    }

    if (props.noMoreData) {
        return <>
            <View style={styles.loadingMoreBox}>
                <Text style={styles.loadingMoreText}>没有更多</Text>
            </View>
        </>
    }
}

const styles = StyleSheet.create({
    loadingMoreBox: {
        marginTop: 20,
    },
    loadingMoreText: {
        fontSize: 12,
        color: Colors.premium,
        textAlign: "center"
    }
})

export default LoadMore