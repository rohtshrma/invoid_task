import React from "react";
import { Alert } from '@material-ui/lab';
var myVar=null;
class ChangingProgressProvider extends React.Component {
  state = {
    valuesIndex: 0
  };

  componentDidMount() {
    myVar = setInterval(() => {
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length
      });
    }, 1000);
  }

  render() {
    if(this.state.valuesIndex===6){
      clearInterval(myVar);
      return <Alert severity="success">File Uploaded Successfully !</Alert>
    }
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
