import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import Comments from '../Comments/Comments';

class Post extends Component{

    

    render() {
        return (
            <TouchableWithoutFeedback onLongPress={() => deleteItem()}>
            <View style={styles.container}>
                <Image source={{ uri: this.props.image }} style={styles.image}/>
                <Comments comments={this.props.comments}/>

                
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

function deleteItem() {
    Alert.alert(
        'Mensagem',
        'Tem certeza que deseja deletar esse item?',
        [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: () => Alert.alert('Deletado')
            }
        ]
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        marginTop: 20,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3/4,
        resizeMode: 'contain'
    },
    
})
export default Post