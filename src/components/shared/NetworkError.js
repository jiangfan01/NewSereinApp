import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '../../constants/Colors';
import {useEffect, useState} from "react";

const NetworkError = props => {
    const { onReload, loading } = props;
    const [pressed, setPressed] = useState(false);

    const handlePress = () => {
        setPressed(true);
        onReload();
    };

    useEffect(() => {
        if (pressed) {
            const timeout = setTimeout(() => {
                setPressed(false);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [pressed]);

    return (
        <View style={styles.notice}>
            <SimpleLineIcons name={'drawer'} size={160} color={'#ddd'} />
            <Text style={styles.noticeMsg}>Oops，网络出现故障，请点击</Text>
            <TouchableOpacity  onPress={handlePress}
                               style={[styles.reload, pressed && { opacity: 0.7 }]}>
                <View style={styles.labelWrapper}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.label}>重新加载</Text>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    notice: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noticeMsg: {
        color: '#999',
    },
    labelWrapper: {
        backgroundColor: Colors.primary,
        height: 40,
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        color: '#fff',
        lineHeight: 40,
    },
    reload: {
        marginTop: 10,
    },
});

export default NetworkError;