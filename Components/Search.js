import React from 'react'
import {StyleSheet, View, TextInput, Button, Text, FlatList} from 'react-native'
//import films from '../Helpers/filmsData'
import FilmItem from "./FilmItem";
import {getFilmsFromApiWithSearchedText, getImageFromApi} from "../API/TMBApi";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.searchedText='';
        this.state={
            films:[],
        };
    }

    _searchTextInputChanged(text){
        this.searchedText=text;
    }

    _loadFilms() {
        if( this.searchedText.length>0){
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
                this.setState({films:data.results});
            });
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
                />
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
        }
    }
)
export default Search
