import React, { Component } from 'react';
import { Text, View, FlatList, Button, BackHandler, TouchableOpacity } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchBarInfo} from '../redux/ActionCreators';
import { ScrollView } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/MaterialIcons';

const mapStateToProps = state => {
    return {
        rests: state.rests,
        barinfo: state.barinfo
    }
}

const mapDispatchToProps = dispatch => ({
    fetchBarInfo: (barname) => dispatch(fetchBarInfo(barname))
  })


function RenderBar(props) {
    const barinfo = props.barinfo;

    if (barinfo != null) {        
        if (!barinfo.barry) {
            return(
                <View></View>
            );
        }
        else {
        return(
            <ScrollView style={{
                flex: 1,
                flexDirection: 'column',
                contentContainerStyle:{alignItems: 'stretch'}
              }}>
                <TouchableOpacity onPress={props.backbutton}>
                    <Icons name={'arrow-back'} size={30} color='#2e944b' style={{marginLeft: 15, marginTop: 5, marginBottom:0, height: 25}}/>
                </TouchableOpacity>

                <View style={{height: 200}}>                
                <Card
                    featuredTitle={barinfo.barry[0].bar_name}
                    image={{ uri: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }}>
                </Card>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch', marginLeft: 15, marginRight: 15, backgroundColor: '#F0F0F0'}}>
                    <View style={{alignItems: 'stretch', flex: 6}}>
                        <Text>{barinfo.barry[0].address}</Text>
                        <Text>{barinfo.barry[0].city},{barinfo.barry[0].state} {barinfo.barry[0].zip}</Text>
                        <Text>{barinfo.barry[0].phone}</Text>
                        <Text>{barinfo.barry[0].website}</Text>
                    </View>
                    <View style={{alignItems: 'stretch', alignContent: 'right', flex: 1}}>
                        <RenderRating rating={barinfo.barry[0].rating}></RenderRating>
                    </View>
                </View>
                <View style={{marginLeft: 15, marginRight: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize: 17, marginBottom: 1, marginTop: 3, backgroundColor: "#2e944b", color: "white" }}>Current Deal</Text>
                    <RenderCurrentDeal day={barinfo.todaydeal}/>                                        
                </View>
                
                <View style={{marginLeft: 15, marginRight: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize: 17, marginBottom: 1, marginTop: 3, backgroundColor: "#2e944b", color: "white" }}>Weekly Deals</Text>
                    <RenderDeal day={barinfo.sunday}/>
                    <RenderDeal day={barinfo.monday}/>
                    <RenderDeal day={barinfo.tuesday}/>
                    <RenderDeal day={barinfo.wednesday}/>
                    <RenderDeal day={barinfo.thursday}/>
                    <RenderDeal day={barinfo.friday}/>
                    <RenderDeal day={barinfo.saturday}/>                    
                </View>
                
                <Divider style={{marginTop: 5}}/>
              </ScrollView>

        );
    }
    
    }
    else{
        return(<View></View>);
    }
}
function RenderRating(props) {
    const barinfo = props.barinfo;    

    if (props.rating >= 9) {
        return(
            <View>
                <Text style={{backgroundColor: 'green', color: 'white', fontWeight: 'bold',borderRadius: 10, textAlign: 'center', fontSize: 16 }}>{props.rating}</Text>
            </View>
        );
    }
    else if (props.rating >= 8) {
        return(
            <View>
                <Text style={{backgroundColor: '#2e8b57', color: 'white', fontWeight: 'bold',borderRadius: 10, textAlign: 'center', fontSize: 16  }}>{props.rating}</Text>
            </View>
        );
    }
    else if (props.rating >= 7) {
        return(
            <View>
                <Text style={{backgroundColor: '#3cb371', color: 'white', fontWeight: 'bold',borderRadius: 10, textAlign: 'center', fontSize: 16  }}>{props.rating}</Text>
            </View>
        );
    }
    else{
        return(
        <View>
            <Text style={{backgroundColor: '#daa520', color: 'white', fontWeight: 'bold',borderRadius: 10, textAlign: 'center', fontSize: 16  }}>{props.rating}</Text>
        </View>);
    }
}
function RenderDeal(props) {
    const daydeal = props.day;
    const arrayLength = daydeal.length;
    if (arrayLength >= 1){
            return(
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 3, marginTop: 5, backgroundColor: '#F0F0F0' }}>{daydeal[0].day_week}</Text>
                    <FlatList
                        data={daydeal}
                        renderItem={renderDealItem}
                        keyExtractor={item => item.deal.toString()}
                    />
                </View>
            )        
    }
    else{
        return(
            <View></View>
        )
    }

    

}
function RenderCurrentDeal(props) {
    const daydeal = props.day;
    const arrayLength = daydeal.length;    
    if (arrayLength >= 1){
            return(
                <View>                    
                    <FlatList
                        data={daydeal}
                        renderItem={renderDealItem}
                        keyExtractor={item => item.deal.toString()}
                    />
                </View>
            )        
    }
    else{
        return(
            <View>
                <Text style={{margin: 5}}>No deals are currently live :(</Text>
            </View>
        )
    }

    

}

function renderDealItem(item, index) {
            
            return(
                <View>
                    <Text style={{fontWeight: 'bold', marginBottom: 3, marginTop: 1}}>{item.item.time_start} to {item.item.time_end} </Text>
                    <Text style={{marginBottom: 3}}>{item.item.deal}</Text>
                    <Divider/>
                </View>
            )        
    }


class BarDetail extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    static navigationOptions = {
        title: 'Bar Details'
    };
    
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
    
    componentDidMount() {
        var restId1 = this.props.navigation.getParam('restId', '');
        this.props.fetchBarInfo(restId1);
      }
    render() {        
        if (this.props.barinfo.isLoading) {
            return <View></View>
        }
        else {
            return(
                
                <RenderBar barinfo={this.props.barinfo.barinfo} navigate={this.props.navigation} backbutton={this.handleBackButtonClick} />
                
                );
        }
    }

    
}

export default connect(mapStateToProps, mapDispatchToProps)(BarDetail);