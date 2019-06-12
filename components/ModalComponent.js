import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchSearch} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        search: state.search    
    }
}

const mapDispatchToProps = dispatch => ({
    fetchSearch: (search) => dispatch(fetchSearch(search))
  })

class ModalComponent extends Component {
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
        
        const {navigate} = this.props.navigation;
        
        if (this.props.deals.deals.deals != null && this.props.deals.deals.upcomingdeals != null ) {
            return(
                <ScrollView>
                    
                    <View style={{margin: 0, flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                        <View style={{margin: 0, flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                            <View style={{margin: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <View style={{flex: 6, alignItems: 'left', marginTop: 10}}>
                                    <Text style={{fontSize: 16, marginLeft: 5, marginTop: 0, fontWeight: 'bold', textAlign: 'left'}}>Live Deals</Text>
                                </View>
                                <View style={{flex: 1, marginRight: 5, alignItems: 'baseline'}}>
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
                            <Text style={{fontSize: 16, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'center'}}>Upcoming Deals</Text>
                                <FlatList
                                    data={this.props.deals.deals.upcomingdeals}
                                    renderItem={RenderDealItem}
                                    keyExtractor={item => item.id.toString()}
                                                
                                />
                        </View>
                    </View>
                    <RenderModal navigation={this.props.navigation} vismodal={this.state.showModal}/>
                </ScrollView>
            );

        }                

    }



    }

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);