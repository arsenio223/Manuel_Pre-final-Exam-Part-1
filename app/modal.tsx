import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ModalScreen() {
  const [rowsInput, setRowsInput] = useState("");
  const [colsInput, setColsInput] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    const rows = parseInt(rowsInput);
    const cols = parseInt(colsInput);
    
    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
      Alert.alert("Error", "Please enter valid positive numbers");
      return;
    }
    
    if (rows > 20 || cols > 20) {
      Alert.alert("Error", "Maximum size is 20x20 for better performance");
      return;
    }
    
    Alert.alert("Success", `Grid size set to ${rows}x${cols}`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the number of Rows and Columns:</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rows:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={rowsInput}
          onChangeText={setRowsInput}
          placeholder="e.g., 10"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Columns:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={colsInput}
          onChangeText={setColsInput}
          placeholder="e.g., 10"
        />
      </View>
      
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Apply</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});