/*-------------------------------- Constants --------------------------------*/
const squares =document.querySelectorAll('.sqr');
const Msg = document.querySelector('#message')  ;
const Reset = document.querySelector('#Reset');

/*---------------------------- Variables (state) ----------------------------*/
let board = Array(9).fill(null);  // Represent the state of the squares on the board
let turn = "X";  // Track whose turn it is
let winner = false;  // Represent if anyone has won yet
let tie = false;  // Represent if the game has ended in a tie
let count=0;


/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/
function Play (Event){
    console.log(turn)
    
if((Event.target.innerText =='')){
    if(turn=="X" ){
            Event.target.innerText = turn ;
            console.log(Event.target.innerText )

            turn="O"
        }
        else if(turn=="O"){
            Event.target.innerText=turn ;
            turn="X";
        }

        board[Event.target.id]=Event.target.innerText ;
       console.log(board); 
 

       checkwin(Event);
    }
    
}

function checkwin(Event){
    count ++;
    if(count==9){
        Msg.innerText = " tie تعادل "
        Reset.classList.add('show');
        

    }
    //for horizontal
    for (let i = 0; i < 7; i+=3) {
        if(board[i]=="X" && board[i+1]=="X" && board[i+2]=="X") {
            Msg.innerText = " X WIN" ;
            winner=true;

        }else
        if(board[i]=="O" && board[i+1]=="O" && board[i+2]=="O") {
            Msg.innerText = " O WIN" ;
            winner=true;

        }
       // console.log(i)
    }
    // for vertical 
    for (let i = 0; i < 3; i++) {
        if(board[i]=="X" && board[i+3]=="X" && board[i+6]=="X") {
            Msg.innerText = " X WIN" ;
            winner=true;


        }else
        if(board[i]=="O" && board[i+3]=="O" && board[i+6]=="O") {
            Msg.innerText = " O WIN" ;
            winner=true;

        }      
          
    }
     //Favorite font //diagonal
    if(board[0]=="X" && board[4]=="X" && board[8]=="X") {
        Msg.innerText = " X WIN" ;
        winner=true;

    }else
    if(board[0]=="O" && board[4]=="O" && board[8]=="O") {
        Msg.innerText = " O WIN" ;
        winner=true;
    }   
 //another direction 
    if(board[2]=="X" && board[4]=="X" && board[6]=="X") {
        Msg.innerText = " X WIN" ;
        winner=true;
    }else
    if(board[2]=="O" && board[4]=="O" && board[6]=="O") {
        Msg.innerText = " O WIN" ;
        winner=true;
    }   

    //will not play again 
    if(winner){
        squares.forEach(square => {
            square.removeEventListener('click' , Play ) ;
        });
  Reset.classList.add('show');
    }
}

function stop(){

    squares.forEach((square)=>{square.innerText=''});
     count=0;
     board.fill('');
     squares.forEach((square) => {
         square.addEventListener('click' , Play ) ;
        });
        Reset.classList.remove('show');
        Msg.innerText="Message"
    winner = false;
    tie = false ;

}


/*----------------------------- Event Listeners -----------------------------*/

squares.forEach(square => {
    square.addEventListener('click' , Play ) ;
});

Reset.addEventListener('click',stop) ;

