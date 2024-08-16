'use client';

import styles from "../CSS/navbar.module.css";
import Link from "next/link";

function NavBar(){
  let user:any = localStorage.getItem('username') || null

  const Logout = ()=>{
    localStorage.removeItem('username');
    window.location.reload();
  }
    
    return(
        <nav style = {{
            backgroundColor:"silver" ,
            color: "black" ,
            display:"flex" ,
            width:"100%" ,
            justifyContent:"space-evenly",
            //boxShadow: "3px 3px 10px 0px"
            borderBottom:".5px solid black"
           }}>
          
          <div style={{width:"160px"}}> <h1 style={{marginLeft: "20px" , padding:"20px"}}>Navbar</h1> </div>
          <div>
            <ul style={{listStyle: "none" , width:"150px" ,display:"flex" , marginTop:"30px" , justifyContent:"space-evenly" , marginRight:"30px"}}>
              <li className={styles.list_items} ><Link href="/log_in">login</Link></li>
              <li className={styles.list_items} ><Link href="/register">register</Link></li>
              <li className={styles.list_items} ><Link href="/inventory">items</Link></li>
            </ul>
          </div>
            {user? ( <button onClick={Logout} className={styles.button1}>Log out</button>): (null)}
        </nav>
    );
}

export default NavBar