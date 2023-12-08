import React, { useRef, useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SereinPlayer = (props) => {
    const navigation = useNavigation();
    const { uri } = props;
    const [isPlaying, setIsPlaying] = useState(false);
    const [inFullscreen, setInFullscreen] = useState(false);
    const videoRef = useRef(null);

    const togglePlayPause = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
            } else {
                await videoRef.current.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <TouchableOpacity
                onPress={togglePlayPause}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: -25 }, { translateY: -25 }],
                    zIndex: 1,
                }}
            >
                <Ionicons name={isPlaying ? 'pause' : 'play'} size={50} color="white" />
            </TouchableOpacity>

            <Video
                ref={videoRef}
                source={{ uri }}
                style={{
                    flex: 1,
                    width: inFullscreen ? height : width,
                    height: inFullscreen ? width : (width / 16) * 9,
                }}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay={false}
            />
        </View>
    );
};

export default SereinPlayer;
