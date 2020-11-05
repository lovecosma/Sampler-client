import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchSamples from '../actions/fetchSamples'


export class Sampler extends Component {
    state = {
        playMode: false
    }

    triggerSample() {
        this.toDestination().start()
    }

    keyPressed() {
        debugger
    }

    componentDidMount = () => {
        this.props.fetchSamples()
    }
    render() {
        if(this.props.samplesReducer.requesting){
            return <div><h3>Loading...</h3></div>
        } else {
        const sampleCards = this.props.samplesReducer.sampler.map(sample => {
            return (
            <button key={`Sample ${sample.id}`} onClick={this.triggerSample.bind(sample.player)} style={{borderColor: sample.color}} className="box white-text">
                {sample.name}
            </button>
            )
        })
        if(sampleCards.length === 0){
            return (
                <div className="black rainbow white-text center" id='sampler'>
                    <h5>Create or load some samples!</h5>
                </div>
            )
        }else{
                return (
                    <div className="black rainbow" id='sampler'>
                        {sampleCards}
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps, { fetchSamples })(Sampler)
