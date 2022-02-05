//http://files.cod3r.com.br/curso-react-native/tasks_deps.txt

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import todayImage from '../../assets/imgs/today.jpg';
import Task from '../components/Task';
import moment from 'moment';
import 'moment/locale/pt-br'
import estilos from '../estilos';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTask from './AddTask';
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";

const storage = new MMKVStorage.Loader().withEncryption().initialize();

const initialState = {
    showDoneTasks: true,
    modal: false,
    visibleTasks: [],
    tasks: []
}

export default (props) => {

    const hoje = moment().locale('pt-br').format('ddd, D [de] MMMM');
    const [state, setState] = useMMKVStorage('state', storage, {
        showDoneTasks: true,
        modal: false,
        visibleTasks: [],
        tasks: []  
    })

    function toggleFilter(){ // Botão que marca para visualizar todas ou somente as pendentes
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

    function deleteTask(id){
        const Tasks = [...state.tasks]
        let others = []
        Tasks.map((task, index) => {
            if(task.id != id){
                others.push(task)
            }else{
                console.log("EXCLUIDO:", task.desc)
            }
        })

        let exibir = state.showDoneTasks
        let visible = []

        if(exibir == true){
            visible = others
        }else{
            others.map((item, index)=>{
                if(item.doneAt === null){
                    visible.push(item)
                }
            })
        }

        setState({showDoneTasks: exibir, modal: state.modal, visibleTasks: visible, tasks: others })

    }

    useEffect(() => {
        setTimeout(()=>{ updateTasks() }, 800)
    }, [])

    function updateTasks(){
        let exibir = state.showDoneTasks
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
        setState({ showDoneTasks: exibir, modal: false, visibleTasks: visible, tasks: lista })
    }

    function addTask(newTask){
        console.log(newTask);
        
        if(!newTask.desc.trim() || !newTask.desc){
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }

        let newTasks = [...state.tasks]
        let visibles = [...state.visibleTasks]
        newTasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })
        visibles.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })
        setState({showDoneTasks: state.showDoneTasks, modal: false, visibleTasks: visibles, tasks: newTasks})
    }

    return (
        <View style={stl.container}>
            <AddTask  isVisible={state.modal} onSave={addTask} onCancel={()=>{ setState({showDoneTasks: state.showDoneTasks, modal: false, visibleTasks: state.visibleTasks, tasks: state.tasks}) }} />
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
                    renderItem={(obj)=> <Task {...obj.item} toggleTask={toggleTask} deleteTask={deleteTask}  /> } // o spred operator serve para passar os items do OBJ como se fosse passando cada data separadamente.
                />
            </View>
            <TouchableOpacity activeOpacity={0.6} style={stl.addButton} onPress={ ()=>{ setState({showDoneTasks: state.showDoneTasks, modal: true, visibleTasks: state.visibleTasks, tasks: state.tasks}) } }>
                <Icon name='plus' size={20} color={estilos.colors.secondary} />
            </TouchableOpacity>
        </View>
    );
}

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
    },
    addButton:{
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: estilos.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
