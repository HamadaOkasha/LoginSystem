// signup
let signUpNameInput = document.getElementById("signUpNameInput");
let signupEmailInput=document.getElementById("signupEmailInput");
let signupPasswordInput = document.getElementById("signupPasswordInput");
let signUpMessage = document.getElementById("signUpMessage");
let signupButton = document.getElementById("signupButton");

let invalidNameAlert = document.getElementById("invalidName");
let invalidEmailAlert = document.getElementById("invalidEmail");
let invalidPasswordAlert = document.getElementById("invalidPassword");

//Test Name Regex
function regexName(){
  var nameRegex= /^[a-zA-z]{3,8}$/;
   if( nameRegex.test(signUpNameInput.value)){
    invalidNameAlert.classList.add('d-none');
    signUpNameInput.classList.remove('is-invalid');
    signUpNameInput.classList.add('is-valid');
    return true;
}
   else{
    invalidNameAlert.classList.remove('d-none');
    signUpNameInput.classList.add('is-invalid');
    signUpNameInput.classList.remove('is-valid');
    return false;
}
}
//Test Email Regex
function regexEmail(){
  var emailRegex= /^[\w]{3,20}\@[a-zA-Z]{3,10}\.[a-zA-Z]{3,10}$/;
   if( emailRegex.test(signupEmailInput.value)){
    invalidEmailAlert.classList.add('d-none');
    signupEmailInput.classList.remove('is-invalid');
    signupEmailInput.classList.add('is-valid');
    return true;
   }
   else{
    invalidEmailAlert.classList.remove('d-none');
    signupEmailInput.classList.add('is-invalid');
    signupEmailInput.classList.remove('is-valid');
    return false;
   }
}
//Test Password Regex
function regexPassword(){
  var passwordRegex= /^[\w]{6,8}$/;
   if( passwordRegex.test(signupPasswordInput.value)){
    invalidPasswordAlert.classList.add('d-none');
    signupPasswordInput.classList.remove('is-invalid');
    signupPasswordInput.classList.add('is-valid');
    return true; 
}
   else{
    invalidPasswordAlert.classList.remove('d-none');
    signupPasswordInput.classList.add('is-invalid');
    signupPasswordInput.classList.remove('is-valid');
    return false;
}
}

let allusers =[]
if (localStorage.getItem('users')!=null){
    allusers = JSON.parse(localStorage.getItem('users'))
}

function signUp(){
    debugger;
    var regexName1 =  regexName();
    var regexEmail1 = regexEmail();
    var regexPassword1 = regexPassword();

    if(regexName1&&regexEmail1&&regexPassword1){
    let user={
        name:signUpNameInput.value,
        email:signupEmailInput.value,
        password:signupPasswordInput.value
    }
    //inputs not empty
    if(signUpNameInput.value==''||signupEmailInput.value=='' || signupPasswordInput.value==''){
        signUpMessage.style.color='red'
        signUpMessage.innerHTML='All inputs is required'
    }
    //email exists
    else if (checkNewMail()){
        signUpMessage.style.color='red'
        signUpMessage.innerHTML ='E-mail is already exsist!'
    }
    // success
    else
    {
        allusers.push(user)
        localStorage.setItem('users',JSON.stringify(allusers))
        signUpMessage.style.color='green'
        signUpMessage.innerHTML = 'Success'

    }

}
else{
    signUpMessage.style.color='red'
    signUpMessage.innerHTML='Enter All inputs with valid data'
}
}
function checkNewMail(){
    for(let i=0 ; i<allusers.length ; i++){
        if(signupEmailInput.value == allusers[i].email){
             return true;
        }

    }
    return false;
}
if (signupButton!= null){
    signupButton.addEventListener('click',signUp)

}




// login
let loginEmailInput=document.getElementById('loginEmailInput')
let loginPasswordInput=document.getElementById('loginPasswordInput');
let loginMessage=document.getElementById("loginMessage");
let loginButton=document.getElementById("loginButton");

function login(){
    //input empty
    if (loginEmailInput.value==''|| loginPasswordInput==''){
        loginMessage.innerHTML ='All inputs is requierd'
    }
    else if(UserExsist()==false){
        loginMessage.innerHTML='incorrect email or password'
    }
    else{
        loginButton.href ='./html/home.html'
    }
}
function UserExsist(){
for( let i =0;i<allusers.length;i++){
    if (loginEmailInput.value == allusers[i].email &&
        loginPasswordInput.value==allusers[i].password)
        {
        localStorage.setItem("sessionUsername",JSON.stringify(allusers[i].name))
        return true;
    }

}
return false;

}
if(loginButton!=null){
loginButton.addEventListener('click' , login)}

//Login Done
let personLogin = document.getElementById("personLogin")
if (personLogin!=null){
    var username = JSON.parse(localStorage.getItem("sessionUsername"))
    personLogin.innerHTML =`Welcome ${username}`
}