import React, { Component } from 'react';
import { View, Text, Button, StyleSheet,FlatList,Alert,StatusBar  } from 'react-native';
import {  SearchBar } from "react-native-elements";
import Swipeout from 'react-native-swipeout';



class FlatListItem extends Component {
  constructor(props) {
      super(props);   
      this.state = {
        
        activeRowKey: null
      };          
  }
  
  render() {   
      const swipeSettings = {
          autoClose: true,
          onClose: (secId, rowId, direction) => {
              if(this.state.activeRowKey != null) {
                  this.setState({ activeRowKey: null });
              }              
          },          
          onOpen: (secId, rowId, direction) => {
              this.setState({ activeRowKey: this.props.item.key });
          },      
          right: [
              { 
                  onPress: () => {    
                      const deletingRow = this.state.activeRowKey;          
                      Alert.alert(
                          'Alert',
                          'Are you sure you want to delete ?',
                          [                              
                            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress: () => {        
                              //Action de suppression 
                            }},
                          ],
                          { cancelable: true }
                        ); 
                  }, 
                  text: 'Delete', type: 'delete' 
              }
          ],  
          rowId: this.props.index, 
          sectionId: 1    
      };               
      return (  
          <Swipeout {...swipeSettings}>
              <View style={{
              flex: 1,
              flexDirection:'column',                                
              }}>            
                  <View style={{
                          flex: 1,
                          flexDirection:'row',
                          // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'                
                          backgroundColor: '#64b5f6'
                  }}>            
                      
                      <View style={{
                              flex: 1,
                              flexDirection:'column',   
                              height: 100                 
                          }}>            
                              <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                              <Text style={styles.flatListItem}>{this.props.item.email}</Text>
                      </View>              
                  </View>
                  <View style={{
                      height: 1,
                      backgroundColor:'white'                            
                  }}>
              
                  </View>
              </View>   
          </Swipeout>      
          
      );
  }
}
const styles = StyleSheet.create({
  flatListItem: {
      
      padding: 10,
      fontSize: 16,  
  }
});
  class DetailsScreen extends Component {
    constructor(props) {
      super(props); 
      
      this.state = { 
        loading: false,   
        data: [],
        temp: [],
        error: null,
        search: null
      };
    }
    
    componentDidMount() {
      this.getData();
    }
   
     getData = async ()  => {
      const url = `http://demo0398132.mockable.io/reunion`;
      this.setState({ loading: true });
        
       try {
          const response = await fetch(url);
          const json = await response.json();
          this.setResult(json);
       } catch (e) {
          this.setState({ error: 'Error Loading content', loading: false });
       }
    };
   
    setResult = (res) => {
      this.setState({
        data: [...this.state.data, ...res],
        temp: [...this.state.temp, ...res],
        error: res.error || null,
        loading: false
      });
    }
   
    renderHeader = () => {
        return (
            <View>
        <SearchBar placeholder="Rechercher..."
            lightTheme round editable={true}
            value={this.state.search}
            onChangeText={this.updateSearch} />
            </View>); 
    }; 
   
    updateSearch = search => {
          this.setState({ search }, () => {
              if ('' == search) {
                  this.setState({
                      data: [...this.state.temp]
                  });
                  return;
              }
               
              this.state.data = this.state.temp.filter(function(item){
                  return item.name.includes(search);
                }).map(function({id, name, email}){
                  return {id, name, email};
              });
          });
    };
   
    render() {
      return (
        
        
        this.state.error != null ?
          <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', alignItems: 'center' ,}}>
            <StatusBar backgroundColor='#1f65ff' barStyle="light-content"/>
            <Text>{this.state.error}</Text>
            <Button onPress={
              () => {
                this.getData();
              }
            } title="Reload" />
          </View> : 
          <FlatList
              ListHeaderComponent={this.renderHeader}
              data={this.state.data}
              keyExtractor={item => item.email}
              renderItem={({ item ,index}) => {
                //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                return (
                <FlatListItem item={item} index={index} parentFlatList={this} navigation={this.navigation}>

                </FlatListItem>);
            }}
        />
      );
    }
  }
export default DetailsScreen;

