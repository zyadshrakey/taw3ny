// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// function GenerateQR() {

//     let token= localStorage.getItem('userToken')
//     let [qrCode, setQrCode]= useState(null)
//     let [loading, setLoading]= useState(false)
//     const navigate= useNavigate()
//     const handleGoBack=()=>{
//         navigate(-1)
//     }

//     async function generatQr() {
//         try{
//             setLoading(true)
//         let response= await axios.get('https://wezaa.runasp.net/Attendance/qrcode'
//             ,{headers:{
//                 Authorization: `Bearer ${token}`
//               },
//               responseType: 'blob'}
//         )
//             console.log(response.data);
//             const imageUrl = URL.createObjectURL(response.data) 
//             setQrCode(imageUrl)
//         }
//         catch(error){
//             console.log(error);
//         }finally{
//             setLoading(false)
//         }
    
//     }

//     return <>
//      <div className='d-flex flex-column align-align-items-center'>

//         <div className="d-flex p-4 flex-row justify-content-between">
//             <div className="volunteerBtn" onClick={handleGoBack}>
//                 <button style={{backgroundColor:'rgba(33, 77, 151, 1)', color:'white', border:'none', borderRadius:'8px' ,width:'79px', height:'40px'}}>
//                     <i className="fa-solid fa-arrow-left"></i> رجوع
//                 </button></div>
//             <div className="title">
//                 <h1>سجل الحضور</h1>
//             </div>
//         </div>

//         <div className='qrBtn container d-flex align-item-center justify-content-center'>
//             <button className='py-2 px-3' style={{backgroundColor:'rgba(33, 77, 151, 1)', color:'white', border:'none', borderRadius:'8px' }}
//                 onClick={()=>{generatQr()}}>
//             {loading ? '...جاري الإنشاء' : 'إنشاء رمز الاستجابة السريعة'}
//             </button>
//         </div>
//         {qrCode && (
//         <div className="mt-4 p-2 d-flex justify-content-center">
//           <img src={qrCode}  alt="QR Code" style={{ width: '300px', height: '300px' }} />
//         </div>
//         )}
//     </div>
//     </>
// }

// export default GenerateQR
