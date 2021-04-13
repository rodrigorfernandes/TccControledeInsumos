import React from 'react';

import {Container, TipoText, ValorText, SubmitButtonExcluir, SubmitText, AreaInput} from './styles';

export default function HistoricoList({data, deleteItem}){
    return(
        <Container> 
            <TipoText>Nome da Obra:</TipoText>
            <ValorText>{data.nome}</ValorText>
            <TipoText>Nome da empresa:</TipoText>
            <ValorText>{data.empresa}</ValorText>
            <TipoText>Endereço:</TipoText>
            <ValorText>{data.endereço}</ValorText>
            <TipoText>Município:</TipoText>
            <ValorText>{data.município}</ValorText>
            
            <AreaInput>
                <SubmitButtonExcluir onPress={() => deleteItem(data.key)}>
                    <SubmitText>Excluir</SubmitText>
                </SubmitButtonExcluir>
            </AreaInput>

        </Container>
        
    )
}