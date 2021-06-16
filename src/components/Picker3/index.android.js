import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { PickerView } from './styles';

export default function Picker3({onChange}){
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
                label: 'Selecione o tipo de medição',
                color: '#222',
                value: null,
            }}
            onValueChange={(tipo3) => onChange(tipo3)}
            items={[
                {label: 'Diária', value: 'diária', color: '#222'},
                {label: 'Semanal', value: 'semanal', color: '#222'},
                {label: 'Mensal', value: 'mensal', color: '#222'},
                
                
            ]}
            />
        </PickerView>
    )
}