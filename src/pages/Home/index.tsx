import React, { useState } from 'react';
import {Feather as Icon} from '@expo/vector-icons';
import {View, ImageBackground, Image, StyleSheet, Text, SafeAreaView, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';


const Home = () => {
  const navigation = useNavigation();

  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  function handleNavigateToPoints(){
    navigation.navigate('Points', {
      uf,
      city
    });
  }

  return (
    <KeyboardAvoidingView 
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' || Platform.OS === 'android' ? 'padding' : undefined}
    >
    <SafeAreaView style={{flex: 1}}>
      
        <ImageBackground style={styles.container} source={require('../../assets/home-background.png')} resizeMode="contain" imageStyle={{ width: 274, height: 368 }}>
          <View style={styles.main}>
            <Image source={require('../../assets/logo.png')}/>

            <Text style={styles.title}>
              Descarte seus resíduos de forma segura
            </Text>
            <Text style={styles.description}>
              Encontre um ponto de coleta mais próximo de você!
            </Text>
            
            <View style={styles.footer}>
              <TextInput 
                style={styles.input}
                placeholder="Selecione a UF"
                value={uf}
                onChangeText={setUf} // = {text => setCity(text)}
                maxLength={2}
                autoCapitalize="characters"
                autoCorrect={false}
              />
              <TextInput 
                style={styles.input}
                placeholder="Selecione a Cidade" 
                value={city}
                onChangeText={setCity} // ={text => setCity(text)}
                autoCorrect={false}
              />
              <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                <View style={styles.buttonIcon}>
                  <Text>
                    <Icon name="log-in" color="#FFF" size={24}/>
                  </Text>
                </View>
                <Text style={styles.buttonText}>
                  Entrar
                </Text>            
              </RectButton>
            </View>

          </View>
        </ImageBackground>
      
    </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 48,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home