import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';


const AuthStack = createStackNavigator();

function AuthRoutes(){
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen 
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
            />

            <AuthStack.Screen 
            name="SignUp"
            component={SignUp}
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

        </AuthStack.Navigator>
    );
}
export default AuthRoutes;