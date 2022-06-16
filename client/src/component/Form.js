import React,{useState} from 'react'
import './form.scss'
const Form = () => {
    const [user,setUser]=useState({
        name:"",
        email:"",
        photo:"",
        formData: new FormData(),
        error:"",
        open:false,
    })
    const{name,email,photo,formData,error,open}=user

    const handleChange=event=>{
        const{name}=event.target;
        const value=name==="photo"?event.target.files[0]:event.target.value
        formData.set(name,value)
        setUser({...user,[name]:value,error:""})
    }

    const submit=async()=>{
        try{
            const res=await fetch(`http://localhost:9000`,{
                method:"post",
                body:formData
            })
            const data = await res.json()
            console.log(data)
            if(data.error){
                setUser({...user,error:data.error})
            }
            else{
                setUser({name:"",email:"",photo:"",open:true})
                setTimeout(()=>{
                    window.location.reload()
                },3000)
            }
        }
        catch(err){
            console.log(err)
        }
    }
   

    //form
    const fillForm=()=>{
        return   <form onSubmit={e=>e.preventDefault()}>
        <div className='form-group'>
                <label className='text-muted'>photo</label>
                <input 
                type="file"
                onChange={handleChange}
                name="photo"
                />
            </div>
        <div className='form-group'>
                <label className='text-muted'>name</label>
                <input 
                type="text"
                value={name}
                name="name"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>email</label>
                <input 
                type="text"
                value={email}
                name="email"
                onChange={handleChange}
                />
            </div>
            <button className='btn btn-raised btn-primary mt-2' onClick={()=>submit()}>submit</button>
        </form>
    }
  return (
    <div className='container'>
        <h2 className='mt-5 mb-5'>Form</h2>
        <div className='alert alert-danger' 
        style={{display:error?"":"none"}}
        >
            {error}
        </div>
        <div className='alert alert-info' 
        style={{display:open?"":"none"}}
        >
            post successfully sumitted
        </div>
        {fillForm()}
      

    </div>
  )
}

export default Form