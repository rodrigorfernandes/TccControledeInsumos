import React, {useState, useContext} from 'react';
import {SafeAreaView, Keyboard, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import { format, parse } from 'date-fns';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { Background, AreaTitulo, TextTitulo, Input, SubmitButton, SubmitText } from './styles';

export default function CadastroServiços(){

    const [nome, setNome] = useState('');
    const [serviço, setServiço] = useState('');
    const [unidade, setUnidade] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const { user: usuario } = useContext(AuthContext);
    

    function handleSubmit(){
        Keyboard.dismiss();
        if(nome === '' || serviço === '' || unidade === '' || quantidade === null){
            alert('Preencha todos os campos!');
            return;
        }else{
            handleAdd()
        }
    }

    async function handleAdd(){
        let uid = usuario.uid;

        let key = await firebase.database().ref('serviços').child(uid).push().key;
        await firebase.database().ref('serviços').child(nome).child(serviço).set({
            nome: nome,
            serviço: serviço,
            unidade: unidade,
            quantidade: quantidade,
            date: format(new Date(), 'dd/MM/yy'),
            saldo: 0,
            quantprofissionais: 0,
            quantprofissionais2: 0,
            quantmateriais: 0,
            quantterceiros: 0,
            quantproduzida: 0,
            
        });
        

        Keyboard.dismiss();
        setNome('');
        setTipo([]);
        setServiço('')
        setUnidade('');
        setQuantidade('');
        
        
   }
    
    return(
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
        <Background>
        <ScrollView>
            <Header/>
            <AreaTitulo>
                <TextTitulo>Cadastro de Serviço</TextTitulo>
            </AreaTitulo>
            <SafeAreaView style={{alignItems: 'center' }}>

                <Input
                placeholder="Nome da obra"
                value={nome}
                autoCorrect={false}
                autoCapitalize= "none"
                onChangeText={(texto) => setNome(texto)}
                
                />

                <Input
                placeholder="Serviço"
                value={serviço}
                autoCorrect={false}
                autoCapitalize= "none"
                onChangeText={(texto) => setServiço(texto)}
                
                />

                <Input
                placeholder="Unidade"
                value={unidade}
                autoCorrect={false}
                autoCapitalize= "none"
                onChangeText={(texto) => setUnidade(texto)}
                
                />

                <Input 
                placeholder="Quantidade"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={ ()=> Keyboard.dismiss()}
                value={quantidade}
                onChangeText={ (text) => setQuantidade(text) }
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