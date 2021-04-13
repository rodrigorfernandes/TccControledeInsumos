import styled from 'styled-components/native';


export const Background = styled.View`
    background-color:#131313
    flex:1;
`;

export const Container = styled.KeyboardAvoidingView`
    flex:1;
    align-items: center;
    justify-content: center;
`;

export const SignUpText = styled.Text`
    margin-bottom: 15px;
    color: #FFF;
    font-size: 25px;
    font-weight:bold;
`;

export const AreaInput = styled.View`
   flex-direction: row;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(255, 255, 255, 0.6)'
})`
    background: rgba(0,0,0,0.2);
    color:#FFF;
    font-size: 17px;
    border-radius: 7px;
    width: 90%;
    margin-bottom: 15px;
    padding: 10px;
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
    font-size: 25px;
    font-weight: bold
`;

export const SignInButton = styled.TouchableOpacity`
    margin-top: 10px;
`;

export const SignInText = styled.Text`
    color: #FFF;
    padding-bottom: 12px;
`;