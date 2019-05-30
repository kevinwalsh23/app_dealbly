import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { DISHES } from '../shared/dishes';
import { ListItem, Card, Divider, Image } from 'react-native-elements';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {        
        rests: state.rests    
    }
}
function RenderRating(props) {
    const barinfo = props.barinfo;
    //console.warn(props);

    if (props.rating >= 9) {
        return(
            <View>
                <Text style={{backgroundColor: 'green', color: 'white', fontWeight: 'bold', marginEnd: 5,borderRadius: 10, textAlign: 'center' }}>{props.rating}</Text>
            </View>
        );
    }
    else if (props.rating >= 8) {
        return(
            <View>
                <Text style={{backgroundColor: '#2e8b57', color: 'white', fontWeight: 'bold', marginEnd: 5,borderRadius: 10, textAlign: 'center' }}>{props.rating}</Text>
            </View>
        );
    }
    else if (props.rating >= 7) {
        return(
            <View>
                <Text style={{backgroundColor: '#3cb371', color: 'white', fontWeight: 'bold', marginEnd: 5,borderRadius: 10, textAlign: 'center' }}>{props.rating}</Text>
            </View>
        );
    }
    else{
        return(
        <View>
            <Text style={{backgroundColor: '#daa520', color: 'white', fontWeight: 'bold', marginEnd: 5,borderRadius: 10, textAlign: 'center' }}>{props.rating}</Text>
        </View>);
    }
}
class BarRest extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Dealbly'
    };

    render() {
        const renderBarRestItem = ({item, index}) => {
            return (
                <View>
                    <Divider style={{marginTop: 5}}/>
                     
                    <View style={{margin: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                        <View style={{marginLeft: 5, marginTop: 5, backgroundColor: 'white', flex: 1.5, textAlign: 'center'}}>                        
                            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{index + 1}.</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 2}}>                        
                            <Image source={{ uri: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }} style={{height: 50, width: 50 }}/>
                        </View>
                        <View style={{backgroundColor: 'white', flex:8, fontSize: 19, marginLeft: 15}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <TouchableOpacity onPress={() => navigate('BarDetail', { restId: item.bar_id })}>                                                
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: 'blue'}}>{item.bar_name}</Text>
                                </TouchableOpacity>    
                                <Text style={{fontSize: 12}}>{item.address}</Text>
                                <Text style={{fontSize: 12}}>{item.city}, {item.state} {item.zip}</Text>
                                <Text style={{fontSize: 12}}>{item.phone}</Text>
                            </View>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 3.5, margin: 1.5}}>                        
                            <Text>{item.hood}</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1.5, marginEnd: 5, marginTop: 3}}>                        
                            <RenderRating rating={item.rating}/>                            
                        </View>

                    </View>
                </View> 
            );
        };

        const {navigate} = this.props.navigation;
        
       
        return(
            <View>
            <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'center'}}>Participating Bars and Restaurants</Text>
            <FlatList
                data={this.props.rests.rests}
                renderItem={renderBarRestItem}
                keyExtractor={item => item.id.toString()}
                />
            </View>
        );


    }



}

export default connect(mapStateToProps)(BarRest);