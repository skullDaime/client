import Home from './Home';
import Product from './Product'
import Filter from './Filter'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import ApolloClient from "apollo-boost";

export const client = new ApolloClient({ uri: 'http://192.168.0.111:4000/'});

const Routes = createAppContainer(
    createStackNavigator({
        Home: Home,
        Product: Product,
        Filter: Filter,
    })
);


export default Routes;