import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, Text, View, TouchableOpacity, TextInput, 
    TouchableWithoutFeedback, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import estilos from '../estilos';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

let initialState = { desc: '', date: new Date(), show: false }

export default (props) => {

    const [state, setState] = useState(initialState)

    function gravarData(event, selectedDate){
        const currentDate = selectedDate || new Date();
        setState({ desc: state.desc, date: currentDate, show: false })       
    }

    function getdate(){
        let date = <DateTimePicker value={state.date} is24Hour={true} onChange={ gravarData } display='spinner' mode='date' />
        const dateString = moment(state.date).locale('pt-br').format('ddd, D [de] MMMM');
  
        return (
            <View>
                <TouchableOpacity onPress={ ()=>{ setState({ desc: state.desc, date: state.date, show: true }) } }>
                    <Text style={stl.date}> {dateString} </Text>
                </TouchableOpacity>
                {state.show && date /* Só renderiza o componente'date' se state.show for true*/ }
            </View>
        )
    }

    function saveTask(){
        const newTask = {
            desc: state.desc,
            date: state.date
        }
        if(props.onSave){
            setState({ desc: '', date: new Date(), show: false })
            props.onSave(newTask)
        }
    }

    function openKeyboard(){
        console.log('Abriu Teclado')
    }

    return (
        <Modal transparent={true} visible={props.isVisible} onRequestClose={props.onCancel} animationType='slide'>
            <TouchableWithoutFeedback onPress={props.onCancel}><View style={stl.background}></View></TouchableWithoutFeedback>
            
            <KeyboardAvoidingView behavior="padding" style={stl.key}>
                <View style={stl.container}>
                    <Text style={stl.header}>Nova Tarefa</Text>
                    <TextInput 
                        style={stl.input}
                        placeholder='Informe a descrição...'
                        value={state.desc}
                        onFocus={openKeyboard}
                        onChangeText={ (novoTexto) => {setState({desc: novoTexto, date: state.date, show: state.show})} }
                    />
                    { getdate() }
                    <View style={stl.buttons}>
                        <TouchableOpacity onPress={props.onCancel}><Text style={stl.button}>Cancelar</Text></TouchableOpacity>
                        <TouchableOpacity onPress={saveTask}      ><Text style={stl.button}>Salvar</Text></TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

            <TouchableWithoutFeedback onPress={props.onCancel}><View style={stl.background}></View></TouchableWithoutFeedback>
        </Modal>
    );
  };
const stl = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    key:{
        flex: 1
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
    },
    date:{
        fontFamily: estilos.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
});
