import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator,ScrollView,Image } from 'react-native'
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
  getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
          this.setState({
            film: data,
            isLoading: false
          })
        })
    }
_displayFilm()
{
  const {film} = this.state
  if (film != undefined) {
  return (
    <ScrollView style={styles.scrollview_container}>
      <Image style={styles.Image} source={{uri: getImageFromApi(film.backdrop_path)}}/>
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
  }
})

export default FilmDetail
