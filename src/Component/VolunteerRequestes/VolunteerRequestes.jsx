import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Requests from '../Requests/Requests';

function VolunteerRequestes({userData}) {

  const [requestsData, setRequestsData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [ error, setError] = useState(null)

  async function volunteerRequestApi(){
    try{
      const token= localStorage.getItem('userToken')
      if(!token){
        console.error('No token found in localStorage')
        setError('No Token Found')
        setLoading(false)
        return;
      }
    setLoading(true)
    
    let {data}= await axios.get(`https://wezaa.runasp.net/VolunteerApplications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    console.log(data.data)

    if (data && data.data) {
      setRequestsData(data.data);
    } else {
      setError('No data found.');
    }
   }
    catch(error){
      console.log(error)
      setError('Failed to load requests.');
    }
    finally{
      setLoading(false)
    }
  }

  const acceptedBack= async(id)=>{
    const token= localStorage.getItem('userToken')
    if (!token) {
      throw new Error('No token found in localStorage');
    }
    try{
      await axios.put(`https://wezaa.runasp.net/VolunteerApplications/accept/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }
    catch(error){
      throw new Error('Failed to accept the request');
    }


  }


  const rejectBack= async(id)=>{
    const token= localStorage.getItem('userToken')
    if (!token) {
      throw new Error('No token found in localStorage');
    }
    try{
      await axios.put(`https://wezaa.runasp.net/VolunteerApplications/reject/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }
    catch(error){
      throw new Error('Failed to accept the request');
    }


  }

  const handleAccept = async (id) => {
    try {
      await acceptedBack(id);  
      alert('تمت الموافقة على الطلب'); 
      volunteerRequestApi(); 
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء الموافقة'); 
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectBack(id); 
      alert('تم رفض الطلب'); 
      volunteerRequestApi();
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء الرفض'); 
    }
  };

  useEffect(()=>{
    volunteerRequestApi()

  },[])

  
  
 return(
  <div className='container'>
    <div className="title" dir='rtl'>
      <h1 className='py-2' style={{fontWeight:'400', fontSize:'40px', lineHeight:'56px'}}>طلبات التطوع</h1>
    </div>
    {loading?
    (<div className='d-flex justify-content-center align-items center'>
      <i style={{color:'#214D97', fontSize:'25px'}} className="fa-solid fa-spinner"></i>
    </div>)
    
  :''}
      <div className='row py-5'>
        {requestsData.map((item,index)=><Requests item={item} key={index} onAccept={handleAccept} onReject={handleReject}/>)}
      </div>
  </div>
 )
}

export default VolunteerRequestes
