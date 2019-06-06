import React from "react";
// import ProgressBar from '../helpers/ProgressBar';
import { Search, Card, Button } from "semantic-ui-react";

export default class SearchContent extends React.Component {
  state = {
    input: "",
    keyword: "",
  }

  handleSearchChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  enterKeySubmit = e => {
    if (e.which === 13 && !e.shiftKey) {
      this.props.fetchSearchResults(this.state.input);
      this.setState({ keyword: this.state.input, input: "" });
    }
  };

  render() {
    const {input, keyword} = this.state
    const {searched_data, get_data, addQuestion } = this.props;
    console.log("searched_data", searched_data);
    console.log("get_data", get_data);
    return (
      <div className="Main-content" style={{ flexDirection: "column" }}>
        <div className="Search">
          <span className="Title">Search here</span>
          <Search
            type="text"
            value={input}
            onSearchChange={this.handleSearchChange}
            onKeyPress={this.enterKeySubmit}
          />
        </div>

        {keyword ? (
          <div
            className="Keyword"
            style={{ display: "flex", flexDirection:"column" }}
          >
            <div className="ui large blue label">Keyword typed: {keyword}</div>
            <div>
            {keyword && !searched_data[0]? <span style={{fontSize:"0.6em", color:"red"}}>No results were found based on keyword typed</span>: null}
            </div>
          </div>
        ) : null}

        <div className="Search-results">
          {searched_data[0] ? (
            <div>
              <span className="Title">
                Questions we've found based on keyword typed...
              </span>
              <div
                className="Search-results-container"
                style={{ display: "flex", flexDirection: "row", margin: "1em" }}
              >
                <Card.Group style={{ justifyContent: "space-evenly" }}>
                  {searched_data.map(data => (
                    <Card key={data.question_id}>
                      <Card.Content>
                        <Button
                          floated="right"
                          size="mini"
                          circular
                          icon="add"
                          value={data}
                          onClick={()=>addQuestion(data)}
                        />
                        <Card.Header
                          style={{ fontSize: "0.9em" }}
                          dangerouslySetInnerHTML={{
                            __html: data.question_text
                          }}
                        />
                        <Card.Meta>
                          Question type: {data.question_type}
                        </Card.Meta>
                        {data.answer[0] ? (
                          <div className="ui-bottom-attached-button">
                            <span className="show-answers">
                              See answers available
                            </span>
                            <div className="answers-content">
                              {data.answer.map((answer, index) => (
                                <div className="answers" key={index}>
                                  {answer.choices_index} : {answer.choices_text}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </div>
            </div>
          ) : (
            <div>
              <span className="Title">Latest questions found...</span>
              <div
                className="Search-results-container"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "0.5em"
                }}
              >
                <Card.Group style={{ justifyContent: "space-evenly" }}>
                  {get_data.map(data => (
                    <Card key={data.question_id}>
                      <Card.Content>
                        <Button
                          floated="right"
                          size="mini"
                          circular
                          icon="add"
                          value={data}
                          onClick={()=>addQuestion(data)}
                        />
                        <Card.Header
                          style={{ fontSize: "0.9em" }}
                          dangerouslySetInnerHTML={{
                            __html: data.question_text
                          }}
                        />
                        <Card.Meta style={{ fontSize: "0.8em" }}>
                          Question type: {data.question_type}
                        </Card.Meta>
                        {data.answer[0] ? (
                          <div className="ui-bottom-attached-button">
                            <span className="show-answers">
                              See answers available
                            </span>
                            <div className="answers-content">
                              {data.answer.map((answer, index) => (
                                <div className="answers" key={index}>
                                  {answer.choices_index} : {answer.choices_text}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
