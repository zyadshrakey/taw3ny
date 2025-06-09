import { Link, useNavigate } from "react-router-dom";
import React from 'react'
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Loader from "../Loader/Loader";
import Table from "../Table/Table";


function Volunteer() {

  const navigate= useNavigate()
  const handleGoBack=()=>{
    navigate(-1)
  }


  const columns = [
    'فى الجمعيه',
    'الاسم',
    'النوع',
    'رقم الهاتف',
    'البلد',
    'ساعات التطوع',
  ];
  
  const StyledRow = styled.tr`
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

  const renderRow = (item, index) => (
    <StyledRow className="py-2" onClick={() => handleRowClick(item.id)} key={item.id}>
      <td className='py-3'>{index}</td>
      <td className='py-3'>{item.fullName || <span className="text-danger">N/A</span>}</td>
      <td className='py-3'>{item.gender || <span className="text-danger">N/A</span>}</td>
      <td className='py-3'>{item.phoneNumber || <span className="text-danger">N/A</span>}</td>
      <td className='py-3'>{item.city || <span className="text-danger">N/A</span>}</td>
      <td className='py-3'> 
        <i className="text-primary fa-solid fa-clock"></i>{' '}
        {item.volunteerHours || <span className="text-danger">N/A</span>}
      </td>
    </StyledRow>
  );


  let [volunteer, setVolunteer]= useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [seacrchItem, setSearchItem]= useState('')

  async function displayVolunteer(){
    setError(null)
    let token= localStorage.getItem('userToken')
    let response= await axios.get('https://wezaa.runasp.net/Volunteer/charities'
      ,{headers:{
        Authorization: `Bearer ${token}`
      }}
    ).then((response)=>{
      console.log(response.data);
      setVolunteer(response.data)
      setIsLoading(false)

    }).catch((error)=>{
      console.log(error);
      setError(error.response?.data?.message || error.message ||"Failed to show Volunteer Data")
      setIsLoading(false)
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
  
  return (
    <>
      <div className="d-flex flex-column">

            <div className="d-flex p-4 flex-row justify-content-end">
                <div className="title">
                    <h1>ملف المتطوعين </h1>
                </div>
            </div>
            <div className='mx-4 d-flex flex-md-row flex-column-reverse justify-content-between align-items-center'>

              <div style={{width:'20%'}}>
                <button className="detailBtn border-0 p-2" style={{backgroundColor:'#EBEBEB', borderRadius:'8px'}}><Link to={'/volunteerinopportunity'} className="text-decoration-none " style={{color:'black'}}>متطوعين فى الفرص</Link></button>
              </div>

              <div className="py-4 d-flex flex-row align-items-center justify-content-end volunteerInput position-relative" style={{width:'100%'}}>
                <input className="py-1 px-5" style={{ borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)', width:'80%'}} 
                type="text" placeholder="ابحث بالأسم" dir="rtl" onChange={(e)=>setSearchItem(e.target.value)}/>
                <i style={{color:'rgba(33, 77, 151, 1)',right:'25px', top:'50%', transform:'translateY(-50%)'}} className="fa-solid fa-magnifying-glass position-absolute px-1"></i>
              </div>

            </div>

            <div className="p-4 volunteerTable">

            {seacrchItem && seacrchItem.length >0 ? (
                    <div className="p-4 volunteerSearchResult">
                        <h5 className='text-end'>: نتائج البحث</h5>
                        {filteredVolunteers.length > 0 ? (
                      <Table
                      columns={columns}
                      data={filteredVolunteers}
                      renderRow={(item, i) => renderRow(item, i)}
                      isLoading={false}
                      emptyMessage="لا توجد نتائج مطابقة"
                      maxHeight="500px"
                    />
                        ) : (
                        <>
                        <p className="text-danger text-center" style={{fontSize:'20px'}}>لا توجد نتائج مطابقة</p>
                        </>
                        )}
                    </div>
                    ):(<>
                    <table className="table table-striped rounded-2" dir='rtl'>
                      <Table
                      columns={columns}
                      data={volunteer}
                      renderRow={(item, i) => renderRow(item, i)}
                      isLoading={isLoading}
                      emptyMessage="لا يوجد متطوعين"
                      maxHeight="500px"
                    />                    
                    </table>
                    </>)}
                    
                    </div>
                    </div>
    </>
  );
}

export default Volunteer;
