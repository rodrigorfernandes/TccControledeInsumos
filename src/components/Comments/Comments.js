import React, {Component} from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';

class Comments extends Component {
    render(){
        let view = null
        if(this.props.comments) {
            view = this.props.comments.map((item, index) => {
                return(
                    <View>
                    <View style={styles.commentContainer} key={index}>
                        
                        <Text style={styles.comment}>{item.serviço}</Text>
                    </View>
                    <View style={styles.commentContainer} key={index}>
                        <Text style={styles.comment}>{item.comment} -</Text>
                        <Text style={styles.comment}> {item.date}</Text>
                    </View>
                    

                    </View>
                )
            })
        }
        return(
            <View style={styles.container}>
                {view}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
         flex: 1,
         margin: 10
    },
    commentContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    comment:{
        color: '#F2C94C',
        fontSize: 20
    }
})
export default Comments