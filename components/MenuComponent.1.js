import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { DISHES } from '../shared/dishes';
import { ListItem } from 'react-native-elements';

class BarRest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'BarRest'
    };

    render() {
        const renderBarRestItem = ({item, index}) => {
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    leftAvatar={{ source: require('./images/uthappizza.png')}}
                    />
            );
        };

        const {navigate} = this.props.navigation;
       
        return(
            <FlatList
                data={this.state.dishes}
                renderItem={renderBarRestItem}
                keyExtractor={item => item.id.toString()}
                />
        );


    }



}

export default BarRest;