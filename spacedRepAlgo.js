// memory values starting at 1 
//if correct double the memory value 
//if answer was wrong, reset the memory value to 1 
// move the question back M spaces according on the memory value


// if answer was wrong, and the question was at the first position, repeat the question until the user give a correct answer 
// if answer what correct, and the question was at the last position, don't adjust its position 



const spacedRepAlgo = () => { 
    const current = user.questions[user.head];
    correctAnswer = current.answer;

    console.log(correctAnswer); 
    user.head = current.next;
    if (current.answer === req.body.answer) {
        answeredCorrectly = true;
        current.score += 1;
        current[next+1].next -1; 
        current.next += current.m +2;
        current.m = 2;  
    }
    else if (current.answer !== req.body.answer) {
        current.m = 1; 
        if(current.score > 0) {
            current.score -= 1;
        }
        current[next].next -1;
        current.next += current.m +1; 
    }
    
    // user.head = user.head + 1;
    console.log('user:', user)
    return user.save();
}




