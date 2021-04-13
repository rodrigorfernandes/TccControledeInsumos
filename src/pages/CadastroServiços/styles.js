import styled from 'styled-components/native';

export const Background = styled.View`
   flex: 1;
   background-color: #131313;
`;

export const AreaTitulo = styled.View`
   align-items: center;
`;

export const TextTitulo = styled.Text`
    color: #F2C94C;
    font-size: 24px;
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

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #F2C94C;
    height: 45px;
    width: 50%;
    border-radius: 20px;
    margin-top: 10px;
`;

export const SubmitText = styled.Text`
    color: #222;
    font-size: 20px;
    font-weight: bold
`;