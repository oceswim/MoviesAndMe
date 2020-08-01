import React from 'react'
import {StyleSheet, View, TextInput, Button } from 'react-native'

class Search extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <TextInput style={styles.textinput1} placeholder='Titre du film'/>
        <Button style={styles.button1} title='Rechercher' onPress={() => {}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view:{
    flex:1,
    marginTop:50

  },
  textinput1:{
    marginLeft:5,
    marginRight:5,
    height: 50,//chaque elements de la view prend le meme amount de place
    paddingLeft:5,
    borderWidth: 1,
    borderColor: '#000000'

  },
  button1:{
    height:50,
  }
})
//alignement se fait avec justifycontent alignitems et flexdirection
export default Search
