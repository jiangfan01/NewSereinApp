import * as React from 'react';
import ProgressWebView from '../../components/shared/ProgressWebView';
import {WebView} from "react-native-webview";
import {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/Colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import WebViewError from "../../components/shared/WebViewError";

const ArticlesScreen = ({route}) => {

    // 因域名服务器到期webView失效
    // const [webUrl, setWebUrl] = useState(`http://localhost:5173/show_article/${route?.params?.id}`)
    // return <WebView
    //     source={{uri: webUrl}}
    // />;
    return (
        <WebViewError/>
    )

}


export default ArticlesScreen;