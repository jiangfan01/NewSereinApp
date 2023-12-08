import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/information/HomeScreen';
import ArticlesScreen from '../../screens/information/ArticlesScreen';
import CardOption from "../options/CardOption";
import ModalOption from "../options/ModalOption";

const InformationStack = createNativeStackNavigator();

const InformationStackScreen = () => {
    return (
        <InformationStack.Navigator screenOptions={({route, navigation}) => ({
            ...CardOption(route, navigation),
        })}>
            <InformationStack.Screen name="Home" component={HomeScreen} options={({navigation}) => ({
                ...ModalOption(navigation),
                title: '新闻',
            })}/>
            <InformationStack.Screen name="Articles" component={ArticlesScreen} options={({navigation, route}) => ({
                title: route.params.title,
            })}/>
        </InformationStack.Navigator>
    );
};

export default InformationStackScreen;