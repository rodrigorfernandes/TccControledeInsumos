import styled from 'styled-components/native';

export const Container = styled.View`
    
    background-color:#131313;
    flex:1;
    
`;

export const AreaTitulo = styled.View`
    align-items: center;
    justify-content: center;
    
`;

export const Titulo = styled.Text`
    color: #F2C94C;
    font-size: 24px;
    
`;

export const AreaInput = styled.View`
    align-items: center;
    justify-content: center;
    
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#222'
})`
    height: 50px;
    width:90%;
    background-color: rgba(255, 255, 255, 0.9)
    margin-top:30px;
    font-size: 16px;
    border-radius: 5px;
    
`;


export const AreaSaldo = styled.View`
    margin-left: 15px;
    margin-bottom: 25px;
    
`;

export const Saldo = styled.Text`
    margin-top: 5px;
    font-size: 30px;
    color: #FFF;
    font-weight: bold;
    
`;

export const Quantidade = styled.Text`
    margin-top: 5px;
    font-size: 30px;
    color: #FFF;
    font-weight: bold;
    
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #F2C94C;
    height: 45px;
    width: 50%;
    border-radius: 20px;
    margin-top: 14px;
    
`;

export const SubmitText = styled.Text`
    
    color: #222;
    font-size: 20px;
    font-weight: bold
`;

export const AreaList = styled.View`
    padding-left: 10px;

`;

export const List = styled.FlatList`
    width:90%;
    border-radius: 5px; 
    margin-top: 14px; 
    margin-bottom: 14px;
    margin-left: 14px;  
    
    
`;

export const AreaButton = styled.View`
    align-items: center;
    justify-content: center;
    
`;

export const AddPhotoButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #F2C94C;
    height: 45px;
    width: 50%;
    border-radius: 20px;
    margin-top: 10px;
    
`;

export const PhotoText = styled.Text`
    
    color: #222;
    font-size: 20px;
    font-weight: bold
`;


