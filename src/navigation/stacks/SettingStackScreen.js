import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/setting/HomeScreen';
import DetailsScreen from '../../screens/setting/DetailsScreen';
import CardOption from "../options/CardOption";

const SettingStack = createNativeStackNavigator();

const SettingStackScreen = () => {
    return (
        <SettingStack.Navigator
            screenOptions={({route, navigation}) => ({
                ...CardOption(route, navigation),
            })}>
            <SettingStack.Screen name="Home" component={HomeScreen} options={({navigation, route}) => ({
                title: "设置"
            })}/>
            <SettingStack.Screen name="Details" component={DetailsScreen} options={({navigation, route}) => ({
                title: "详情"
            })}/>
        </SettingStack.Navigator>
    );
};

export default SettingStackScreen;