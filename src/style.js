import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        margin: 0,
        },

    mediumLabel:{
        fontSize: 30,
        margin: 20,
        fontFamily: 'Roboto',
        backgroundColor: '#cc4433',
    },
    categoryCont:{
      margin: 5,
    },
    categoryText:{
        width: 95,
        color: '#66ccaa',
        fontWeight: 'bold',
        textAlign: "center",
        marginTop: -25,
        backgroundColor: '#cc4433',
        borderRadius: 5,
    },
      scrollView: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        height: 200,
      },
      text: {
        fontSize: 42,
        color: '#ccff33',
      },
      categoryImage:{
          height: 150,
          width: 150,
          margin:0,
      },
      ProductImage:{
        height: 100,
        width: 100,
        margin:5,
    },
});

export default styles;