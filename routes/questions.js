'use strict';

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const questionsArray = [
    {
    "question":"What does ES6 refer to?",
    "answer":"Most recent version of the ECMAScript Language Specificaiton"
    },
    {
    "question":"What is JSX?",
    "answer":"A syntax extension to JavaScript that uses camel case and had the full power of JavaScript."    
    },
    {
    "question":"In React, what are Elements?", 
    "answer":"The building blocks of React applications. React elements describe what you want to see on the screen, and are immutable."   
    },
    {
    "question":"In React, what are Components?",
    "answer": "Small, reusable pieces of code that return a React element to be rendered on the page."   
    },
    {
    "question":"In React, what are props?",
    "answer":"Inputs to a React component. Props are data passed down from a parent component to a child component."    
    },
    {
    "question":"What is the functionality of props.children?",
    "answer":"Available on every component, props.children contains the content between the opening and closing tags of a component."    
    },
    {
    "question":"In React, what is State?",
    "answer":"Component data that changes over time"    
    },
    {
    "question":"What are Lifecycle Methods?",
    "answer": "Custom functionality that gets executed during different phases of a component.",
    },
    {
    "question":"What are Controlled Components?",
    "answer": "Values that rely on React to perform",
    }, 
    {
    "question":"What are Uncontrolled Components?",
    "answer": "Values that do not rely on React to perform ",
    },
    {
    "question":"What are Keys?",
    "answer": "A special string attribute needed to create arrays of elements.",
    },
    {
    "question":"What are Refs?",
    "answer": "A special attribute that can be attached to any component and used to have direct access to the DOM element or the component itself. Refs can be objects, callback functions, or strings.",
    }, 
    {
    "question":"What is React?",
    "answer": "React is a JavaScript library",
    }, 
    {
    "question":'Is React a framework?',
    "answer":'No, React is a library'
    },
    {
    "question":'What is React used for?',
    "answer":'React is used to build user interfaces (UI) on the front end'
    },
    {
    "question":'When you import React at the top of a new file, what are you importing exactly?',
    "answer": 'You are importing the React top level API'
    },
    {
    "question":'What is the corelation between React and Babel?',
    "answer":'Babel is a JavaScript compiler that lets us use ES6+ in old browsers'
    },
]
// let data = [
//     {ES6: 'Most recent version of the ECMAScript Language Specificaiton'},
//     {JSX: 'A syntax extension to JavaScript that uses camel case and had the full power of JavaScript.'},
//     {Elements: 'The building blocks of React applications. React elements describe what you want to see on the screen, and are immutable.'},
//     {Components: 'Small, reusable pieces of code that return a React element to be rendered on the page.'},
//     {props: 'Inputs to a React component. Props are data passed down from a parent component to a child component.'},
//     {props.children: 'Available on every component, props.children contains the content between the opening and closing tags of a component.'},
//     {State: 'Component data that changes over time'},
//     {Lifecycle Methods: 'Custom functionality that gets executed during different phases of a component.'},
//     {Controlled Components: 'Values that rely on React to perform'},
//     {Uncontrolled Components: 'Values that do not rely on React to perform '},
//     {Keys: 'A special string attribute needed to create arrays of elements.'},
//     {Refs: 'A special attribute that can be attached to any component and used to have direct access to the DOM element or the component itself. Refs can be objects, callback functions, or strings.'}
//   ]
// const newArray = questionsArray.map(object => {
//     return (<div>`${object.question}`</div>);
// })
router.get('/', (req, res, next) => {
    const userId = req.user.id;
    
    questionsArray.find()
    //   .sort('name')
      .then(results => {
        
        res.json(results); 
        
      })
      .catch(err => {
        next(err);
      });
});

module.exports = router;