import { Player, Buffer } from 'tone'

const createSample = origin_sample => {
    return dispatch => {
        dispatch({type: 'START_ADDING_SAMPLE_REQUEST'})
        const formData = new FormData();
        formData.append("name", origin_sample.name);
        formData.append("file", origin_sample.file)
        formData.append("color", origin_sample.color)

        const configObj = {
            method: "POST",
            body: formData
        }
        fetch('http://localhost:3001/audios', configObj)
        .then(resp => resp.json())
        .then(sample => {
            let buffer = new Buffer(sample.url, function(){
                let buff = buffer.get()
                let player = new Player(buff)
                let audio_sample = {
                    ...sample,
                    player: player,
                    key: origin_sample.key
                }
                console.log(audio_sample);
                let payload = {
                    sample: sample,
                    audio_sample: audio_sample
                }
                dispatch({type: 'ADD_SAMPLE', payload})
            });
        })
        .catch(error => console.log(error))
    }
}


export default createSample