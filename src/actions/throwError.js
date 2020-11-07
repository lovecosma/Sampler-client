const throwError = () => {
    return dispatch => {
        dispatch({type: 'THROW_ERROR'})
    }
}


export default throwError