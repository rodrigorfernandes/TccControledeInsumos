import React from 'react';

import {Container, TipoText, ValorText, SubmitButtonExcluir, SubmitText, AreaInput} from './styles';

export default function HistoricoList2({data, deleteItem}){
    return(
        <Container> 
            <TipoText>Nome da Obra:</TipoText>
            <ValorText>{data.nome}</ValorText>
            <TipoText>Serviço:</TipoText>
            <ValorText>{data.serviço}</ValorText>
            <TipoText>Profissional:</TipoText>
            <ValorText>{data.tipo}</ValorText>
            <TipoText>Quantidade de horas:</TipoText>
            <ValorText>{data.quantidade} horas</ValorText>
            <TipoText>Quantidade produzida:</TipoText>
            <ValorText>{data.quantidadeprod} {data.tipo4} </ValorText>
            <TipoText>Salário Hora:</TipoText>
            <ValorText>R$ {data.salario.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</ValorText>
            <TipoText>Valor parcial gasto:</TipoText>
            <ValorText>R$ {(data.salario*data.quantidade).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</ValorText>
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
