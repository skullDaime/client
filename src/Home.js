import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import styles from './style.js';

class Home extends Component{
    constructor(){
    super()

    }
    render(){
        return(
            <View style>
                <Text style={styles.mediumLabel} >CATEGORIAS</Text>
                    <ScrollView horizontal={true} style={styles.scrollView}>
                        <View style={styles.categoryCont}>
                            <Image style={styles.categoryImage} source={require('./img/bebidas.jpg')}></Image>
                            <Text style={styles.categoryText}>BEBIDAS</Text>
                        </View>
                        <View>
                            <Image style={styles.categoryImage} source={require('./img/limpeza.jpg')}></Image>
                            <Text style={styles.categoryText}>LIMPEZA</Text>
                        </View>
                        <View>
                            <Image style={styles.categoryImage} source={require('./img/congelados.jpg')}></Image>
                            <Text style={styles.categoryText}>CONGELADOS</Text>
                        </View>
                        <View>
                            <Image style={styles.categoryImage} source={require('./img/doces.jpg')}></Image>
                            <Text style={styles.categoryText}>DOCES</Text>
                        </View>
                    </ScrollView>
                <Text style={styles.mediumLabel} >RECOMENDADOS</Text>
                    <ScrollView horizontal={true} style={styles.scrollView}>
                        <View style={styles.categoryCont}>
                            <Image style={styles.ProductImage} onPress={() => navigation.navigate('Product')} source={require('./img/products/sorv001.jpg')}></Image>
                            <Text style={styles.categoryText}>SORVETE</Text>
                        </View>
                        <View>
                            <Image style={styles.ProductImage} source={require('./img/products/pizza.jpg')}></Image>
                            <Text style={styles.categoryText}>PIZZA SADIA</Text>
                        </View>
                        <View>
                            <Image style={styles.ProductImage} source={require('./img/products/mac.jpg')}></Image>
                            <Text style={styles.categoryText}>MACARRONADA</Text>
                        </View>
                        <View>
                            <Image style={styles.ProductImage} source={require('./img/products/mac.jpg')}></Image>
                            <Text style={styles.categoryText}>MACARRONADA</Text>
                        </View>
                    </ScrollView>    
            </View>
        )
    }
}

Home.navigationOptions = {
    title: 'Home',
  }

  export default Home;