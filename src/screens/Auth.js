import React, { useState } from 'react'
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity, Alert, TextInput } from 'react-native'
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../estilos'

export default (props)=>{

    const [state, setState] = useState({name: '', confirmPassword: '', email: '', password: '', stageNew: false})

    function mudar(objeto, campo, valorCampo){
        let obj = {...objeto}
        obj[campo] = valorCampo
        setState(obj)
    }

    function signinOrSignup () {
        if (state.stageNew) {
            Alert.alert('Você não está logado')
        } else {
            Alert.alert('Você está logado')
        }
    }

    return(
        <ImageBackground source={backgroundImage} style={styles.background}>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>{state.stageNew ? 'Criar Conta' : 'Informe seus dados'}</Text>
                {state.stageNew &&
                <TextInput style={styles.input} placeholder='Nome'  value={state.name}     onChangeText={txtName  => mudar(state, 'name', txtName)} /> }
                <TextInput style={styles.input} placeholder='Email' value={state.email}    onChangeText={txtEmail => mudar(state, 'email', txtEmail)} />
                <TextInput style={styles.input} placeholder='Senha' value={state.password} onChangeText={txtSenha => mudar(state, 'password', txtSenha)} secureTextEntry={true} />
                {state.stageNew &&
                <TextInput style={styles.input} placeholder='Confirmar senha' value={state.confirmPassword} onChangeText={txtConfirm => mudar(state, 'confirmPassword', txtConfirm)} secureTextEntry={true} /> }
                <TouchableOpacity onPress={signinOrSignup}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{state.stageNew ? 'Registrar' : 'Entrar'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity  style={{padding: 10}} onPress={ ()=>{mudar(state, 'stageNew', !state.stageNew)} }>
                <Text style={styles.buttonText}>{state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})