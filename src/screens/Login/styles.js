import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop:12,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#3c8c4d',
    marginBottom: 40,
  },
  input: {
    height: 55,
    borderColor: '#333',
    borderWidth: 1.2,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'Source Serif 4',
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#c44242',
    textDecorationLine: 'underline',
    fontSize: 17,
    fontFamily: 'Source Serif 4',
  },
  loginButton: {
    backgroundColor: '#478F4E',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Source Serif 4',
  },
  signupButton: {
    backgroundColor: '#4B9AC1',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  signupText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Source Serif 4',
  },
  bottomText: {
    color: '#c44242',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Source Serif 4',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
    fontFamily: 'Source Serif 4',
  },
});

export default styles;
