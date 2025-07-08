import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 80,
    fontFamily: 'Source Serif 4',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 17,
    color: 'gray',
    marginBottom: 30,
    fontFamily: 'Source Serif 4',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 12,
    resizeMode: 'contain',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontFamily: 'Source Serif 4',
    fontWeight:'600'
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: '#4B9AC1',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Source Serif 4',
  },
});

export default styles;
