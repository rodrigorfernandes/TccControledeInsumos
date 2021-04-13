import React from 'react';

import {Container, TipoText, ValorText, SubmitButtonExcluir, SubmitText, AreaInput} from './styles';

export default function HistoricoList4({data, deleteItem}){
    return(
        <Container> 
            <TipoText>Nome da Obra:</TipoText>
            <ValorText>{data.serviço}</ValorText>
            
            
            <AreaInput>
                <SubmitButtonExcluir onPress={() => deleteItem(data)}>
                    <SubmitText>Excluir</SubmitText>
                </SubmitButtonExcluir>
            </AreaInput>

        </Container>
        
    )
}
