import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { TListData } from '../screens/QContainer';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { QSelectedAction } from '../store/actions/actions';
import { connect } from 'react-redux';

interface DropdownProps {
  data: TListData[];
  header: string;
  QSelectedAction: (id: string) => void;
}

type TIsOpenState = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const QuestionnairesDropList: React.FC<DropdownProps> = ({ data, header, QSelectedAction }) => {
  const navigation: StackNavigationProp<RootStackParamList> = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isOpen, setIsOpen]: TIsOpenState = useState<boolean>(false);

  const _keyExtractor = (item: TListData, index: number) => index.toString();

  const onPress = (): void => {
    setIsOpen(!isOpen)
  };

  const _renderItemComponent: ListRenderItem<TListData> = ({ item }) =>  {
    const _onItemPress = (): void => {
      if (item.id) {
        __DEV__ && console.log('onItemPress itemID:', item.id);
        QSelectedAction(item.id);
        navigation.navigate(ScreenNames.QForm);
      } else {
        __DEV__ && console.warn('Error: questionnaire ID missing');
      }
    }

    return (
      <TouchableOpacity onPress={_onItemPress}>
        <View style={styles.item}>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.header}>
        <Text style={styles.headerText}>{header}</Text>
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          data={data}
          keyExtractor={_keyExtractor}
          renderItem={_renderItemComponent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    margin: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

const mapDispatchToProps = {
  QSelectedAction: QSelectedAction,
};
export default connect(null, mapDispatchToProps)(QuestionnairesDropList);
