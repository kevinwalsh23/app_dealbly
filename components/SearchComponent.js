import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity  } from 'react-native';
import { Divider, Image } from 'react-native-elements';
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
function RenderImage(numnum) {
    var images = ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', 'https://fastly.4sqi.net/img/general/width960/153586_tmCFlnJjoPdrSmriNWvtIcI9aOsne-X-GaOMU92JU0U.jpg', 'https://fastly.4sqi.net/img/general/width960/21165722_sYax-E5Dx6tn5D6j38DMLgHOzdN6RtwxHT7zZulBFz4.jpg', 'https://fastly.4sqi.net/img/general/width960/63160_jzOH80pK0RO210MA-i1O-ACCQa1fPF-lxuGt6pakWRw.jpg', 'https://fastly.4sqi.net/img/general/width960/2178630_k7X6-Jv17TaBSn7RxXaI3jqLqVEHhAHlUFQvCVbjCmo.jpg', 'https://fastly.4sqi.net/img/general/width960/33072170_0YdMWFDClCNZzJkCWzs9qMsO754s8BorJFqjwjC9LGI.jpg', 'https://fastly.4sqi.net/img/general/width960/1972458_cDlnnJWipiQU8cK1CdCHAzuLRJdupEtdmhKEt8dNtLw.jpg', 'https://fastly.4sqi.net/img/general/width960/15728025_kz0a1O-LKeA3NpYhUtazruQJy9mlItX4p7tB21oTxko.jpg', 'https://fastly.4sqi.net/img/general/width960/YJ1zQeN7tuxBgamM-lPIOrlAhjaCffKC7xhckS9JmxU.jpg', 'https://fastly.4sqi.net/img/general/width960/281853_bKOFU-6YgsDZpJOvIrohW3s7Y9XNtcbrem7MSi_SVtY.jpg', 'https://fastly.4sqi.net/img/general/width960/2DJ-UeRdiAHH4KV2Q7aV6JKHnulYZ9S9wS0ZEDiQHdY.jpg', 'https://fastly.4sqi.net/img/general/width960/45690617_HZ26RC_s3c2e_PZDOgcXGdqNoFqN0P_6lKbu5HO23BM.jpg'];

    return(
        <View style={{backgroundColor: 'white', flex: 2, marginTop: 3}}>                        
            <Image source={{ uri: images[numnum.numnum] }} style={{height: 50, width: 50 }}/>
        </View>
    )
}
class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: this.props.navigation.state.params.search,
            search: this.props.search
        }
    }

    static navigationOptions = {
        title: 'Search Results'
    };
    componentWillMount(){
        this.props.fetchSearch(this.props.navigation.state.params.search)
        .then(() => this.setState({search: this.props.search}));
    }
    componentDidMount() {
        this.setState({search: this.props.search});
        
      }

    render() {
        
        
        const {navigate} = this.props.navigation;
        
        const renderDealItem = ({item, index}) => {
            var numnum = index%11;
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
                    <View style={{marginTop: 5, flex: 1, backgroundColor: '#F0F0F0', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                        <Text style={{fontSize: 12, margin: 15}}>{item.deal}</Text>
                    </View> 
                </View>            
            );
        };

        const RenderSearch = (props) => {
            const x = props;            
        
            if (x.props.search.zipresults) {
                if (x.props.search.zipresults != null) {
                    return(
                        <View>
                        <View>
                            <Text style={{fontSize: 12, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'left'}}>Search Results for keyword '{x.props.search.query.keyword}' in zip/hood '{x.props.search.query.zipnasty}' </Text>                
                        </View>
                        <View>
                            <FlatList
                                data={x.props.search.zipresults}
                                renderItem={renderDealItem}
                                keyExtractor={item => item.id.toString()}
                                            
                            />
                        </View>
                        </View>            
                    );
                }
                else {
                    return(
                        <View>
                            <Text style={{fontSize: 12, marginLeft: 5, marginTop: 3, fontWeight: 'bold', textAlign: 'left'}}>No Results for keyword '{props.props.search.query.keyword}' in zip/hood '{props.props.search.query.zipnasty}' </Text>                
                        </View>
    
                    );
                }
            }
            else {                
                return(
                    <View>
                        <Text></Text>
                    </View>
                );
            }
        
        };

        
        return(
            <RenderSearch props={this.state.search}/>
        )
    }

    
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);