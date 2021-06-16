import React, { useContext, useState, useEffect } from 'react';
import {Keyboard, Alert, ScrollView } from 'react-native';
import firebase from '../../services/firebaseConnection';
import {useNavigation} from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import { Container, AreaInput, Input, SubmitButton, SubmitText, 
    List, AreaList, AreaButton, AddPhotoButton, PhotoText,} from './styles';
    
export default function Home(){
    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [input, setInput] = useState('');
    const [historico, setHistorico] =useState([]);
    
    const {user} = useContext(AuthContext);
    const uid = user && user.uid;

    async function loadingList(){
        await firebase.database().ref('historico')
        .child(uid)
        .once('value', (snapshot) => {
            setHistorico([]);
            

            snapshot.forEach((childItem) => {
                if(childItem.val().nome === input){
                    let list = {
                        key: childItem.key,
                        empresa: childItem.val().empresa,
                        endereço: childItem.val().endereço,
                        município: childItem.val().município,
                        nome: childItem.val().nome,
                    };
                    setHistorico(oldArray => [...oldArray, list].reverse());
                }else{
                    console.log('NAO TEM NADA AQUI');
                }
            })
        });
        
        
    }
    function handleSubmit(key){
        Keyboard.dismiss();

        Alert.alert(
            'Mensagem',
            'Tem certeza que deseja deletar essa obra?',
            [
                {
                    text: 'Não',
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => handleDelete(key)
                }
            ]
        )
    }
    async function handleDelete(key){
        await firebase.database().ref('historico').child(uid).child(key).remove();
        
        setHistorico();

        handleDeletar();
    }
    async function handleDeletar(){
        await firebase.database().ref('saldos').child(input).remove();
        await firebase.database().ref('profissionais').child(input).remove();
        Keyboard.dismiss();
        setInput('');
    }
    
    


    return(
    <Container>
        <ScrollView>
        <Header/>
        <AreaInput>
             <Input
                placeholder="Nome da obra"
                value={input}
                autoCorrect={false}
                autoCapitalize= "none"
                onChangeText={(texto) => setInput(texto)}
                
            />
            
        </AreaInput>
        
        <AreaInput>
            <SubmitButton onPress={loadingList}>
                <SubmitText>Consultar</SubmitText>
            </SubmitButton>
        </AreaInput>
         
            <AreaList>
            <List 
                keyExtractor={item => item.key}
                data={historico}
                renderItem={ ({item}) => <HistoricoList data={item} deleteItem={handleSubmit}/> }
            
            />
            </AreaList>
    
        <AreaButton>
        <AddPhotoButton onPress={() => {navigation.navigate('Galeria')}}>
            <PhotoText>Fotos</PhotoText>
        </AddPhotoButton>
        </AreaButton>

        </ScrollView>
    </Container>
    )
};