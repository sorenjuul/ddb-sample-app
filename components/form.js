import React from 'react';
import { row, columns, fullWidth} from 'glamor/ous';
import css from 'next/css';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: null
        };
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onValueChanged(event) {
        let value = event.currentTarget.value;
        this.setState({
            inputValue: value
        });

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
                    <input onChange={this.onValueChanged} {...fullWidth} type="text" maxLength="10" minLength="1" placeholder="One to ten characters" id="valueInput"/>
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