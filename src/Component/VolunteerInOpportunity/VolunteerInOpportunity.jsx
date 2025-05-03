import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function VolunteerInOpportunity() {
    let navigate= useNavigate()
    const handleGoBack=()=>{
        navigate(-1)
      }

    const StyledRow = styled.tr`
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

  let [volunteer, setVolunteer]= useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let [seacrchItem, setSearchItem]= useState('')

  async function displayVolunteer(){
    setIsLoading(true)
    setError(null)
    let token= localStorage.getItem('userToken')
    let response= await axios.get('https://wezaa.runasp.net/Volunteer/opportunities'
      ,{headers:{
        Authorization: `Bearer ${token}`
      }}
    ).then((response)=>{
      console.log(response.data);
      
      setVolunteer(response.data)
    }).catch((error)=>{
      console.log(error);
      setError(error.response?.data?.message || error.message ||"Failed to show Volunteer Data")
      
    })
  }

  const handleRowClick= (vounteerId)=>{
    navigate(`/volunteerdetails/${vounteerId}`)
  }

  
  const filteredVolunteers = volunteer.filter((item) =>
    item.fullName?.toLowerCase().includes(seacrchItem.toLowerCase())
  );

  useEffect(()=>{
    displayVolunteer()
  },[])
    return <>


        <div className="d-flex flex-column">

            <div className="d-flex p-4 flex-row justify-content-between">
                <div className="volunteerBtn" onClick={handleGoBack}>
                    <button style={{backgroundColor:'rgba(33, 77, 151, 1)', color:'white', border:'none', borderRadius:'8px' ,width:'79px', height:'40px'}}>
                    <i className="fa-solid fa-arrow-left"></i> رجوع
                    </button></div>
                <div className="title">
                    <h1>ملف المتطوعين </h1>
                </div>
            </div>

            <div className="p-4 d-flex flex-row align-items-center justify-content-end volunteerInput position-relative">
          <input className="py-1 px-4" style={{width:'500px', borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)', paddingRight: '30px'}} 
          type="text" placeholder="البحث" dir="rtl" onChange={(e)=>setSearchItem(e.target.value)}/>
          <i style={{color:'rgba(33, 77, 151, 1)',right:'25px', top:'50%', transform:'translateY(-50%)'}} className="fa-solid fa-magnifying-glass position-absolute px-1"></i>
        </div>

        <div className="p-4 volunteerTable ">


                {seacrchItem && (
                    <div className="p-4 volunteerSearchResult">
                        <h5 dir='rtl' className='text-danger flex-start'>نتائج البحث:</h5>
                        {filteredVolunteers.length > 0 ? (
                        <table className="table" dir="rtl">
                            <thead>
                            <tr className="table-info">
                                <th>#</th>
                                <th>الاسم</th>
                                <th>النوع</th>
                                <th>رقم الهاتف</th>
                                <th>البلد</th>
                                <th>ساعات التطوع</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredVolunteers.map((item, index) => (
                                <StyledRow className="py-2" onClick={() => handleRowClick(item.id)} key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.fullName || <span classN
                                
                                ame="text-danger">N/A</span>}</td>
                                <td>{item.gender || <span className="text-danger">N/A</span>}</td>
                                <td>{item.phoneNumber ||
                                
                                <span className="text-danger">N/A</span>}</td>
                                <td>{item.city || <span className="text-danger">N/A</span>}</td>
                                <td><i className="text-primary fa-solid fa-clock"></i> {item.volunteerHours || <span className="text-danger">N/A</span>}</td>
                                </StyledRow>
                            ))}
                        </tbody>
                    </table>
                    ) : (
                    <p className="text-danger text-center">لا توجد نتائج مطابقة</p>
                    )}
                </div>
                )}


        <table className="table" dir="rtl">
            <thead>
              <tr className='table-secondary'>
                <th>#</th>
                <th>الاسم</th>
                <th>النوع</th>
                <th>رقم الهاتف</th>
                <th>البلد</th>
                <th>ساعات التطوع</th>
              </tr>
            </thead>
              <tbody>
                {volunteer.length>0 ? 
                  ( volunteer.map((item,index)=>{
                    return (
                      <StyledRow className='py-2' onClick={() => handleRowClick(item.id)} key={item.id}>
                          <td className="">{index}</td>
                          <td>{item.fullName || <span className="text-danger">N/A</span>}</td>
                          <td>{item.gender ||  <span className="text-danger">N/A</span>}</td>
                          <td>{item.phoneNumber ||  <span className="text-danger">N/A</span>}</td>
                          <td>{item.city ||  <span className="text-danger">N/A</span>}</td>
                          <td><i className="text-primary fa-solid fa-clock"></i> {item.volunteerHours ||  <span className="text-danger">N/A</span>}</td>                        
                      </StyledRow>
                        
                    )
                  })):
                    <tr>
                        <td colSpan={6} className="text-center text-danger"> 
                            <h3>لا يوجد متطوعين</h3>
                        </td>
                    </tr> 
                }
              </tbody>

           
          </table>

       
        </div>
        </div>

    </>
}

export default VolunteerInOpportunity
