import React, { Component } from 'react'
import { Player } from 'tone'
import { connect } from 'react-redux'
import { keyPressed } from 'p5'
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
            const player = new Player(sample.url)
            return (
            <button key={`Sample ${sample.id}`} onClick={this.triggerSample.bind(player)} style={{backgroundColor: sample.color}} className="box">
                {sample.name}
            </button>
            )
        })
            return (
                <div className="black" id='sampler'>
                    {sampleCards}
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps, { fetchSamples })(Sampler)
