import React from 'react';
import css from 'next/css';
import { connect } from 'react-redux';

const Overlay = connect(state => state)(({ result, onClose }) => {
    if (!result) { return <div></div>; }
    return (
        <div>
            <div {...overlayStyle}></div>
            <div {...modalStyle}>
                <div {...clear}>
                    <h2>{result}</h2>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
});

const clear = css({
    display: 'block'
});

const modalStyle = css({
    width: '50%',
    height: '50%',
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-25%',
    marginLeft: '-25%',
    backgroundColor: '#ddd',
    textAlign: 'center',
    zIndex: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const overlayStyle = css({
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)'
});

export default Overlay;