'use client'
import styles from "../CSS/inventor.module.css";
import Link from "next/link";
import { useEffect , useState } from "react";

function Nav(){
    return(
        <>
        <nav style = {{
            backgroundColor:"silver" ,
            color: "black" ,
            display:"flex" ,
            width:"100%" ,
            justifyContent:"space-evenly",
            //boxShadow: "3px 3px 10px 0px"
            borderBottom:".5px solid black",
           }}>
            <div style={{width:"210px" , position:"relative" , top:"10px"}}>
                <h1>Inventory Items</h1>
            </div>
            <ul style={{listStyle: "none" , width:"150px" ,display:"flex" , marginTop:"30px" , justifyContent:"space-evenly" , marginRight:"30px"}}>
                <li className={styles.linkk}><Link href="/">Home</Link></li>
            </ul>
        </nav>
        </>
    )
}


function Inventory(){
    const [raw , setRaw] = useState(null)
    const [mechanical, setMechanical] = useState(null)
    const [electrical, setElectrical] = useState(null)

    let user:any = localStorage.getItem('username') || null

    const showItems = async ()=> {
        const response = await fetch("http://127.0.0.1:8000/Inventory/" , 
            {
                method:"POST",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': 'csrftoken',
                  },
            });

            let data = await response.json();
            if(response.ok){
                setRaw(data.Raw);
                setMechanical(data.Mechanical);
                setElectrical(data.Electrical);
                console.log(mechanical , raw , electrical);
            }
            else{
                
                console.log('failed to fetch');
            }

    }
    useEffect(()=>{
        showItems();
    } , [] );

    return(
        <>
        <Nav/>
        <main className={styles.main} >
            
            <section className={styles.section}>
                <h2>Electrical Materials</h2>
            
                {electrical && electrical?.length > 0?(
                        electrical.map((item) => (
                                <div className={styles.div}>
                                    <h3>Item Name : {item.ItemName}</h3>
                                    <h3>Quantity: {item.qunatity}</h3>
                                    <h3>Voltage: {item.voltage}</h3>
                                    <h3>Current: {item.current}</h3>
                                    <h3>Power Rating: {item.powerRating}</h3>
                                    <button onClick= {()=>{
                                        let user: string | null = localStorage.getItem('username')
                                        let itemsArray:any[] = JSON.parse(localStorage.getItem("itemsArray") || "[]")
                                        if(user){
                                            const itemData = {
                                                "username":user,
                                                "a": "Electrical",
                                                "b": item.ItemName,
                                                "c": item.voltage,
                                                "d": item.current,
                                                "e": item.powerRating
                                            };
                                            itemsArray.push(itemData);
                                            localStorage.setItem("itemsArray",JSON.stringify(itemsArray))
                                            alert("item added successfully to home page")

                                        }
                                        else{
                                            alert("Please Log in to add items");
                                        }
                                    }} className={styles.addButton}>Add Item</button>
                                </div>
                            ))
                        ):(
                        <p>No Electrical Items at the moment</p> )
                }
            </section>

            <section className={styles.section}>
                <h2>Mechanical Materials</h2>
            
                {mechanical?.length > 0?(
                        mechanical.map((item) => (
                                <div className={styles.div}>
                                    <h3>Item Name : {item.ItemName}</h3>
                                    <h3>Quantity: {item.qunatity}</h3>
                                    <h3>Material: {item.material}</h3>
                                    <h3>Dimensions: {item.dimensions}</h3>
                                    <h3>Weight: {item.weight}</h3>
                                    <button onClick= {()=>{
                                        let user: string | null = localStorage.getItem('username')
                                        let itemsArray:any[] = JSON.parse(localStorage.getItem("itemsArray") || "[]")
                                        if(user){
                                            const itemData = {
                                                "username":user,
                                                "a": "Mechanical",
                                                "b": item.ItemName,
                                                "c": item.material,
                                                "d": item.dimensions,
                                                "e": item.weight
                                            };
                                            itemsArray.push(itemData);
                                            localStorage.setItem("itemsArray",JSON.stringify(itemsArray))
                                            alert("item added successfully to home page")

                                        }
                                        else{
                                            alert("Please Log in to add items");
                                        }
                                    }} className={styles.addButton}>Add Item</button>
                                </div>
                            ))
                        ):(
                        <p>No Mechanical Items at the moment</p> )
                }
            </section>

            <section className={styles.section}>
                <h2>Raw Materials</h2>
            
                {raw?.length > 0?(
                        raw.map((item) => (
                                <div className={styles.div}>
                                    <h3>Item Name : {item.ItemName}</h3>
                                    <h3>Quantity: {item.qunatity}</h3>
                                    <h3>type: {item.type}</h3>
                                    <h3>purity: {item.purity}</h3>
                                    <button onClick= {()=>{
                                          let user: string | null = localStorage.getItem('username')
                                          let itemsArray:any[] = JSON.parse(localStorage.getItem("itemsArray") || "[]")

                                          if(user){
                                              const itemData = {
                                                  "username":user,
                                                  "a": "Raw",
                                                  "b": item.ItemName,
                                                  "c":item.qunatity,
                                                  "d": item.type,
                                                  "e": item.purity
                                              };
                                              itemsArray.push(itemData);
                                              localStorage.setItem("itemsArray",JSON.stringify(itemsArray))
                                              alert("item added successfully to home page")
                                          }
                                          else{
                                              alert("Please Log in to add items");
                                          }
                                    }} className={styles.addButton}>Add Item</button>
                                </div>
                            ))
                        ):(
                        <p>No Raw Items at the moment</p> )
                }
            </section>
        </main>
        </>

    )
}

export default Inventory 
