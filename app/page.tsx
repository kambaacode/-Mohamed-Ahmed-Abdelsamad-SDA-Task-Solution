'use client';

import Image from "next/image";
import styles from "./CSS/page.module.css";
import NavBar from "./components/navbar"
import Link from "next/link";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";



//Arrow function var x = () => {}
function Home() {
  let user:any = localStorage.getItem('username') || null
  let storedItemsArray:any = JSON.parse(localStorage.getItem("itemsArray" ) || "[]" )   
  return (
    <>
      <NavBar/>
      {
        user && (storedItemsArray)? (
          <>
            <h1 >Welcome {user}</h1>
            <br /><br />
            <h3>Your Items: </h3>
            <br /><br />
            {
              storedItemsArray.map( (item:any) =>
              (
              <div className={styles.items}>
                  <h1>{item.Material}</h1>
                  <h3>{item.a}</h3>
                  <h3>{item.b}</h3>
                  <h3>{item.c}</h3>
                  <h3>{item.d}</h3>
                  <button onClick={() =>{
                    let updatedItemsArray = storedItemsArray.filter((x: any) => x.b !== item.b);
                    localStorage.setItem("itemsArray", JSON.stringify(updatedItemsArray));                
                    window.location.reload();
                   }
                  } className={styles.button}>Delete</button>
              </div>
              
              ) )
            }
          </>
        ): 
        (<p style={{margin:"30px" , fontWeight:"800"}}>Sign up to get full accsess to Inventory items!</p>)
      }
    </>
    
  );
} 

export default Home
