import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

export default function App() {
  const [result, setResult] = useState(0);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const sumNumbers = () => {  
    setResult(number1 + number2);
    setText(number1 + ' + ' + number2 + ' = ' + (number1 - number2));
    setData([...data, {key: text}]);
    setNumber1('');
    setNumber2('');
  }

  const substract = () => {  
    setResult(number1 - number2);
    setText(number1 + ' - ' + number2 + ' = ' + (number1 - number2));
    setData([...data, {key: text}]);
    setNumber1('');
    setNumber2('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputbox}>
        <Text>Result: {result}</Text>
        <TextInput style={{width:200, borderColor: 'gray', borderWidth:1}}onChangeText={number1 => setNumber1(Number(number1))}  value={number1} keyboardType={'numeric'}/>
        <TextInput style={{width:200, borderColor: 'gray', borderWidth:1}}onChangeText={number2 => setNumber2(Number(number2))}  value={number2} keyboardType={'numeric'}/>
      </View>
      <View style={styles.buttons}> 
        <View style={styles.button}>
          <Button onPress={sumNumbers}title="+" />
        </View>
        <View style={styles.button}>
          <Button onPress={() => {setResult(number1 - number2); substract();}}title="-" />
        </View>
      </View>
      <View style={styles.listbox}>
        <Text>History</Text>
        <FlatList 
          data={data}
          renderItem={({item}) =><Text>{item.key}</Text>}  
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <StatusBar style="auto" /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    margin: 10,
  },
  button: {
    width: 30,
    margin: 10
  },
  inputbox: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  listbox: {
    flex: 3,
    justifyContent: 'flex-start',
  }
});
