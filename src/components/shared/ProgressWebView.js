import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Colors from '../../constants/Colors';

// 自定义进度条
const ProgressBar = props => {
    const style = {
        width: `${props.progress * 100}%`,
    };
    return <View style={[styles.loadingBar, style]}/>;
};

// 带进度条的 WebView
const ProgressWebView = props => {
    const [progress, setProgress] = useState(0);

    return (
        <View>
            <ProgressBar progress={progress}/>
            <WebView
                userAgent="clwy-app"
                onLoadProgress={({nativeEvent}) => {
                    // 设置 percent 为 0...1，有小数
                    setProgress(nativeEvent.progress);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    loadingBar: {
        backgroundColor: Colors.primary,
        height: 2,
    },
});

export default ProgressWebView;