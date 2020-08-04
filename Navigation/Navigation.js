import React from 'react'
import {createAppContainer} from 'react-navigation'
import{createStackNavigator } from 'react-navigation-stack'
import{createBottomTabNavigator} from 'react-navigation-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetails'
import Favorites from '../Components/Favorites'
import {StyleSheet,Image} from 'react-native'

const SearchStackNavigator = createStackNavigator({
  Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: {
      title: 'Search'
    }
  },
  FilmDetail:
  {
    screen: FilmDetail,
    navigationOptions:{
      title:'Film Details'
    }
  }
})

const FavoritesStackNavigator= createStackNavigator({
  Favorites:
  {
    screen: Favorites,
    navigationOptions:{
      title:'Favoris'
    }
  },
  FilmDetail:
  {
    screen:FilmDetail
  }
})
const MoviesTabNavigator = createBottomTabNavigator({
  Search:{
    screen: SearchStackNavigator,
    navigationOptions:{
      tabBarIcon:()=>{
        return <Image source={require('../Images/searchIcon.png')} style={styles.search_icon}/>
      }
    }
  },
  Favorites:{
    screen: FavoritesStackNavigator,
    navigationOptions:{
      tabBarIcon:()=>{
        return <Image source={require('../Images/favoriteOn.png')} style={styles.search_icon}/>

        }
      }
    }
},
{
  tabBarOptions:{
    activeBackgroundColor:'gray',
    showLabel:false,
    showIcon:true
  }
})

const styles = StyleSheet.create({
  search_icon:{
    width:30,
    height:30
  }
})
export default createAppContainer(MoviesTabNavigator)
