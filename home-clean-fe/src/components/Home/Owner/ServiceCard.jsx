import { Link } from "react-router-dom";

function ServiceCard({ id, image, title, description, rating, reviews, serviceId }) {

  return (
    <div className="service-card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
        <div className="service-meta">
          <div className="rating">
            <span className="stars">{rating} ★</span>
            <span className="review-count">({reviews})</span>
          </div>
          <div className="price">{price}đ/h</div>
        </div>
        <div className="card-footer">
          <Link to={`/service/${id}`} state={serviceId} >
            <button className="hire-btn">Thuê ngay</button>
          </Link>
          <div className="user-avatars">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/30?img=${i}`}
                alt="User avatar"
                className="avatar"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
