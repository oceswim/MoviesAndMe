import React from 'react'
import {StyleSheet, View,Text,Image,TouchableOpacity} from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component{

  _displayFavoriteImage() {
   if (this.props.isFilmFavorite) {
     return (
       <Image
         style={styles.favorite_image}
         source={require('../Images/favoriteOn.png')}
       />
     )
   }
 }
  render()
  {
    const {film, _displayDetailForFilm }= this.props;
    return(
      <TouchableOpacity style={styles.main_container} onPress={()=> _displayDetailForFilm(film.id)}>

        <Image style ={styles.picture_view} source={{uri: getImageFromApi(film.poster_path)}}/>

        <View style ={styles.informations_view}>
          <View style ={styles.title_view}>
            {this._displayFavoriteImage()}
            <Text style={styles.title_text}>{film.title}</Text>

            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>

          <View style ={styles.description_view}>
            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
          </View>

          <View style ={styles.date_view}>
            <Text style={styles.date_text}>{film.release_date}</Text>
          </View>
        </View>

      </TouchableOpacity>

    )


  }
}

const styles = StyleSheet.create({
  main_container:
  {
  height:190,
  flexDirection:'row',
},
 picture_view:
 {
   width: 120,
 height: 180,
 margin: 5,
 backgroundColor: 'gray'
 },
 informations_view:
 {
   flex: 1,
   margin:5,
   flexDirection:'column'
 },
 title_view:
 {
   flexDirection:'row',
   flex: 2,
   justifyContent:'space-around',


 },
 title_text:
 {
   fontWeight: 'bold',
   fontSize: 13,
   flex: 1,
   flexWrap: 'wrap',
   paddingRight: 5
 },
 vote_text:
 {

 },
 description_view:
{
flex:7,

},
description_text:
{

},
date_view:
{
flex:1,

  paddingBottom:3,

},
date_text:
{

textAlign:'right'
},
favorite_image: {
  width: 25,
  height: 25,
  marginRight: 5
}
})

export default FilmItem
