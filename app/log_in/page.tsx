'use client'
import styles from '../CSS/login.module.css'
import Link from 'next/link';

function Func(){
    const ValidateData = async (e:any) =>{
        e.preventDefault();
    
        let username = document.getElementById("username") as HTMLInputElement || null ;
        let password = document.getElementById("password") as HTMLInputElement || null;
        let paragraph_error_username = document.getElementById("paragraph-error1") as  HTMLElement || null; 
        let paragraph_error_password = document.getElementById("paragraph-error2") as  HTMLElement || null; 
        let paragraph_err3 = document.getElementById("paragraph-error3") as HTMLElement || null;
        let TrueData:boolean = false;
    
    
        if(username.value.length === 0){
          paragraph_error_username.innerText = "Username Can't be null";
          username.style.borderColor = "red";
          console.log(username.value.length)
        }else{
          
          paragraph_error_username.innerText = "";
          username.style.borderColor = "black";
        
        }
        if(password.value.length ===0 ){
          paragraph_error_password.innerText = "Password Can't be null";
          password.style.borderColor = "red";
          
        }else{
          paragraph_error_password.innerText = "";
          password.style.borderColor = "";
        }
    
        if(!username.value.length || !password.value.length){
          e.preventDefault();
        }
    
        else{
          const response = await fetch("http://127.0.0.1:8000/login/", {
            method:'POST',
            headers: {
              'Content-Type':'application/json',
              'X-CSRFToken': 'csrftoken',
            },
            body:JSON.stringify({uname:username.value , pass:password.value })
          })
    
          const result = await response.json();
          if(response.ok){
              if(result.access === true){
                  localStorage.setItem('username' , result.username)
                  window.location.href = '/'
              }else{
                paragraph_err3.innerText = result.Messege;
              }
          }
    
        }
    }
    return(
      <>
      <Link href="/"> <img style={{marginLeft:"50px", borderRadius:"50%"}} width={"70px"} src = "https://static.vecteezy.com/system/resources/previews/017/714/323/original/set-of-home-button-icon-black-home-page-icon-home-button-linear-icon-illustration-free-vector.jpg"/> </Link>
        <form className ={styles.form_styling} action="">
            <h1 className={styles.h1_styling}>Login</h1>
            <label htmlFor="username" style={{top:"46px"}} className={styles.labels}>Username</label>
            <input id="username" className = {styles.inputField1} type="text" />
            <p id="paragraph-error1" className={styles.paragraph_error1}></p>
    
            <label htmlFor="password" className={styles.labels}>Password</label>
            <input id="password" className = {styles.inputField2} type="text" />
            <p id="paragraph-error2" className={styles.paragraph_error2}></p>
            <br />
            <p id="paragraph-error3" className={styles.paragraph_error3}></p>
            <div style={{position:"relative" , top:"15px"}}>
              <p className={styles.para}>Doesn't have Account?</p>
              <Link className={styles.linkk} href= "/register">Register</Link>
            </div>
            <button  onClick={ValidateData} className={styles.subButton}>submit</button>
          </form>
      </>
      );
    }
    

function Login(){
    return(
        <>
        <Func/>
        </>
    )
}

export default Login