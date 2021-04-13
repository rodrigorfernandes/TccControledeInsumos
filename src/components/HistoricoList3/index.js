import React from 'react';

import {Container, TipoText, ValorText, SubmitButtonExcluir, SubmitText, AreaInput} from './styles';

export default function HistoricoList3({data, deleteItem}){
    return(
        <Container> 
            <TipoText>Nome da Obra:</TipoText>
            <ValorText>{data.nome}</ValorText>
            <TipoText>Serviço:</TipoText>
            <ValorText>{data.serviço}</ValorText>
            <TipoText>Material:</TipoText>
            <ValorText>{data.material}</ValorText>
            <TipoText>Quantidade:</TipoText>
            <ValorText>{data.quantidade} {data.unidade}</ValorText>
            <TipoText>Valor Unitário:</TipoText>
            <ValorText>R$ {data.valor.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</ValorText>
            <TipoText>Valor parcial gasto:</TipoText>
            <ValorText>R$ {(data.valor*data.quantidade).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</ValorText>
            <TipoText>Data: </TipoText>
            <ValorText>{data.date}</ValorText>
            
            <AreaInput>
                <SubmitButtonExcluir onPress={() => deleteItem(data)}>
                    <SubmitText>Excluir</SubmitText>
                </SubmitButtonExcluir>
            </AreaInput>

        </Container>
        
    )
}
