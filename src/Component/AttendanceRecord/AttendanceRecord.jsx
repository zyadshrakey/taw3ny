import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function AttendanceRecord() {

    const navigate= useNavigate()
    const handleGoBack=()=>{
        navigate(-1)
    }


    return <>

    <div className='d-flex flex-column'>

        <div className="d-flex p-4 flex-row justify-content-between">
          <div className="volunteerBtn" onClick={handleGoBack}>
            <button style={{backgroundColor:'rgba(33, 77, 151, 1)', color:'white', border:'none', borderRadius:'8px' ,width:'79px', height:'40px'}}>
                <i className="fa-solid fa-arrow-left"></i> رجوع
            </button></div>
          <div className="title">
            <h1>سجل الحضور</h1>
          </div>
        </div>

        <div className="volunteerBtn container d-flex align-item-center justify-content-center gap-5">

        <div className="btn1 border-0 p-2" style={{backgroundColor:'rgba(33, 77, 151, 1)', borderRadius:'8px', boxShadow:'0 4px 8px 0 rgb(33, 77, 151)  '}}>
            <NavLink className={'text-decoration-none text-white'} to={`/generateqr`}>QR Code </NavLink>
            </div>
            <div className="btn2 border-0 p-2" style={{backgroundColor:'rgba(33, 77, 151, 1)', borderRadius:'8px', boxShadow:'0 4px 8px 0 rgb(33, 77, 151)  '}}>
            <NavLink className={'text-decoration-none text-white'} to={'/attentancetable'}>  جدول الحضور</NavLink>
            </div> 
        </div>

    </div>
    </>
}

export default AttendanceRecord

