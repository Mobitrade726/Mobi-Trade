import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    position: 'relative',
  },

  backButton: {
    left: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    padding: 0,
  },
  greenCard: {
    backgroundColor: '#1D9D4C',
    borderBottomRightRadius: 120,
    borderBottomLeftRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'medium',
    marginBottom: 10,
    marginTop:10
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 15,
  },
  mainTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Source Serif 4',
    marginBottom: 15,
  },
  bodyText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Source Serif 4',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
