import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface Todos {
  id: string;
  title: string;
  isDone: boolean;
}

const TodoScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [todos, setTodos] = useState<Todos[]>([]);
  const [todo, setTodo] = useState("");
  const handleSubmit = () => {
    const newTodo: Todos = {
      id: Math.random().toString(),
      title: todo,
      isDone: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setTodo("");
  };
  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todos) => todos.id !== id));
  };
  const handleChecked = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, idDone: !todo.isDone } : todo,
      ),
    );
  };
  const renderTodoItem = ({ item }: { item: Todos }) => (
    <View style={styles.todoItem}>
      <Text style={item.isDone ? styles.todoItemDone : styles.todoItemText}>
        {item.title}
      </Text>
      <Button title="X" color={"red"} onPress={() => removeTodo(item.id)} />
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text={item.isDone ? "Done" : "Check"}
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        onPress={() => handleChecked(item.id)}
      />
      {/* Add logic to mark as done (optional) */}
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.label}>TodoList</Text>
      <TextInput
        style={[styles.textInput, isFocused && styles.textInputFocused]}
        placeholder={"Enter Todo..."}
        value={todo}
        onChangeText={(text) => setTodo(text)}
        onSubmitEditing={(event) => setTodo(event.nativeEvent.text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Button title="Log Todo" onPress={handleSubmit} />
      {todos.length > 0 && (
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Adjust spacing as needed
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5, // Adjust spacing as needed
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  textInputFocused: {
    borderColor: "#333",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  todoItemText: {
    fontSize: 16,
  },
  todoItemDone: {
    fontSize: 16,
    textDecorationLine: "line-through",
  },
});
