import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CompanyRegister() {

    const [isClicked,setIsClicked]= useState(true)

    const[loading,setLoading]=useState(false)
    const[error,setError]=useState('')
    const navigate = useNavigate()

    const[user,setUser]= useState({
        charityName:'',
        email:'',
        password:'',
        confirmPassword:'',
        phoneNumber:'',
        address:'',
        facebookLink:'',
        instagramLink:'',
        websiteUrl:'',
        registrationNumber:'',
        hasAcceptedTerms:true
    })


    function getUserData(eventInfo){
        let myUserData= {...user}
        myUserData[eventInfo.target.name] = eventInfo.target.type === 'checkbox' ? eventInfo.target.checked  : eventInfo.target.value;
        setUser(myUserData)
        console.log(myUserData)
        console.log(eventInfo)
    }

    async function sendRegisterDataToApi(){
        try{
            let {data}= await axios.post(`https://wezaa.runasp.net/Auth/register-charity`,user)
            console.log(data)
            if(!data.error){
                localStorage.setItem('')
                navigate('/login')
                console.log(data.message)
                setLoading(false)
            }
            else {
                setError(data.message);
                setLoading(false)

            }
        }
        catch(errors){
            setLoading(false)
            setError(errors.response?.data?.message || "An unexpected error occurred.");
            console.error('Error:', errors.response?.data);
        }
        
    }

    function submitRegisterData(e){
        setLoading(true)

        e.preventDefault()
        
        let validation= validationRegisterData()
        console.log(validation)
        if(validation.error){
            console.log(validation.error.details)

        }
        else if (user.password !== user.confirmPassword) {
            alert("Passwords do not match. Please check your entries.");
            return;
        }
        else if (!user.hasAcceptedTerms) {
            alert("You must accept the terms and conditions to proceed.");
            return;
        }
        sendRegisterDataToApi()
    }


    function validationRegisterData(){
        let scheme =Joi.object({
            charityName:Joi.string().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password : Joi.string().pattern(/^[A-Z][a-z]{3,6}$/).required(),
            confirmPassword: Joi.ref('password'),
            phoneNumber: Joi.string().pattern(/^[0-9]+$/).required(),
            address: Joi.string().required(),
            facebookLink: Joi.string().pattern(/^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/).required(),
            instagramLink: Joi.string().pattern(/^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9._]+)\/?$/).required(),
            websiteUrl: Joi.string().pattern(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/).required(),
            registrationNumber: Joi.string().pattern(/^[0-9\u0621-\u064A]{5,10}$/).required(),
            hasAcceptedTerms: Joi.boolean().valid(true).required()

        })
        return scheme.validate(user, {abortEarly:false})
    }

    const handelClick=(button)=>{
        setIsClicked(button)
    }
    
    const buttonStyles = {
        default: {
          width: '239px',
          borderColor: '#214D97',
          borderRadius: '16px',
          fontSize: '16px',
          color: '#214D97',
          backgroundColor: 'transparent',
        },
        clicked: {
          width: '239px', borderRadius: '16px', fontSize: '16px', backgroundColor: '#214D97', color:'white'
        }
      };

    return <>
     <div className='d-flex flex-md-row flex-column justify-content-between'>
            <div className="flex-column p-4" style={{textAlign:'center', margin:'auto'}}>
            {error.length>0?
            <div className='alert alert-danger my-2'>{error}</div>:''}
                
                <p className="h1" style={{ fontSize: '32px', fontWeight: '500', lineHeight: '38.73px', marginBottom: '32px' }}>
                    <span>!مرحباً بك</span>
                    <br />
                    <span>قم بإنشاء حسابك</span>
                </p>
                <div className="btnType d-flex justify-content-evenly align-items-center" style={{gap:'25px'}}>
                    <div>
                        <Link to="/companyregister" style={{ textDecoration: 'none'}}>
                        <button className="btn companyBtn" onClick={()=>handelClick(true)} style={isClicked === true ? buttonStyles.clicked : buttonStyles.default}>مؤسسة</button></Link>
                    </div>
                    <div>
                        <Link to="/" style={{ textDecoration: 'none', color:'white'}}>
                        <button className="btn userBtn" onClick={()=>handelClick(false)} style={isClicked === false ? buttonStyles.clicked : buttonStyles.default}>مستخدم</button></Link>
                    </div>

                </div>

        <form onSubmit={submitRegisterData} className='pt-3'>
            <div className='input-contaier position-relative py-2'>
                <i className="far fa-user" style={{ position:'absolute',right:'20px', bottom:'25px'}}></i>
                <input type='text' onChange={getUserData} name='charityName' placeholder='اسم المؤسسة'  className=' w-100' style={{paddingRight:'40px',border: '1px solid #777777',height:'48px', borderRadius:'16px'}} dir='rtl'/>
            </div>
            <div className='input-contaier position-relative py-2'>
                <i className="far fa-envelope" style={{ position:'absolute',right:'20px', bottom:'25px'}}></i>
                <input type='email' onChange={getUserData} name='email' placeholder='البريد الإلكترونى'  className=' w-100' style={{paddingRight:'40px',border: '1px solid #777777',height:'48px', borderRadius:'16px'}} dir='rtl'/>
            </div>
            <div className='input-contaier position-relative py-2'>
                <i className="fas fa-key" style={{ position:'absolute',right:'20px', bottom:'25px'}}></i>
                <input type='password' onChange={getUserData} name='password' placeholder='كلمة المرور'  className=' w-100' style={{paddingRight:'40px',border: '1px solid #777777',height:'48px', borderRadius:'16px'}} dir='rtl'/>
            </div>
            <div className='input-contaier position-relative py-2'>
                <i className="fas fa-key" style={{ position:'absolute',right:'20px', bottom:'25px'}}></i>
                <input type='password' onChange={getUserData} name='confirmPassword' placeholder=' تأكيد كلمة المرور'  className=' w-100' style={{paddingRight:'40px',border: '1px solid #777777',height:'48px', borderRadius:'16px'}} dir='rtl'/>
            </div>
            <div className='input-contaier position-relative py-2'>
                <i className="fas fa-phone-volume" style={{ position:'absolute',right:'20px', bottom:'25px'}}></i>
                <input type='tel' onChange={getUserData} name='phoneNumber' placeholder='رقم الهاتف'  className=' w-100' style={{paddingRight:'40px',border: '1px solid #777777',height:'48px', borderRadius:'16px'}} dir='rtl'/>
            </div>
            <div className='input-contaier position-relative py-2'>
                <i className="fa-regular fa-keyboard" style={{ position:'absolute',right:'20px', bottom:'25px'}}></i>
                <input type='text' onChange={getUserData} name='registrationNumber' placeholder='رقم القيد'  className=' w-100' style={{paddingRight:'40px',border: '1px solid #777777',height:'48px', borderRadius:'16px'}} dir='rtl'/>
            </div>
            <div className='input-contaier position-relative py-2'>
                <i className="fa-solid fa-location-dot" style={{ position:'absolute',right:'20px', bottom:'25px'}}></i>
                <input type='text' onChange={getUserData} name='address' placeholder='العنوان '  className=' w-100' style={{paddingRight:'40px',border: '1px solid #777777',height:'48px', borderRadius:'16px'}} dir='rtl'/>
            </div>
            <div className='input-contaier position-relative py-2'>
                <i className="fa-brands fa-facebook-f" style={{ position:'absolute',right:'20px', bottom:'25px'}}></i>
                <input type='url' onChange={getUserData} name='facebookLink' placeholder='لينك الفيسبوك '  className=' w-100' style={{paddingRight:'40px',border: '1px solid #777777',height:'48px', borderRadius:'16px'}} dir='rtl'/>
            </div>
            <div className='input-contaier position-relative py-2'>
                <i className="fa-brands fa-instagram" style={{ position:'absolute',right:'20px', bottom:'25px'}}></i>
                <input type='url' onChange={getUserData} name='instagramLink' placeholder='لينك الانستجرام '  className=' w-100' style={{paddingRight:'40px',border: '1px solid #777777',height:'48px', borderRadius:'16px'}} dir='rtl'/>
            </div>
            <div className='input-contaier position-relative py-2'>
                <i className="fa-solid fa-at" style={{ position:'absolute',right:'20px', bottom:'25px'}}></i>
                <input type='url' onChange={getUserData} name='websiteUrl' placeholder=' الموقع الإلكترونى '  className=' w-100' style={{paddingRight:'40px',border: '1px solid #777777',height:'48px', borderRadius:'16px'}} dir='rtl'/>
            </div>
            <div className='m-2'>
                <label className='px-2' style={{textDecoration:'underline', color:'#214D97'}} htmlFor='terms'> موافق على الشروط و الاحكام</label>
                <input onChange={getUserData} className='px-2' id='terms' type="checkbox" name="hasAcceptedTerms" defaultChecked/>
            </div>
            <button className='btn w-100 mt-2' style={{backgroundColor:'#214D97', color:'white', borderRadius:'24px', height:'48px'}}>
                { loading === true?<i className='fas fa-spinner fa-spin'></i>:'إنشاء حساب'}
            </button>
        </form>
        <p className="w-100 mt-2" dir="rtl">
            هل لديك حساب؟ 
            <Link to="/login" style={{ textDecoration: 'none', color: '#214D97' }}>
                اضغط لتسجيل الدخول.
            </Link>
        </p>

        </div>
            <div className='compUser-img'>
                {/* <img src={`/signup1.jpeg`} alt="login" style={{min_height:'100vh', width:'550px'}} /> */}
            </div>
        </div>
    </>
}

export default CompanyRegister
