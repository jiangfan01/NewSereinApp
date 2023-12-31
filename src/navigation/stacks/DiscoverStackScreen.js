import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/discover/HomeScreen';
import CoursesScreen from '../../screens/video/CoursesScreen';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardOption from "../options/CardOption";

const DiscoverStack = createNativeStackNavigator();

const DiscoverStackScreen = () => {
    return (
        <DiscoverStack.Navigator
            screenOptions={({ route, navigation }) => ({
                ...CardOption(route, navigation),
            })}>
            <DiscoverStack.Screen
                name="Home"
                component={HomeScreen}
                options={({navigation, route}) => ({
                    ...HeaderButtonsOption(navigation),
                    title: '发现',
                })}
            />
            <DiscoverStack.Screen  options={({navigation, route}) => ({
                title: route.params.title,
            })} name="Courses" component={CoursesScreen}/>
        </DiscoverStack.Navigator>
    );
};

export default DiscoverStackScreen;