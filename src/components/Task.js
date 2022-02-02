import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import estilos from '../estilos';
import Icon from 'react-native-vector-icons/FontAwesome';
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
            <View>
                <Text style={[stl.descrition, doneOrNoteStyle]}>{props.desc}</Text>
                <Text style={stl.date}>{formatedDate}</Text>
            </View>
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
    check:{
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
        backgroundColor: '#4D7031',
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
    }
});