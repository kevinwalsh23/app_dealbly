import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
  } from 'react-native'

const styles = StyleSheet.create({
    loadingView: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1, 
      backgroundColor: '#2e944b'
    },
    loadingText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    }
});

export const Loading = () => {
    return(
        <View style={styles.loadingView} >            
            <Text style={styles.loadingText}>Dealbly</Text>            
        </View>
    );
};