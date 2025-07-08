import { Dimensions, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
const {width} = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    marginVertical: scale(50),
  },
  image: {
    width: '100%',
    height: scale(350),
    marginTop: 30,
    marginBottom: 20,
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: 280,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1c1c1c',
    fontFamily: 'Inter', // Optional
    width: '90%',
  },
  subtitle: {
    fontSize: 17,
    color: '#171D1C',
    fontWeight: 'semibold',
    fontFamily: 'Source Serif 4', // Optional
  },
  subtitle2: {
    fontSize: 24,
    color: '#171D1C',
    marginTop: 0,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginTop: 30,
    flexWrap: 'wrap',
  },
  skipButton: {
    borderColor: '#3b7a3e',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  skipText: {
    color: '#3b7a3e',
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#3b7a3e',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 35,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#3b7a3e',
    width: 10,
    height: 10,
  },
});

export default styles;
