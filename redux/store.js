import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

function goGet(endpoint, value) {
    return fetch(endpoint + value);
}

function fetchPerson(value) {
    return goGet('//ddb-sample-app.getsandbox.com/person/', value);
}

function fetchFacility(value) {
    return goGet('//ddb-sample-app.getsandbox.com/facility/', value);
}

function fetchExposure(value) {
    return goGet('//ddb-sample-app.getsandbox.com/exposure/', value);
}

export function getResult(value) {

    return function (dispatch) {
        return fetchPerson(value).then((response) => { return response.json(); })
            .then((values) => {
                Promise.all([
                    fetchFacility(values.val1).then((response) => { return response.json(); }),
                    fetchExposure(values.val2).then((response) => { return response.json(); })
                ]).then(
                    (values) => {
                        dispatch({ type: 'SUBMIT', result: values[0].val3 * values[1].val5 })
                    }
                );
            })
    };
}

export const reducer = ( state = { result: null }, action) => {
    switch (action.type) {
        case 'SUBMIT':
            return { result: action.result };
        case 'RESET':
            return { result: null };
        default: return state
    }
};

export const initStore = (reducer, initialState, isServer) => {
    if (isServer && typeof window === 'undefined') {
        return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
    } else {
        if (!window.store) {
            window.store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
        }
        return window.store
    }
};
