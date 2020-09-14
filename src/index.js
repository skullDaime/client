import Home from './Home';
import Product from './Home'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

const Routes = createAppContainer(
    createStackNavigator({
        Home: Home,
        Product: Product,
    })
);

export default Routes;