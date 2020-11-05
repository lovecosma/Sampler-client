import { Player, Buffer } from 'tone'


const addExistingSampleToSampler = sample => {
    return dispatch => {
        dispatch({type: 'START_EXISTING_ADD_REQUEST'})
        let buffer = new Buffer(sample.url, function(){
            var buff = buffer.get();
            let player = new Player(buff)
            let audio_sample = {
                ...sample,
                player: player
            }
            dispatch({type: 'ADD_EXISTING', audio_sample})
        });
    }
}


export default addExistingSampleToSampler