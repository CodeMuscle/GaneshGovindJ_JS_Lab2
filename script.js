//prototype- Object is automatically get 1 property that is called protype
//Quiz Prototype
function Quiz(questions){
    this.score=0;
    this.questionIndex=0;
    this.questions=questions;

}
//function to return questions from current index number
Quiz.prototype.getQuestionByIndex=function(){
    return this.questions[this.questionIndex];
}

//function to check end of the quiz
Quiz.prototype.isEnded=function(){
return this.questions.length===this.questionIndex;
}
//function to check correct answer and move to next question index
Quiz.prototype.checkOptionWithAnswer=function(answer){
if(this.getQuestionByIndex().isCorrectAnswer(answer)){
    this.score++;
}
this.questionIndex++;
}
//Question Prototype
function Question(text, choices, answer){
this.text=text;
this.choices=choices;
this.answer=answer;
}
Question.prototype.isCorrectAnswer=function(choice){
    return this.answer===choice;

}

//to load questions on HTML page 1 by 1
function loadQuestions(){
    if(quiz.isEnded()){
        showScores();
    }
    else{

       
        //show next question
       let element= document.getElementById("question");//fetch <p id="question">
       element.innerHTML=quiz.getQuestionByIndex().text;
       //display choices
       let choices=quiz.getQuestionByIndex().choices;
       for(let i=0;i<choices.length;i++){
        //Fetch span to dsplay choice
         let element_choice=document.getElementById("choice"+i);
         element_choice.innerHTML=choices[i];
         handleOptionButton("btn"+i,choices[i]);
       }
       showProgress();
    }
}
function handleOptionButton(id,choice){
    let button=document.getElementById(id);
    button.onclick=function(){
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

//show progess bar
function showProgress(){
    let currentQuestionNumber=quiz.questionIndex+1;
    let progressbar=document.getElementById("progress");
    progressbar.innerHTML="Question "+currentQuestionNumber + " of "+ quiz.questions.length;

}

//showscore function
function showScores(){
 let result="<h1>Result<h1><h2 id='score'> Your Score :: ";
 result+=quiz.score;
 result+="<br>Percentage is:: "+(quiz.score/questions.length*100) +" %"
 //fetch quiz div and put result over it
 let element=document.getElementById("quiz");
 element.innerHTML=result;
}

// Array of Object of Questions
let questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Next.js", "JQuery","Django", "NodeJS"], "Next.js"),
    new Question("Which is used to Connect To A Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
  ];
  
//create object of quiz
let quiz=new Quiz(questions);
loadQuestions();

