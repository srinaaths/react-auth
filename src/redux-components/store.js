import { createStore } from 'redux'
import React from 'react'
import reducer from './reducer';

const store = createStore(reducer);

export default store