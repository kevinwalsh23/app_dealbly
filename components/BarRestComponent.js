import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { DISHES } from '../shared/dishes';
import { ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {        
        rests: state.rests    
    }
}

class BarRest extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'BarRest'
    };

    render() {
        const renderBarRestItem = ({item, index}) => {
            return (
                <Card>
                <ListItem
                    key={index}
                    title={item.bar_name}
                    subtitle={item.address}
                    hideChevron={true}                    
                    leftAvatar={{ source: require('./images/uthappizza.png')}}
                    />
                </Card>
            );
        };

        const {navigate} = this.props.navigation;
       
        return(
            <View>
            <Text style={{marginTop: 5, marginLeft:5, fontSize: 18}}>Participating Bars and Restaurants</Text>
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