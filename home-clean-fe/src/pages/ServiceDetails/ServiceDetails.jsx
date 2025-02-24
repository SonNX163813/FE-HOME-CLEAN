import "../../assets/CSS/Service/Service.css";
import { useState } from "react";
import ServiceContent from "../../components/service-details/ServiceContent"
import ServiceDescription from "../../components/service-details/ServiceDescription";
import SuggestedServices from "../../components/service-details/SuggestedServices";
import SelectLocationModal from "../../components/service-details/SelectLocationModal";

const ServiceDetails = () => {
  const [isShowLocationModal, setIsShowLocationModal] = useState(false);
  return (
    <div className="body">
      <ServiceContent setIsShowLocationModal={setIsShowLocationModal} />
      <ServiceDescription />
      <SuggestedServices />
      {isShowLocationModal && (
        <SelectLocationModal
          isShowLocationModal={isShowLocationModal}
          setIsShowLocationModal={setIsShowLocationModal}
        />
      )}
    </div>
  );
};

export default ServiceDetails;
