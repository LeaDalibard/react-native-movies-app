import React from 'react'
import {StyleSheet, View,Text} from "react-native-web";

class FilmDetail extends React.Component{
    render(){
        return(
            <View style={styles.main_container}>
                <Text>Film Details  {this.props.navigation.state.params.idFilm}</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main_container:{
        flex:1,
    }
})

export default FilmDetail
