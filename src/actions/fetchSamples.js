const fetchSamples = () => {
    return dispatch => {
        dispatch({type: 'START_FETCHCHING_SAMPLES_REQUEST'})
        fetch('http://localhost:3001/audios')
        .then(resp => resp.json())
        .then(samples => {
            dispatch({type: 'ADD_SAMPLES', samples})
        })
    }
}


export default fetchSamples