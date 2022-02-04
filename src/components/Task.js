import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import 'react-native'
import estilos from '../estilos';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar, Button } from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/pt-br'

function getCheckView(doneAt){
    if(doneAt != null){
        return(
            <View style={stl.done}>
                <Icon name="check" size={20} color="#FFF" />
            </View>
        )
    }else{
        return(
            <View style={stl.pending}></View>
        )
    }
}

export default (props) => {
    const doneOrNoteStyle = props.doneAt != null ? {textDecorationLine: 'line-through'} : {}
    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    return (
        <View style={stl.container}>
            <TouchableWithoutFeedback onPress={ ()=> props.toggleTask(props.id) }>
                <View style={stl.check}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View style={stl.textos}>
                <Text style={[stl.descrition, doneOrNoteStyle]}>{props.desc}</Text>
                <Text style={stl.date}>{formatedDate}</Text>
            </View>
            <TouchableWithoutFeedback onPress={ ()=> props.deleteTask(props.id) }>
                <View style={stl.checkDelete}>
                    <View style={stl.delete}>
                        <Icon name="trash" size={20} color="#FFF" />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const stl = StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    textos:{
        flex: 4
    },
    check:{
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    checkDelete:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    pending:{
        height: 35,
        width: 35,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done:{
        height: 35,
        width: 35,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    delete:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#FF0000',
        backgroundColor: '#FF0000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    descrition:{
        fontFamily: estilos.fontFamily,
        color: estilos.colors.mainText,
        fontSize: 15
    },
    date:{
        fontFamily: estilos.fontFamily,
        color: estilos.colors.subText,
        fontSize: 12
    },
    excluir:{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    }
});