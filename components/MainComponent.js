import React, { Component } from 'react';
import BarRest from './BarRestComponent';
import LoginRegister from './LoginRegisterComponent';
import About from './AboutComponent'; 
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishDetailComponent';
import BarDetail from './BarDetailComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders, fetchDeals, fetchRests } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    deals: state.deals,
    rests: state.rests
  }
}
const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDeals: () => dispatch(fetchDeals()),
  fetchRests: () => dispatch(fetchRests())
})

const HomeNavigator = createStackNavigator({
    Home: { screen: Home },
    BarDetail: { screen: BarDetail }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#2e944b",
          marginLeft: 10
      },
      headerTitleStyle: {
          color: "#fff",
          marginLeft: 0            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name='menu' size={28} color='white' onPress={() => navigation.toggleDrawer()}/>
    })
});   

const AboutNavigator = createStackNavigator({
    About: { screen: About }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#2e944b",
          marginLeft: 10
      },
      headerTitleStyle: {
          color: "#fff",
          marginLeft: 0           
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name='menu' size={28} color='white' onPress={() => navigation.toggleDrawer()}/>
    })
});

const LoginRegisterNavigator = createStackNavigator({
    LoginRegister: { screen: LoginRegister }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#2e944b",
          marginLeft: 10
      },
      headerTitleStyle: {
          color: "#fff",
          marginLeft: 0            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name='menu' size={28} color='white' onPress={() => navigation.toggleDrawer()}/>
    })
});

const BarRestNavigator = createStackNavigator({
    BarRest: { screen: BarRest },
    BarDetail: { screen: BarDetail }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#2e944b",
          marginLeft: 10
      },
      headerTitleStyle: {
          color: "#fff",
          marginLeft: 0            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name='menu' size={28} color='white' onPress={() => navigation.toggleDrawer()}/>
    })
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>dealbly</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        defaultNavigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
              <Icon name='home' type='font-awesome' size={24} color={tintColor}/>
          )
        }
      },
      'Bars & Restaurants': 
      { screen: BarRestNavigator,
        defaultNavigationOptions: {
          title: 'BarRest',
          drawerLabel: 'BarRest',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
          
        }, 
      },
      About: 
      { screen: AboutNavigator,
        defaultNavigationOptions: {
          title: 'About',
          drawerLabel: 'About',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
          
        }, 
      },
      'Login/Register': 
      { screen: LoginRegisterNavigator,
        defaultNavigationOptions: {
          title: 'Login or Register',
          drawerLabel: 'Login or Register',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
          
        }, 
      }
}, {
  drawerBackgroundColor: '#F5F5F5',
  contentComponent: CustomDrawerContentComponent
});

const App = createAppContainer(MainNavigator);

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        }
    }
    componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
      this.props.fetchDeals();
      this.props.fetchRests();
    }
    

    onDishSelect(dishId) {
        this.setState({selectedDish: dishId});
    }

    render() {
      if (this.props.deals.isLoading) {
        return(
            <Loading />
        );
      }
      else {
        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <App />
            </View>
        );
      }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#2e944b',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
      
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
export default connect(mapStateToProps, mapDispatchToProps)(Main);