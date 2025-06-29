let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgamebtn = document.querySelector("#new-btn"); // Fixed: added missing #
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turn0 = true;
    enableboxes();
    msgcontainer.classList.add("hide");
};

// Fixed: Added missing closing parenthesis and corrected innerText
boxes.forEach((box) => {
    box.addEventListener("click", () => {       
        if (turn0) {
            box.innerText = "O"; // Fixed: innertext → innerText
            turn0 = false;
        } else {
            box.innerText = "X"; // Fixed: innertext → innerText
            turn0 = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

const disableboxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableboxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = ""; // Fixed: boxes.innertext → box.innerText
    }
};

const showinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`; // Fixed: innertext → innerText
    msgcontainer.classList.remove("hide"); // Fixed: classlist → classList
    disableboxes();
}; 

const checkwinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText; // Fixed: innertext → innerText   
        let pos2Val = boxes[pattern[1]].innerText; // Fixed: innertext → innerText   
        let pos3Val = boxes[pattern[2]].innerText; // Fixed: innertext → innerText   

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {        
                showinner(pos1Val);
                return; // Added: Exit function when winner is found
            }
        }
    }
    
    // Added: Check for draw condition
    let allFilled = true;
    for(let box of boxes) {
        if(box.innerText === "") {
            allFilled = false;
            break;
        }
    }
    
    if(allFilled) {
        msg.innerText = "It's a Draw!";
        msgcontainer.classList.remove("hide");
    }
};

newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);