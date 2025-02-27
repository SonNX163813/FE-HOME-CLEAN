import React ,{ useEffect ,useState } from "react";
import Time from "./Time";
import { Link } from "react-router-dom";

const JobInfomation = ({ price, serviceDetailId, serviceId, address,  selectedDate, hour, minute  }) => {

    const [serviceData, setServiceData] = useState(null);

    useEffect(() => {
        if (!serviceDetailId) return; // Kiểm tra nếu chưa có serviceDetailId thì không gọi API

        const fetchServiceData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/services/details/${serviceDetailId}`);
                if (!response.ok) {
                    throw new Error("Lỗi khi gọi API");
                }
                const data = await response.json();
                setServiceData(data);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchServiceData();
    }, [serviceDetailId]);
    
    return (
        <div 
        style={{ 
            border: "1px solid #E4E7EC", 
            borderRadius: 8, 
            padding: 16 ,
            position : 'relative'
        }}>
            <h4>Thời gian làm việc</h4>
            <p>
                <span>Ngày làm việc</span>
                <span style={{ float: "right" }}>{selectedDate
                        ? `Ngày ${selectedDate.getDate()}- Tháng ${selectedDate.getMonth() + 1}- Năm ${selectedDate.getFullYear()}`
                        : "Chưa chọn"}</span>
            </p>
            <p>
                <span>Thời gian làm việc</span>
                <span style={{ float: "right" }}>
                    {selectedDate
                        ? `${hour}h${minute}p`
                        : "Chưa chọn"}
                </span>
            </p>

            <br />
            <h4>Chi tiết</h4>
            <p>
                <span>Loại dịch vụ</span>
                <span style={{ float: "right" }}>{serviceData?.name}</span>
            </p>
            <p>
                <span>Địa điểm</span>
                <span style={{ float: "right" }}>
                {address}
                </span>
            </p>
            {/* <p>
                <span>Khối lượng công việc</span>
                <span style={{ float: "right" }}>30m2</span>
            </p> */}
            <p>
                <span>Số nhân công</span>
                <span style={{ float: "right" }}>1 người</span>
            </p>
            <div
            style={{
                height : 2,
                width : '100%',
                background : 'rgb(225, 225, 225)',
                marginTop : 15
            }}
            >

            </div>

            <div
            style={{
                display : 'flex',
                justifyContent : 'space-between',
                padding : '20px 0px 10px 0px'
            }}
            >
                <span>Tổng thanh toán</span>
                <h4 style={{ textAlign: "right", fontSize: 20}}>
                    {price} VNĐ
                </h4>
            </div>
            
            <div
            style={{
                display : 'flex',
                gap : 15,
                position : 'absolute',
                right : 0,
                bottom : -60
            }}
            >
                <Link to="/"
                style={{
                    textDecoration : 'none'
                }}
                >
                    <div
                    style={{
                        height : 40,
                        background :'rgb(174, 174, 174)',
                        color : 'white',
                        width : 120,
                        borderRadius : 8, 
                        alignContent : 'center',
                        textAlign : "center",
                        cursor : 'pointer'
                    }}
                    >
                        Hủy
                    </div>
                </Link>
                <Link
                to='/ordersuccess'
                style={{
                    textDecoration : 'none'
                }}
                >
                    <div
                    style={{
                        height : 40,
                        background :'rgb(10, 139, 3)',
                        color : 'white',
                        width : 180,
                        borderRadius : 8, 
                        alignContent : 'center',
                        textAlign : "center",
                        cursor : 'pointer'
                    }}
                    >
                        Đăng việc
                    </div>
                </Link>
                
            </div>
        </div>
    );
};

export default JobInfomation;