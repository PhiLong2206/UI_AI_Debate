import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, EDUCATOR_USER, TOPICS, RECENT_SESSIONS, PVP_LEARNERS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current logged in user (Learner or Educator)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('adpp_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Topics list (dynamic state so Educator can add/update)
  const [topics, setTopics] = useState(() => {
    const saved = localStorage.getItem('adpp_topics');
    return saved ? JSON.parse(saved) : TOPICS;
  });

  // Sessions history
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('adpp_sessions');
    return saved ? JSON.parse(saved) : RECENT_SESSIONS;
  });

  // 1v1 Rooms list
  const [pvpRooms, setPvpRooms] = useState([
    {
      id: 'ADPP-8241',
      topicId: 'tp-01',
      topicTitle: 'Mạng xã hội có gây hại nhiều hơn mang lại lợi ích cho giới trẻ?',
      host: 'Nguyễn Phi Long',
      hostSide: 'Ủng hộ',
      opponent: 'Nguyễn Đức Duy',
      opponentSide: 'Phản đối',
      timePerTurn: '3 phút',
      status: 'Đang diễn ra',
      createdAt: 'Vừa xong'
    },
    {
      id: 'ADPP-4592',
      topicId: 'tp-02',
      topicTitle: 'Nên cấm sử dụng Trí tuệ nhân tạo (AI) trong các bài kiểm tra học thuật?',
      host: 'Vũ Minh Anh',
      hostSide: 'Ủng hộ',
      opponent: null,
      opponentSide: 'Phản đối',
      timePerTurn: '3 phút',
      status: 'Đang chờ đối thủ',
      createdAt: '2 phút trước'
    }
  ]);

  // Toast notification
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('adpp_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('adpp_topics', JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem('adpp_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const switchRole = (role) => {
    if (role === 'educator') {
      setCurrentUser(EDUCATOR_USER);
      showToast('Đã chuyển sang góc nhìn Giảng viên (TS. Trần Văn Nam)', 'info');
    } else {
      setCurrentUser(INITIAL_USER);
      showToast('Đã chuyển sang góc nhìn Học viên (Nguyễn Phi Long)', 'info');
    }
  };

  const addTopic = (newTopic) => {
    const created = {
      ...newTopic,
      id: `tp-${Date.now()}`,
      practiceCount: 0,
      updatedAt: 'Vừa xong',
      author: currentUser.name
    };
    setTopics(prev => [created, ...prev]);
    showToast(`Đã lưu chủ đề: "${newTopic.title.slice(0, 35)}..."`);
    return created;
  };

  const updateTopic = (id, updatedFields) => {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields, updatedAt: 'Vừa xong' } : t));
    showToast('Đã cập nhật thông tin chủ đề!');
  };

  const addSession = (sessionData) => {
    const newSession = {
      ...sessionData,
      id: `ses-${Date.now()}`,
      date: new Date().toLocaleDateString('vi-VN'),
    };
    setSessions(prev => [newSession, ...prev]);
    return newSession;
  };

  const createPvpRoom = (roomData) => {
    const code = `ADPP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRoom = {
      ...roomData,
      id: code,
      host: currentUser.name,
      status: 'Đang chờ đối thủ',
      createdAt: 'Vừa xong'
    };
    setPvpRooms(prev => [newRoom, ...prev]);
    return newRoom;
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      switchRole,
      topics,
      addTopic,
      updateTopic,
      sessions,
      addSession,
      pvpRooms,
      createPvpRoom,
      pvpLearners: PVP_LEARNERS,
      toast,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
