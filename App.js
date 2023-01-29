import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef } from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

export default function App() {
  const [result, setResult] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const initialFocus = useRef(null);

  const calculate = operator => {
    const [num1, num2] = [Number(number1), Number(number2)];

    switch (operator) {
      case '+':
        setResult(num1 + num2);
        setText(num1 + ' + ' + num2 + ' = ' + (num1 + num2));
        setData([...data, {key: text}]);
        break;
      case '-': 
        setResult(num1-num2);
        setText(number1 + ' - ' + number2 + ' = ' + (number1 - number2));
        setData([...data, {key: text}]);
        break;
    }
    setNumber1('');
    setNumber2('');
    initialFocus.current.focus();
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputbox}>
        <Text>Result: {result}</Text>
        <TextInput style={{width:200, borderColor: 'gray', borderWidth:1}} 
          onChangeText={text => setNumber1(text)}  
          value={number1} 
          keyboardType={'numeric'} 
          ref={initialFocus}
          />
        <TextInput style={{width:200, borderColor: 'gray', borderWidth:1}}
          onChangeText={text => setNumber2(text)} 
          value={number2} 
          keyboardType={'numeric'}
          />
      </View>
      <View style={styles.buttons}> 
        <View style={styles.button}>
          <Button onPress={() => calculate('+')} title="+" />
        </View>
        <View style={styles.button}>
          <Button onPress={() => calculate('-')} title="-" />
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
