import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import {Container, AreaText, Title, Name, LogoutButton, LogoutText, Logo, imagemFundo} from './styles';
import Header from '../../components/Header';


export default function Profile(){
    const navigation = useNavigation();

    const{ user, signOut } = useContext(AuthContext);

    return(
        
        <Container>
            
            <Header/>
            <AreaText>
            <Logo source={require('../../assets/imgbg3.png')}/>
            <Title>Bem vindo(a)!</Title>
            <Name>{user && user.nome}</Name>

            <LogoutButton onPress={() => signOut()}>
                <LogoutText>Sair</LogoutText>
            </LogoutButton>
            </AreaText>
        </Container>
    );
}