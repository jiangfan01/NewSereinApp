import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

// TabOption 配置
const TabOption = route => {
    let labelName;
    let iconName;

    switch (route.name) {
        case 'DiscoverStack':
            labelName = '发现';
            iconName = 'compass';
            break;
        case 'VideoStack':
            labelName = '视频';
            iconName = 'camrecorder';
            break;
        default:
            labelName = '用户';
            iconName = 'user';
    }
    return {
        tabBarLabel: labelName,
        tabBarIcon: ({ focused, color }) => (
            <SimpleLineIcons name={iconName} size={20} color={color} />
        ),
    };
};

export default TabOption;