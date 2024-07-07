import { Component } from 'react';

class ErrorTrigger extends Component {
  handleClick = () => {
    console.log(this, 'counter measure due to no comments rule');
    throw new Error('Manually triggered error!');
  };

  render() {
    return (
      <button onClick={this.handleClick} type="button">
        Trigger Error
      </button>
    );
  }
}

export default ErrorTrigger;
