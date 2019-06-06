import React from "react";
import SearchContent from "./SearchContent";
import SelectorMenu from "../components/SelectorMenu";
import axios from "axios";

class Search extends React.Component {
  state = {
    input: "",
    keyword: "",
    get_data: [],
    searched_data: [],
    questionBank: []
  };

  componentDidMount() {
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/api/read"
    }).then(response => {
      this.setState({
        get_data: response.data
      });
    });
  }

  fetchSearchResults = search_term => {
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/api/search/" + search_term
    }).then(response => {
      console.log(response.data);
      this.setState({
        searched_data: response.data
      });
    });
  };

  addQuestion = data => {
    // do this to not mutate the state directly
    const questionBankClone = [...this.state.questionBank];
    console.log("questionBankClone", questionBankClone);
    console.log('here', questionBankClone.filter(question=>question.question_id=== data.question_id))

    // if questionBank array already have the same question added, do nothing
    if (questionBankClone.includes(data)){
    }else{
        questionBankClone.push(data);        
        this.setState({
          questionBank: questionBankClone
        });
    }
  };

  deleteQuestion = id =>{
    let filtered = this.state.questionBank.filter(question=>!(question.question_id === id))
    // console.log('filtered', filtered)
    this.setState({
        questionBank:filtered
    })
  }

  render() {
    const { get_data, searched_data, questionBank} = this.state;
    return (
      <div>
        <SearchContent
          get_data={get_data}
          searched_data={searched_data}
          addQuestion={this.addQuestion}
          fetchSearchResults={this.fetchSearchResults}
        />
        <SelectorMenu questionBank={questionBank} deleteQuestion={this.deleteQuestion}/>
      </div>
    );
  }
}

export default Search;
