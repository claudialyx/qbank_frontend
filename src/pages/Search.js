import React from 'react';
// import ProgressBar from '../helpers/ProgressBar';
import { Search, Card, Button } from 'semantic-ui-react'
import axios from 'axios'

export default class Upload extends React.Component {
    state = {
        input: "",
        get_data: [],
        searched_data: []
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/api/read',
        })
            .then((response) => {
                console.log(response.data)
                this.setState({
                    get_data: response.data
                })
            })
    }

    fetchSearchResults = (search_term) => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/api/search/' + search_term,
        })
            .then((response) => {
                console.log(response.data)
                this.setState({
                    searched_data: response.data
                })
            })
    }

    handleSearchChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }
    enterKeySubmit = (e) => {
        if (e.which === 13 && !e.shiftKey) {
            this.fetchSearchResults(this.state.input)
        }
    }

    render() {
        const { input, searched_data, get_data } = this.state
        // console.log(searched_data[0] ? "hi" : "no")
        return (
            <div className="Main-content" style={{ flexDirection: "column" }}>
                <div className="Search">
                    <span className="Title">Search here</span>
                    <Search
                        // loading={isLoading}
                        // onResultSelect={this.handleResultSelect}
                        // onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                        // results={results}
                        type="text"
                        // value={input}
                        // {...this.props}
                        onSearchChange={this.handleSearchChange}
                        onKeyPress={this.enterKeySubmit}
                    />
                </div>
                <div className="Search-results">
                    {searched_data[0] ?
                        <div>
                            <span className="Title">Questions we've found...</span>
                            <div className="Search-results-container" style={{ display: "flex", flexDirection: "row", margin: "1em" }}>
                                <Card.Group style={{ justifyContent: "space-evenly" }}>
                                    {searched_data.map((data) =>
                                        <Card key={data.question_id}>
                                            <Card.Content>
                                                <Button floated="right" size="mini" circular icon="add" />
                                                <Card.Header style={{ fontSize: "1em" }}> {data.question_text}</Card.Header>
                                                <Card.Meta>Question type: {data.question_type}</Card.Meta>
                                                <Card.Description>Question answer here (if any)</Card.Description>
                                            </Card.Content>
                                        </Card>
                                    )}
                                </Card.Group>
                            </div>
                        </div>
                        :
                        <div>
                            <span className="Title">Questions we've found...</span>
                            <div className="Search-results-container" style={{ display: "flex", flexDirection: "row", margin: "1em" }}>
                                <Card.Group style={{ justifyContent: "space-evenly" }}>
                                    {get_data.map((data) =>
                                        <Card key={data.question_id}>
                                            <Card.Content>
                                                <Button floated="right" size="mini" circular icon="add" />
                                                <Card.Header style={{ fontSize: "1em" }}> {data.question_text}</Card.Header>
                                                <Card.Meta>Question type: {data.question_type}</Card.Meta>
                                                <Card.Description>Question answer here (if any)</Card.Description>
                                            </Card.Content>
                                        </Card>
                                    )}
                                </Card.Group>
                            </div>
                        </div>
                    }
                </div>
            </div >
        )
    }
}