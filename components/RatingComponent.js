function RenderRating(props) {
    const barinfo = props.barinfo;
   

    if (props.rating >= 9) {
        return(
            <View>
                <Text style={{backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}>{props.rating}</Text>
            </View>
        );
    }
    else if (props.rating >= 8) {
        return(
            <View>
                <Text style={{backgroundColor: '#2e8b57', color: 'white', fontWeight: 'bold' }}>{props.rating}</Text>
            </View>
        );
    }
    else if (props.rating >= 7) {
        return(
            <View>
                <Text style={{backgroundColor: '#3cb371', color: 'white', fontWeight: 'bold' }}>{props.rating}</Text>
            </View>
        );
    }
    else{
        return(
        <View>
            <Text style={{backgroundColor: '#daa520', color: 'white', fontWeight: 'bold' }}>{props.rating}</Text>
        </View>);
    }
}

export default RenderRating;