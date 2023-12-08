import {View, Text, Button, StyleSheet, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import Colors from "../../constants/Colors";
import Menu from "../../components/video/chapter/Menu.js";
import {useEffect, useLayoutEffect, useState} from "react";
import {fetchChapter} from "../../api/chapters";
import Feather from "@expo/vector-icons/Feather";
import SereinPlayer from "../../components/video/chapter/SereinPlayer";
import SideMenu from "react-native-side-menu-updated";
import Ionicons from "@expo/vector-icons/Ionicons";
import WebViewError from "../../components/shared/WebViewError";
import Loading from "../../components/shared/Loading";
import NoData from "../../components/shared/NoData";
import NetworkError from "../../components/shared/NetworkError";

const ChaptersScreen = ({navigation, route}) => {
    const [headerTitle, setHeaderTitle] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(null);
    const init = async (id) => {
        try {
            setLoading(true);
            const res = await fetchChapter(id);
            setData(res.data);
            console.log(res.data,4444)
            setHeaderTitle(res.data?.chapter?.title || '');
            setDataLoaded(true);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }


    const onItemSelected = (id, item) => {
        setIsOpen(false);
        setHeaderTitle(item.title);
        init(id).then();
    };

    const updateMenuState = menuState => {
        setIsOpen(menuState);
    };

    useEffect(() => {
        init(route.params.id).then();
    }, [route.params.id]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: headerTitle
        });
    }, [navigation, headerTitle]);

    // 左侧菜单
    const menu = <Menu
        onItemSelected={onItemSelected}
        course={data.course}
        courseId={data?.chapter?.courseId}
        chapters={data.chapters}
    />;


    if (loading) {
        return <Loading/>;
    }

    if (!dataLoaded || !data) {
        return null;
    }

    if (error) {
        return <NetworkError/>
    }

    // 渲染子组件前进行条件检查
    return data.chapters ? (
        <SideMenu
            menu={menu}
            isOpen={isOpen}
            onChange={menuState => updateMenuState(menuState)}
            disableGestures={false}
        >
            <View style={styles.container}>
                {/*视屏播放器*/}
                <SereinPlayer uri={data?.chapter?.video} shouldPlay={false}/>

                {/*切换展开按钮*/}
                <TouchableWithoutFeedback
                    onPress={() => {
                        setIsOpen(!isOpen);
                    }}>
                    <View style={styles.sideBarButtonWrapper}>
                        <View style={styles.sideBarButton}>
                            <Ionicons
                                name={'ios-list'}
                                size={16}
                                color={'#434D58'}
                                style={styles.chaptersIcon}
                            />
                            <Text style={styles.chapters}>课程列表</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                {/*下划线*/}
                <View style={styles.separator}>
                    <View style={styles.separator_inner}/>
                </View>

                {/*webView*/}
                <WebViewError/>
            </View>
        </SideMenu>
    ) : null;

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: 'black',
        width: window.width,
    },
    sideBarButtonWrapper: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 6,
    },
    sideBarButton: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#D4D1D9',
        width: 95,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
    },
    chapters: {
        textAlign: 'center',
        lineHeight: 32,
        marginLeft: 3,
        fontSize: 12,
    },
    chaptersIcon: {
        textAlign: 'center',
        lineHeight: 32,
    },
    webview: {
        flex: 1,
        backgroundColor: '#fff',
    },
    separator: {
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: '#C8C7CC',
    },
    separator_inner: {
        height: StyleSheet.hairlineWidth,
    },
});


export default ChaptersScreen;