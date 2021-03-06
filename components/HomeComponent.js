import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Button  } from 'react-native';
import { Divider, Image, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchSearch} from '../redux/ActionCreators';
import Modal from "react-native-modal";
const mapStateToProps = state => {
    return {
        deals: state.deals,
        search: state.search    
    }
}

const mapDispatchToProps = dispatch => ({
    fetchSearch: (search) => dispatch(fetchSearch(search))
  })

function RenderRating(props) {
    const barinfo = props.barinfo;

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
            start_time: 'live_start',
            end_time: 'live_end',
            day: 'today',           
            showModal: false
        });
    }

    render() {
        const RenderImage = (numnum) => {
            var images = ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', 'https://fastly.4sqi.net/img/general/width960/153586_tmCFlnJjoPdrSmriNWvtIcI9aOsne-X-GaOMU92JU0U.jpg', 'https://fastly.4sqi.net/img/general/width960/21165722_sYax-E5Dx6tn5D6j38DMLgHOzdN6RtwxHT7zZulBFz4.jpg', 'https://fastly.4sqi.net/img/general/width960/63160_jzOH80pK0RO210MA-i1O-ACCQa1fPF-lxuGt6pakWRw.jpg', 'https://fastly.4sqi.net/img/general/width960/2178630_k7X6-Jv17TaBSn7RxXaI3jqLqVEHhAHlUFQvCVbjCmo.jpg', 'https://fastly.4sqi.net/img/general/width960/33072170_0YdMWFDClCNZzJkCWzs9qMsO754s8BorJFqjwjC9LGI.jpg', 'https://fastly.4sqi.net/img/general/width960/1972458_cDlnnJWipiQU8cK1CdCHAzuLRJdupEtdmhKEt8dNtLw.jpg', 'https://fastly.4sqi.net/img/general/width960/15728025_kz0a1O-LKeA3NpYhUtazruQJy9mlItX4p7tB21oTxko.jpg', 'https://fastly.4sqi.net/img/general/width960/YJ1zQeN7tuxBgamM-lPIOrlAhjaCffKC7xhckS9JmxU.jpg', 'https://fastly.4sqi.net/img/general/width960/281853_bKOFU-6YgsDZpJOvIrohW3s7Y9XNtcbrem7MSi_SVtY.jpg', 'https://fastly.4sqi.net/img/general/width960/2DJ-UeRdiAHH4KV2Q7aV6JKHnulYZ9S9wS0ZEDiQHdY.jpg', 'https://fastly.4sqi.net/img/general/width960/45690617_HZ26RC_s3c2e_PZDOgcXGdqNoFqN0P_6lKbu5HO23BM.jpg'];

            return(
                <View style={{backgroundColor: 'white', flex: 2, marginTop: 3}}>                        
                    <Image source={{ uri: images[numnum.numnum] }} style={{height: 50, width: 50 }}/>
                </View>
            )
        }
        
        var timenow = (((Date.now()/1000) % 86400) / 60) - 240
        const RenderDealItem = ({item, index}) => {
            var timeleft = Math.trunc(item.mininterval - timenow);
            var numnum = index%11;
            if (timeleft < 60) {
                return (  
                    <View >
                        <Divider style={{marginTop: 5}}/>
                        
                        <View style={{margin: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                            <View style={{marginLeft: 5, marginTop: 5, backgroundColor: 'white', flex: 1}}>                        
                                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{index + 1}.</Text>
                            </View>
                            <RenderImage numnum={numnum}/>                     
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
                        <View style={{marginTop: 5, flex: 1, backgroundColor: '#F0F0F0', flexDirection: 'row', alignItems: 'stretch'}}>                        
                            <Text style={{fontSize: 12, fontWeight: 'bold', marginLeft: 30, marginTop: 3}}>{item.time_start} to {item.time_end} </Text>
                            <Text style={{fontSize: 12, fontWeight: 'bold', marginTop: 3, color: 'red'}}> Ending in {timeleft} minutes!</Text>
                        </View> 
                        
                        <View style={{marginTop: 0, flex: 1, backgroundColor: '#F0F0F0', flexDirection: 'row', alignItems: 'stretch'}}>                        
                            <Text style={{fontSize: 12, marginLeft: 30, marginTop: 3, marginRight: 15, marginBottom: 10}}>{item.deal}</Text>
                        </View> 
                    </View>            
                );
            }
            else if (timeleft > 60 && timeleft < 120) {
                return (  
                    <View >
                        <Divider style={{marginTop: 5}}/>
                        
                        <View style={{margin: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                            <View style={{marginLeft: 5, marginTop: 5, backgroundColor: 'white', flex: 1}}>                        
                                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{index + 1}.</Text>
                            </View>
                            <RenderImage numnum={numnum}/>                     
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
                        <View style={{marginTop: 5, flex: 1, backgroundColor: '#F0F0F0', flexDirection: 'row', alignItems: 'stretch'}}>                        
                            <Text style={{fontSize: 12, fontWeight: 'bold', marginLeft: 30, marginTop: 3}}>{item.time_start} to {item.time_end} </Text>
                            <Text style={{fontSize: 12, fontWeight: 'bold', marginTop: 3, color: 'orange'}}> Under two hours left</Text>
                        </View> 
                        
                        <View style={{marginTop: 0, flex: 1, backgroundColor: '#F0F0F0', flexDirection: 'row', alignItems: 'stretch'}}>                        
                            <Text style={{fontSize: 12, marginLeft: 30, marginTop: 3, marginRight: 15, marginBottom: 10}}>{item.deal}</Text>
                        </View> 
                    </View>            
                );
            }
            else {
                return (  
                    <View >
                        <Divider style={{marginTop: 5}}/>
                        
                        <View style={{margin: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                            <View style={{marginLeft: 5, marginTop: 5, backgroundColor: 'white', flex: 1}}>                        
                                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{index + 1}.</Text>
                            </View>
                            <RenderImage numnum={numnum}/>                     
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
                        <View style={{marginTop: 5, flex: 1, backgroundColor: '#F0F0F0', flexDirection: 'row', alignItems: 'stretch'}}>                        
                            <Text style={{fontSize: 12, fontWeight: 'bold', marginLeft: 30, marginTop: 3}}>{item.time_start} to {item.time_end}</Text>
                        </View> 
                        
                        <View style={{marginTop: 0, flex: 1, backgroundColor: '#F0F0F0', flexDirection: 'row', alignItems: 'stretch'}}>                        
                            <Text style={{fontSize: 12, marginLeft: 30, marginTop: 3, marginRight: 15, marginBottom: 10}}>{item.deal}</Text>
                        </View> 
                    </View>            
                );
            }};

        const {navigate} = this.props.navigation;
        
        if (this.props.deals.deals.deals != null && this.props.deals.deals.upcomingdeals != null ) {
            return(
                <ScrollView>
                    
                    <View style={{margin: 0, flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                        <View style={{margin: 0, flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                            <View style={{margin: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <View style={{flex: 6, alignItems: 'left', marginTop: 10}}>
                                    <Text style={{fontSize: 18, marginLeft: 15, marginTop: 0, fontWeight: 'bold', textAlign: 'left'}}>Live Deals</Text>
                                </View>
                                <View style={{flex: 1, marginRight: 0, alignItems: 'baseline'}}>
                                    <Icon raised size={10} reverse name={ 'search' } type='font-awesome' color='white' reverseColor='green' onPress={() => this.toggleModal() }/>
                                </View>
                            </View>
                            <View>
                                <FlatList
                                    data={this.props.deals.deals.deals}
                                    renderItem={RenderDealItem}
                                    keyExtractor={item => item.id.toString()}
                                                
                                />
                            </View>
                        </View>
                        
                        <View>
                            <Text style={{fontSize: 18, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'center'}}>Upcoming Deals</Text>
                                <FlatList
                                    data={this.props.deals.deals.upcomingdeals}
                                    renderItem={RenderDealItem}
                                    keyExtractor={item => item.id.toString()}
                                                
                                />
                        </View>
                    </View>
                    <View>
                                                
                        <Modal animationType = {"slide"} transparent = {true}
                            isVisible = {this.state.showModal}
                            onBackdropPress={() => this.setState({ showModal: false })}
                            hideModalContentWhileAnimating={true}                    
                            onRequestClose = {() => this.toggleModal() } >
                            <ScrollView style={{padding: 40, margin: 0, flex: 1, marginBottom: "40%", marginTop: "25%", backgroundColor: 'white', width: '100%', height: "50%"}}>
                                <Text style={{textAlign: 'center', fontSize: 24, margin: 15}}>Search for Deals</Text>                        
                                <Input placeholder='Zipcode or Neighborhood' onChangeText={(text) => this.setState({zipnasty: text})} value={this.state.zipnasty}/>
                                <Input placeholder='Im Looking For..' onChangeText={(text) => this.setState({keyword: text})} value={this.state.keyword}/>                       
                                <View style={{marginTop: 10, backgroundColor: "green"}}>
                                <Button                             
                                    backgroundColor="green"
                                    color="white"
                                    title="Submit"                                 
                                    onPress = {() =>{this.toggleModal(); this.props.fetchSearch(this.state); navigate('SearchComponent', { search: this.state });this.resetForm();}}
                                    />
                                </View>
                                <View style={{marginTop: 10, backgroundColor: "grey"}}>
                                <Button 
                                    onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                    color="white"
                                    title="Cancel" 
                                    />
                                </View>
                                    
                            </ScrollView>
                        </Modal>    
                    </View>
                </ScrollView>
            );

        }
        else if (this.props.deals.deals.deals == null && this.props.deals.deals.upcomingdeals != null ) {
            return(
                <ScrollView>
                    <View>
                        <View>
                            <Icon raised reverse name={ 'search' } type='font-awesome' color='#512DA8' onPress={() => this.toggleModal() }/>
                        </View>
                        <View>
                            <Text style={{fontSize: 18, marginLeft: 15, marginTop: 0, fontWeight: 'bold', textAlign: 'left'}}>Live Deals</Text>
                            <Text style={{fontSize: 14, marginLeft: 25, marginTop: 3, textAlign: 'center'}}>There are no deals currently live! :(</Text>
                        </View>
                        <View>
                            <Text style={{fontSize: 18, marginLeft: 5, marginTop: 3, textAlign: 'center'}}>Upcoming Deals</Text>
                                <FlatList
                                    data={this.props.deals.deals.upcomingdeals}
                                    renderItem={RenderDealItem}
                                    keyExtractor={item => item.id.toString()}
                                                
                                />
                        </View>
                    </View>
                    <View>
                        <Modal animationType = {"slide"} transparent = {true}
                            isVisible = {this.state.showModal}
                            onBackdropPress={() => this.setState({ showModal: false })}
                            hideModalContentWhileAnimating={true}                    
                            onRequestClose = {() => this.toggleModal() } >
                            <ScrollView style={{padding: 40, margin: 0, flex: 1, marginBottom: "40%", marginTop: "25%", backgroundColor: 'white', width: '100%', height: "50%"}}>
                                <Text style={{textAlign: 'center', fontSize: 24, margin: 15}}>Search for Deals</Text>                        
                                <Input placeholder='Zipcode or Neighborhood' onChangeText={(text) => this.setState({zipnasty: text})} value={this.state.zipnasty}/>
                                <Input placeholder='Im Looking For..' onChangeText={(text) => this.setState({keyword: text})} value={this.state.keyword}/>                       
                                <View style={{marginTop: 10, backgroundColor: "green"}}>
                                <Button                             
                                    backgroundColor="green"
                                    color="white"
                                    title="Submit"                                 
                                    onPress = {() =>{this.toggleModal(); this.props.fetchSearch(this.state); navigate('SearchComponent', { search: this.state });this.resetForm();}}
                                    />
                                </View>
                                <View style={{marginTop: 10, backgroundColor: "grey"}}>
                                <Button 
                                    onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                    color="white"
                                    title="Cancel" 
                                    />
                                </View>
                                    
                            </ScrollView>
                        </Modal> 
                    </View>
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
                    <Text style={{fontSize: 18, marginLeft: 15, marginTop: 0, fontWeight: 'bold', textAlign: 'left'}}>Live Deals</Text>
                        <FlatList
                            data={this.props.deals.deals.deals}
                            renderItem={RenderDealItem}
                            keyExtractor={item => item.id.toString()}
                                           
                        />
                    </View>
                    <View>
                    <Text style={{fontSize: 18, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'center'}}>Upcoming Deals</Text>
                    <Text style={{fontSize: 14, marginLeft: 5, marginTop: 3, textAlign: 'center'}}>There are no upcoming deals for the rest of the day!</Text>
                    </View>
                    <View>
                        <Modal animationType = {"slide"} transparent = {true}
                            isVisible = {this.state.showModal}
                            onBackdropPress={() => this.setState({ showModal: false })}
                            hideModalContentWhileAnimating={true}                    
                            onRequestClose = {() => this.toggleModal() } >
                            <ScrollView style={{padding: 40, margin: 0, flex: 1, marginBottom: "40%", marginTop: "25%", backgroundColor: 'white', width: '100%', height: "50%"}}>
                                <Text style={{textAlign: 'center', fontSize: 24, margin: 15}}>Search for Deals</Text>                        
                                <Input placeholder='Zipcode or Neighborhood' onChangeText={(text) => this.setState({zipnasty: text})} value={this.state.zipnasty}/>
                                <Input placeholder='Im Looking For..' onChangeText={(text) => this.setState({keyword: text})} value={this.state.keyword}/>                       
                                <View style={{marginTop: 10, backgroundColor: "green"}}>
                                <Button                             
                                    backgroundColor="green"
                                    color="white"
                                    title="Submit"                                 
                                    onPress = {() =>{this.toggleModal(); this.props.fetchSearch(this.state); navigate('SearchComponent', { search: this.state });this.resetForm();}}
                                    />
                                </View>
                                <View style={{marginTop: 10, backgroundColor: "grey"}}>
                                <Button 
                                    onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                    color="white"
                                    title="Cancel" 
                                    />
                                </View>
                                    
                            </ScrollView>
                        </Modal>    
                    </View>
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
                        <Text style={{fontSize: 18, marginLeft: 15, marginTop: 0, fontWeight: 'bold', textAlign: 'left'}}>Live Deals</Text>
                        <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, textAlign: 'center'}}>There are no deals currently live! :(</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 18, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'center'}}>Upcoming Deals</Text>
                        <Text style={{fontSize: 14, marginLeft: 5, marginTop: 3, textAlign: 'center'}}>There are no upcoming deals for the rest of the day!</Text>
                    </View>
                    <View>
                        <Modal animationType = {"slide"} transparent = {true}
                            isVisible = {this.state.showModal}
                            onBackdropPress={() => this.setState({ showModal: false })}
                            hideModalContentWhileAnimating={true}                    
                            onRequestClose = {() => this.toggleModal() } >
                            <ScrollView style={{padding: 40, margin: 0, flex: 1, marginBottom: "40%", marginTop: "25%", backgroundColor: 'white', width: '100%', height: "50%"}}>
                                <Text style={{textAlign: 'center', fontSize: 24, margin: 15}}>Search for Deals</Text>                        
                                <Input placeholder='Zipcode or Neighborhood' onChangeText={(text) => this.setState({zipnasty: text})} value={this.state.zipnasty}/>
                                <Input placeholder='Im Looking For..' onChangeText={(text) => this.setState({keyword: text})} value={this.state.keyword}/>                       
                                <View style={{marginTop: 10, backgroundColor: "green"}}>
                                <Button                             
                                    backgroundColor="green"
                                    color="white"
                                    title="Submit"                                 
                                    onPress = {() =>{this.toggleModal(); this.props.fetchSearch(this.state); navigate('SearchComponent', { search: this.state });this.resetForm();}}
                                    />
                                </View>
                                <View style={{marginTop: 10, backgroundColor: "grey"}}>
                                <Button 
                                    onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                    color="white"
                                    title="Cancel" 
                                    />
                                </View>
                                    
                            </ScrollView>
                        </Modal>    
                    </View>
                    
                </ScrollView>
            );

        }               

    }



}

export default connect(mapStateToProps, mapDispatchToProps)(Home);