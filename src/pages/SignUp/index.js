import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';

import {Background, Container, Logo,AreaInput, Input,
         SubmitButton, SubmitText, SignUpText, SignInButton, SignInText} from './styles';

export default function SignUp(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp } = useContext(AuthContext);

    function handleSignUp(){
        signUp(email, password, nome);  
    }

    

    return(
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <SignUpText>Quase tudo pronto!</SignUpText>

                <AreaInput>
                    <Input
                        placeholder="Nome"
                        autoCorrect={false}
                        autoCapitalize= "none"
                        value={nome}
                        onChangeText={(text)=> setNome(text)}
                    />
                </AreaInput>

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

                <SubmitButton onPress={handleSignUp}>
                    <SubmitText>Cadastrar</SubmitText>
                </SubmitButton>

                
                
            </Container>
        </Background>
    )
}