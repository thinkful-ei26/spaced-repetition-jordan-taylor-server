const User = require('./models/userschema');
const allQuestions = require('./allQuestions');

class _Node {
    constructor(value, next) {
      (this.value = value), (this.next = next);
    }
}
  
class LinkedList {
    constructor() {
      this.head = null;
    }
    insertFirst(item) {
      this.head = new _Node(item, this.head);
    }
    insertBefore(item, currentNode) {
      let found = this.find(currentNode);
      let temp = this.head;
      if (found == temp) {
        this.insertFirst(item);
      } else {
        while (temp.next !== found) {
          //keep moving until you find the node we want to insert before
          temp = temp.next;
        } //once currentnode is found, next now refers to new node
        temp.next = new _Node(item, found);
      }
    }
  
    insertAfter(item, currentNode) {
      let found = this.find(currentNode);
      let temp = this.head;
      if (found.next == null) {
        this.insertLast(item);
      } else {
        while (temp.next !== found.next) {
          //keep moving until you find the node we want
          temp = temp.next;
        } //once currentnode is found, next now refers to new node
        temp.next = new _Node(item, temp.next);
      }
    }
  
    insertAt(item, position) {
      let temp = this.head;
      let count = 1;
      while (temp.next !== null) {
        count++;
        if (count === position) {
          return (temp.next = new _Node(item, temp.next));
        }
        temp = temp.next;
      }
      if (temp.next == null) {
        //if added to end
        this.insertLast(item);
      }
      if (position === 0) {
        //if added at start
        this.insertFirst(item);
      }
    }
  
    insertLast(item) {
      if (this.head === null) {
        this.insertFirst(item);
      } else {
        let temp = this.head;
        while (temp.next !== null) {
          temp = temp.next;
        }
        temp.next = new _Node(item, null);
      }
    }

    remove(item) {
      if (!this.head) {
        return null;
      }
      if (this.head === item) {
        this.head = this.head.next;
        return;
      }
      let currentNode = this.head;
  
      let prevNode = this.head;
  
      while (currentNode !== null && currentNode.value !== item) {
        prevNode = currentNode;
        currentNode = currentNode.next;
      }
      if (currentNode === null) {
        console.log("item not found");
        return;
      }
      prevNode.next = currentNode.next;
    }

    find(item) {
      let currentNode = this.head;
      if (!this.head) {
        return null;
      }
      while (currentNode.value !== item) {
        if (currentNode.next === null) {
          return null;
        } else {
          currentNode = currentNode.next;
        }
      }
      return currentNode;
    }   
}
let questions = null; 

function main() {
    questions = new LinkedList();
    allQuestions.forEach(item => {
      questions.insertFirst(item);
    });
    return questions;
}

// const questions = main();

function getHead() {
  console.log(questions.head);
  return questions.head;
}

// function findLast(list) {
//     let currNode = list.head;
//     if (!list.head){
//         return null;
//     }
//     while(currNode !== null) {
//         if(currNode.next === null) {
//             return currNode;
//         }
//         currNode = currNode.next;
//     }
// }

function rotateValues(questions) {
    console.log(questions);
    console.log(questions.head.value);
    // const currentHead = questions.head.value; 
    // console.log(currentHead);
    questions.head.next.value = questions.head.value;
    console.log(questions.head.value);
    
    questions.insertLast;
    // console.log(questions.find());
    console.log(questions);
    
    return questions; 
}


module.exports = { main, getHead, rotateValues };