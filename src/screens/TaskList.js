//http://files.cod3r.com.br/curso-react-native/tasks_deps.txt

import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList } from 'react-native';
import todayImage from '../../assets/imgs/today.jpg';
import Task from '../components/Task';
import moment from 'moment';
import 'moment/locale/pt-br'
import estilos from '../estilos';

export default (props) => {

    let tarefas = [
        {
            id: Math.random(),
            desc: 'Comprar Livro de React Native',
            estimateAt: new Date(),
            doneAt: new Date()
        },
        {
            id: Math.random(),
            desc: 'Ler Livro de React Native',
            estimateAt: new Date(),
            doneAt: null
        }
    ]

    const hoje = moment().locale('pt-br').format('ddd, D [de] MMMM');
    const [state, setState] = useState({ tasks: tarefas })

    function toggleTask(id){
        const novaTasks = [...state.tasks]
        novaTasks.forEach((task) => {
            if(task.id === id){
                task.doneAt = task.doneAt ? null : new Date(); // Inverter o valor de doneAt, se tiver preenchido com o data, fica nulo, se tiver nulo coloca a data atual.
            }
        })

        setState({ tasks: novaTasks })
    }


    return (
        <View style={stl.container}>
            <ImageBackground style={stl.background} source={todayImage}>
                <View style={stl.titleBar}>
                    <Text style={stl.title}>Hoje</Text>
                    <Text style={stl.subTitle}>{hoje}</Text>
                </View>
            </ImageBackground>
            <View style={stl.taskList}>
                <FlatList 
                    data={state.tasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={(obj)=> <Task {...obj.item} toggleTask={toggleTask} /> } // o spred operator serve para passar os items do OBJ como se fosse passando cada data separadamente.
                />
            </View>
        </View>
    );
  };
const stl = StyleSheet.create({
    container:{
        flex: 1
    },
    background:{
        flex: 3
    },
    taskList:{
        flex: 7
    },
    titleBar:{
        flex: 1,
        justifyContent: 'flex-end'
    },
    title:{
        fontFamily: estilos.fontFamily,
        color: estilos.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subTitle:{
        fontFamily: estilos.fontFamily,
        color: estilos.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    }
});
