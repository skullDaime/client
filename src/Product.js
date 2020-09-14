import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import styles from './style.js';

class Product extends Component{
    constructor(){
    super()

    }
    render(){
        return(
            <View style>
                <Text style={styles.mediumLabel} >CATEGORIAS</Text>
                       
            </View>
        )
    }
}

Product.navigationOptions = {
    title: 'Product',
  }

  export default Product;