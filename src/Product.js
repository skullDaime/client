import React, { Component } from 'react';
import {StyleSheet, Input, AsyncStorage, TextIn, View, ActivityIndicator, TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import { ApolloProvider, Query, InMemoryCache } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';

import styles from './style.js';

import {client} from './index';

export const AppContext = React.createContext({data:{oneProduct:null}})

//session CREATE
/*_storeData = async () => {

    await AsyncStorage.setItem(
        '@sessionId: 1'
      );
}*/

//Screen Class
class Product extends Component{
    constructor(){
    super()
    } 
    state = {
        stateAddress: null,
    }    
    componentDidMount(){
        const stateProduct = this.getPorduct();
        this.setState({
            stateProduct,
        });
       
    }
 //Session READ   
    //async getUser(){
       // return await AsyncStorage.getItem('sessionId');
   // }
//
    getPorduct(){
        return `
        query{
            oneProduct(id: ${this.props.navigation.getParam('ID')}){
                id
                name
                description
            }
        }
        
        `
    }

    render(){
        const { stateProduct } = this.state;
        if (!stateProduct) return null; 
        return(
        <ScrollView style={styles.scrollView}>
            <ApolloProvider client={client}>
                            <Query query={gql`${stateProduct}`} >
                                {({ loading, error, data }) => {
                                    if (loading || error) return <ActivityIndicator size="large" color="#33CCff" />
                                        //console.log({...data.allCategories})
                                        var productData = [];
                                            for (let prop in data.oneProduct) {
                                                productData.push(data.oneProduct[prop]);
                                            }

                                        return (
                                            productData.map(productData => 
                                                <View key={productData.id} style={styles.categoryCont}>
                                                    <Image style={styles.categoryImage} source={{uri: 'https://amazonasatual.com.br/wp-content/uploads/2014/10/supermercado.jpg'}}></Image>
                                                    <Text style={styles.categoryText}>{productData.name}</Text>
                                                    <Text style={styles.Text}>{productData.description}</Text>
                                                    <TextInput style={{width:60, borderColor:'gray'}} keyboardType={"number-pad"}></TextInput>
                                                    <Button title={'Prosseguir'} onPress={() => this.props.navigation.navigate('Address', {productId:this.props.navigation.getParam('ID')})}></Button>
                                                </View>
                                                )

                                        )
                                }}
                            </Query>
                            </ApolloProvider>
                            <Text style={styles.text}>{this.props.fromHomeProductId}</Text>
                            
                            
        </ScrollView>
        )
    }
}

Product.navigationOptions = {
    headerTitleStyle: { alignSelf: 'center'},
    title: 'Product',
  }

  export default Product;