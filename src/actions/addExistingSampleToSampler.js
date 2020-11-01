const addExistingSampleToSampler = sample => {
    return dispatch => {
        dispatch({type: 'START_EXISTING_ADD_REQUEST'})
        dispatch({type: 'ADD_EXISTING', sample})
    }
}


export default addExistingSampleToSampler