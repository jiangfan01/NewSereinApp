import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Colors from '../../constants/Colors';

const HeaderButtonsOption = navigation => {
    return {
        headerLeft: () => (
            <SimpleLineIcons
                name="bell"
                size={20}
                color={Colors.headerButton}
                style={{margin: 5}}
                onPress={() => navigation.navigate('InformationStack')}
            />
        ),
        headerRight: () => (
            <>
                <SimpleLineIcons
                    name="magnifier"
                    size={20}
                    color={Colors.headerButton}
                    onPress={() => navigation.navigate('SearchStack')}
                />
                <SimpleLineIcons
                    name="options"
                    size={20}
                    color={Colors.headerButton}
                    style={{marginLeft: 15}}
                    onPress={() => navigation.navigate('SettingStack')}
                />
            </>
        ),
    };
};

export default HeaderButtonsOption;