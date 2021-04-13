import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image, 
    Dimensions, Platform, ScrollView, Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { addPost } from '../../store/actions/posts';
import { format, parse } from 'date-fns';
   
class Galeria extends Component{
    
     state = {
        image: null,
        comment: '',
        serviço: '',
    }
    
    pickImage = () =>{
        ImagePicker.showImagePicker({
            title: 'Escolha a imagem',
            maxHeight: 600,
            maxWidth: 800,
        }, res => {
            if(!res.didCancel){
                this.setState({ image: { uri: res.uri, base64: res.data}})
            }
        })
    }

    save = async () => {

        this.props.onAddPost({
            id: Math.random(),
            image: this.state.image,
            comment: this.state.comment,
            serviço: this.state.serviço,
            comments: [{

                comment: this.state.comment,
                serviço: this.state.serviço,
                date: format(new Date(), 'dd/MM/yy')
            }] 
        })
        this.setState({ image: null, comment: '', serviço: ''})
    }
    


render(){    
    return(
        
        <View style={styles.container}>
            <ScrollView>

                
                <View style={styles.containerText}>
                    <Text style={styles.title}>Compartilhe uma imagem</Text>
                
                <View style={styles.imageContainer}>
                    <Image source={this.state.image} style={styles.image} />
                </View>
                <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
                    <Text style={styles.buttomText}>Escolha a foto</Text>
                </TouchableOpacity>
                <TextInput placeholder='Serviço a ser registrado'
                    style={styles.input} value={this.state.comment}
                onChangeText={comment => this.setState({comment})}/>
                <TextInput placeholder='Nome da Obra'
                    style={styles.input} value={this.state.serviço}
                onChangeText={serviço => this.setState({serviço})}/>
                <TouchableOpacity onPress={this.save} style={styles.buttom}>
                    <Text style={styles.buttomText}>Salvar</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
            </View>





    )
}
}

const styles = StyleSheet.create({
    
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#131313'
        
    },

    containerText: {
        flex:1,
        alignItems: 'center',
        
    },
    title:{
        fontSize:20,
        marginTop:10,
        fontWeight: 'bold',
        color: '#F2C94C'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width /2,
        backgroundColor: '#FFF',

    },
    image:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width /2,
    },
    buttom: {
        alignItems: 'center',
        width: '90%',
        marginTop: 30,
        padding: 10,
        backgroundColor: '#F2C94C',
        borderRadius: 7,

    },
    buttomText:{
        alignItems: 'center',
        fontSize: 20,
        color: '#131313',
        fontWeight: 'bold',
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#FFF',
    }
})
//export default Galeria


const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}

export default connect(null, mapDispatchToProps)(Galeria);