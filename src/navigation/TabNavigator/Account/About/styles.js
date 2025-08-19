import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 6,
    left: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
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
    marginTop: 10,
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
