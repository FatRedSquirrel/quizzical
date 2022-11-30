import React from "react";
import Answer from "./Answer";
import {decode} from 'html-entities';

export default function Question(props) {


    const answerElements = props.answers.map(answer =>
        <Answer
            key={answer.id}
            id={answer.id}
            body={decode(answer.body)}
            correct={answer.correct}
            isChosen={answer.isChosen}
            chooseAnswer={props.chooseAnswer}
            isGameOver={props.isGameOver}
        />
    )

    return (
        <div className="question">
            <h3 className="question__title">{decode(props.question)}</h3>
            <div className="question__answers">{answerElements}</div>
        </div>
    )
}
