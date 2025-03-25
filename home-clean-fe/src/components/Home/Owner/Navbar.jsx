import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import houseCleanLogo from '../../../assets/HouseClean_logo.png';
import Notification from "../../Notification/Notification";
import styles from "../../../assets/CSS/Notification/Notification.module.css";
import { message, Button, Dropdown, Avatar, Badge, Popover } from "antd";
import { UserOutlined, LogoutOutlined, BellOutlined, MessageOutlined } from "@ant-design/icons";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import ChatWindow from "../../Chat/ChatWindow";
import ConversationList from "../../Chat/ConversationList";

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupNotification, setIsPopupNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isPopupMessage, setIsPopupMessage] = useState(false);
  const [messageCount, setMessageCount] = useState(3);

  //Them phan khai báo Chat
  const roleStr = localStorage.getItem("role");
  const role = roleStr ? roleStr.toLowerCase() : null;
  const userId = localStorage.getItem("customerId")

  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  //Kết thúc phần khai báo cho Chat

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close the menu when notification popup is opened on mobile
  useEffect(() => {
    if (isPopupNotification && isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isPopupNotification, isMobile, isMenuOpen]);

  const toggleMenu = () => {
    // Close notification popup when opening menu on mobile
    if (isMobile && isPopupNotification) {
      setIsPopupNotification(false);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    message.success("Đăng xuất thành công!");
    navigate("/");
  };

  const toggleNotification = () => {
    setIsPopupNotification(!isPopupNotification);
    // Close menu when toggling notification on mobile
    if (isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleMessage = () => {
    setIsPopupMessage(!isPopupMessage);
    // Close menu when toggling message on mobile
    if (isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Lấy tên user từ localStorage nếu chưa có trong context
  const getUserName = () => {
    if (user && user.customerName) {
      return user.customerName;
    }
    const storedName = localStorage.getItem("name");
    return storedName ? storedName : '';
  };

  // Dropdown menu cho user
  const userMenu = {
    items: [
      {
        key: '1',
        label: <Link to="/infomation">Thông tin tài khoản</Link>,
        icon: <UserOutlined />
      },
      {
        key: '2',
        label: 'Đăng xuất',
        icon: <LogoutOutlined />,
        onClick: handleLogout
      }
    ]
  };

  // Notification icon với animation khi có thông báo mới
  const notificationIcon = (
    <Badge
      count={notificationCount}
      size="small"
      offset={[-2, 6]}
      className={styles.notification_badge}
    >
      <div
        className={styles.notification_icon_wrapper}
        onClick={isMobile ? toggleNotification : undefined}
      >
        <BellOutlined
          className={`${styles.notification_icon} ${notificationCount > 0 ? styles.notification_active : ''}`}
          style={{ fontSize: '20px' }}
        />
      </div>
    </Badge>
  );

  // Message icon with animation when there are new messages
  const messageIcon = (
    <Badge
      count={messageCount}
      size="small"
      offset={[-2, 6]}
      className={styles.message_badge}
    >
      <div
        className={styles.message_icon_wrapper}
        onClick={isMobile ? toggleMessage : undefined}
      >
        <MessageOutlined
          className={`${styles.message_icon} ${messageCount > 0 ? styles.message_active : ''}`}
          style={{ fontSize: '20px' }}
        />
      </div>
    </Badge>
  );

  // Mobile notification content
  const mobileNotificationContent = isPopupNotification && isMobile && user ? (
    <div className={styles.mobile_notification_overlay} onClick={() => setIsPopupNotification(false)}>
      <div
        className={styles.mobile_notification_container}
        onClick={(e) => e.stopPropagation()}
      >
        <Notification onClose={() => setIsPopupNotification(false)} />
      </div>
    </div>
  ) : null;

  // Notification popover component (for desktop)
  const notificationPopover = isMobile ? (
    user ? notificationIcon : null
  ) : (
    user ? (
      <Popover
        content={<Notification onClose={() => setIsPopupNotification(false)} />}
        trigger="click"
        open={isPopupNotification}
        onOpenChange={setIsPopupNotification}
        placement="bottomRight"
        overlayClassName={styles.notification_popover}
      >
        {notificationIcon}
      </Popover>
    ) : null
  );

  // Them phần xử lý Chat
  useEffect(() => {
    if (!role || !userId) {
      console.error("Thiếu thông tin role hoặc userId trong URL!");
      return;
    }

    const socket = new SockJS('http://localhost:8080/websocket-chat');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log(`User ${userId} (${role}) connected to WebSocket`);
      setStompClient(client);

      const queueName = `/queue/messages-${userId}`;
      client.subscribe(queueName, (message) => {
        const msg = JSON.parse(message.body);
        setMessages((prev) => [...prev, msg]);
      });
    });

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, [role, userId]);

  const handleConversationSelect = (conversation) => {
    console.log("🔍 Chọn cuộc trò chuyện:", conversation);
  
    if (!conversation || !conversation.id) {
      console.error("Lỗi: Cuộc trò chuyện không hợp lệ!", conversation);
      return;
    }
  
    setSelectedConversation(conversation);
  
    const apiUrl = `http://localhost:8080/api/messages/${conversation.id}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          console.error("API không trả về mảng tin nhắn hợp lệ:", data);
          setMessages([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải tin nhắn cũ:", error);
        setMessages([]);
      });
  };

  const sendMessage = (messageContent) => {
    if (stompClient && selectedConversation) {
      const message = {
        content: messageContent,
        senderId: userId,
        conversationId: selectedConversation.id,
      };

      const headers = {
        customerId: selectedConversation.customerId.toString(),
        employeeId: selectedConversation.employeeId.toString(),
      };

      stompClient.send('/app/chat', headers, JSON.stringify(message));
      setMessages((prev) => [...prev, { ...message, sentAt: new Date().toISOString() }]);
    }
  };
  // Kết thúc xử lý Chat
  // 

  // Message popover component (for desktop)
  const messagePopover = isMobile ? (
    user ? messageIcon : null
  ) : (
    user ? (
      <Popover
        content={
          <div className={styles.message_container}>
            <div className={styles.message__title}>
              <h2>Tin nhắn</h2>
            </div>
            <div className={styles.message__main}>
              <div className={styles.message_sidebar}>
                <div className={styles.message_user_list}>
                  <ConversationList onSelect={handleConversationSelect} userId={userId} role={role} />
                
                </div>
              </div>
              <div className={styles.message_outlet}>
                <ChatWindow messages={messages} onSendMessage={sendMessage} conversation={selectedConversation} userId={userId} />
  
              </div>
            </div>
            
          </div>
        }
        trigger="click"
        open={isPopupMessage}
        onOpenChange={setIsPopupMessage}
        placement="top"
        overlayClassName={styles.message_popover}
        getPopupContainer={() => document.querySelector(`.${styles.message_icon_wrapper}`)}
      >
        {messageIcon}
      </Popover>
    ) : null
  );

  // User profile component
  const userProfile = (
    <Dropdown menu={userMenu} placement="bottomRight">
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
        <span>{getUserName()}</span>
      </div>
    </Dropdown>
  );

  // Login and Register buttons
  const authButtons = (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Link to="/login" className="login-btn" style={{ width: '110px' }}>Đăng nhập</Link>
      <Link to="/register" className="login-btn" style={{
        width: '110px',
        textAlign: 'center',
        background: 'white',
        border: '2px solid #00a651',
        color: 'black'
      }}>Đăng ký</Link>
    </div >
  );

  return (
    <div className="Container">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={houseCleanLogo} alt="House Clean Logo" className="logo-img" />
          </Link>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
          <ul className="menu">
            <li><Link to="/about" className="nav-link">Giới thiệu</Link></li>
            <li><Link to="/activitylist" className="nav-link">Theo dõi dịch vụ</Link></li>
            <li><Link to="/" className="nav-link">Tin tức</Link></li>
            <li><Link to="/contact" className="nav-link">Liên hệ</Link></li>

            {/* Only show these elements on mobile */}
            <li className="mobile-login">
              {isMobile && (
                <>
                  {user && (
                    <li className="mobile-notification">
                      {notificationIcon}
                      {messageIcon}
                    </li>
                  )}
                  {user ? userProfile : authButtons}
                </>
              )}
            </li>
          </ul>
        </div>

        {/* Only show these elements on desktop */}
        <div className="desktop-login">
          {!isMobile && (
            <>
              {user && (
                <div className="desktop-notification" style={{ marginRight: '20px', gap: 10, display : 'flex', alignItems:'center', cursor : 'pointer' }}>
                  {notificationPopover}
                  {messagePopover}
                </div>
              )}
              {user ? userProfile : authButtons}
            </>
          )}
        </div>
      </nav>

      {/* Render mobile notification panel outside navbar structure */}
      {mobileNotificationContent}
    </div>
  );
}

export default Navbar;