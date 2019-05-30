import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Modal, Picker, Switch, Alert, Button  } from 'react-native';
import { ListItem, Card, Divider, Image, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { fetchSearch} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        deals: state.deals,
        search: state.search    
    }
}

const mapDispatchToProps = dispatch => ({
    fetchSearch: (search) => dispatch(fetchSearch(search))
  })


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
function RenderSearch(props) {
    const barinfo = props.barinfo;
    console.warn(props.props);

    if (props.props.search.zipresults) {
        return(
            <View>
                <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'left'}}>Search Results</Text>
                <Icon raised size={12} reverse name={ 'search' } type='font-awesome' color='white' reverseColor='green' onPress={() => this.toggleModal() }/>
                <Text>...results...</Text>
            </View>
        );
    }
    else {
        return(
            <View>
            </View>
        );
    }
}
class Home extends Component {
        constructor(props) {
        super(props);
        this.state = {
            zipnasty: '',
            keyword: '',
            start_time: 'live_start',
            end_time: 'live_end',
            day: 'today',           
            showModal: false
        }
    }
    

    static navigationOptions = {
        title: 'Dealbly'
    };

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    resetForm() {
        this.setState({
            zipnasty: '',
            keyword: '',
            start_time: null,
            end_time: null,
            day: 'today',           
            showModal: false
        });
    }

    render() {
        const renderDealItem = ({item, index}) => {
            return (  
                <View >
                    <Divider style={{marginTop: 5}}/>
                     
                    <View style={{margin: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                        <View style={{marginLeft: 5, marginTop: 5, backgroundColor: 'white', flex: 1}}>                        
                            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{index + 1}.</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 2, marginTop: 3}}>                        
                            <Image source={{ uri: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }} style={{height: 50, width: 50 }}/>
                        </View>                        
                        <View style={{backgroundColor: 'white', flex:8, fontSize: 19}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <TouchableOpacity onPress={() => navigate('BarDetail', { restId: item.bar_id })}>                                                
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: 'blue'}}>{item.bar_name}</Text>
                                </TouchableOpacity>    
                                <Text style={{fontSize: 12}}>{item.address}</Text>
                                <Text style={{fontSize: 12}}>{item.city}, {item.state} {item.zip}</Text>
                                <Text style={{fontSize: 12}}>{item.phone}</Text>
                            </View>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1.5, marginEnd: 5, marginTop: 3}}>                        
                            <RenderRating rating={item.rating}/>
                        </View>

                    </View>
                    <View style={{marginTop: 5, flex: 1, backgroundColor: '#F0F0F0', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                        <Text style={{fontSize: 12, margin: 15}}>{item.deal}</Text>
                    </View> 
                </View>            
            );
        };

        const {navigate} = this.props.navigation;
        
