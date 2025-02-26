import styles from "../../assets/CSS/Service/ServiceCard.module.css";
import serviceImg from "../../assets/imgService/service-suggest.png";
import avatarRated from "../../assets/imgService/avatar-rated.png";
import StarIcon from "../../components/iconsvg/StarIcon";
import { Link } from "react-router-dom";

const ServiceCard = () => {
  return (
    <div className={styles.serviceCard}>
      <img className={styles.serviceImage} src={serviceImg} alt="Service" />
      <div>
        <p className={styles.serviceName}>
          Tên dịch vụ{" "}
          <span className={styles.serviceStatus}></span>
        </p>
        <p className={styles.serviceDescription}>
          Mô tả giới thiệu ngắn gọn về dịch vụ
        </p>
      </div>

      <div className={styles.serviceFooter}>
        <Link className={styles.hireNowButton} to="/service">
          <button className={styles.hireButton}>
            Thuê Ngay
          </button>
        </Link>

        <div className={styles.ratingSection}>
          <div className={styles.ratingContainer}>
            <p className={styles.ratingStars}>
              4.8 <StarIcon />
            </p>
            <p>(150)</p>
          </div>
          <div className={styles.avatarContainer}>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <img
                  key={index}
                  className={styles.avatar}
                  src={avatarRated}
                  alt="Rated Avatar"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
