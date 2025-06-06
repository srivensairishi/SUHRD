import './Header.css';
function AdminHeader() {
  return (
    <div className="header-container">
        
      <div>
        <img className="logo" src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748337593/58661dfb59312fc39c529efb33baa953ff8401f8_1_aawzo5.jpg" alt="SUHRD Logo" />
      </div>
      <div className="button-section">
        <button className="btn white-btn u-button">UNSOLVED</button>
        <button className="btn purple-btn">RESOLVED</button>
      </div>
      <div>
        <button className="btn white-btn wide-btn ea-button">Edit App Content</button>
      </div>
    </div>
  );
}
export default AdminHeader;