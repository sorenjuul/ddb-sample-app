import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

async function goGet(endpoint, value) {
    return await fetch(endpoint + value);
}

async function fetchPerson(value) {
    return await goGet('//ddb-sample-app.getsandbox.com/person/', value);
}

async function fetchFacility(value) {
    return await goGet('//ddb-sample-app.getsandbox.com/facility/', value);
}

async function fetchExposure(value) {
    return await goGet('//ddb-sample-app.getsandbox.com/exposure/', value);
}

export function getResult(value) {
    return async function (dispatch) {
        let values = await (await fetchPerson(value)).json();
        let values2 = await Promise.all([
            (await fetchFacility(values.val1)).json(),
            (await fetchExposure(values.val2)).json()
        ]);
        dispatch({ type: 'SUBMIT', result: values2[0].val3 * values2[1].val5 });
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
