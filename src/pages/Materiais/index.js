import React, {useState, useContext} from 'react';
import {SafeAreaView, Keyboard, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import { format, parse } from 'date-fns';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { Background, AreaTitulo, TextTitulo, Input, SubmitButton, SubmitText } from './styles';
import Picker3 from '../../components/Picker3';




export default function Materiais(){

    const [nome, setNome] = useState('');
    const [serviço, setServiço] = useState('');
    const [tipo, setTipo] = useState([]);
    const [material, setMaterial] = useState('');
    const [unidade, setUnidade] = useState('');
    const [valor, setValor] = useState('');
    const [quantidadem, setQuantidadem] = useState('');
    const { user: usuario } = useContext(AuthContext);
    

    function handleSubmit(){
        Keyboard.dismiss();
        if(nome === '' || serviço === '' || material === '' || quantidadem === '' || valor === ''){
            alert('Preencha todos os campos!');
            return;
        }else{
            handleAdd()
        }
    }

   async function handleAdd(){
        let uid = usuario.uid;
        
        
        let key = await firebase.database().ref('materiais').child(uid).push().key;
            await firebase.database().ref('materiais').child(nome).child(serviço).child(key).set({
            nome: nome,
            serviço: serviço,
            material: material, 
            quantidade: parseFloat(quantidadem),
            valor: parseFloat(valor),
            unidade: unidade,
            date: format(new Date(), 'dd/MM/yy'),
        });

   

        let user = firebase.database().ref('serviços').child(nome).child(serviço);
        await user.once('value').then((snapshot)=>{
            let saldo = parseFloat(snapshot.val().saldo);
            let quantmateriais = parseFloat(snapshot.val().quantmateriais);

            saldo += ((parseFloat(valor))*(parseFloat(quantidadem)));
            quantmateriais += (parseFloat(quantidadem));

            user.child('saldo').set(saldo);
            user.child('quantmateriais').set(quantmateriais);
        });
        
        Keyboard.dismiss();
        setNome('');
        setServiço('');
        setMaterial('');
        setUnidade('');
        setTipo([]);
        setValor('');
        setQuantidadem('');
        
        
   }
    
    return(
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
        <Background>
        <ScrollView>
            <Header/>
            <AreaTitulo>
                <TextTitulo>Cadastro de materiais</TextTitulo>
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
                placeholder="Material"
                value={material}
                autoCorrect={false}
                autoCapitalize= "none"
                onChangeText={(texto) => setMaterial(texto)}
                
                />

                <Picker3 onChange={setTipo}/>

                <Input
                placeholder="Unidade de medida"
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
                value={quantidadem}
                onChangeText={ (text) => setQuantidadem(text) }
                />

                <Input 
                placeholder="Valor unitário"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={ ()=> Keyboard.dismiss()}
                value={valor}
                onChangeText={ (text) => setValor(text) }
                />
                
                <SubmitButton onPress={handleSubmit}>
                    <SubmitText>Adicionar</SubmitText>
                </SubmitButton>

                
            </SafeAreaView>
        </ScrollView>
        </Background>
        </TouchableWithoutFeedback>
    );
    }