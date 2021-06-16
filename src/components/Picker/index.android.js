import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { PickerView } from './styles';

export default function Picker({onChange}){
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
                label: 'Selecione o cargo',
                color: '#222',
                value: null,
            }}
            onValueChange={(tipo) => onChange(tipo)}
            items={[
                {label: 'Ajudante', value: 'ajudante', color: '#222'},
                {label: 'Armador', value: 'armador', color: '#222'},
                {label: 'Carpinteiro', value: 'carpinteiro', color: '#222'},
                {label: 'Empreiteiro', value: 'empreiteiro', color: '#222'},
                {label: 'Eletricista', value: 'eletricista', color: '#222'},
                {label: 'Encanador', value: 'encanador', color: '#222'},
                {label: 'Encanador Industrial', value: 'encanadorindustrial', color: '#222'},
                {label: 'Gesseiro', value: 'gesseiro', color: '#222'},
                {label: 'Montador', value: 'montador', color: '#222'},
                {label: 'Pintor', value: 'pintor', color: '#222'},
                {label: 'Pedreiro', value: 'pedreiro', color: '#222'},
                {label: 'Topógrafo', value: 'topografo', color: '#222'},
                {label: 'Marteleteiro', value: 'marteleteiro', color: '#222'},

                
            ]}
            />
        </PickerView>
    )
}