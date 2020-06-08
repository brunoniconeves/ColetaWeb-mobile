import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, SafeAreaView, Linking} from 'react-native';
import Constants from 'expo-constants';
import {Feather as Icon, FontAwesome} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api';
 
interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    name: string;  
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  },
  items: {
    id: number;
    title: string;
    image: string;
  }[];
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  const [data, setData] = useState<Data>({} as Data);

  useEffect(() => {    
    api.get(`points/${routeParams.point_id}`)
    .then(response => {
      console.log(response.data);
      setData(response.data);
    });
  },[]);

  function handleNavigateBack () {
    navigation.goBack();
  }
 
  function handleComposeMail(){
    MailComposer.composeAsync({
      subject: 'Interesse em descartar resíduos',
      recipients: [data.point.email]      
    });
  }  

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse em descartar meus resíduos`);
  }

  //TODO Loading screen
  if(!data.point) {
    return null;
  }
    
  return(
    <SafeAreaView style={{flex: 1}}>

        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name="arrow-left" size={20} color="#34cb79"/>
            </TouchableOpacity>

            <Text style={styles.pointName}>{data.point.name}</Text>
            <Image style={styles.pointImage} source={{uri: data.point.image}}/>
            
            <View style={styles.address}>
              <Text style={styles.addressTitle}>
                Endereço
              </Text>
              <Text style={styles.addressContent}>
                {`${data.point.city}, ${data.point.uf}`}
              </Text>
            </View>

            <View style={styles.items}>          
              <Text style={styles.itemsTitle}>Resíduos aceitos</Text>
              <View style={styles.itemsContainer}>          
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{paddingHorizontal:0}}
                >
                  {data.items.map(item => (
                    <View style={styles.item} key={String(item.id)}>
                      <SvgUri width={42} height={42} uri={`http://192.168.50.103:3333/uploads/${item.image}`}/>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>        
        </View>
        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleWhatsapp}>
            <FontAwesome name="whatsapp" size={20} color="#FFF"/>
            <Text style={styles.buttonText}>Whatsapp</Text>
          </RectButton>
          <RectButton style={styles.button} onPress={handleComposeMail}>
            <Icon name="mail" size={20} color="#FFF"/>
            <Text style={styles.buttonText}>E-mail</Text>
          </RectButton>          
        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 8,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  subtitle: {
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 16,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 16,
    marginTop: 8,
    color: '#6C6C80'
  },

  items: {
    marginTop: 24,
  },
  
  itemsTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  itemsContent: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  itemsContainer: {
    flexDirection: 'row',    
    flexWrap: "wrap",
    marginTop: 16,
    marginBottom: 32
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;