import React, { Component } from "react";
import axios from "axios";
import PropertiesMap from "./PropertiesMap";
import FileUpload from "./FileUpload";

// App component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ isLoading: true });
    try {
      const result = await axios.get("http://localhost:3000/v1/properties");
      this.setState({
        properties: result,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  render() {
    return (
      <div>
        <PropertiesMap properties={this.state.properties} />
        <FileUpload updateMap={this.fetchData} />
      </div>
    );
  }
}

export default App;
