import React from 'react';
// import ProgressBar from '../helpers/ProgressBar';
import { Button, Progress } from 'semantic-ui-react'
import axios from 'axios'

export default class Upload extends React.Component {
    state = {
        file: null,
        percentage: 20,
        message: ""
    }

    handleFile = (e) => {
        let file = e.target.files[0]
        this.setState({
            file: file
        })
        //trigger send request
        console.log(e.target.files)
        console.log(e.target.files[0])
        // set state to display progress bar
    }

    //send file data to back end
    handleUpload = (e) => {
        e.preventDefault()
        //add function to check if file is selected, else: disable upload button
        // check if file type is qsf, else: disable button and prompt alert
        let file = this.state.file
        let formData = new FormData()
        formData.append("file", file)
        axios({
            method: "post",
            url: 'http://127.0.0.1:5000/api/upload',
            data: formData,
            headers: {
                'Authorization': "1231729"
            }
        })
            .then(response => {
                console.log('response:', response);
                this.setState({
                    message: response.data.message
                })
            })
            .catch(error => {
                // console.log('ERROR:', error.response.data.message)
            })
    }


    render() {
        const { file, percentage, message } = this.state
        return (
            <div className="Main-content">
                <div className="Upload">
                    <form>
                        <label className="Title">Upload Files</label>
                        <div className="Content">
                            {/* <ProgressBar percentage={this.state.percentage} /> */}
                            <Progress className="progress-bar" percent={percentage} color="teal" active>Uploading</Progress>
                            <input className="FileInput" type="file" name="file" onChange={this.handleFile} style={{ fontSize: "60%" }} />
                            {message ? <label style={{ fontSize: "0.5em", color: "red", display: "flex", alignItems: "left" }}>{message}</label> : null}
                            <br />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Button primary onClick={this.handleUpload} disabled={file ? false : true}>Submit</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}