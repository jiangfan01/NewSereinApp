import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Colors from "../../constants/Colors";

const HomeScreen = ({navigation}) => {
    const [searchParams, setSearchParams] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSearch = () => {
        if (searchParams.trim() === '') {
            // 显示模态框
            toggleModal();
        } else {
            // 导航到“Results”屏幕
            navigation.navigate('Results', {
                name: searchParams,
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Ionicons name="search-outline" size={24} color="gray" style={styles.icon}/>
                <Text style={styles.line}></Text>
                <TextInput
                    placeholder="搜索课程"
                    autoFocus={true}
                    clearButtonMode="while-editing"
                    returnKeyType="search"
                    onChangeText={(query) => {
                        setSearchParams(query);
                    }}
                    onSubmitEditing={handleSearch}
                    style={styles.searchInput}
                />
            </View>

            {/* 模态框 */}
            <Modal isVisible={isModalVisible} animationIn="fadeIn" animationOut="fadeOut">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>关键词不能为空!</Text>
                    <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>好的</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#fff',
        borderRadius: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 5,
    },
    searchInput: {
        paddingLeft: 8,
        width: '100%',
    },
    line: {
        height: 15,
        borderLeftWidth: 0.5,
        borderColor: '#ddd',
        marginLeft: 5,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 40,
    },
    modalButton: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default HomeScreen;