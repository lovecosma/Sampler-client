import React, { Component } from 'react'
import { connect } from 'react-redux'
import createSample from '../actions/createSample'
import fetchSamples from '../actions/fetchSamples'
import addExistingSampleToSampler from '../actions/addExistingSampleToSampler'

export class SampleForm extends Component {
    state ={
        name: "",
        file: "",
        color: "#FF0000",
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
            color: ""
        })
        this.props.createSample({name: this.state.name, file: this.state.file, color: this.state.color})
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
                                <label className="large-font" htmlFor="name">Name:</label>
                                <input onChange={this.handleChange} type="text" name="name" id="sample-name-input" value={this.state.name}></input>
                            </div>
                            <div className="color-input">
                                <label className="large-font" htmlFor="name">Color:</label>
                                <input onChange={this.handleChange} type="color" name="color" value={this.state.color}></input>
                            </div>
                            <div>
                            <input className='white' onChange={this.handleFileChange} type="file" name="file" id=""></input><br/><br/>
                            <button type="SUBMIT" onClick={this.sendInfo}>Create Sample</button>
                            </div>
                        </form>
                    </div>
                    <p>-OR-</p>
                    <div className="form-div">
                        <form onSubmit={this.handleAdd}>
                                <select onChange={this.handleSelection} name="samples" id="samples">
                                    {existingSamples}
                                </select>
                                <div>
                            <button>Load Sample</button>       
                                </div>
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
