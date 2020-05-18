import React from 'react';
import { View, Text, Dimensions,StyleSheet,} from 'react-native';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
    return (
      <View style={styles.container}>
          
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
        >
            <Text style={styles.title}>Bienvenue dans Maréu</Text>
            <Text style={styles.text}>L'application de gestion de réunion de Lamzone</Text>
            
        </Animatable.View>
      </View>
    );
};

export default HomeScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  
});

