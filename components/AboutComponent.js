import React, { Component } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class About extends Component {

    static navigationOptions = {
        title: 'Dealbly'
    };

    render() {        
       
        return(
            <ScrollView>
                <Animatable.View animation="fadeInDown">
                <Card title='Mission' style={{backgroundcolor: 'left'}}>
                    <Text style={{margin:10}}>Dealbly curates thousands of deals into a simple, understandle format, this is the one stop shop for all socialites in Manhattan to find more reasably priced ways to have fun. Everyday, we continue to grow our outreach throughout the city, and continue to find more ways for you to save money doing the things you love.</Text>
                </Card>
                </Animatable.View>
                <Animatable.View animation="fadeInDown">
                <Card title='Deal Accuracy'>
                    <Text style={{margin:10}}>Dealbly uses a combination of computer vision and advanced webscraping to constantly check all of our partners current deals. You'll never have to worry about showing up to your favorite (or new favorite) bar and the deal have been expired.</Text>
                </Card>
                </Animatable.View>
                <Animatable.View animation="fadeInDown">
                <Card title='Contact Us'>
                    <Text style={{margin:10}}>Your feedback is crutial to our success, and we would love to hear from you. You can contact us with any and all questions or suggestions.</Text>
                </Card>
                </Animatable.View>
            </ScrollView>    
        );


    }



}

export default About;