        if (this.props.deals.deals.deals != null && this.props.deals.deals.upcomingdeals != null ) {
            return(
                <ScrollView>
                    <RenderSearch props={this.props.search} />
                    <View style={{margin: 0, flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                        <View style={{margin: 0, flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                            <View style={{margin: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <View style={{flex: 6, alignItems: 'left'}}>
                                    <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'left'}}>Live Deals</Text>
                                </View>
                                <View style={{flex: 1, marginRight: 5}}>
                                    <Icon raised size={12} reverse name={ 'search' } type='font-awesome' color='white' reverseColor='green' onPress={() => this.toggleModal() }/>
                                </View>
                            </View>
                            <View>
                                <FlatList
                                    data={this.props.deals.deals.deals}
                                    renderItem={renderDealItem}
                                    keyExtractor={item => item.id.toString()}
                                                
                                />
                            </View>
                        </View>
                        
                        <View>
                            <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'center'}}>Upcoming Deals</Text>
                                <FlatList
                                    data={this.props.deals.deals.upcomingdeals}
                                    renderItem={renderDealItem}
                                    keyExtractor={item => item.id.toString()}
                                                
                                />
                        </View>
                    </View>
                    <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}                    
                    onRequestClose = {() => this.toggleModal() } style={{width:50, height: 50}}>
                        <ScrollView style={{padding: 40, marginTop: 40}}>
                            <Text style={{textAlign: 'center', fontSize: 24, margin: 15}}>Search for Deals</Text>                        
                            <Input placeholder='Zipcode or Neighborhood' onChangeText={(text) => this.setState({zipnasty: text})} value={this.state.zipnasty}/>
                            <Input placeholder='Im Looking For..' onChangeText={(text) => this.setState({keyword: text})} value={this.state.keyword}/>                       
                            <Button                             
                                backgroundColor="green"
                                color="green"
                                title="Submit"                                 
                                onPress = {() =>{this.toggleModal(); this.props.fetchSearch(this.state); this.resetForm();}}
                                />
                            <Button 
                                onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                color="grey"
                                title="CANCEL" 
                                />
                        </ScrollView>
                    </Modal>
                </ScrollView>
            );

        }
        else if (this.props.deals.deals.deals == null && this.props.deals.deals.upcomingdeals != null ) {
            return(
                <ScrollView>
                    <View>
                        <Icon raised reverse name={ 'search' } type='font-awesome' color='#512DA8' onPress={() => this.toggleModal() }/>
                    </View>
                    <View>
                    <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'center'}}>Live Deals</Text>
                    <Text style={{fontSize: 14, marginLeft: 5, marginTop: 3, textAlign: 'center'}}>There are no deals currently live! :(</Text>
                    </View>
                    <View>
                    <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, textAlign: 'center'}}>Upcoming Deals</Text>
                        <FlatList
                            data={this.props.deals.deals.upcomingdeals}
                            renderItem={renderDealItem}
                            keyExtractor={item => item.id.toString()}
                                           
                        />
                    </View>
                    <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}                    
                    onRequestClose = {() => this.toggleModal() }>
                    <View>                        
                        <Input
                            placeholder='Author'                            
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}                            
                        />
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="grey"
                            title="CANCEL" 
                            />
                    </View>
                </Modal>
                </ScrollView>
            );

        }
        else if (this.props.deals.deals.deals != null && this.props.deals.deals.upcomingdeals == null ){
            return(
                <ScrollView>
                    <View>
                        <Icon raised reverse name={ 'search' } type='font-awesome' color='#512DA8' onPress={() => this.toggleModal() }/>
                    </View>
                    <View>
                    <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'center'}}>Live Deals</Text>
                        <FlatList
                            data={this.props.deals.deals.deals}
                            renderItem={renderDealItem}
                            keyExtractor={item => item.id.toString()}
                                           
                        />
                    </View>
                    <View>
                    <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'center'}}>Upcoming Deals</Text>
                    <Text style={{fontSize: 14, marginLeft: 5, marginTop: 3, textAlign: 'center'}}>There are no upcoming deals for the rest of the day!</Text>
                    </View>
                    <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}                    
                    onRequestClose = {() => this.toggleModal() }>
                    <View>                        
                        <Input
                            placeholder='Author'                            
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}                            
                        />
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="grey"
                            title="CANCEL" 
                            />
                    </View>
                </Modal>
                </ScrollView>
            );

        }
        else {
            return(
                <ScrollView>
                    <View style={{alignItems: 'right'}}>
                        <Icon raised reverse name={ 'search' } type='font-awesome' color='#512DA8' onPress={() => this.toggleModal() }/>
                    </View>
                    <View>
                        <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'center'}}>Live Deals</Text>
                        <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, textAlign: 'center'}}>There are no deals currently live! :(</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'center'}}>Upcoming Deals</Text>
                        <Text style={{fontSize: 14, marginLeft: 5, marginTop: 3, textAlign: 'center'}}>There are no upcoming deals for the rest of the day!</Text>
                    </View>
                    <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}                    
                    onRequestClose = {() => this.toggleModal() }>
                    <View>                        
                        <Input
                            placeholder='Author'                            
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}                            
                        />
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="grey"
                            title="CANCEL" 
                            />
                    </View>
                </Modal>
                    
                </ScrollView>
            );

        }               

    }



}

export default connect(mapStateToProps, mapDispatchToProps)(Home);