import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image, 
    Dimensions, Platform, ScrollView, Alert, FlatList} from 'react-native';
import firebase from '../../services/firebaseConnection';

import { connect } from 'react-redux';
import { addPost } from '../../store/actions/posts';

import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';

import Post from '../../components/Post/Post';
import { fetchPosts } from '../../store/actions/posts';


class RegistroFotografico extends Component{

    state = {
       comment: '',
       serviço: '',
   }
   
   consulta = async () => {
       this.props.onFetchPosts()
    
   }

    // componentDidMount = () => {
    //     this.props.onFetchPosts()
    // }

render(){     
   return(
       
       <View style={styles.container}>
           <ScrollView>
           <Header/>
               
               <View style={styles.containerText}>
                   <Text style={styles.title}>Galeria de Obra</Text>
                
               <TextInput placeholder='Nome da Obra'
                   style={styles.input} value={this.state.serviço}
               onChangeText={serviço => this.setState({serviço})}/>
               <TextInput placeholder='Serviço'
                   style={styles.input} value={this.state.comment}
               onChangeText={comment => this.setState({comment})}/>
               <TouchableOpacity onPress={this.consulta} style={styles.buttom}>
                   <Text style={styles.buttomText}>Consultar</Text>
               </TouchableOpacity>
               <FlatList
                        data={this.props.posts}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => 
                        <Post key={item.id} {...item} />
                    } />
                </View>
                
           </ScrollView>
           </View>





   )
}
}

const styles = StyleSheet.create({
   
   container: {
       flex:1,
       
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

const mapStateToProps = ({ posts }) => {
    return{
        posts: posts.posts
    }
}

const mapDispatchToProps = dispatch => {
   return {
    onFetchPosts: () => dispatch(fetchPosts())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistroFotografico);