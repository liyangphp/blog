import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const currentInitialState = {
    current: 1
}

const labelsInitialState = {
    labels: ''
}

const keywordsInitialState = {
    keywords: ''
}

const UPDATE_CURRENT = 'UPDATE_CURRENT'

function update(current) {
    return {
        type: UPDATE_CURRENT,
        current,
    }
}

function addAsync(current) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(update(current))
        }, 1000)
    }
}



function currentReducer(state = currentInitialState, action) {
    switch (action.type) {
        case UPDATE_CURRENT:
            return { current: action.current || '' }
        default:
            return state
    }
}

const UPDATE_LABELS = 'UPDATE_LABELS'
function labelsReducer(state = labelsInitialState, action) {
    switch (action.type) {
        case UPDATE_LABELS:
            return {
                labels: action.labels
            }
        default:
            return state
    }
}

const UPDATE_KEYWORDS = 'UPDATE_KEYWORDS'

function keywordsReducer(state = keywordsInitialState, action){
    switch (action.type) {
        case UPDATE_KEYWORDS:
            return {
                keywords: action.keywords
            }
        default:
            return state
    }
}





const allReducers = combineReducers({
    current: currentReducer,
    labels: labelsReducer,
    keywords: keywordsReducer
})

// const store = createStore(
//     allReducers,
//     {
//         token: initialState,
//         user: userInitialState
//     },
//     applyMiddleware(ReduxThunk),
// )

// console.log(store.getState())

// store.subscribe(()=>{
//     console.log(store.getState())
// })

// store.dispatch(add(3))

// store.dispatch(addAsync(5))

// store.dispatch({ type:ADD })

// console.log(store.getState())



export default function initializeStore() {
    const store = createStore(allReducers,
        {
            current: currentInitialState,
            labels: labelsInitialState
        },
        applyMiddleware(ReduxThunk))
    return store
}