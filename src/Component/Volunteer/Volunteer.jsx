import { Link, useNavigate } from "react-router-dom";

function Volunteer() {

  const navigate= useNavigate()
  const handleGoBack=()=>{
    navigate(-1)
  }
  return (
    <>
      <div className="d-flex flex-column">

        <div className="d-flex p-4 flex-row justify-content-between">
          <div className="volunteerBtn" onClick={handleGoBack}>
            <button style={{backgroundColor:'rgba(33, 77, 151, 1)', color:'white', border:'none', borderRadius:'8px' ,width:'79px', height:'40px'}}>
            <i class="fa-solid fa-arrow-left"></i> رجوع
            </button></div>
          <div className="title">
            <h1>تقييم المتطوعين </h1>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-center align-content-center gap-3">
          <div>
            <button className="detailBtn border-0 p-2" style={{backgroundColor:'rgba(33, 77, 151, 1)', borderRadius:'8px'}}><Link to={'/volunteerinopportunity'} className="text-decoration-none " style={{color:'white'}}>متطوعين فى الفرص</Link></button>
          </div>
          <div>
          <button className="detailBtn border-0 p-2" style={{backgroundColor:'rgba(33, 77, 151, 1)', borderRadius:'8px'}}><Link to={'/volunteercharity'}  className="text-decoration-none " style={{color:'white'}}>متطوعين فى الجمعيه </Link></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Volunteer;
