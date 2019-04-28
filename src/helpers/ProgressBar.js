import React from 'react';


export default class ProgressBar extends React.Component {

    // on file add = sent post request to back end

    render() {

        return (
            <div className="progress-bar">
                <div className="filler" style={{ width: `${this.props.percentage}%` }}></div>
            </div>
        )
    }
}