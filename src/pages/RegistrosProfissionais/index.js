import React, { useContext, useState, useEffect } from 'react';
import {Keyboard, Alert, ScrollView } from 'react-native';
import firebase from '../../services/firebaseConnection';


import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import HistoricoList2 from '../../components/HistoricoList2';
import HistoricoList3 from '../../components/HistoricoList3';

import { Container, AreaTitulo, Titulo,AreaInput, Input, AreaSaldo, Saldo,
        Quantidade, SubmitButton, SubmitText, List, AreaList} from './styles';
import { registerVersion } from 'firebase';

export default function RegistrosProfissionais(){
    

    
    const [nome, setNome] = useState('');
    const [serviço, setServiço] = useState('');
    const [input, setInput] = useState('');
    const [profissionais, setProfissionais] =useState([]);
    const [saldo, setSaldo] = useState(0);
    const [quantprofissionais, setQuantprofissionais] = useState(0);
    const [materiais, setMateriais] = useState([]);
    const [quantidade, setQuantidade] = useState('');

    const [material, setMaterial] = useState('');
    const [unidade, setUnidade] = useState('');
    const [valor, setValor] = useState('');
    const [quantidadem, setQuantidadem] = useState('');

    const {user} = useContext(AuthContext);
    const uid = user && user.uid;

    async function loadingList2(){
        await firebase.database().ref('profissionais')
        .child(nome).child(serviço)
        .once('value', (snapshot) => {
            setProfissionais([]);

            snapshot.forEach((childItem) => {
                if(childItem.val().nome === nome){
                    let list = {
                        key: childItem.key,
                        nome: childItem.val().nome,
                        quantidade: childItem.val().quantidade,
                        serviço: childItem.val().serviço,
                        salario: childItem.val().salario,
                        tipo: childItem.val().tipo,
                        date: childItem.val().date
                        
                    };
                    setProfissionais(oldArray => [...oldArray, list]);
                }else{
                    console.log('NAO TEM NADA AQUI');
                }
            })
        });
        
        Keyboard.dismiss();
        loadingSaldo();
        loadingQuantidade();
        loadingList3();
    }
    async function loadingList3(){
        await firebase.database().ref('materiais')
        .child(nome).child(serviço)
        .once('value', (snapshot) => {
            setMateriais([]);

            snapshot.forEach((childItem) => {
                if(childItem.val().nome === nome){
                    let list = {
                        key: childItem.key,
                        nome: childItem.val().nome,
                        quantidade: childItem.val().quantidade,
                        serviço: childItem.val().serviço,
                        material: childItem.val().material,
                        valor: childItem.val().valor,
                        unidade: childItem.val().unidade,
                        date: childItem.val().date
                    };
                    setMateriais(oldArray => [...oldArray, list], reverse());
                }else{
                    console.log('NAO TEM NADA AQUI');
                }
            })
        });

        Keyboard.dismiss();
        loadingSaldo();
        loadingQuantidade();
    }
    
    async function loadingSaldo(){
        await firebase.database().ref('serviços').child(nome).child(serviço).on('value', (snapshot)=>{
            setSaldo(snapshot.val().saldo)
        })
    }

    async function loadingQuantidade(){
        await firebase.database().ref('serviços').child(nome).child(serviço).on('value', (snapshot)=>{
            setQuantprofissionais(snapshot.val().quantprofissionais)
        })
    }



    function handleSubmit(data){
        Keyboard.dismiss();

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
                    onPress: () => handleDelete(data)
                }
            ]
        )
    }

    async function handleDelete(data){
        await firebase.database().ref('profissionais').child(nome).child(serviço).child(data.key).remove()
        .then( async () => {
            let saldoAtual = saldo;
            saldoAtual -= (parseFloat(data.salario)*parseFloat(data.quantidade))
            
            await firebase.database().ref('serviços').child(nome).child(serviço).child('saldo').set(saldoAtual);

            let quantprofissionaisAtual = quantprofissionais
            quantprofissionaisAtual -= parseFloat(data.quantidade)

            await firebase.database().ref('serviços').child(nome).child(serviço).child('quantprofissionais').set(quantprofissionaisAtual);
        })
        .catch((error)=>{
            console.log(error);
        })

        setNome();
        setServiço();
        loadingList2();
        loadingList3();

    }
    function handleSubmit2(data){
        Keyboard.dismiss();

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
                    onPress: () => handleDelete2(data)
                }
            ]
        )
    }

    async function handleDelete2(data){
        
        await firebase.database().ref('materiais').child(nome).child(serviço).child(data.key).remove()
        .then( async () => {
            let saldoAtual = saldo;
            saldoAtual -= (parseFloat(data.valor)*parseFloat(data.quantidade))
            
            await firebase.database().ref('serviços').child(nome).child(serviço).child('saldo').set(saldoAtual);

            let quantmateriaisAtual = quantmateriais
            quantmateriaisAtual -= parseFloat(data.quantidade)

            await firebase.database().ref('serviços').child(nome).child(serviço).child('quantmateriais').set(quantmateriaisAtual);
        })

        

        
        setNome();
        setServiço();
        loadingList2();
        loadingList3();
    }


    return(
    <Container>
        <ScrollView>
        <Header/>
        <AreaTitulo>
            <Titulo>Registros</Titulo>
        </AreaTitulo>

        <AreaSaldo>
            <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
            <Quantidade>{quantprofissionais} horas de profissionais</Quantidade>
        </AreaSaldo>

        <AreaInput>
             <Input
                placeholder="Nome da obra"
                value={nome}
                autoCorrect={false}
                autoCapitalize= "none"
                onChangeText={(texto) => setNome(texto)}
                
            />
            
            
        </AreaInput>

        <AreaInput>
             <Input
                placeholder="Nome do serviço"
                value={serviço}
                autoCorrect={false}
                autoCapitalize= "none"
                onChangeText={(texto) => setServiço (texto)}
                
            />
            
            
        </AreaInput>
        
        <AreaInput>
            <SubmitButton onPress={loadingList2} >
                <SubmitText>Consultar</SubmitText>
            </SubmitButton>
        </AreaInput>
         
            <AreaList>
            <List 
                keyExtractor={item => item.key}
                data={profissionais}
                renderItem={ ({item}) => <HistoricoList2 data={item} deleteItem={handleSubmit}/> }
                
            />
            </AreaList>

            <AreaList>
            <List 
                keyExtractor={item => item.key}
                data={materiais}
                renderItem={ ({item}) => <HistoricoList3 data={item} deleteItem={handleSubmit2}/> }
                
            />
            </AreaList>
    
        

        </ScrollView>
    </Container>
    )
};