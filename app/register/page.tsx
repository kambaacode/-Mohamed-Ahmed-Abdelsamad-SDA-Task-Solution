'use client';

import Image from "next/image";
import styles from "../CSS/register.module.css";
import NavBar from "../components/navbar"
import Link from "next/link";


import { useEffect, useState } from "react";


function Login(){
  
  const ValidateData = async (e:any) =>{
    e.preventDefault();

    let username = document.getElementById("username") as HTMLInputElement || null ;
    let password = document.getElementById("password") as HTMLInputElement || null;
    let email = document.getElementById("email") as HTMLInputElement || null;
    let passConfirm = document.getElementById("confirm-password") as HTMLInputElement || null;
    
    //paragraphs errors
    let paragraph_error_username = document.getElementById("paragraph-error1") as  HTMLElement || null; 
    let paragraph_error_password = document.getElementById("paragraph-error2") as  HTMLElement || null; 
    let paragraph_error_email = document.getElementById("paragraph-error4") as  HTMLElement || null; 
    let paragraph_err3 = document.getElementById("paragraph-error3") as HTMLElement || null;
    
    let Valid_Data:boolean = false;
    let passConfirmation:boolean = false;

    if(username.value.length === 0){
      paragraph_error_username.innerText = "Username Can't be null";
      username.style.borderColor = "red";
      console.log(username.value.length)
    }else{
      
      paragraph_error_username.innerText = "";
      username.style.borderColor = "black";
    
    }
    
    if(email.value.length === 0){
      paragraph_error_email.innerText = "email Can't be null";
      email.style.borderColor = "red";
      console.log(username.value.length)
    }else{
      
      paragraph_error_email.innerText = "";
      username.style.borderColor = "black";
    
    }

    if(password.value.length ===0 ){
      paragraph_error_password.innerText = "Password Can't be null";
      password.style.borderColor = "red";
      
    }else{
      paragraph_error_password.innerText = "";
      password.style.borderColor = "";
    }

    if(passConfirm.value.length !==0 && password.value.length !==0 && (password.value !== passConfirm.value ) )
    {
      paragraph_err3.textContent = "Please ente matched Passwords";
      passConfirm.style.borderColor = 'red';
    }
    else if (password.value === passConfirm.value){
      paragraph_err3.textContent = "";
      passConfirm.style.borderColor = 'black'
      passConfirmation = true
    }
    if(!username.value.length || !password.value.length || !email.value.length || !passConfirmation){
      e.preventDefault();
    }

    else{
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
          'X-CSRFToken': 'csrftoken',
        },
        body:JSON.stringify({uname:username.value , pass:password.value , email:email.value })
      })

      const result = await response.json();
      if(response.ok){

          if(result.Valid === true){
            
              console.log(result.Messege)
              alert("Account Created Successfully")
              window.location.reload();
          }
      }

    }
  }
  return(
        <>
      <Link href="/"> <img style={{marginLeft:"50px", borderRadius:"50%"}} width={"70px"} src = "https://static.vecteezy.com/system/resources/previews/017/714/323/original/set-of-home-button-icon-black-home-page-icon-home-button-linear-icon-illustration-free-vector.jpg"/> </Link>
    <form className ={styles.form_styling} action="">
        <h1 className={styles.h1_styling}>Register</h1>
        <label htmlFor="username" style={{top:"46px"}} className={styles.labels}>Username</label>
        <input id="username" className = {styles.inputField1} type="text" />
        <p id="paragraph-error1" className={styles.paragraph_error1}></p>
        
        <label htmlFor="email" style={{top:"60px" , left:"-398px"}} className={styles.labels}>Email</label>
        <input id="email" className = {styles.inputField1} type="text" />
        <p id="paragraph-error4" className={styles.paragraph_error4}></p>

        <label htmlFor="password" className={styles.labels}>Password</label>
        <input id="password" className = {styles.inputField2} type="password" />
        <p id="paragraph-error2" className={styles.paragraph_error2}></p>
        <br />

        <label htmlFor="confirm-password" className={styles.labels}>Confirm Password</label>
        <input id="confirm-password" className = {styles.inputField2} type="password" />
        <br />

        <p id="paragraph-error3" className={styles.paragraph_error3}></p>
        <div style={{position:"relative" , top:"15px" , left:"10px"}}>
          <p className={styles.para}>Already have Account?</p>
          <Link className={styles.linkk} href= "/log_in">login</Link>
        </div>
        <button  onClick={ValidateData} className={styles.subButton}>submit</button>
      </form>
      </>
  );
}

//Arrow function var x = () => {} 
function RegisterPage() {
  return (
    <>
      <Login/>
    </>
    
  );
}

export default RegisterPage
