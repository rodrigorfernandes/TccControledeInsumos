import React, {useState, useContext} from 'react';
import { Platform } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import {Background, Container, Logo,AreaInput, Input,
    SubmitButton, SubmitText, SignUpLink, SignUpText} from './styles';

export default function SignIn(){
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);

    function handleLogin(){
        signIn(email, password);
    }

    return(
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <Logo source={require('../../assets/imgbg3.png')}/>

                <AreaInput>
                    <Input
                        placeholder="Email"
                        autoCorrect={false}
                        autoCapitalize= "none"
                        value={email}
                        onChangeText={(text)=> setEmail(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Senha"
                        autoCorrect={false}
                        autoCapitalize= "none"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text)=> setPassword(text)}
                    />
                </AreaInput>

                <SubmitButton onPress={handleLogin}>
                    <SubmitText>Acessar</SubmitText>
                </SubmitButton>

                <SignUpLink onPress={()=> navigation.navigate('SignUp')}>
                    <SignUpText>Criar conta gratuita</SignUpText>
                </SignUpLink>
                
            </Container>
        </Background>
    )
}