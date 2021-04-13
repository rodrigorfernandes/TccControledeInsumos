import React, {useState, useContext} from 'react';
import {SafeAreaView, Keyboard, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import { format, parse } from 'date-fns';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { Background, AreaTitulo, TextTitulo, Input, SubmitButton, SubmitText } from './styles';
import Picker from '../../components/Picker';
import HistoricoList2 from '../../components/HistoricoList2';


export default function Profissionais(){

    const [nome, setNome] = useState('');
    const [serviço, setServiço] = useState('');
    const [tipo, setTipo] = useState(null);
    const [valor, setValor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const { user: usuario } = useContext(AuthContext);
    

    function handleSubmit(){
        Keyboard.dismiss();
        if(nome === '' || serviço === '' || tipo ===null || quantidade === '' || valor === ''){
            alert('Preencha todos os campos!');
            return;
        }else{
            handleAdd()
        }
    }

   async function handleAdd(){
        let uid = usuario.uid;
        
        
        let key = await firebase.database().ref('profissionais').child(uid).push().key;
            await firebase.database().ref('profissionais').child(nome).child(serviço).child(key).set({
            nome: nome,
            serviço: serviço,
            tipo: tipo,
            quantidade: parseFloat(quantidade),
            salario: parseFloat(valor),
            date: format(new Date(), 'dd/MM/yy'),
            
        });

   

        let user = firebase.database().ref('serviços').child(nome).child(serviço);
        await user.once('value').then((snapshot)=>{
            let saldo = parseFloat(snapshot.val().saldo);
            let quantprofissionais = parseFloat(snapshot.val().quantprofissionais);

            saldo += ((parseFloat(valor))*(parseFloat(quantidade)));
            quantprofissionais += (parseFloat(quantidade));

            user.child('saldo').set(saldo);
            user.child('quantprofissionais').set(quantprofissionais);
        });

        Keyboard.dismiss();
        setNome('');
        setServiço('');
        setTipo(null);
        setValor('');
        setQuantidade('');
        
        
   }
    
    return(
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
        <Background>
        <ScrollView>
            <Header/>
            <AreaTitulo>
                <TextTitulo>Cadastro de mão de obra</TextTitulo>
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
                <Picker onChange={setTipo}/>
                <Input 
                placeholder="Quantidade de horas trabalhadas"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={ ()=> Keyboard.dismiss()}
                value={quantidade}
                onChangeText={ (text) => setQuantidade(text) }
                />
                <Input 
                placeholder="Salário Hora"
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