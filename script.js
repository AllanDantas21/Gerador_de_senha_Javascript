const lengthSlider = document.querySelector(".pass-indicator .details input");
const options = document.querySelectorAll(".options input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn")

const characters = {
    lowercase:  "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%¨&*()_+{^}^Ç:?:><"
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    duplicatePassword = false,
    passLength = lengthSlider.value;

    options.forEach(option => {
    
        if(option.checked){
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                staticPassword += characters[option.id];
            }else if(option.id === "spaces"){
                staticPassword += `  ${staticPassword}   `;
            }else {
                excludeDuplicate = true;
                staticPassword += characters[option.id];
            }
        }
    });

    for(let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * 
        staticPassword.length)];
        if(excludeDuplicate){
            !randomPassword.includes(randomChar) || randomChar == " " ?
            randomPassword += randomChar : i--;
        }else{
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;   
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => { 
    document.querySelector(".pass-indicator span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();  
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(()=>{
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";  
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
