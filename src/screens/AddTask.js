import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import estilos from '../estilos';

initialState = { desc: '' }

export default (props) => {

    const [state, setState] = useState(initialState)

    return (
        <Modal transparent={true} visible={props.isVisible} onRequestClose={props.onCancel} animationType='slide'>
            <TouchableWithoutFeedback onPress={props.onCancel}><View style={stl.background}></View></TouchableWithoutFeedback>
            <View style={stl.container}>
                <Text style={stl.header}>Nova Tarefa</Text>
                <TextInput 
                    style={stl.input}
                    placeholder='Informe a descrição...'
                    value={state.desc}
                    onChangeText={ (novoTexto) => {setState({desc: novoTexto})} }
                />
                <View style={stl.buttons}>
                    <TouchableOpacity onPress={props.onCancel}><Text style={stl.button}>Cancelar</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={stl.button}>Salvar</Text></TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={props.onCancel}><View style={stl.background}></View></TouchableWithoutFeedback>
        </Modal>

    );
  };
const stl = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container:{
        flex: 1,
        backgroundColor: '#FFF'
    },
    header:{
        fontFamily: estilos.fontFamily,
        backgroundColor: estilos.colors.today,
        color: estilos.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button:{
        margin: 20,
        marginRight: 30,
        color: estilos.colors.today
    },
    input:{
        fontFamily: estilos.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#E3E3E3',
        borderRadius: 10
    }
});
