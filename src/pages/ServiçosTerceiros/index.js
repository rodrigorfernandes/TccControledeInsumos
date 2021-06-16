import React, {useState, useContext} from 'react';
import {SafeAreaView, Keyboard, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import { format, parse } from 'date-fns';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { Background, AreaTitulo, TextTitulo, Input, SubmitButton, SubmitText } from './styles';
import Picker3 from '../../components/Picker3';
import Picker4 from '../../components/Picker4';


export default function ServiçosTerceiros(){

    const [nome, setNome] = useState('');
    const [serviço, setServiço] = useState('');
    const [tipo, setTipo] = useState(null);
    const [tipo3, setTipo3] = useState(null);
    const [tipo4, setTipo4] = useState(null);
    const [terceiro, setTerceiro] = useState('');
    const [unidade, setUnidade] = useState('');
    const [valor, setValor] = useState('');
    const [quantidadet, setQuantidadet] = useState('');
    const { user: usuario } = useContext(AuthContext);
    

    function handleSubmit(){
        Keyboard.dismiss();
        if(nome === '' || serviço === '' || tipo3 === '' || tipo4 === '' || terceiro === '' || quantidadet === '' || valor === ''){
            alert('Preencha todos os campos!');
            return;
        }else{
            handleAdd()
        }
    }

   async function handleAdd(){
        let uid = usuario.uid;
        
        
        let key = await firebase.database().ref('terceiros').child(uid).push().key;
            await firebase.database().ref('terceiros').child(nome).child(serviço).child(key).set({
            nome: nome,
            serviço: serviço,
            terceiro: terceiro, 
            tipo3: tipo3,
            quantidadet: parseFloat(quantidadet),
            valor: parseFloat(valor),
            unidade: tipo4,
            date: format(new Date(), 'dd/MM/yy'),
        });

   

        let user = firebase.database().ref('serviços').child(nome).child(serviço);
        await user.once('value').then((snapshot)=>{
            let saldo = parseFloat(snapshot.val().saldo);
            let quantterceiros = parseFloat(snapshot.val().quantterceiros);
            let quantproduzida = parseFloat(snapshot.val().quantproduzida);

            saldo += ((parseFloat(valor))*(parseFloat(quantidadet)));
            quantterceiros += (parseFloat(quantidadet));
            quantproduzida += (parseFloat(quantidadet));

            user.child('saldo').set(saldo);
            user.child('quantterceiros').set(quantterceiros);
            user.child('quantproduzida').set(quantproduzida);
        });


        Keyboard.dismiss();
        setNome('');
        setServiço('');
        setTipo3([]);
        setTipo4([]);
        setUnidade('');
        setTerceiro('');
        setValor('');
        setQuantidadet('');
        
        
   }
    
    return(
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
        <Background>
        <ScrollView>
            <Header/>
            <AreaTitulo>
                <TextTitulo>Cadastro de Empreiteiros</TextTitulo>
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
                placeholder="Empreiteira"
                value={terceiro}
                autoCorrect={false}
                autoCapitalize= "none"
                onChangeText={(texto) => setTerceiro(texto)}
                
                />

                <Picker3 onChange={setTipo3}/>

                <Picker4 onChange={setTipo4}/>

                <Input 
                placeholder="Quantidade"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={ ()=> Keyboard.dismiss()}
                value={quantidadet}
                onChangeText={ (text) => setQuantidadet(text) }
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