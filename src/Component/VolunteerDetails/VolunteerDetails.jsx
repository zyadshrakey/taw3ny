import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import img from '../../assets/avatar2.jpg'

function VolunteerDetails() {

    let {id}= useParams()
    console.log('Volunteer Id:',id);
    let token= localStorage.getItem('userToken')
    let [volunteerInfo, setVolunteerIfo]=useState([])
    
    async function getVolunteerdetails() {
        let response= await axios.get(`https://wezaa.runasp.net/Volunteer/${id}`
            ,{headers:{
                Authorization: `Bearer ${token}`
              }}
        )
        .then((response)=>{
            console.log(response.data);
            setVolunteerIfo(response.data)
        }).catch((error)=>console.log(error))
    }

    useEffect(()=>{
        getVolunteerdetails()
    },[])


    
    return <>

    <div className='container'>
        {volunteerInfo && (
            <div className='row '>
                <div className='col-md-5 d-flex Img text-center mb-3 mb-md-0 align-items-center justify-content-center' style={{flexShrink:0}}>
                    <img src={volunteerInfo.pictureUrl || img} alt={volunteerInfo.fullName || 'Volunteer Img'} className='rounded-circle' />
                </div>
                
                <div className='col-md-7 d-flex align-items-center justify-content-center py-4'>
                    <form className='w-100'>
                        <div className='pb-2'>
                            
                            <input className="inputDiv col-9 p-2" dir='rtl' type="text" name='name' value={volunteerInfo.fullName ||''} readOnly 
                            style={{borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)'}}/>
                            <label  className="col-3" htmlFor="name">&nbsp;:اسم المتطوع</label>
                        </div>
                        
                        <div className='pb-2'>
                            <input className="inputDiv col-9 p-2" dir='rtl' type="email" name='email' value={volunteerInfo.email ||''} readOnly 
                            style={{borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)'}}/>
                            <label className="col-3" htmlFor="email">&nbsp;:البريد الإلكترونى </label>
                        </div>
                        <div className='pb-2'>
                            <input className="inputDiv col-9 p-2" dir='rtl' type="tel" name='phoneNumber' value={volunteerInfo.phoneNumber ||''} readOnly 
                            style={{borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)'}}/>
                            <label className="col-3" htmlFor="phoneNumber">&nbsp;:رقم الهاتف</label>
                        </div>
                        <div className='pb-2'>
                            <input className="inputDiv col-9 p-2" dir='rtl' type="text" name='city' value={volunteerInfo.city ||''} readOnly 
                            style={{borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)'}}/>
                            <label className="col-3" htmlFor="city">&nbsp;:المدينه</label>
                        </div>
                        <div className='pb-2'>
                            <input className="inputDiv col-9 p-2" dir='rtl' type="number" name='age' value={volunteerInfo.age ||''} readOnly 
                            style={{borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)'}}/>
                            <label className="col-3" htmlFor="age">&nbsp;:السن</label>

                        </div>
                        <div className='pb-2'>
                            <input className="inputDiv col-9 p-2" dir='rtl' type="datetime-local" name='dateOfBirth' value={volunteerInfo.dateOfBirth ||''} readOnly 
                            style={{borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)'}}/>
                            <label className="col-3" htmlFor="dateOfBirth"> &nbsp;:تاريخ الميلاد</label>
                        </div>
                        <div className='pb-2'>
                            <input className="inputDiv col-9 p-2" dir='rtl' type="text" name='gender' value={volunteerInfo.gender ||''} readOnly 
                            style={{borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)'}}/>
                            <label className="col-3" htmlFor="gender">&nbsp;:النوع</label>
                        </div>
                        <div className='pb-2'>
                            <input className="inputDiv col-9 p-2" dir='rtl' type="number" name='hoursForDailyTasks' value={volunteerInfo.hoursForDailyTasks ||''} readOnly 
                            style={{borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)'}}/>
                            <label className="col-3" htmlFor="hoursForDailyTasks">&nbsp;:ساعات المهام اليومية</label>
                        </div>
                        <div className='pb-2'>  
                            <input className="inputDiv col-9 p-2" dir='rtl' type="number" name='totalVolunteerHours' value={volunteerInfo.totalVolunteerHours ||''} readOnly 
                            style={{borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)'}}/>
                            <label className="col-3" htmlFor="totalVolunteerHours">&nbsp;:إجمالي ساعات التطوع</label>
                        </div>
                        
                        <div>
                            <button className='removeBtn text-white bg-danger border-0 py-2 px-3 ' style={{borderRadius:'2px'}}><i class="fa-solid fa-trash-can"></i>إزاله</button>
                        </div>
                    
                    </form>

                </div>
            </div>
            
            
        )}
        

    </div>
    </>
}

export default VolunteerDetails
