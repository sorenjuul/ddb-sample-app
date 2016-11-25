import React from 'react';
import { row, columns, fullWidth} from 'glamor/ous';
import css from 'next/css';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onValueChanged(event) {
        let value = event.currentTarget.value;
        if (value && value.length <= 10) {
            this.setState({
                inputValue: value
            });
        } else if (!value) {
            this.setState({
                inputValue: ''
            });
        }
    }

    onClick(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.inputValue);
    }

    render() {
        return <form>
            <div {...row}>
                <div {...columns(6)}>
                    <label htmlFor="valueInput">Your value</label>
                    <input value={this.state.inputValue} onChange={this.onValueChanged} {...fullWidth} type="text"  minLength="1" placeholder="One to ten characters" id="valueInput"/>
                    <input disabled={!this.state.inputValue} onClick={this.onClick} className={buttonStyle} type="submit" value="Submit"/>
                </div>
            </div>
        </form>
    }
}

const buttonStyle = css({
    ':disabled': {
        backgroundColor: 'gray !important'
    }
});

export default Form;