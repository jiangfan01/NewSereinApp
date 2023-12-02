import {
    StyleSheet,
    Text,
    View
} from "react-native";

const App = ({title,SubTitle}) => {

    return (
        <>
            <View style={styles.content}>
                <Text style={styles.line}>——</Text>
                <View style={styles.TextTitle}>
                    <Text style={styles.text}>{title}</Text>
                    <Text style={styles.TextEnglish}>{SubTitle}</Text>
                </View>
                <Text style={styles.line}>——</Text>
            </View>
        </>
    )


}

const styles = StyleSheet.create({
    content: {
        display: "flex",
        justifyContent: "center",
        flexDirection: 'row',

    },
    TextTitle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    TextEnglish: {
        fontSize: 16,
        fontWeight: "bold",
    },
    line: {
        display: "flex",
        flexDirection: 'row',
        fontSize: 28,
        fontWeight: "bold",
        width: 50,
        textAlign: "center"
    },
    text: {
        fontSize: 25,
        marginLeft: 10,
        marginRight: 10,
        fontWeight: "bold"
    }
});
export default App