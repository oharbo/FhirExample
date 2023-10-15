import React, { useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, Pressable, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { QSelectedAction } from '../store/actions/actions';
import { RootStackParamList, ScreenNames } from '../constants';
import { TListData } from '../screens/QContainer';

interface DropdownProps {
  data: TListData[];
  header: string;
  QSelectedAction: (id: string) => void;
}

type TIsOpenState = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const QuestionnairesDropList: React.FC<DropdownProps> = ({ data, header, QSelectedAction }) => {
  const navigation: StackNavigationProp<RootStackParamList> = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isOpen, setIsOpen]: TIsOpenState = useState<boolean>(false);

  const _keyExtractor = (item: TListData, index: number) => `${item?.id}-${index}`;

  const onPress = (): void => setIsOpen(!isOpen);

  const _renderItemComponent: ListRenderItem<TListData> = ({ item }) =>  {
    const _onItemPress = (): void => {
      if (item.id) {
        QSelectedAction(item.id);
        navigation.navigate(ScreenNames.QForm);
      } else {
        __DEV__ && console.warn('Error: questionnaire ID missing');
      }
    }

    return (
      <Pressable onPress={_onItemPress}>
        <View style={styles.item}>
          <Text>{item.title}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.header}>
        <Text style={styles.headerText}>{header}</Text>
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </Pressable>
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
