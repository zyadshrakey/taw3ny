import { useNavigate } from "react-router-dom";

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

        <div className="p-4 d-flex flex-row align-items-center justify-content-end volunteerInput">
          <input className="py-1 px-4 position-relative" style={{width:'500px', borderRadius:'4px', border:'1px solid rgba(167, 167, 167, 1)'}} 
          type="text" placeholder="البحث" dir="rtl"/>
          <i style={{color:'rgba(33, 77, 151, 1)'}} class="fa-solid fa-magnifying-glass position-absolute px-1"></i>
        </div>

        <div className="p-4 volunteerTable">
          <table className="table table-bordered" style={{boxShadow:'1px 1px 4px 2px gray', borderRadius:'10px'}}>
            <thead className="table-secondary" style={{borderTop:'5px solid #214D97'}}>
              <tr>
                <td></td>
                <td>A</td>
                <td>B</td>
                <td>C</td>
                <td>D</td>
                <td>E</td>
              </tr>
              <tr>
                <th></th>
                <th>الاسم</th>
                <th>المهام</th>
                <th>رقم الهاتف</th>
                <th>الاداء العام</th>
                <th>ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-secondary">1</td>
                <td>نسرين</td>
                <td>رقم الهاتف</td>
                <td>01028802807</td>
                <td><img src={`/star.png`} alt="starIcon" width={'30px'} /></td>
                <td>Best Front-end ever <img src={`/star.png`} alt="starIcon" width={'30px'} /></td>
              </tr>
              <tr>
                <td className="table-secondary">2</td>
                <td>نسرين</td>
                <td>رقم الهاتف</td>
                <td>01028802807</td>
                <td><img src={`/star.png`} alt="starIcon" width={'30px'} /></td>
                <td>Best Front-end ever <img src={`/star.png`} alt="starIcon" width={'30px'} /></td>
              </tr>
              <tr>
                <td className="table-secondary">3</td>
                <td>نسرين</td>
                <td>رقم الهاتف</td>
                <td>01028802807</td>
                <td><img src={`/star.png`} alt="starIcon" width={'30px'} /></td>
                <td>Best Front-end ever <img src={`/star.png`} alt="starIcon" width={'30px'} /></td>
              </tr>
            </tbody>  
          </table>
        </div>

      </div>
    </>
  );
}

export default Volunteer;
