import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';
import Galeria from '../pages/Galeria/Galeria';
import RegistroFotografico from '../pages/RegistroFotografico/RegistroFotografico';
import Profissionais from '../pages/Profissionais';
import RegistrosProfissionais from '../pages/RegistrosProfissionais';
import CadastroServiços from '../pages/CadastroServiços';
import Materiais from '../pages/Materiais';

import { NavigationContainer } from '@react-navigation/native';

const AppDrawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AppRoutes(){
    return(
        <AppDrawer.Navigator
        drawerStyle={{
            backgroundColor: '#171717'
        }}
        drawerContentOptions={{
            labelStyle:{
                fontWeight: 'bold'
            },
            activeTintColor: '#FFF',
            activeBackgroundColor: '#F2C94C',
            inactiveBackgroundColor: '#000',
            inactiveTintColor: '#DDD',
            itemStyle: {
                marginVertical: 5,
            }
        }}
        >
            <AppDrawer.Screen 
            name="Perfil"
            component={Profile}
            />
            
            <AppDrawer.Screen            
            name="Registro de Obras"
            component={Home}
            />
            <AppDrawer.Screen 
            name="Cadastro de Obra"
            component={New}
            />
            <AppDrawer.Screen 
            name="Cadastro de Serviço"
            component={CadastroServiços}
            />

            <AppDrawer.Screen 
            name="Cadastro de Profissionais"
            component={Profissionais}
            />
            
            <AppDrawer.Screen 
            name="Cadastro de Materiais"
            component={Materiais}
            />
            <AppDrawer.Screen 
            name="Registros de Serviços"
            component={RegistrosProfissionais}
            />
            
            <AppDrawer.Screen 
            name="Registro Fotografico"
            component={RegistroFotografico}
            />

        </AppDrawer.Navigator>
    );
}

export default function App(){
    return(
        
            <Stack.Navigator>
                <Stack.Screen 
                name="Home" component={AppRoutes} 
                options={{ headerShown: false }}
                
                    
                
                />
                <Stack.Screen 
                name="Galeria" 
                component={Galeria}
                options={{
                    headerStyle:{
                        backgroundColor: '#131313',
                        borderBottomWidth:1,
                        borderBottomColor: '#F2C94C'
                    },
                    headerTintColor: '#FFF',
                    headerBackTitleVisible: false,
                    headerTitle: 'Voltar'
                }}
                />
            </Stack.Navigator>
        
    );
}