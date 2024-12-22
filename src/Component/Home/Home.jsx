import React from 'react'

function Home() {
    return <>
    <main style={{ backgroundColor:'rgba(241, 241, 241, 1)', gridTemplateColumns:'2fr 2fr'}} className='p-5 w-100 d-flex flex-md-row justify-content-center '>
        <div>
            <div className=' main-info d-flex flex-column align-items-center text-center'>
                <div className="title">
                    <h1 style={{fontWeight:'400', fontSize:'50px' , lineHeight:'89.6px', alignItems:'center'}}>مرحبا بكم فى تطويع</h1>
                </div>
                <div className="arrow">
                    <img src={`/Capture.PNG`} alt="" />
                </div>
                <div className="paragraph">
                    <p style={{fontWeight:'300', fontSize:'24px', lineHeight:'33.6px'}}>اكتشف كيف يمكنك أن تكون جزءًا من التغيير الإيجابي في مجتمعنا من خلال دعم المبادرات الخيرية عبر تطويع.</p>

                </div>
                
            </div>
        </div> 
        <div className='img-box'>
            <div className="imgGround"></div>
        </div>
    </main>

    <section className='p-3 w-100 d-flex flex-column ' 
    style={{backgroundColor:'#E8D6D4', height:'400px'}} >
        <div className="mb-3 sec-head d-flex flex-column justify-content-center align-items-center">
            <div className="title"><h1 style={{fontWeight:'400', fontSize:'35px'}}>نحن نساعدكم فى تقديم الدعم </h1></div>
            <div className="more"><span style={{fontWeight:'400', fontSize:'20px'}}>انضموا الينا في تعزيز المبادرات الخيرية ودعم المجتمعات </span></div>
        </div>

        <div className="secImgs d-flex flex-md-row flex-column justify-content-center align-items-center gap-3"
        style={{ textAlign:'center', color:'white', fontWeight:'300',
            fontSize:'20px',lineHeight:'28px'}}>
            <div className="box1 d-flex flex-column align-items-center justify-content-center" style={{backgroundColor:'#F5F5F5', width:'282px', height:'250px', borderRadius:'8px'}}>
                <div className="icon d-flex align-items-center justify-content-center" style={{backgroundColor:'#214D97', border:'10px solid #CBDCEB', borderRadius:'100px', width:'102px', height:'102px'}}>
                    <i className="fa-solid fa-question" style={{color:'#CBDCEB', fontSize:'50px'}}></i>
                </div>
                <p style={{color:'black', fontSize:'24px', fontWeight:'400'}}>تاسس في 2023</p>
            </div>
            <div className="box1 d-flex flex-column align-items-center justify-content-center" style={{backgroundColor:'#F5F5F5', width:'282px', height:'250px', borderRadius:'8px'}}>
                <div className="icon d-flex align-items-center justify-content-center" style={{backgroundColor:'#214D97', border:'10px solid #CBDCEB', borderRadius:'100px', width:'102px', height:'102px'}}>
                    <i class="fa-solid fa-hand-holding-heart" style={{color:'#CBDCEB', fontSize:'50px'}}></i>
                </div>
                <p style={{color:'black', fontSize:'24px', fontWeight:'400'}}>اكثر من 30 مليون دولار تم جمعها</p>
            </div>
            <div className="box1 d-flex flex-column align-items-center justify-content-center" style={{backgroundColor:'#F5F5F5', width:'282px', height:'250px', borderRadius:'8px'}}>
                <div className="icon d-flex align-items-center justify-content-center" style={{backgroundColor:'#214D97', border:'10px solid #CBDCEB', borderRadius:'100px', width:'102px', height:'102px'}}>
                    <i class="fa-solid fa-users" style={{color:'#CBDCEB', fontSize:'50px'}}></i>
                </div>
                <p style={{color:'black', fontSize:'24px', fontWeight:'400'}}>متطوع +10,000</p>
            </div>
            <div className="box1 d-flex flex-column align-items-center justify-content-center" style={{backgroundColor:'#F5F5F5', width:'282px', height:'250px', borderRadius:'8px'}}>
                <div className="icon d-flex align-items-center justify-content-center" style={{backgroundColor:'#214D97', border:'10px solid #CBDCEB', borderRadius:'100px', width:'102px', height:'102px'}}>
                    <i class="fa-solid fa-heart" style={{color:'#CBDCEB', fontSize:'50px'}}></i>
                </div>
                <p style={{color:'black', fontSize:'24px', fontWeight:'400'}}>مليون+مستفيد 1</p>
            </div>
        </div>
        
    </section>

    {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

    <section style={{backgroundColor:'#EEEEEE', padding:'70px 0px'}}>
        <div className="title px-5" dir='ltr'>
                <h1 style={{fontWeight:'400', fontSize:'55px'}}>لحظات لا تُنسى</h1>
                <p style={{fontWeight:'400', fontSize:'24px', textShadow:'2px 2px 2px #00000040'}}>.استكشف لحظاتنا المميزة في العمل التطوعي وكيف نساهمم في احداث تغيير ايجابي</p>
        </div>

        <div className='d-flex flex-md-row flex-column justify-content-center align-items-center gap-4'>
            <div className="box1 bg-light p-3">
                    <img style={{borderRadius:'10px 15px 55px 0px'}} src={`/collaborate.jpeg`} alt="" width={'355px'} height={'338px'} />
                <p style={{fontWeight:'400', fontSize:'35px'}}>تعاون مجتمعي</p>
            </div>

            <div className="box1 bg-light p-3">
                <img style={{borderRadius:'10px 15px 55px 0px'}} src={`/children.jpeg`} alt="" width={'355px'} height={'338px'}/>
                <p style={{fontWeight:'400', fontSize:'35px'}}>فعالية خيرية</p>
            </div>
            <div className="box1 bg-light p-3">
                <img style={{borderRadius:'10px 15px 55px 0px'}} src={`/company.jpeg`} alt="" width={'355px'} height={'338px'}/>
                <p style={{fontWeight:'400', fontSize:'35px'}}>عمل جماعى</p>
            </div>

        </div>
    </section>

    {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
    <section style={{backgroundColor:'#CBDCEB', padding:'90px 0px'}}>
        <div className="title px-5" dir='ltr'>
            <h1 style={{fontWeight:'400', fontSize:'40px'}}>كيف يمكنك المساهمة معنا</h1>
            <p style={{fontWeight:'380', fontSize:'22px'}}>اكتشفوا كيفية المشاركة والتبرع لدعم مبادراتنا الخيرية</p>
        </div>

        <div className='d-flex flex-md-row flex-column justify-content-center align-items-center gap-3 px-4'>
            <div className="box1 p-2" style={{backgroundColor:'#F5F5F5', fontWeight:'400', fontSize:'24px', width:'370px', borderRadius:'8px'}}>
                <p style={{fontWeight:'400', fontSize:'24px'}}>STEP 1</p>
                <p tyle={{fontWeight:'400', fontSize:'40px'}}>فتح حساب مجاني</p>
                <span style={{fontWeight:'400', fontSize:'24px'}}>ابدا رحلتك بالتسجيل للحصول على حساب مجاني </span>
            </div>
            <div className="box1 p-2" style={{backgroundColor:'#F5F5F5', fontWeight:'400', fontSize:'24px' , width:'370px', borderRadius:'8px'}}>
                <p style={{fontWeight:'400', fontSize:'24px'}}>STEP 1</p>
                <p tyle={{fontWeight:'400', fontSize:'40px'}}>فتح حساب مجاني</p>
                <span style={{fontWeight:'400', fontSize:'24px'}}>تعاون مع فريقنا وشارك في الانشطة التطوعية </span>
            </div>
            <div className="box1 p-2" style={{backgroundColor:'#F5F5F5', fontWeight:'400', fontSize:'24px' , width:'370px', borderRadius:'8px'}}>
                <p style={{fontWeight:'400', fontSize:'24px'}}>STEP 1</p>
                <p tyle={{fontWeight:'400', fontSize:'40px'}}>فتح حساب مجاني</p>
                <span style={{fontWeight:'400', fontSize:'24px'}}>ساهم في دعم القضايا الهامة من خلال التبرع </span>
            </div>
        </div>

    </section>


    {/* ////////////////////////////////////////////////////////////////////////////////////////////////////// */}

    <section style={{padding:'90px 0px'}}>
        <div className="title px-5 d-flex flex-column justify-content-center align-items-center" >
            <h1 style={{fontWeight:'400', fontSize:'40px'}}>تأثيرنا في المجتمع</h1>
            <p style={{fontWeight:'380', fontSize:'22px' , textShadow:'2px 2px 2px #00000040'}}>نحن فخورين بما حققناه من انجازات في دعم القضايا الخيرية والمجتمعية</p>
        </div>

        <div className='d-flex flex-md-row flex-column align-items-center justify-content-center gap-3'>
            <div className="box1 py-2 text-center" style={{backgroundColor:'#abc2c9', borderRadius:'24px', width:'320px'}}>
                <h1 style={{fontWeight:'400', fontSize:'40px',fontFamily:'"Alegreya Sans", serif'}}>150+</h1>
                <p style={{fontWeight:'350', fontSize:'24px'}}>مشاريع نشطة</p>
            </div>
            <div className="box1 py-2 text-center" style={{backgroundColor:'#abc2c9', borderRadius:'24px', width:'320px'}}>
                <h1 style={{fontWeight:'400', fontSize:'40px',fontFamily:'"Alegreya Sans", serif'}}>300+</h1>
                <p style={{fontWeight:'350', fontSize:'24px'}}>متطوعون ملتزمين</p>
            </div>
            <div className="box1 py-2 text-center" style={{backgroundColor:'#abc2c9', borderRadius:'24px', width:'320px'}}>
                <h1 style={{fontWeight:'400', fontSize:'40px',fontFamily:'"Alegreya Sans", serif'}}>60+</h1>
                <p style={{fontWeight:'350', fontSize:'24px'}}>احداث خيرية</p>
            </div>
        </div>
    </section>

    {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

    <section style={{backgroundColor:'#F5F5F5', padding:'80px'}} className='d-flex flex-md-row flex-column juatify-content-center align-items-center gap-3'>
            <div className="info px-5 d-flex flex-column juatify-content-center">
                <h2 style={{fontWeight:'400', fontSize:'50px'}}>رسالة فريق طوعني</h2>
                <p style={{fontWeight:'450', fontSize:'24px', textShadow:'2px 2px 2px #00000040'}}>شاهد كيف تعمل معاً لتحقيق أهدافنا التطوعية ودعم القضايا المجتمعية</p>
            </div>
            <div className='img'>
                <video src={`video.mp4`} width={'527px'} controls></video>
            </div>
    </section>

    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

    <section style={{backgroundColor:'#DEDEDE'}} className='d-flex flex-md-row flex-column juatify-content-center align-items-center gap-5 p-5'>
            <div className="img-contact">
                <img className='labImg' src={`/Group 4.png`} alt="grup4img" width={'527px'} />
            </div>
            <div className="contact d-flex flex-column justify-content-center align-items-center gap-3">
                <h2 style={{fontWeight:'400', fontSize:'40px', textAlign:'center'}}>تواصل معنا وانضم لفريقنا</h2>
                <div className="details d-flex flex-md-row flex-column gap-3">
                    <div style={{backgroundColor:'#F5F5F5', borderRadius:'24px', width:'250px'}} className="details1 text-center py-2">
                        <h3><i style={{color:'#214D97'}} class="fa-solid fa-clock"></i> ساعات العمل  </h3>
                        <p>السبت-الخميس</p>
                        <p>6:00صباحا الى 9:00 مساءً</p>
                    </div>
                    <div style={{backgroundColor:'#F5F5F5', borderRadius:'24px', width:'250px'}} className="details1 text-center py-2">
                        <h3><i style={{color:'#214D97'}}  class="fa-solid fa-compass"></i> عنواننا </h3>
                        <p>شارع النحاس , طنطا</p>
                        <p>مصر</p>
                    </div>
                </div>
                <div style={{backgroundColor:'#F5F5F5', borderRadius:'24px', width:'250px'}} className="details1 text-center py-2">
                        <h3><i style={{color:'#214D97'}} class="fa-solid fa-phone"></i> تواصل معنا </h3>
                        <p>+574-286-3953</p>
                        <p>+629-629-1930</p>
                    </div>
            </div>
    </section>

    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

    <footer className='d-flex flex-md-row flex-column justify-content-between align-items-center p-5 gap-5' style={{backgroundColor:'#214D97'}}>
            <div className="logo">
                <img src={`/Group 2.png`} alt="logo" width={'120px'}/>
            </div>
            <div className="social d-flex flex-column justify-content-center align-items-center gap-3">
                <p style={{color:'#FFFFFF'}}>تابعونا على شبكات التواصل الاجتماعي </p>
                <div className="icons d-flex flex-row gap-3">
                    <div className="icon1" style={{cursor:'pointer'}}>
                        <img src={`/google.png`} alt="googleIcon" width={'30px'} />
                    </div>
                    <div className="icon2" style={{cursor:'pointer'}}><img src={`/facebook.png`} alt="facebook" width={'30px'}/></div>
                    <div className="icon3" style={{cursor:'pointer'}}><i style={{color:'white', fontSize:'30px'}} class="fa-brands fa-twitter"></i></div>
                    <div className="icon4" style={{cursor:'pointer'}}><img src={`/instagram.png`} alt="instaIcon" width={'30px'} /></div>
                </div>
            </div>

            <div style={{color:'#FFFFFF'}} className='d-flex flex-column align-items-center'>
                <p style={{fontSize:'30px', fontWeight:'400'}}>يدعم</p>
                <p style={{fontSize:'20px', fontWeight:'400'}}>الشروط والاحكام</p>
                <p style={{fontSize:'20px', fontWeight:'400'}}>سياسات الخصوصيه</p>
            </div>

            <div className="input">
                <p style={{fontSize:'20px', fontWeight:'400', textAlign:'right', color:'#FFFFFF'}}>اتصل بنا</p>
                <div style={{position:'absolute', color:'#F5F5F5',right:'54px', lineHeight:'45px'}} className="ico">
                    <i className="fa-regular fa-envelope"></i>
                </div>
                <input style={{border:'1px solid #F5F5F5', borderRadius:'16px', backgroundColor:'transparent', color:'white', padding:'10px 25px'}} type="email" name='email' placeholder='البريد الكترونى' dir='rtl'/>

                
            </div>
    </footer>
    </>
}

export default Home
