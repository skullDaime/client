import React, { Component } from 'react';
import {StyleSheet, View, ActivityIndicator,TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';
import 'react-native-gesture-handler';

import {client} from './index';
import { ApolloProvider, Query  } from "react-apollo";
import gql from 'graphql-tag';


import styles from './style.js';

export const AppContext = React.createContext({ data: { allCategories: null,  allProducts:null } });

class Home extends Component{
    constructor({navigation}){
        super();
    }
    state = {
        query: null,
        stateProducts: null
      }

    componentDidMount = () => {
        const query = this.getQuery();
        const stateProducts = this.getProducts();
        this.setState({
          query,
          stateProducts
        });
      }
    
      getQuery = () => {
        return `
        query {
            allCategories
              {
                  id
                  name
                  img
              }
          }
        `
      }
    
      getProducts = () => {
        return `
        query {
            allProducts
              {
                  id
                  name
                  description
              }
          }
        `
      }
    render(){
        //const { Routes } = Routes;
        const { query } = this.state;
        const { stateProducts } = this.state;
        if (!query) return null;
        if (!stateProducts) return null;  
        return(          
        <ScrollView style={styles.container}>
                <Text style={styles.mediumLabel} >CATEGORIAS</Text>
                    <ScrollView horizontal={true} style={styles.scrollView}>
                        <ApolloProvider client={client}>
                            <Query query={gql`${query}`} >
                                {({ loading, error, data }) => {
                                    if (loading || error) return <ActivityIndicator size="large" color="#33CCff" />
                                        //console.log({...data.allCategories})
                                        var categoryData = [];
                                            for (let prop in data.allCategories) {
                                                categoryData.push(data.allCategories[prop]);
                                            }

                                        return (
                                            categoryData.map(categoryData => 
                                                <View key={categoryData.id} /*onPress={this.props.navigation.navigate(('Filter'),{CATEGORY: categoryData.id})}*/ style={styles.categoryCont}>
                                                    <Image style={styles.categoryImage} source={{uri: 'https://amazonasatual.com.br/wp-content/uploads/2014/10/supermercado.jpg'}}></Image>
                                                    <Text style={styles.categoryText}>{categoryData.name}</Text>
                                                </View>
                                                )

                                        )
                                }}
                            </Query>
                    </ApolloProvider>
                    </ScrollView>
                <Text style={styles.mediumLabel} >RECOMENDADOS</Text>
                    <ScrollView horizontal={true} style={styles.scrollView}>
                    <ApolloProvider client={client}>
                            <Query query={gql`${stateProducts}`} >
                                {({ loading, error, data }) => {
                                    if (loading || error) return <ActivityIndicator size="large" color="#33CCaa" />
                                        //console.log({...data.allCategories})
                                        let productData = [];
                                            for (let prop in data.allProducts) {
                                                productData.push(data.allProducts[prop]);
                                            }

                                        return (
                                            productData.map(productData => 
                                                <View key={productData.id} style={styles.categoryCont}>
                                                    <Image style={styles.ProductImage} source={{uri: 'https://amazonasatual.com.br/wp-content/uploads/2014/10/supermercado.jpg'}}></Image>
                                                    <Text style={styles.categoryText}>{productData.name}</Text>
                                                    <Button title={'Ir'} onPress={() => this.props.navigation.navigate('Product',{ID: productData.id})}></Button>
                                                </View>
                                                )

                                        )
                                }}
                            </Query>
                    </ApolloProvider>
                    </ScrollView>    
            </ScrollView>
        )
    }
    
}

/*Home.navigationOptions = {
    title: 'Home',
  }*/

  export default Home;