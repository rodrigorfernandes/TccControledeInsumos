import React, {useState, useContext} from 'react';
import {SafeAreaView, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { format } from 'date-fns';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { Background, TextTitulo,Input, SubmitButton, SubmitText } from './styles';

export default function New(){

    const[input, setInput] = useState('');
    const[empresa, setEmpresa] = useState('');
    const[endereco, setEndereco] = useState('');
    const[municipio, setMunicipio] = useState('');
    const { user: usuario} = useContext(AuthContext);

    function handleSubmit(){
        Keyboard.dismiss();
        if(input === '' || empresa === '' || endereco ==='' || municipio === ''){
            alert('Preencha todos os campos!');
            return;
        }else{
            handleAdd()
        }
    }

    async function handleAdd(){
        let uid = usuario.uid;

        let key = await firebase.database().ref('historico').child(uid).push().key;
        await firebase.database().ref('saldos').child(input).set({
            saldo: 0,
            quantprofissionais: 0,
        });
        await firebase.database().ref('historico').child(uid).child(key).set({
            nome: input,
            empresa: empresa,
            endereço: endereco,
            município: municipio,
            date: format(new Date(), 'dd/MM/yy')
        });
        Keyboard.dismiss();
        setInput('');
        setEmpresa('');
        setEndereco('');
        setMunicipio('');
        
        
    }


    return(
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
        <Background>
        <ScrollView>
            <Header/>

            <SafeAreaView style={{alignItems: 'center' }}>
                <TextTitulo>Cadastro</TextTitulo>
                <Input 
                placeholder="Nome da obra"
                value={input}
                onChangeText={ (text) => setInput(text)}
                returnKeyType="next"
                onSubmitEditing={ ()=> Keyboard.dismiss()}
                />

                <Input 
                placeholder="Nome da empresa"
                value={empresa}
                onChangeText={ (text) => setEmpresa(text)}
                returnKeyType="next"
                onSubmitEditing={ ()=> Keyboard.dismiss()}
                />

                <Input 
                placeholder="Endereço"
                value={endereco}
                onChangeText={ (text) => setEndereco(text)}
                returnKeyType="next"
                onSubmitEditing={ ()=> Keyboard.dismiss()}
                />

                <Input 
                placeholder="Municipio"
                value={municipio}
                onChangeText={ (text) => setMunicipio(text)}
                returnKeyType="next"
                onSubmitEditing={ ()=> Keyboard.dismiss()}
                />
                
            <SubmitButton onPress={handleSubmit}>
                <SubmitText>Registrar</SubmitText>
            </SubmitButton>
            </SafeAreaView>
        </ScrollView>
        </Background>
        </TouchableWithoutFeedback>
    );
}