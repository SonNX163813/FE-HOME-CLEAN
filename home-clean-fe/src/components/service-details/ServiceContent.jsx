import serviceImage from "../../assets/imgService/service.png";
import LocationIcon from "../iconsvg/LocationIcon";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from '../../assets/CSS/Service/ServiceContent.module.css'

const ServiceContent = ({ setIsShowLocationModal }) => {

  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/services/details/1")
      .then((res) => res.json())
      .then((data) => setServiceData(data))
      .catch((err) => console.error("Lỗi khi gọi API:", err));
  }, []);

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
          <h2> {serviceData?.name || "Dịch vụ"}</h2>
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
              Thạch Thất , Hà Nội

            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>

          <p style={{ fontSize: 30, fontWeight: 500 }}>
            {serviceData.additionalPrice} VNĐ
          </p>
        </div>
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
            transitionDuration: '0.5s'
          }}
        >
          <Link className={styles.link_Next} to="/createjob"
          >
            Tiếp theo
          </Link>

        </button>
      </div>
    </div>
  );
};

export default ServiceContent;