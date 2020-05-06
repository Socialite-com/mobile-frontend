import React from 'react';
import {StyleSheet, View, Keyboard} from 'react-native';
// import DraggableFlatList from 'react-native-draggable-flatlist';

import Button from 'library/components/General/Button';
import CustomText from 'library/components/General/CustomText';
import TextInput from 'library/components/General/TextInput';
import Todo from 'library/components/Events/Todo';

import R from 'res/R';

class ManageEvent extends React.Component {
  state = {
    newTodo: '',
    todos: [
      {
        key: 'item-1',
        label: 'Test1',
        completed: false,
      },
      {
        key: 'item-2',
        label: 'Test2',
        completed: false,
      },
      {
        key: 'item-3',
        label: 'Test3',
        completed: true,
      },
      {
        key: 'item-4',
        label: 'Test4',
        completed: false,
      },
    ],
  };

  onRemove = index => {
    let arr = this.state.todos;
    arr.splice(index, 1);
    this.setState({todos: arr});
  };

  onComplete = index => {
    let arr = this.state.todos;
    arr[index].completed = !arr[index].completed;
    this.setState({todos: arr});
  };

  onAdd = () => {
    if (this.state.newTodo === '') {
      return;
    }
    let arr = this.state.todos;
    arr.unshift({
      key: 'item-' + arr.length,
      label: this.state.newTodo,
      completed: false,
    });
    this.setState({newTodo: '', todos: arr});
    Keyboard.dismiss();
  };

  renderItem = ({item, index, drag, isActive}) => {
    return (
      <Todo
        key={index}
        label={item.label}
        isCompleted={item.completed}
        onComplete={() => this.onComplete(index)}
        onRemove={() => this.onRemove(index)}
        onDrag={drag}
      />
    );
  };

  render() {
    return (
      <View style={styles.mainView}>
        <View>
          <CustomText subtitle label="Announcements" />
        </View>
        <View>
          <CustomText subtitle label="To-do List" />

          <View>
            <TextInput
              placeholder="Add To-do"
              value={this.state.newTodo}
              onChangeText={newTodo => {
                this.setState({newTodo});
              }}
              onSubmitEditing={this.onAdd}
            />
            <Button title="Add" onPress={this.onAdd} />
          </View>

          {/* <View style={{height: 500}}>
            <DraggableFlatList
              data={this.state.todos}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `draggable-item-${item.key}`}
              onDragEnd={({todos}) => this.setState({todos})}
            />
          </View> */}

          {this.state.todos.map((item, index) => {
            return (
              <Todo
                key={index}
                label={item.label}
                isCompleted={item.completed}
                onComplete={() => this.onComplete(index)}
                onRemove={() => this.onRemove(index)}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
  },
});

export default ManageEvent;
