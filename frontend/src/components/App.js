import React, { Component } from "react";
import PropertiesMap from "./PropertiesMap";
import axios from "axios";

// App component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      isLoading: true
    };
  }

  async componentDidMount() {
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
    return <PropertiesMap properties={this.state.properties} />;
  }
}

export default App;
