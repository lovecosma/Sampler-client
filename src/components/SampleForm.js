import React, { Component } from 'react'
import { connect } from 'react-redux'
import createSample from '../actions/createSample'
import fetchSamples from '../actions/fetchSamples'
import addExistingSampleToSampler from '../actions/addExistingSampleToSampler'

export class SampleForm extends Component {
    state ={
        name: "",
        file: "",
        sample: {}
    }

    handleSelection = e => {
     this.setState({sample: JSON.parse(e.target.value)});
    }

    handleAdd = e => {
        e.preventDefault()
        this.setState({
            sample: null
        })
        this.props.addExistingSampleToSampler(this.state.sample)
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
        this.props.createSample({name: this.state.name, file: this.state.file})
    }

    componentDidMount = () => {
        this.props.fetchSamples()
    }

    render() {
        if(this.props.samplesReducer.requesting){
            return <div><h1>Loading...</h1></div>
        } else {
            const existingSamples = this.props.samplesReducer.samples.map(sample => {
                return (
                    <option key={`Sample ${sample.id}`} value={JSON.stringify(sample)}>
                        {sample.name}
                    </option>
                )
            })
            return (
                <div id="sample-selection">
                    <div className="form-div">
                        <form action="">
                            <div className="name-input">
                                <label htmlFor="name">Sample Name:</label>
                                <input onChange={this.handleChange} type="text" name="name" id="sample-name-input" value={this.state.name}></input>
                            </div>
                            <div>
                            <input onChange={this.handleFileChange} type="file" name="file" id=""></input>
                            <button type="SUBMIT" onClick={this.sendInfo}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <h3>-OR-</h3>
                    <div className="form-div">
                        <form onSubmit={this.handleAdd}>
                                <select onChange={this.handleSelection} name="samples" id="samples">
                                    {existingSamples}
                                </select>
                            <button>Add Existing Sample</button>
                        </form>
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
