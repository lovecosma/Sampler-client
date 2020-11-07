import React, { Component } from 'react'
import { connect } from 'react-redux'
import createSample from '../actions/createSample'
import fetchSamples from '../actions/fetchSamples'
import addExistingSampleToSampler from '../actions/addExistingSampleToSampler'
import Modal from './Modal'
import throwError from '../actions/throwError'
import clearError from '../actions/clearError'



export class SampleForm extends Component {
    state ={
        name: "",
        file: null,
        color: "#ff0000",
        sample: null,
        key: "",
        keys: ["q", "w", "e", "r", "t", "y", "a", "s", "d", "f", "g", "h", "z", "x", "c", "v", "b"]
    }

    handleSelection = e => {
        this.setState({sample: JSON.parse(e.target.value)});
    }

    handleKeySelection = e => {
        this.setState({key: e.target.value})
    }

    handleAdd = e => {
        e.preventDefault()
        this.setState({
            sample: null
        })
        if(this.state.sample && this.state.sample !== {}){
            if(this.state.key && this.state.key !== ""){
             this.props.addExistingSampleToSampler({...this.state.sample, key: this.state.key})
            } else {
                this.setState({error_message: "Your loadedsample must have a trigger key"})
                this.props.throwError()
            }
        } else {
            this.setState({error_message: "You must select a sample from the list to load a sample"})
            this.props.throwError()
        }
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
        const new_keys = this.state.keys.filter(key => key !== this.state.key)
        this.setState({
            name: "",
            file: null,
            color: "#ff0000",
            key: "",
            error_message: ""
        })
        if(this.state.file && this.state.file !== ""){
            if(this.state.name && this.state.name !== ""){
                if(this.state.color && this.state.color !== ""){
                    if(this.state.keys.includes(this.state.key)){
                        this.props.createSample({name: this.state.name, file: this.state.file, color: this.state.color, key: this.state.key})
                    } else {
                        this.setState({error_message: "Your sample must have a trigger key"})
                        this.props.throwError()
                    }
                } else {
                    this.setState({error_message: "Your sample must have a color"})
                    this.props.throwError()
                }
            } else {
                this.setState({error_message: "Your sample must have a name"})
                this.props.throwError()
            }
        } else {
            this.setState({error_message: "You must upload an audio file"})
            this.props.throwError()
        }
        console.log(new_keys);
        this.setState({ keys: [...new_keys]})
    }

    componentDidMount = () => {
        this.props.fetchSamples()
    }

    render() {
        if(this.props.samplesReducer.error){
            return <div><Modal text={this.state.error_message} clearError={this.props.clearError}/></div>
        } else {
            if(this.props.samplesReducer.requesting){
                return <div><h1>Loading...</h1></div>
            } else {
                const existingSamples = this.props.samplesReducer.samples.map(sample => {
                    return (
                        <option key={`Sample ${sample.id}`} value={JSON.stringify({...sample})}>
                            {sample.name}
                        </option>
                    )
                })
                const keyOptions = this.state.keys.map(key => {
                return <option key={`key ${key}`} value={key} >{key}</option>
                })
                return (
                    <div id="sample-selection">
                        <div className="form-div"  style={{float: "left", height: "100%"}}>
                            <div>
                                <h4 className="white-text">Create New Sample</h4> 
                            </div>
                            <form action="">
                                <div>
                                    <label className="large-font" htmlFor="file">File:</label>
                                    <input className='white' onChange={this.handleFileChange} accept=".wav, .mp3"type="file" name="file" id="" style={{marginLeft:"10px"}}></input>
                                </div>
                                <div>
                                   <label className="large-font" htmlFor="name">Name:</label>
                                    <input onChange={this.handleChange} type="text" name="name" id="sample-name-input" style={{marginLeft:"10px"}} placeholder="Name your sample here" value={this.state.name}></input>
                                </div>
                                <div className="color-input" style={{display:"inline"}}>
                                    <label className="large-font" htmlFor="name">Color:</label>
                                    <input onChange={this.handleChange} type="color" name="color" value={this.state.color} style={{marginLeft:"10px"}}></input>
                                </div>
                                <div className="key-input" style={{display:"inline"}}>
                                    <label className="large-font" htmlFor="key">Trigger:</label>
                                    <div style={{display:"inline"}}>
                                        <select onChange={this.handleKeySelection}  name="key" id="key" style={{display:"inline", width: "50px"}}>
                                        <option defaultValue >?</option>
                                            {keyOptions}
                                        </select>
                                    </div>
                                    <div>
                                        <button className="regular rainbow white-text" type="SUBMIT" onClick={this.sendInfo}>Create Sample</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                      <div style={{float: "left"}}>
                          <h4 className="white-text" >-OR-</h4>
                      </div>
                        <div className="form-div" style={{float: "left"}}>
                            <div>
                                <h4 className="white-text">Load Previous Sample</h4> 
                            </div>
                            <form onSubmit={this.handleAdd}>
                                    <div>
                                        <label htmlFor="samples"className="large-font">Samples:</label>
                                        <select onChange={this.handleSelection} name="samples" id="samples" style={{marginLeft:"10px", width: "100px"}}>
                                        <option defaultValue >?</option>
                                            {existingSamples}
                                        </select>
                                    </div>
                                    <div style={{display:"inline"}}>
                                    <label htmlFor="key"className="large-font">Trigger:</label>
                                            <select onChange={this.handleKeySelection}  name="key" id="key" style={{display:"inline", width: "50px", marginLeft:"10px"}}>
                                            <option defaultValue >?</option>
                                                {keyOptions}
                                            </select>
                                    </div>
                                    <div>
                                        <button className="regular rainbow white-text">Load Sample</button>       
                                    </div>
                            </form>
                        </div>
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

export default connect(mapStateToProps, {createSample, fetchSamples, addExistingSampleToSampler, throwError, clearError})(SampleForm)
