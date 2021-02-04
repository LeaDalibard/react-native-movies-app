import React from 'react'
import ActivityIndicator, {StyleSheet, View,Text} from "react-native";

class FilmDetail extends React.Component{

    constructor(props){
        super(props)
        this.state={
            film:undefined,
            isLoading:true
        }
    }

    _displayLoading() {
        if (this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    render(){
        return(
            <View style={styles.main_container}>
                <Text>Film Details </Text>
                {this._displayLoading()}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main_container:{
        flex:1,
    },
    loading_container:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default FilmDetail
