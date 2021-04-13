import styled from 'styled-components/native';


export const Container = styled.View`
    background-color: rgba(255, 255, 255, 0.9);
    margin-bottom: 12px;
    padding: 7px;
    border-radius: 5px;
`;

export const TipoText = styled.Text`
    color: #222;
    font-size: 20px;
    align-items: center;
`;

export const ValorText = styled.Text`
    color: #222;
    font-size: 20px; 
    font-weight: bold;
`;

export const AreaInput = styled.View`
    align-items: center;
    justify-content;
    
`;

export const SubmitButtonExcluir = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #F2C94C;
    height: 45px;
    width: 50%;
    border-radius: 20px;
    margin-top: 10px
    
`;

export const SubmitText = styled.Text`
    align-items: center;
    color: #222; 
    font-size: 20px;
    font-weight: bold;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#222'
 })`
    height: 50px;
    width:90%;
    background-color: rgba(255, 255, 255, 0.9)
    margin-top:30px;
    font-size: 16px;
 `;