import serviceImage from "../../assets/imgService/service.png";
import LocationIcon from "../iconsvg/LocationIcon";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../../assets/CSS/Service/ServiceContent.module.css'

const ServiceContent = ({ setIsShowLocationModal }) => {
  const [selectedArea, setSelectedArea] = useState("20m² - 40m²");
  const areas = [
    { label: "< 20m²", price: 150000 },
    { label: "20m² - 40m²", price: 200000 },
    { label: "> 40m²", price: 300000 },
  ];

  const data = {
    address : 'Số 36 Đường Tôn Đức Thắng, Khu 2, Thị trấn Côn Đảo, Huyện Côn Đảo,Tỉnh Bà Rịa - Vũng Tàu, Việt Nam.'
  }

  const selectedPrice = areas.find(area => area.label === selectedArea)?.price || 0;

  return (
    <div className="service-content">
      <div className="layout1">
        <img className="img-layout1" src={serviceImage} alt="" />
        <img className="img-layout1" src={serviceImage} alt="" />
        <img className="img-layout1" src={serviceImage} alt="" />
      </div>
      <img className="img-main" src={serviceImage} alt="" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px 0px 10px 0px",
        }}
      >
        <div>
          <h2>Dọn phòng khách</h2>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <p>
              <span style={{ fontWeight: 600 }}>Danh mục: </span>
              <span style={{ fontWeight: 400 }}>Dọn nhà</span>
            </p>
            <div
              style={{
                width: 1,
                height: 16,
                backgroundColor: "#E4E7EC",
              }}
            ></div>
            <p>
              <span style={{ fontWeight: 600 }}>Nhóm: </span>
              <span style={{ fontWeight: 400 }}>Dọn phòng khách</span>
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontWeight: 600, fontSize: 16 }}>Chọn vị trí</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div>
              <div
                style={{
                  width: "fit-content",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#B8B8B8",
                  padding: "9px 15px 9px 15px",
                  borderRadius: 10,
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setIsShowLocationModal(true)}
              >
                <LocationIcon />
                Đổi địa chỉ
              </div>
            </div>
            <p style={{ maxWidth: "60%", color: "#B8B8B8" }}>
              {data.address}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <p style={{ fontWeight: 600, fontSize: 16 }}>Diện tích</p>
          <div style={{ display: "flex", gap: 12 }}>
            {areas.map(({ label }) => (
              <div
                key={label}
                className="area-select"
                style={{
                  padding: "6px 12px",
                  backgroundColor: selectedArea === label ? "#B0FFDC" : "",
                  border: `2px solid ${selectedArea === label ? "#039855" : "#d4d4d4"}`,
                  cursor: "pointer",
                  borderRadius : 8
                }}
                onClick={() => setSelectedArea(label)}
              >
                {label}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 30, fontWeight: 500 }}>
            {selectedPrice.toLocaleString()} VNĐ
          </p>
        </div>
        {/* <p style={{ position: "relative", fontSize: 30, fontWeight: 500 }}>
          100.000 đ
          <span
            style={{
              position: "absolute",
              bottom: -4,
              fontSize: 20,
              fontWeight: 500,
              color: "#475467",
            }}
          >
            /2h
          </span>
        </p> */}
        
          <button
            className={styles.btn_Next}
            style={{
              width: "fit-content",
              padding: "12px 16px 12px 16px",
              color: "white",
              backgroundColor: "#039855",
              border: "none",
              fontWeight: 700,
              borderRadius: 7,
              cursor: "pointer",
              transitionDuration : '0.5s'
            }}
          >
            <Link className={styles.link_Next} to="/createjob"
            state={{selectedArea , selectedPrice }}
            >
              Tiếp theo
            </Link>
            
          </button>
        
        
      </div>
    </div>
  );
};

export default ServiceContent;
