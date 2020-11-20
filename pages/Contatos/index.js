import React, { UseEffect, UseState } from 'react';
import {StyleSheet, View, Text, StatusBar, FlatList} from 'react-native';
import * as Contacts from 'expo-contacts';


const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
      item: {
          backgroundcolor:'#f9c2ff',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
      },
      titlle: {
          fontSize: 32,
      },

});

const Item = ({nome}) => {
   alert(JSON.stringify(nome));
  return(
    <View style={styles.item}>
    <Text style={styles.nome}>{nome}</Text>
</View>
   )
}

const Contatos = () => {
    
    const [contatos, setContatos] = useState([]);
    useEffect(() => {
        (async () => {
            //Pede permissão do usuário para usar os contatos
          const { status } = await Contacts.requestPermissionsAsync();
          //verifica se a permissão foi dada
          if (status === 'granted') {
              //pega os contatos armazenados do aparelho
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Emails],
            });

            //verifica se existe algum contato
            if (data.length > 0) {
                setContatos(data);

            }
          }
        })();
      }, []);

      const renderItem = ({item}) => {
        return(
        
        <Item nome={item.name} />
         )
      }

      return(
          <View style={styles.container}>
              <Text>Contatos</Text>
              <FlatList
                data={contatos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                  />
          </View>
      )
}

export default Contatos;