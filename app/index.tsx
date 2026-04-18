import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeScreen() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(43);
  const [selectedCells, setSelectedCells] = useState<number[]>([
    32, 33, 34, 42, 44, 52, 53, 54,
  ]);
  const [rows, setRows] = useState<string>("");
  const [cols, setCols] = useState<string>("");

  const generateGrid = () => {
    const grid = [];
    const numRows = rows ? parseInt(rows) : 10;
    const numCols = cols ? parseInt(cols) : 10;
    
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        const number = i * numCols + j;
        row.push(number);
      }
      grid.push(row);
    }
    return grid;
  };

  const handleCellPress = (number: number) => {
    // Handle the selected number (green highlight)
    setSelectedNumber(number);
    
    // Handle the selected cells (yellow boxes)
    if (selectedCells.includes(number)) {
      // If already selected, remove it (unselect)
      setSelectedCells(selectedCells.filter(cell => cell !== number));
    } else {
      // If not selected, check if we can add it (max 10)
      if (selectedCells.length >= 10) {
        Alert.alert("Limit Reached", "You can only select up to 10 boxes");
        return;
      }
      // Add to selected cells
      setSelectedCells([...selectedCells, number]);
    }
  };

  const isSelected = (number: number) => {
    return selectedCells.includes(number);
  };

  const isHighlighted = (number: number) => {
    return number === selectedNumber;
  };

  const handleRegenerate = () => {
    const numRows = rows ? parseInt(rows) : 10;
    const numCols = cols ? parseInt(cols) : 10;
    
    if (rows && (numRows < 1 || numRows > 10)) {
      Alert.alert("Invalid Input", "Rows must be between 1 and 10");
      return;
    }
    
    if (cols && (numCols < 1 || numCols > 10)) {
      Alert.alert("Invalid Input", "Columns must be between 1 and 10");
      return;
    }
    
    // Reset to initial state
    setSelectedNumber(43);
    setSelectedCells([32, 33, 34, 42, 44, 52, 53, 54]);
    setRows("");
    setCols("");
  };

  const handleRowsChange = (text: string) => {
    const num = parseInt(text);
    if (text === "") {
      setRows("");
    } else if (!isNaN(num) && num >= 1 && num <= 10) {
      setRows(text);
    } else if (num > 10) {
      Alert.alert("Limit Exceeded", "Rows cannot exceed 10");
    }
  };

  const handleColsChange = (text: string) => {
    const num = parseInt(text);
    if (text === "") {
      setCols("");
    } else if (!isNaN(num) && num >= 1 && num <= 10) {
      setCols(text);
    } else if (num > 10) {
      Alert.alert("Limit Exceeded", "Columns cannot exceed 10");
    }
  };

  const grid = generateGrid();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.appTitle}>App</Text>
        
        <View style={styles.gridContainer}>
          <View style={styles.grid}>
            {grid.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((number) => (
                  <TouchableOpacity
                    key={number}
                    style={[
                      styles.cell,
                      isSelected(number) && styles.selectedCell,
                      isHighlighted(number) && styles.highlightedCell,
                    ]}
                    onPress={() => handleCellPress(number)}
                  >
                    <Text
                      style={[
                        styles.cellText,
                        isSelected(number) && styles.selectedCellText,
                        isHighlighted(number) && styles.highlightedCellText,
                      ]}
                    >
                      {number.toString().padStart(2, "0")}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.selectedText}>
            selected = {selectedNumber !== null ? selectedNumber : "none"}
          </Text>
          <Text style={styles.selectedCellsText}>
            {selectedCells.join(", ")}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Enter the number of Rows and Columns:
          </Text>
          <View style={styles.rowInputContainer}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              value={rows}
              onChangeText={handleRowsChange}
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
           
          </View>
        
        </View>

        <TouchableOpacity style={styles.regenerateButton} onPress={handleRegenerate}>
          <Text style={styles.regenerateText}>REGENERATE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  gridContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  grid: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 0,
  },
  cell: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  selectedCell: {
    backgroundColor: "#80d5e4", 
  },
  highlightedCell: {
    backgroundColor: "#80d5e4",
  },
  cellText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000",
    textAlign: "center",
  },
  selectedCellText: {
    fontWeight: "bold",
  },
  highlightedCellText: {
    color: "#fff",
    fontWeight: "bold",
  },
  infoContainer: {
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "left",
  },
  selectedCellsText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 20,
    textAlign: "left",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "left",
  },
  rowInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    height: 40,
  },
  halfInput: {
    width: "48%",
  },
  hintText: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    textAlign: "left",
  },
  regenerateButton: {
    backgroundColor: "#0066cc",
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
  },
  regenerateText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});