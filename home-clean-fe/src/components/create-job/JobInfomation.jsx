import React from "react";
import Time from "./Time";
import { Link , useLocation  } from "react-router-dom";

const JobInfomation = ({ selectedTime }) => {
    const location = useLocation();
    const { selectedArea , selectedPrice } = location.state || {};
    
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
                <span style={{ float: "right" }}>Ngày 16 - Tháng 2 - Năm 2025</span>
            </p>
            <p>
                <span>Thời gian</span>
                <span style={{ float: "right" }}> {selectedTime} giờ - Từ 13:00 đến 16:00</span>
            </p>

            <br />
            <h4>Chi tiết</h4>
            <p>
                <span>Loại dịch vụ</span>
                <span style={{ float: "right" }}>Dọn phòng khách</span>
            </p>
            <p>
                <span>Địa điểm</span>
                <span style={{ float: "right" }}>
                Số 36 Đường Tôn Đức Thắng, Khu 2, Thị trấn Côn Đảo...
                </span>
            </p>
            <p>
                <span>Khối lượng công việc</span>
                <span style={{ float: "right" }}>{selectedArea}</span>
            </p>
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
                    {selectedPrice.toLocaleString()} VNĐ
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
                <Link to="/service"
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