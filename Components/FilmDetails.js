import React from 'react'
import {connect} from 'react-redux'
import { StyleSheet, View, Text, ActivityIndicator,ScrollView,Image,TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi,getImageFromApi } from '../API/TMDBApi'

class FilmDetail extends React.Component {
constructor(props){
  super(props)
  this.state={
    film: undefined,
    isLoading:true
  }
}
_displayLoading() {
  if (this.state.isLoading) {
    // Si isLoading vaut true, on affiche le chargement à l'écran
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
}
componentDidMount()
{
  const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
      if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
        // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
        this.setState({
          film: this.props.favoritesFilm[favoriteFilmIndex]
        })
        return
      }
      // Le film n'est pas dans nos favoris, on n'a pas son détail
      // On appelle l'API pour récupérer son détail
      this.setState({ isLoading: true })
  getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
          this.setState({
            film: data,
            isLoading: false
          })
        })
    }
componentDidUpdate()
{
  console.log("it's an update")
  console.log(this.props.favoritesFilm)
}
_toggleFavorite()
{
  const action ={type: "TOGGLE_FAVORITE", value: this.state.film}
  this.props.dispatch(action)
}
_displayFavoriteImage() {
    var sourceImage = require('../Images/favoriteOff.png')
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require('../Images/favoriteOn.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
}
_displayFilm()
{
  const {film} = this.state
  if (film != undefined) {
  return (
    <ScrollView style={styles.scrollview_container}>
      <Image style={styles.Image} source={{uri: getImageFromApi(film.backdrop_path)}}/>
      <Text style={styles.title_text}>{film.title}</Text>
      <TouchableOpacity style={styles.button_favorite} title="Favoris" onPress={()=> this._toggleFavorite()}>
    {
      this._displayFavoriteImage()
    }
      </TouchableOpacity>
      <Text>{film.overview}</Text>
    </ScrollView>
  )
}
}

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  scrollview_container:
  {
    flex:1,
  },
  Image:
  {
    height:200
  },
  title_text:
  {
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20
  },
  button_favorite:
  {
    alignItems:'center'
  }
})

export default connect(mapStateToProps)(FilmDetail)
