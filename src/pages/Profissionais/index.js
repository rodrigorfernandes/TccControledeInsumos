import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, Keyboard, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import { format, parse } from 'date-fns';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { Background, AreaTitulo, TextTitulo, Input, SubmitButton, SubmitText } from './styles';
import Picker from '../../components/Picker';
import Picker2 from '../../components/Picker2';
import Picker3 from '../../components/Picker3';
import Picker4 from '../../components/Picker4';

export default function Profissionais(){

    const [nome, setNome] = useState('');
    const [serviço, setServiço] = useState('');
    const [tipo, setTipo] = useState([]);
    const [tipo3, setTipo3] = useState([]);
    const [tipo4, setTipo4] = useState([]);
    const [tipoObra, setTipoObra] = useState([]);
    const [valor, setValor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const { user: usuario } = useContext(AuthContext);
    const [quantidadeprod, setQuantidadeprod] = useState('');
    
    


    function handleSubmit(){
        Keyboard.dismiss();
        if(nome === '' || serviço === '' || tipo === [] || tipo3 === [] || tipo4 === [] || quantidade === '' || valor === ''){
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
            tipo3: tipo3,
            tipo4: tipo4,
            quantidadeprod: parseFloat(quantidadeprod),
            quantidade: parseFloat(quantidade),
            salario: parseFloat(valor),
            date: format(new Date(), 'dd/MM/yy'),
            
        });

   

        let user = firebase.database().ref('serviços').child(nome).child(serviço);
        await user.once('value').then((snapshot)=>{
            let saldo = parseFloat(snapshot.val().saldo);
            let quantprofissionais = parseFloat(snapshot.val().quantprofissionais);
            let quantprofissionais2 = parseFloat(snapshot.val().quantprofissionais2);
            let quantproduzida = parseFloat(snapshot.val().quantproduzida);

            saldo += ((parseFloat(valor))*(parseFloat(quantidade)));
            
            quantproduzida += (parseFloat(quantidadeprod));

            if (tipo  === 'ajudante'){
                quantprofissionais2 += (parseFloat(quantidade));
             }else {
                 quantprofissionais += (parseFloat(quantidade));

             }
             
            user.child('saldo').set(saldo);
            user.child('quantprofissionais').set(quantprofissionais);
            user.child('quantprofissionais2').set(quantprofissionais2);
            user.child('quantproduzida').set(quantproduzida);
        });

        Keyboard.dismiss();
        setNome('');
        setServiço('');
        setTipo([]);
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

                <Picker2 onChange={setTipoObra}/>
                
                <Picker3 onChange={setTipo3}/>

                <Input 
                placeholder="Salário Hora"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={ ()=> Keyboard.dismiss()}
                value={valor}
                onChangeText={ (text) => setValor(text) }
                />

                <Input 
                placeholder="Quantidade produzida"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={ ()=> Keyboard.dismiss()}
                value={quantidadeprod}
                onChangeText={ (text) => setQuantidadeprod(text) }
                />
                <Picker4 onChange={setTipo4}/>
                
                <SubmitButton onPress={handleSubmit}>
                    <SubmitText>Adicionar</SubmitText>
                </SubmitButton>

                
            </SafeAreaView>
        </ScrollView>
        </Background>
        </TouchableWithoutFeedback>
    );
    }