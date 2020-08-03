import React from 'react'
import { StyleSheet, View, TextInput, Button, Text,FlatList,ActivityIndicator } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import {getFlimsFromApiWithSearchedText} from '../API/TMDBApi'
class Search extends React.Component {

  constructor(props)//state permet d'influer sur le render une fois modifié
  {
    super(props)
    this.state={films :[], isLoading:false}
    this.searchedText=""
    this.page = 0
    this.total_pages=0

  }
  _loadFilms()
  {
    if(this.searchedText.length>0)
    {
    this.setState({isLoading:true})
    getFlimsFromApiWithSearchedText(this.searchedText,this.page+1).then(data => {
      this.page = data.page,
      this.total_pages = data.total_pages,
      this.setState({films: [ ...this.state.films, ...data.results ],
        isLoading:false
      })
    })

    }
  }
  _searchTextInputChanged(text)
  {
    this.searchedText=text
  }
  _searchFilms()
  {
    this.page = 0
    this.totalPages = 0
    this.setState({
   films: [],}, () => {
   this._loadFilms()})


  }
  _displayLoading()
  {
    if(this.state.isLoading)
    {
      return(
        <View style={[styles.loading_container]}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }
  }
  _displayDetailForFilm = (idFilm)=>
{
  console.log("display film with id:"+idFilm)
  this.props.navigation.navigate("FilmDetail",{idFilm:idFilm})
}
  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
        onChangeText={(text) => this._searchTextInputChanged(text)}
        style={styles.textinput}
        placeholder='Titre du film'
        onSubmitEditing={()=> this._searchFilms()}/>
        <Button title='Rechercher' onPress={() => this._searchFilms()}/>

        {this._displayLoading()}

        <FlatList
        data={this.state.films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <FilmItem film={item} _displayDetailForFilm={this._displayDetailForFilm}/>}
        style ={styles.flat_list1}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
      if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
         this._loadFilms()
      }
  }}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop:5
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    marginBottom:5,
  },
  flat_list1:{

  },
  loading_container: {
  position: 'absolute',
  left: 0,
  right: 0,
  top:100,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
}
})

export default Search
