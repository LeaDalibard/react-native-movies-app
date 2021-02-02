import React from 'react'
import { View, TextInput, Button } from 'react-native'

class Search extends React.Component {
    render() {
        return (
            <View style={{marginTop:20}}>
                <TextInput placeholder='Movie title'/>
                <Button title='Search' onPress={() => {}}/>
            </View>
        )
    }
}

export default Search
