import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}
function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return(
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                </Card>
        );
    }
    else{
        return(<View></View>);
    }
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: 'Dish Details'
    };
    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return(<RenderDish dish={this.props.dishes.dishes[+dishId]} />);
    }
    
}

export default connect(mapStateToProps)(DishDetail);