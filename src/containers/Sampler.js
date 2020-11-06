import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sketch from "react-p5";
import fetchSamples from '../actions/fetchSamples'



export class Sampler extends Component {
    state = {
        playMode: false,
        loading: ["Loading", "Loading Your", "Loading Your Sample", "Loading Your Sample.", "Loading Your Sample. .", "Loading Your Sample. . .", "Loading Your Sample. . . ."],
        counter : 0
    }

     setup = (p5, canvasParentRef) => {
		p5.createCanvas(1, 1).parent(canvasParentRef);
	};

	 draw = (p5) => {

    };


    triggerSample() {
        this.toDestination().start()
    }

    keyPressed = p5 => {
        let sample = this.props.samplesReducer.sampler.find(sample => {
           return sample.key === p5.key
        })
        if(sample){
            sample.player.toDestination().start() 
        }
    }

    increment = () => {
        if(this.state.counter < this.state.loading.length-1){
            this.setState({counter: this.state.counter + 1})
        } else{
            this.setState({counter: 0})
        }
    }

    componentDidMount = () => {
        this.props.fetchSamples()
        setInterval(this.increment, 500)
    }
    render() {
        if(this.props.samplesReducer.requesting){
            return ( 
            <div className="black rainbow white-text" id='sampler'>
                <h3 style={{padding: '10px'}}>{this.state.loading[this.state.counter]}</h3>
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
                        <Sketch setup={this.setup} draw={this.draw} keyPressed={this.keyPressed}/>;
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
