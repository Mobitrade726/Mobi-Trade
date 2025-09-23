import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
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

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 15,
    color: '#000',
    width: 30,
  },
  text: {
    flex: 1,
    fontSize: 17,
    color: '#333',
    fontWeight:"regular",
    fontFamily: 'Source Serif 4',
  },
  arrow: {
    color: '#888',
  },
  sectionTitle: {
    marginTop: 25,
    marginBottom: 5,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#171D1C',
    fontFamily: 'Source Serif 4',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#00AEEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 15,
    borderRadius: 14,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
});

export default styles;
