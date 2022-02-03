//http://files.cod3r.com.br/curso-react-native/tasks_deps.txt

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Platform } from 'react-native';
import todayImage from '../../assets/imgs/today.jpg';
import Task from '../components/Task';
import moment from 'moment';
import 'moment/locale/pt-br'
import estilos from '../estilos';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTask from './AddTask';

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
    const [state, setState] = useState({ showDoneTasks: true, modal: true, visibleTasks: [], tasks: tarefas })

    function toggleFilter(){ // Botão que marca para visualizar as todas ou somente as pendentes
        let exibir = !state.showDoneTasks
        let visible = []
        let lista = state.tasks
        
        if(exibir == true){
            visible = lista
        }else{
            lista.map((item, index)=>{
                if(item.doneAt === null){
                    visible.push(item)
                }
            })
        }
        setState({ showDoneTasks: exibir, modal: state.modal, visibleTasks: visible, tasks: lista })
    }

    function toggleTask(id){ // Função que marca ou desmarca a tarefa como concluida
        const novaTasks = [...state.tasks]
        novaTasks.forEach((task) => {
            if(task.id === id){
                if(task.doneAt){ // Se for diferente de nulo
                    task.doneAt = null // marca como não lida
                }else{
                    task.doneAt = new Date() // Se for nula poe uma data e marca como lida
                }
            }
        })

        let exibir = state.showDoneTasks
        let visible = []
        let lista = state.tasks

        if(exibir == true){
            visible = lista
        }else{
            novaTasks.map((item, index)=>{
                if(item.doneAt === null){
                    visible.push(item)
                }
            })
        }

        setState({showDoneTasks: exibir, modal: state.modal, visibleTasks: visible, tasks: novaTasks })

    }

    useEffect(() => {
        setTimeout(()=>{ toggleFilter() }, 1000)
    }, [])

    return (
        <View style={stl.container}>
            <AddTask  isVisible={state.modal} onCancel={()=>{ setState({showDoneTasks: state.showDoneTasks, modal: false, visibleTasks: state.visibleTasks, tasks: state.tasks}) }} />
            <ImageBackground style={stl.background} source={todayImage}>
                <View style={stl.iconBar}>
                    <TouchableOpacity onPress={ toggleFilter }>
                        <Icon name={state.showDoneTasks ? 'eye' : 'eye-slash'} size={40} color={estilos.colors.secondary} />
                    </TouchableOpacity>
                </View>
                <View style={stl.titleBar}>
                    <Text style={stl.title}>Hoje</Text>
                    <Text style={stl.subTitle}>{hoje}</Text>
                </View>
            </ImageBackground>
            <View style={stl.taskList}>
                <FlatList 
                    data={state.visibleTasks}
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
    },
    iconBar:{
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 30 : 20
    }
});
