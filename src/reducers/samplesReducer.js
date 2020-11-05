function samplesReducer(state = { samples: [], requesting: false, sampler: []}, action) {
    switch (action.type) {
      case 'START_ADDING_SAMPLE_REQUEST':
        return {
          ...state,
          requesting: true
        }
      case 'ADD_SAMPLE':
        return {
          ...state,
          samples: [...state.samples, action.payload.sample],
          sampler: [...state.sampler, action.payload.audio_sample],
          requesting: false
        }
      case 'START_FECTHING_SAMPLES_REQUEST':
          return {
              ...state,
              requesting: true
          }
       case 'ADD_SAMPLES':
            return {
                ...state,
                samples: [...action.samples],
                requesting: false
            }

        case 'START_EXISTING_ADD_REQUEST':
            return {
                ...state,
                requesting: true
              }
        case 'ADD_EXISTING':
            return {
                ...state,
                sampler: [...state.sampler, action.audio_sample],
                requesting: false
            }
        default:
            return {
                ...state
            }
    }
}

export default samplesReducer