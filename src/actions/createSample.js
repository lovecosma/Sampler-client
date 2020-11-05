import { Player, Buffer } from 'tone'

const createSample = sample => {
    return dispatch => {
        dispatch({type: 'START_ADDING_SAMPLE_REQUEST'})
        const formData = new FormData();
        formData.append("name", sample.name);
        formData.append("file", sample.file)
        formData.append("color", sample.color)
        const configObj = {
            method: "POST",
            body: formData
        }
        fetch('http://localhost:3001/audios', configObj)
        .then(resp => resp.json())
        .then(sample => {
            let buffer = new Buffer(sample.url, function(){
                var buff = buffer.get();
                let player = new Player(buff)
                let audio_sample = {
                    ...sample,
                    player: player
                }
                let payload = {
                    sample: sample,
                    audio_sample: audio_sample
                }
                dispatch({type: 'ADD_SAMPLE', payload})
            });
        })
    }
}


export default createSample