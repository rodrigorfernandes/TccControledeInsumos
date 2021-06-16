import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { PickerView } from './styles';

export default function Picker4({onChange}){
    return(
        <PickerView>
            <RNPickerSelect
            style={{
                inputIOS:{
                    height: 50,
                    padding: 5,
                    backgroundColor: '#FFF',
                    fontSize: 16
                }
            }}
            placeholder={{
                label: 'Selecione a unidade',
                color: '#222',
                value: null,
            }}
            onValueChange={(tipo4) => onChange(tipo4)}
            items={[
                {label: 'm', value: 'm', color: '#222'},
                {label: 'm2', value: 'm2', color: '#222'},
                {label: 'm3', value: 'm3', color: '#222'},
                {label: 'un', value: 'un', color: '#222'},
                {label: 'cx', value: 'cx', color: '#222'},
                {label: 'sc', value: 'sc', color: '#222'},
                {label: 'kg', value: 'kg', color: '#222'},


                
                
            ]}
            />
        </PickerView>
    )
}