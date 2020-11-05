import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchSamples from '../actions/fetchSamples'



export class Sampler extends Component {
    state = {
        playMode: false,
        loading: ["Loading", "Loading Your", "Loading Your Sample", "Loading Your Sample.", "Loading Your Sample. .", "Loading Your Sample. . .", "Loading Your Sample. . . ."],
        counter : 0

    }

    triggerSample() {
        this.toDestination().start()
    }

    keyPressed() {
        debugger
    }

    increment = () => {
        if(this.state.counter < this.state.loading.length){
            this.setState({counter: this.state.counter + 1})
        } else{
            this.setState({counter: 0})
        }
    }

    componentDidMount = () => {
        this.props.fetchSamples()
        setInterval(this.increment, 250)
    }
    render() {
        if(this.props.samplesReducer.requesting){
            return ( 
            <div className="black rainbow white-text" id='sampler'>
                <h3>{this.state.loading[this.state.counter]}</h3>
            </div>
            )
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
