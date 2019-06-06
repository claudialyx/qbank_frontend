import React from "react";
import { Icon, Label } from "semantic-ui-react";

class SelectorMenu extends React.Component {
  removeQuestion = id => {
    this.props.deleteQuestion(id);
  };

  render() {
    const { questionBank } = this.props;
    return (
      <div className="Selector-menu">
        <Label.Group size="large">
          {questionBank[0]
            ? questionBank.map(question => (
                <Label key={question.question_id}>
                  {(question.question_text)} (
                  {question.question_type})
                  <Icon
                    name="delete"
                    onClick={() => this.removeQuestion(question.question_id)}
                  />
                </Label>
              ))
            : null}
        </Label.Group>
      </div>
    );
  }
}

export default SelectorMenu;
