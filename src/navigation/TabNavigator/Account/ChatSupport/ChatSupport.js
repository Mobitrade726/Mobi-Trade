import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const ChatSupportScreen = ({navigation}) => {
  const [messages, setMessages] = useState([
    {id: '1', text: 'Hi! How can we help you today?', type: 'received'},
    {id: '2', text: 'I need help with my order.', type: 'sent'},
    {
      id: '3',
      text: 'Sure! You can track your order, request a return, or ask for other assistance.',
      type: 'received',
    },
    {
      id: '4',
      text: 'Please select one of the options below.',
      type: 'received',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef();

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      type: 'sent',
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');

    // Simulated bot response
    setTimeout(() => {
      const botReply = {
        id: Date.now().toString(),
        text: 'Thank you! We will look into it.',
        type: 'received',
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  const renderMessage = ({item}) => {
    const isSent = item.type === 'sent';
    return (
      <View
        style={[styles.messageBubble, isSent ? styles.sent : styles.received]}>
        <Text style={[styles.messageText, {color: isSent ? '#fff' : '#000'}]}>
          {item.text}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({animated: true});
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat Support</Text>
      </View>

      {/* Chat messages */}
      <View style={styles.chatBox}>
        <Text style={styles.timestampDivider}>Today</Text>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 16}}
          showsVerticalScrollIndicator={false}
        />
        <Text style={styles.timeLabel}>9:45 AM</Text>
      </View>

      {/* Message input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#555"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
            <Feather name="send" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginRight: 24,
  },
  chatBox: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  timestampDivider: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
    marginVertical: 8,
  },
  timeLabel: {
    textAlign: 'center',
    fontSize: 13,
    color: '#999',
    marginTop: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: '85%',
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#28A745',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5E5',
  },
  messageText: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: 'regular',
    fontFamily: 'Source Serif 4',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  iconButton: {
    paddingLeft: 12,
  },
});

export default ChatSupportScreen;
