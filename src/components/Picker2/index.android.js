import React, { useState, useEffect }  from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { PickerView } from './styles';
import firebase from '../../services/firebaseConnection';
import HistoricoList from '../../components/HistoricoList';
import { Alert } from 'react-native';
 
export default function Picker2({onChange}){
 

    
    const [historico, setHistorico] =useState([]);
    const [lista, setLista] = useState([]);

    
    
    useEffect(()=>{
        
         
        
        // async function loadList(){
        //     await firebase.database().ref('historico').child(uid).on('value', (snapshot)=>{
        //         setHistorico([]);
        //         setLista([]);
    
 
        //         snapshot.forEach((childItem)=>{
        //             let data = {
        //                 key: childItem.key,
        //                 nome: childItem.val().nome
        //             }; 
                   
        //            let listaPicker = {
        //              label: childItem.val().nome,
        //              value: childItem.val().nome, 
        //              color: '#222'
        //            };
        //             setLista(oldArray => [...oldArray, listaPicker]);
        //             setHistorico(oldArray => [...oldArray, data]);
 
        //         })
    
                
        //     });
        // }
        loadingList();
    },[]);
 
    const loadingList = async () =>{
        await firebase.database().ref('historico')
        .child(uid)
        .once('value', (snapshot) => {
            Alert.alert('Funcionou')
            // setLista([]);
            

            // snapshot.forEach((childItem) => {
            //     if(childItem.val().nome === input){
            //         let listaPicker = {
            //             label: childItem.val().nome,
            //             value: childItem.val().nome, 
            //             color: '#222'
            //    };
            //     setLista(oldArray => [...oldArray, listaPicker]);
            //     }else{
            //         console.log('NAO TEM NADA AQUI');
            //     }
            // })
        });
        
        
    }
        return(
 
        <PickerView>
            <RNPickerSelect
            style={{
                inputAndroid:{  
                    height: 50,
                    padding: 5,
                    backgroundColor: '#FFF',
                    fontSize: 16
                },
                inputIOS:{  
                    height: 50,
                    padding: 5,
                    backgroundColor: '#FFF',
                    fontSize: 16
                }
            }}
            placeholder={{
                label: 'Selecione a obra',
                color: '#222',
                value: null,
            }}
            onValueChange={(tipoObra) => onChange(tipoObra)}
            items={
                lista
            }
            />
            
        </PickerView>
        
    )
}