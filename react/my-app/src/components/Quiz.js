import React, { Component } from 'react';
import Question from './question/Question'
import Answer from './answer/Answer';
import './QuizMain.css';

class Quiz extends Component {

   state = {
      question: {
         1: 'How do you write “a report” in the Latin Nominative, singular form?',
         2: 'Select the Latin verb form that best completes the statement, as indicated by the English translation. <br>Nauta ______(The sailor sails.)',
         3: 'Across which region did the Via Flaminia stretch? '
      },
      options: {
         1: {
            1: 'Silva',
            2: 'Silvae',
            3: 'Fama'
         },
         2: {
            1: 'Navigant',
            2: 'Navigat',
            3: 'Ambulant'
         },
         3: {
            1: 'Etruscan',
            2: 'Gallic',
            3: 'Germanic'
         }
      },
      correctAnswers: {
         1: '3',
         2: '2',
         3: '1'
      },
      correctAnswer: 0,
      clickedAnswer: 0,
      qNo: 1,
      score: 0
   }

   checkAnswer = answer => {
      const { correctAnswers, qNo, score } = this.state;
      if (answer === correctAnswers[qNo]) {
         //alert("right")
         this.setState({
            score: score + 1,
            correctAnswer: correctAnswers[qNo],
            clickedAnswer: answer

         });
      } else {
         this.setState({
            correctAnswer: 0,
            clickedAnswer: answer
         });
      }
   }
   nextStep = (qNo) => {
      this.setState({
         qNo: qNo + 1,
         correctAnswer: 0,
         clickedAnswer: 0
      });
   }

   render() {
      let { question, qNo, options, correctAnswer, clickedAnswer, score } = this.state;
      return (
         <div className="Content">
            {qNo <= Object.keys(question).length ?
               (<>
                  <Question
                     question={question[qNo]}
                  />

                  <Answer
                     options={options[qNo]}
                     qNo={qNo}
                     checkAnswer={this.checkAnswer}
                     correctAnswer={correctAnswer}
                     clickedAnswer={clickedAnswer}
                  />
                  <button
                     className="NextStep"
                     disabled={
                        clickedAnswer && Object.keys(question).length >= qNo
                           ? false : true
                     }
                     onClick={() => this.nextStep(qNo)}>Next</button>
               </>) : (
                  <div className="resultPage">
                     <h1>You have completed the quiz!</h1>
                     <p>Your score is: {score} of {Object.keys(question).length}</p>                    
                  </div>
               )
            }
         </div>
      );
   }
}

export default Quiz