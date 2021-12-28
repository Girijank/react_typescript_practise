import React from 'react';
import './Answer.css';

const Answer = (props) => {
    let items= props.options
    let itemList=[];
    for (let x in items) {
        itemList.push(
        <li 
        className =
        {
            props.correctAnswer === x ?
            'correct':
            props.clickedAnswer === x ? 
            'incorrect': ''
        }
        onClick={() => props.checkAnswer(x)}
        key={x}>
            {items[x]}
            </li>)
      }
      
   // console.log("data.content "+items.child)
   
    
  

    return(
        <>
        <ul disabled={props.clickedAnswer ? true : false} className = "Answers">
          {itemList}
        </ul> 
         <div>
         {
             props.correctAnswer ?
             'Correct Answer!' : 
             props.clickedAnswer ? 'Incorrect Answer!' : ''
         }
     </div>    
     </>         
    )
  
}

export default Answer;