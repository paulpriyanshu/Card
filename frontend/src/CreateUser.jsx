import React, { useState,useEffect } from 'react'
import Card from './Card'
//import { text } from 'express'
import gitlogo from './components/img/Gitnewlogo.png'
import axios from 'axios'
function CreateUser() {

    const [user,setuser]=useState("")
    const [des,setdes]=useState("")
    const [objectid,setobjectid]=useState(null)

    const adduser=(e)=>{
      setuser(e.target.value)
    }
    const adddes=(e)=>{
        setdes(e.target.value)
    }
    let props = {
      title:user,
      description:des
    }
    const handleimageclick=()=>{
      window.open('https://github.com/paulpriyanshu','_blank')
    }
    const handlesavenote=async()=>{
         await fetch("http://localhost:5001/notes",{
          method:"POST",
          body: JSON.stringify({
            title:user,
            description:des
          }),
          headers:{
            "Content-type":"application/json"
          }
        }) 
        .then(async function(res) {
          const data = await res.json();
          newid=data._id.toHexString()
          setobjectid(newid)
          
        
          alert("Data added");
        
        })

    }
    const updatenotes=async()=>{
      await fetch(`http://localhost:5001/notes/update/${objectid}`,{
        method:"PATCH",
        body: JSON.stringify({
          title:user,
          description:des
        }),
        headers:{
          "Content-type":"application/json"
        }
      }) 
      .then(async function(res) {
        const json = await res.json();
        console.log(json)
        alert("Data updated");
      
      })
    }
  
  return (
    <>
    <div className='flex h-screen'>
    <div className="w-1/2 p-4 bg-gray-200">
      <span><button style={{width:150,height:50,marginLeft:450,marginTop:20}} onClick={handlesavenote} className='border border-slate-500 rounded-full hover:bg-slate-300'>Save</button></span>
      <h3 style={{marginLeft:60,marginTop:50}}  className="font-mono text-xl">Title</h3>
      <span><button onClick={updatenotes}>update</button></span>
      <span><div><input size={10} type='text' style={{margin:50,width:250,height:100}}  className='border border-slate-500 rounded-xl py-2 px-5' value={user} placeholder='name' onChange={adduser}/></div></span>
        
        <h3 style={{marginLeft:60,paddingBottom:10}}  className="font-mono text-xl">Description</h3>
       <span><textarea  style={{marginLeft:50,width:500,height:400}} className='border border-slate-600 rounded-xl py-10 px-5'  value={des} placeholder="Type here..." onChange={adddes}/></span>
       <span>
        <img src={gitlogo} alt="Github" height={50} width={50} onClick={handleimageclick} className='cursor-pointer py-5 ml-5 mt-4'/></span>
    </div>
     <Card props={props}/>
    </div>
     </>
  )
}

export default CreateUser
