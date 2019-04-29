import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem, Card, Divider, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        deals: state.deals    
    }
}

class Home extends Component {
        constructor(props) {
        super(props);
    }
    

    static navigationOptions = {
        title: 'Dealbly'
    };

    render() {
        const renderMenuItem = ({item, index}) => {
            return (  
                <View>
                    <Divider style={{marginTop: 5}}/>
                     
                    <View style={{margin: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                        <View style={{backgroundColor: 'white', flex: 1}}>                        
                            <Text>{item.id}</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex:8, fontSize: 19}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Image source={{ uri: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }} style={{height: 40, width: 40 }}/>
                            
                                <View>
                                    <Text style={{fontSize: 14, color: 'blue'}}>{item.bar_name}</Text>
                                    <Text style={{fontSize: 12}}>{item.address} {item.city}, {item.state} {item.zip}</Text>                            
                                    <Text style={{fontSize: 12}}>{item.time_start} to {item.time_end}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1}}>                        
                            <Text>{item.rating}</Text>
                        </View>

                    </View>
                    <View style={{marginTop: 5, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                    <Text style={{fontSize: 12}}>{item.deal}</Text>
                    </View> 
                </View>            
            );
        };

        const {navigate} = this.props.navigation;
       
        return(
            <View><Text style={{fontSize: 18, marginLeft: 5}}>Live Deals</Text>
            <FlatList
                data={this.props.deals.deals}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                /></View>
        );


    }



}

export default connect(mapStateToProps)(Home);