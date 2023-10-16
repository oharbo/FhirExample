import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  containerForm: {
    flex: 1,
    justifyContent: 'space-between',
  },
  displayText: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  radio: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  radioC: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  reqText: {
    fontSize: 14,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 6,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 16,
    marginVertical: 16,
    padding: 6,
  },
  summaryItem: {
    marginBottom: 10,
  },
});
