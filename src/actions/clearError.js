const clearError = () => {
    return dispatch => {
        dispatch({type: 'CLEAR_ERROR'})
    }
}


export default clearError