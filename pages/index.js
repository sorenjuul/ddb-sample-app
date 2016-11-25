import React from 'react';
import { Provider } from 'react-redux';

import { style, merge, hover } from 'glamor';
import 'glamor/reset'; // css reset!
import { base, container} from 'glamor/ous';

import Form from '../components/form';
import Overlay from '../components/overlay';

import { reducer, initStore, getResult } from '../redux/store';

class App extends React.Component {

    static getInitialProps ({ req }) {
        const isServer = !!req;
        const store = initStore(reducer, {}, isServer);
        return  { initialState: store.getState(), isServer };
    }

    constructor(props) {
        super(props);
        this.state = {result: null};
        this.onSubmit = this.onSubmit.bind(this);
        this.onOverlayClose = this.onOverlayClose.bind(this);
        this.store = initStore(reducer, props.initialState, props.isServer)
    }

    onSubmit(value) {
        this.store.dispatch(getResult(value));
    }

    onOverlayClose() {
        this.store.dispatch({type: 'RESET'});
    }

    render() {
        return (
            <Provider store={this.store}>
                <div {...base}>
                    <div {...container} >
                        <h3>Welcome to DDB sample app</h3>
                        <Form
                            onSubmit={this.onSubmit}
                        />
                        <Overlay
                            onClose={this.onOverlayClose}
                        />
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;