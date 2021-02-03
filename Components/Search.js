import React from 'react'
import {StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator} from 'react-native'
//import films from '../Helpers/filmsData'
import FilmItem from "./FilmItem";
import {getFilmsFromApiWithSearchedText, getImageFromApi} from "../API/TMBApi";
import useAndroidRippleForView from "react-native/Libraries/Components/Pressable/useAndroidRippleForView";

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText=''
        this.page=0
        this.totalPages=0
        this.state={
            films:[],
            isLoading: false
        }
    }

    _searchTextInputChanged(text){
        this.searchedText=text;
    }

    _loadFilms() {
        if( this.searchedText.length>0){
            this.setState({isLoading:true});
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page=data.page
                this.totalPages=data.total_pages
                this.setState({
                    films:[...this.state.films,...data.results],
                    //permet de faire concat des tableaux, écrase pas, rajoute les données
                    isLoading:false
                });
            });
        }
    }

    _displayLoading(){
        if(this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Movie title'
                    onChangeText={(text)=>this._searchTextInputChanged(text)}
                    onSubmitEditing={()=>this._loadFilms()}
                />
                <Button title='Search' onPress={() => {
                    this._loadFilms()
                }}/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                    onEndReachedThreshold={0.5}
                    onEndReached={
                        ()=>{
                            if(this.page<this.totalPages){
                                this._loadFilms()
                            }
                        }
                    }
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        main_container: {
            flex: 1,
            marginTop: 20
        },
        textinput: {
            marginLeft: 5,
            marginRight: 5,
            height: 50,
            borderColor: '#000000',
            borderWidth: 1,
            paddingLeft: 5,
        },
        loading_container:{
            position:'absolute',
            left:0,
            right:0,
            top:100,
            bottom:0,
            alignItems:'center',
            justifyContent:'center'
        }
    }
)
export default Search
