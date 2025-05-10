import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function AttendanceTable() {

    const navigate= useNavigate()
    let [attentance, setAttentance]=useState([])
    let [error,setError]=useState(null)
    let [searchItem, setSearchItem]=useState('')
    const handleGoBack=()=>{
        navigate(-1)

    }
    let token= localStorage.getItem('userToken')

    async function getAttentance(){
        let response= await axios.get('https://wezaa.runasp.net/Attendance/charity?page=1&pageSize=10',
            {headers:{
                Authorization: `Bearer ${token}`
              }}
        ).then((response)=>{
            console.log(response.data.attendances);
            setAttentance(response.data.attendances)
        }).catch((error)=>{
            console.log(error);
            setError(error.response?.data?.message || error.message ||"Failed to show Volunteer Data")
            
        })
        
        
    }

    const filteredVolunteers = attentance.filter((item) =>
        item.volunteerName?.toLowerCase().includes(searchItem.toLowerCase())
      );

    useEffect(()=>{
        getAttentance()
    },[])

    return <>


        <div className='d-flex flex-column align-align-items-center'>

            <div className="d-flex p-4 flex-row justify-content-between">
                <div className="volunteerBtn" onClick={handleGoBack}>
                    <button style={{backgroundColor:'rgba(33, 77, 151, 1)', color:'white', border:'none', borderRadius:'8px' ,width:'79px', height:'40px'}}>
                        <i className="fa-solid fa-arrow-left"></i> رجوع
                    </button></div>
                <div className="title">
                    <h1>سجل الحضور</h1>
                </div>
            </div>

            <div className="p-4 d-flex flex-row align-items-center justify-content-end volunteerInput position-relative">
                <input className="py-1 px-4" style={{width:'500px', borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)', paddingRight: '30px'}} 
                type="text" placeholder="البحث" dir="rtl" onChange={(e)=>setSearchItem(e.target.value)}/>
                <i style={{color:'rgba(33, 77, 151, 1)',right:'25px', top:'50%', transform:'translateY(-50%)'}} className="fa-solid fa-magnifying-glass position-absolute px-1"></i>
            </div>

            {searchItem && (
                 <div className='p-2'>
                    <h5 dir='rtl' className='text-danger flex-start'>نتائج البحث : </h5>
                    {filteredVolunteers.length >0 ?(
                        <table dir='rtl' className='table table-bordered'>
                        <thead>
                            <tr className='table-primary table-borderless text-center'>
                                <th>الاسم</th>
                                <th>الوقت</th>
                                <th>التاريخ</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVolunteers.map((item, index) => (
                                <tr className="py-2 text-center" key={item.id || index}>
                                <td>{item.volunteerName || <span className="text-danger">N/A</span>}</td>
                                <td>{item.checkInTime || <span className="text-danger">N/A</span>}</td>
                                <td>{item.checkInTime || <span className="text-danger">N/A</span>}</td>
                                <td>{item.status=='Active'?'حاضر':'غائب' || <span className="text-danger">N/A</span>}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                        </table>
                    ):(
                        <p className='text-danger text-center'>لا توجد نتائج مطابقة</p>
                    )}
                 
             </div>
            )}

            <div className='p-2'>
                <table dir='rtl' className='table table-bordered'>
                <thead>
                    <tr className='table-primary table-borderless text-center'>
                        <th>الاسم</th>
                        <th>الوقت</th>
                        <th>التاريخ</th>
                        <th>الحالة</th>
                    </tr>
                </thead>
                <tbody>
                    {attentance && attentance.map((item, index) => (
                        <tr className="py-2 text-center" key={item.id || index}>
                        <td>{item.volunteerName || <span className="text-danger">N/A</span>}</td>
                        <td>{item.checkInTime || <span className="text-danger">N/A</span>}</td>
                        <td>{item.checkInTime || <span className="text-danger">N/A</span>}</td>
                        <td>{item.status=='Active'?'حاضر':'غائب' || <span className="text-danger">N/A</span>}</td>
                        </tr>
                    ))}
                    
                </tbody>
                </table>
            </div>

            

        </div>
    </>
}

export default AttendanceTable
