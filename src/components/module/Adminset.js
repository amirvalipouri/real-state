"use client"

import { useRouter } from "next/navigation";

const Adminset =  ({data}) => {
    console.log(data)
    const router = useRouter()
    const changeHandler = async() => {
        const res = await fetch(`/api/admin/${data?._id}`, { method: "PATCH" });
        const result = await res.json()
        if(result.message){
            router.refresh()
        }
    }
  return (
    <div style={{border : "1px solid blue",padding : "15px",margin : "10px" , borderRadius : "20px"}}>
        <p style={{color : "black"}}>{data?.email}</p>
        <p style={{color : "black"}}>{data?.role}</p>
        <button onClick={()=>changeHandler()}>تغییر کاربری</button>
    </div>
  )
}

export default Adminset