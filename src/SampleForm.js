import React, { Component } from 'react'
import { connect } from 'react-redux'
import createSample from './actions/createSample'
import { Player } from 'tone'
import fetchSamples from './actions/fetchSamples'
import addExistingSampleToSampler from './actions/addExistingSampleToSampler'

export class SampleForm extends Component {
    state ={
        name: "",
        file: "",
        sample: {}
    }

    handleAdd = e => {
        e.preventDefault()
        debugger
        this.props.addExistingSampleToSampler(e.target.value)
    }

    triggerSample() {
        this.toMaster().start()
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleFileChange = e => {
        e.preventDefault()
        if (e.target.files[0]) this.setState({ file: e.target.files[0]});
    };

    sendInfo = e => {
        e.preventDefault()
        this.setState({
            name: "",
            file: "",
        })
        this.props.createSample(this.state)
    }

    componentDidMount = () => {
        this.props.fetchSamples()
    }

    render() {
        if(this.props.samplesReducer.requesting){
            return <div><h1>Loading...</h1></div>
        } else {
            const sampleCards = this.props.samplesReducer.sampler.map(sample => {
                const player = new Player(sample.url)
                return (
                <button onClick={this.triggerSample.bind(player)} className="box">
                    {sample.name}
                </button>
                )
            })
            const existingSamples = this.props.samplesReducer.samples.map(sample => {
                return (
                    <option value={sample}>
                        {sample.name}
                    </option>
                )
            })
            return (
                <div>
                    <form action="">
                        <input onChange={this.handleFileChange} type="file" name="file" id=""></input>
                        <input onChange={this.handleChange} type="text" name="name" id="" value={this.state.name}></input>
                        <button type="SUBMIT" onClick={this.sendInfo}>Submit</button>
                    </form>
                    <h3>-OR-</h3>
                    <form onSubmit={this.handleAdd}>
                        <select onChange={(e)=>{this.setState({sample: e.target.value})}} name="samples" id="samples">
                            {existingSamples}
                        </select>
                        <button>Add Existing Sample</button>
                    </form>
                    <div>
                        <div className="black" id='sampler'>
                            {sampleCards}
                        </div>
                    </div>
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

export default connect(mapStateToProps, {createSample, fetchSamples, addExistingSampleToSampler})(SampleForm)
