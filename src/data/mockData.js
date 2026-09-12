export const INITIAL_USER = {
  id: 'usr-01',
  name: 'Nguyễn Phi Long',
  role: 'learner', // 'learner' | 'educator'
  roleTitle: 'Học viên',
  email: 'longnpse171234@fpt.edu.vn',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  stats: {
    completedSessions: 12,
    averageScore: 76,
    streakDays: 5,
    totalTimeMinutes: 240,
    winRate1v1: 68,
  },
  skillBreakdown: {
    argumentation: 8.0,
    evidence: 6.2,
    relevance: 8.1,
    structure: 7.4,
    persuasion: 6.9,
  }
};

export const EDUCATOR_USER = {
  id: 'usr-edu-01',
  name: 'TS. Trần Văn Nam',
  role: 'educator',
  roleTitle: 'Giảng viên',
  email: 'namtv@fpt.edu.vn',
  department: 'Bộ môn Kỹ năng mềm & Tranh biện',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
};

export const TOPICS = [
  {
    id: 'tp-01',
    title: 'Mạng xã hội có gây hại nhiều hơn mang lại lợi ích cho giới trẻ?',
    category: 'Xã hội',
    difficulty: 'Trung bình',
    practiceCount: 34,
    status: 'Đã xuất bản',
    updatedAt: '10/09/2026',
    author: 'TS. Trần Văn Nam',
    summary: 'Phân tích tác động hai chiều của nền tảng số đối với sức khỏe tinh thần, năng suất học tập và sự kết nối cộng đồng của thanh thiếu niên.',
    background: `Mạng xã hội đã trở thành một phần không thể tách rời trong đời sống của giới trẻ thế kỷ 21. Theo các nghiên cứu gần đây, hơn 85% thanh thiếu niên sử dụng ít nhất một nền tảng xã hội hàng ngày. 
    Tuy nhiên, tranh cãi xoay quanh mặt trái như hội chứng sợ bỏ lỡ (FOMO), suy giảm khả năng tập trung, bạo lực mạng và vấn đề bảo mật quyền riêng tư ngày càng gia tăng so với lợi ích kết nối thông tin và học tập mở.`,
    references: [
      { title: 'Báo cáo Sức khỏe Tinh thần Thanh thiếu niên trong Kỷ nguyên Số (2025)', source: 'Viện Nghiên cứu Xã hội học' },
      { title: 'Tác động của thuật toán giữ chân người dùng đối với năng suất làm việc', source: 'Tạp chí Khoa học & Đời sống' },
      { title: 'Mạng xã hội như một công cụ học tập cộng tác hiệu quả', source: 'Hội đồng Giáo dục Quốc gia' }
    ],
    sampleSides: {
      pro: 'Ủng hộ quan điểm: Mạng xã hội gây hại nhiều hơn (Tập trung vào suy giảm sức khỏe tâm thần, lan truyền tin giả, xói mòn tương tác thực tế).',
      con: 'Phản đối quan điểm: Lợi ích vượt trội hơn (Tập trung vào dân chủ hóa thông tin, cơ hội học tập toàn cầu, xây dựng thương hiệu cá nhân và kết nối nghề nghiệp).'
    },
    defaultCoachTips: {
      keyOpponentPoints: [
        'Đối phương nhấn mạnh mạng xã hội gây lo âu, trầm cảm và suy giảm tương tác xã hội thực tế.',
        'Đối phương viện dẫn thuật toán giữ chân người dùng làm giảm năng suất học tập.'
      ],
      vulnerabilities: [
        'Đối phương chưa phân biệt giữa "thói quen sử dụng sai cách" và "bản chất công nghệ".',
        'Thiếu dữ liệu về nhóm thanh niên tận dụng mạng xã hội để khởi nghiệp hoặc học tập thành công.'
      ],
      rebuttalDirections: [
        'Tách bạch nguyên nhân: Công nghệ là công cụ trung tính, giải pháp nằm ở giáo dục năng lực số thay vì bài trừ công nghệ.',
        'Đưa ra các dẫn chứng thực tế về các cộng đồng học thuật, phong trào xã hội tích cực được lan tỏa nhờ mạng xã hội.'
      ],
      suggestedQuestions: [
        'Nếu loại bỏ mạng xã hội, chi phí cơ hội cho việc tiếp cận tri thức bình đẳng của học sinh vùng sâu vùng xa sẽ ra sao?',
        'Có phải mọi người dùng đều chịu ảnh hưởng tiêu cực, hay chỉ nhóm lạm dụng quá 4 tiếng mỗi ngày?'
      ]
    }
  },
  {
    id: 'tp-02',
    title: 'Nên cấm sử dụng Trí tuệ nhân tạo trong các bài kiểm tra học thuật?',
    category: 'Giáo dục',
    difficulty: 'Khó',
    practiceCount: 48,
    status: 'Đã xuất bản',
    updatedAt: '08/09/2026',
    author: 'TS. Trần Văn Nam',
    summary: 'Đánh giá tính liêm chính học thuật so với nhu cầu tích hợp công nghệ trí tuệ nhân tạo vào phương pháp kiểm tra đánh giá năng lực hiện đại.',
    background: 'Sự bùng nổ của các mô hình ngôn ngữ lớn đặt ra thách thức chưa từng có đối với phương pháp thi cử truyền thống như viết tiểu luận, làm bài tập về nhà.',
    references: [
      { title: 'Liêm chính học thuật trong kỷ nguyên Trí tuệ nhân tạo', source: 'Báo cáo Nghiên cứu Học thuật Đại học FPT' },
      { title: 'Tái định hình kiểm tra đánh giá: Từ ghi nhớ đến tư duy phản biện', source: 'Tài liệu Chính sách Giáo dục' }
    ],
    sampleSides: {
      pro: 'Ủng hộ cấm: Đảm bảo công bằng học thuật và ngăn chặn việc sinh viên ỷ lại vào máy tính làm cùn mòn tư duy nguyên bản.',
      con: 'Phản đối cấm: Trí tuệ nhân tạo là kỹ năng bắt buộc của tương lai; cần thay đổi đề thi sang dạng mở, đánh giá quy trình ứng dụng thay vì cấm đoán vô ích.'
    },
    defaultCoachTips: {
      keyOpponentPoints: ['Sinh viên sao chép bài mà không hiểu bản chất, dẫn đến rỗng kiến thức cơ bản.'],
      vulnerabilities: ['Việc cấm đoán là bất khả thi về mặt kỹ thuật do công cụ phát hiện văn bản tự động có tỷ lệ sai số cao.'],
      rebuttalDirections: ['Chuyển từ "Cấm đoán" sang "Quản trị và tích hợp có kiểm soát" kết hợp phỏng vấn vấn đáp.'],
      suggestedQuestions: ['Làm thế nào để nhà trường đào tạo nhân lực sẵn sàng cho thị trường lao động nếu sinh viên bị cấm dùng công cụ làm việc thực tế?']
    }
  },
  {
    id: 'tp-03',
    title: 'Làm việc từ xa có nên trở thành quyền mặc định của người lao động?',
    category: 'Kinh tế',
    difficulty: 'Dễ',
    practiceCount: 26,
    status: 'Đã xuất bản',
    updatedAt: '05/09/2026',
    author: 'ThS. Lê Hoàng An',
    summary: 'Cân nhắc giữa quyền tự chủ và chất lượng sống của nhân sự với văn hóa doanh nghiệp và hiệu suất cộng tác trực tiếp.',
    background: 'Mô hình làm việc linh hoạt trở thành tiêu chuẩn kỳ vọng của thế hệ lao động trẻ, nhưng gây lo ngại về gắn kết tổ chức.',
    references: [
      { title: 'Năng suất lao động và mô hình làm việc kết hợp', source: 'Viện Nghiên cứu Quản trị Kinh doanh' }
    ],
    sampleSides: {
      pro: 'Ủng hộ quyền làm việc từ xa: Giảm chi phí đi lại, mở rộng cơ hội việc làm vùng ngoại ô, tăng cân bằng cuộc sống.',
      con: 'Phản đối quyền mặc định: Tùy thuộc đặc thù ngành nghề, giảm gắn kết tổ chức và khó khăn trong việc kèm cặp nhân sự mới.'
    },
    defaultCoachTips: {
      keyOpponentPoints: ['Văn phòng truyền thống tạo ra văn hóa gắn kết và đào tạo nhân sự mới tốt hơn.'],
      vulnerabilities: ['Nhiều ngành công nghệ và tài chính đã chứng minh năng suất tăng khi làm việc từ xa.'],
      rebuttalDirections: ['Quyền mặc định không có nghĩa là bắt buộc 100% từ xa, mà là quyền được đề xuất và thương lượng bình đẳng.'],
      suggestedQuestions: ['Chi phí cơ hội về thời gian di chuyển và áp lực đô thị có đang làm giảm năng suất thực tế của người lao động không?']
    }
  },
  {
    id: 'tp-04',
    title: 'Phát triển xe tự hành có nên được ưu tiên hơn phát triển giao thông công cộng?',
    category: 'Công nghệ',
    difficulty: 'Khó',
    practiceCount: 18,
    status: 'Đã xuất bản',
    updatedAt: '02/09/2026',
    author: 'TS. Trần Văn Nam',
    summary: 'So sánh tính bền vững môi trường, chi phí hạ tầng và hiệu quả giải tỏa ùn tắc giữa xe tự hành cá nhân và hệ thống tàu điện, xe buýt điện.',
    background: 'Các đô thị lớn đang đối mặt với bài toán đầu tư công nghệ xe tự hành thông minh hay dồn ngân sách mở rộng mạng lưới đường sắt đô thị.',
    references: [
      { title: 'Tương lai giao thông đô thị bền vững', source: 'Viện Quy hoạch Đô thị' }
    ],
    sampleSides: {
      pro: 'Ưu tiên xe tự hành: Tối ưu lưu lượng giao thông bằng thuật toán điều phối thông minh, giảm tai nạn do con người.',
      con: 'Ưu tiên giao thông công cộng: Khối lượng vận chuyển lớn, giảm phát thải carbon triệt để và phục vụ đại chúng bình đẳng.'
    },
    defaultCoachTips: {
      keyOpponentPoints: ['Xe tự hành là đỉnh cao công nghệ giúp loại bỏ phần lớn lỗi tai nạn do con người.'],
      vulnerabilities: ['Xe tự hành cá nhân vẫn chiếm dụng diện tích mặt đường, không giải quyết được vấn đề kẹt xe diện rộng.'],
      rebuttalDirections: ['Nhấn mạnh hiệu quả sử dụng không gian và năng lượng trên mỗi đầu hành khách của tàu điện và xe buýt.'],
      suggestedQuestions: ['Một thành phố 10 triệu dân có thể vận hành trơn tru nếu mỗi người sở hữu một chiếc xe tự hành riêng lẻ hay không?']
    }
  },
  {
    id: 'tp-05',
    title: 'Có nên áp thuế tiêu thụ đặc biệt lên đồ uống có đường để giảm tỷ lệ béo phì?',
    category: 'Đạo đức',
    difficulty: 'Trung bình',
    practiceCount: 22,
    status: 'Đã xuất bản',
    updatedAt: '28/08/2026',
    author: 'ThS. Lê Hoàng An',
    summary: 'Cân bằng giữa can thiệp chính sách y tế công cộng và quyền tự do lựa chọn tiêu dùng của người dân.',
    background: 'Nhiều quốc gia đã ban hành thuế đường để giảm gánh nặng chi phí y tế quốc gia do các bệnh không lây nhiễm.',
    references: [
      { title: 'Tác động kinh tế của thuế tiêu thụ đặc biệt lên nước ngọt', source: 'Tổ chức Y tế Thế giới' }
    ],
    sampleSides: {
      pro: 'Ủng hộ áp thuế: Tái định hướng hành vi tiêu dùng, tăng ngân sách tái đầu tư cho y tế cơ sở.',
      con: 'Phản đối áp thuế: Đánh thuế lũy thoái đánh mạnh vào người thu nhập thấp, can thiệp quá mức vào thị trường tự do.'
    },
    defaultCoachTips: {
      keyOpponentPoints: ['Thuế đường là thuế lũy thoái gây gánh nặng bất cân xứng lên người có thu nhập thấp.'],
      vulnerabilities: ['Người thu nhập thấp cũng là đối tượng chịu ảnh hưởng nặng nề nhất bởi chi phí chữa bệnh tiểu đường nếu không được phòng ngừa sớm.'],
      rebuttalDirections: ['Ngân sách thu từ thuế sẽ dùng để trợ giá thực phẩm dinh dưỡng và khám chữa bệnh miễn phí cho người yếu thế.'],
      suggestedQuestions: ['Chi phí chữa trị một ca biến chứng tiểu đường có vượt xa số tiền thuế một người phải trả hàng năm không?']
    }
  },
  {
    id: 'tp-06',
    title: 'Ứng dụng công nghệ chỉnh sửa gen người trong phôi thai có nên được hợp pháp hóa?',
    category: 'Đạo đức',
    difficulty: 'Khó',
    practiceCount: 12,
    status: 'Bản nháp',
    updatedAt: '01/09/2026',
    author: 'TS. Trần Văn Nam',
    summary: 'Tranh cãi đạo đức sinh học giữa việc xóa bỏ bệnh di truyền hiểm nghèo và nguy cơ tạo ra sự bất bình đẳng sinh học phân tầng xã hội.',
    background: 'Công nghệ chỉnh sửa gen tiến bộ nhanh chóng nhưng tiềm ẩn nguy cơ can thiệp phi y tế.',
    references: [
      { title: 'Tuyên ngôn Đạo đức Sinh học Quốc tế', source: 'Ủy ban Đạo đức Y sinh' }
    ],
    sampleSides: {
      pro: 'Ủng hộ: Chấm dứt nỗi đau của các gia đình mang gen bệnh tan máu bẩm sinh hoặc ung thư di truyền.',
      con: 'Phản đối: Nguy cơ thương mại hóa tạo ra bất bình đẳng và các biến đổi không thể đảo ngược trên dòng mầm di truyền.'
    },
    defaultCoachTips: {
      keyOpponentPoints: ['Nguy cơ phân hóa giai cấp sinh học giữa người có điều kiện và người bình thường.'],
      vulnerabilities: ['Chỉ đạo luật cấm hoàn toàn mới đẩy công nghệ vào thị trường chợ đen không kiểm soát; hợp pháp hóa có điều kiện giúp giám sát minh bạch.'],
      rebuttalDirections: ['Xây dựng khung pháp lý chặt chẽ: chỉ cho phép chữa bệnh di truyền đơn gen đe dọa tính mạng, tuyệt đối cấm can thiệp thẩm mỹ.'],
      suggestedQuestions: ['Nếu một công nghệ có thể cứu một đứa trẻ khỏi bệnh lý hiểm nghèo ngay từ trong bụng mẹ, việc cấm đoán có thực sự nhân đạo?']
    }
  }
];

export const RECENT_SESSIONS = [
  {
    id: 'ses-101',
    topicId: 'tp-01',
    topicTitle: 'Mạng xã hội có gây hại nhiều hơn mang lại lợi ích cho giới trẻ?',
    date: '10/09/2026',
    mode: 'Với AI',
    opponent: 'Đối thủ AI (Cấp độ: Trung bình)',
    side: 'Ủng hộ',
    score: 76,
    status: 'Hoàn thành',
    grade: 'Khá tốt',
    rubric: {
      argumentation: 8.0,
      evidence: 6.0,
      relevance: 8.5,
      structure: 7.5,
      persuasion: 7.0,
    },
    strengths: [
      'Cấu trúc luận điểm rõ ràng theo mô hình Luận điểm - Lý lẽ - Dẫn chứng.',
      'Phản xạ tốt trước các câu hỏi xoáy của đối thủ AI về quyền tự do kết nối.',
      'Sử dụng ngôn từ học thuật chuẩn mực, thái độ điềm tĩnh và lập luận logic.'
    ],
    improvements: [
      'Dẫn chứng số liệu còn chung chung, cần bổ sung số liệu thống kê hoặc báo cáo nghiên cứu cụ thể từ các viện nghiên cứu uy tín.',
      'Phần kết luận còn lặp lại luận điểm mở đầu mà chưa nâng tầm tổng kết tác động xã hội rộng lớn.'
    ],
    feedback: 'Màn thể hiện rất thuyết phục. Bạn đã kiểm soát tốt thời gian và giữ vững lập trường từ đầu đến cuối. Điểm cần khắc phục lớn nhất là tính xác thực và chiều sâu của các ví dụ thực tiễn.'
  },
  {
    id: 'ses-102',
    topicId: 'tp-03',
    topicTitle: 'Làm việc từ xa có nên trở thành quyền mặc định của người lao động?',
    date: '08/09/2026',
    mode: '1 vs 1',
    opponent: 'Nguyễn Đức Duy',
    side: 'Ủng hộ',
    score: 77,
    opponentScore: 76,
    status: 'Hoàn thành',
    grade: 'Thắng',
    rubric: {
      argumentation: 8.0,
      evidence: 6.5,
      relevance: 8.5,
      structure: 7.5,
      persuasion: 8.0,
    },
    opponentRubric: {
      argumentation: 7.5,
      evidence: 8.0,
      relevance: 8.0,
      structure: 7.0,
      persuasion: 7.5,
    },
    strengths: [
      'Phản biện sắc bén vào điểm yếu của đối thủ về việc áp đặt văn hóa doanh nghiệp cứng nhắc.',
      'Khả năng liên kết lập luận với thực tế kinh tế số rất nhanh nhạy.'
    ],
    improvements: [
      'Cần lắng nghe kỹ hơn phần luận điểm phụ của đối phương về chi phí an ninh mạng.'
    ],
    feedback: 'Trận đấu 1 vs 1 rất kịch tính. Trọng tài AI đánh giá cao khả năng làm chủ vòng phản biện của bạn, giúp bạn giành chiến thắng sít sao với cách biệt 1 điểm.'
  },
  {
    id: 'ses-103',
    topicId: 'tp-02',
    topicTitle: 'Nên cấm sử dụng Trí tuệ nhân tạo trong các bài kiểm tra học thuật?',
    date: '06/09/2026',
    mode: 'Với AI',
    opponent: 'Đối thủ AI (Cấp độ: Khó)',
    side: 'Phản đối',
    score: 74,
    status: 'Hoàn thành',
    grade: 'Khá',
    rubric: {
      argumentation: 7.5,
      evidence: 6.0,
      relevance: 8.0,
      structure: 7.5,
      persuasion: 7.0,
    }
  },
  {
    id: 'ses-104',
    topicId: 'tp-05',
    topicTitle: 'Có nên áp thuế tiêu thụ đặc biệt lên đồ uống có đường để giảm tỷ lệ béo phì?',
    date: '03/09/2026',
    mode: 'Với AI',
    opponent: 'Đối thủ AI (Cấp độ: Dễ)',
    side: 'Ủng hộ',
    score: 82,
    status: 'Hoàn thành',
    grade: 'Tốt',
    rubric: {
      argumentation: 8.5,
      evidence: 7.5,
      relevance: 8.5,
      structure: 8.0,
      persuasion: 8.0,
    }
  }
];

export const PVP_LEARNERS = [
  {
    id: 'pvp-u1',
    name: 'Nguyễn Đức Duy',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    matchCount: 18,
    avgScore: 78.5,
    status: 'Đang rảnh',
    rank: 'Hạng Kim Cương'
  },
  {
    id: 'pvp-u2',
    name: 'Lê Thu Hà',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    matchCount: 19,
    avgScore: 81.2,
    status: 'Đang rảnh',
    rank: 'Hạng Tinh Anh'
  },
  {
    id: 'pvp-u3',
    name: 'Trần Hoàng Nam',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    matchCount: 15,
    avgScore: 74.0,
    status: 'Trong trận',
    rank: 'Hạng Vàng'
  },
  {
    id: 'pvp-u4',
    name: 'Vũ Minh Anh',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    matchCount: 22,
    avgScore: 83.0,
    status: 'Đang rảnh',
    rank: 'Hạng Tinh Anh'
  }
];

export const PROGRESS_HISTORY = [
  { date: '15/08', score: 68, argumentation: 7.0, evidence: 5.5, relevance: 7.2 },
  { date: '20/08', score: 71, argumentation: 7.2, evidence: 5.8, relevance: 7.5 },
  { date: '26/08', score: 70, argumentation: 7.4, evidence: 5.6, relevance: 7.8 },
  { date: '01/09', score: 74, argumentation: 7.8, evidence: 6.0, relevance: 8.0 },
  { date: '06/09', score: 74, argumentation: 7.5, evidence: 6.0, relevance: 8.0 },
  { date: '08/09', score: 77, argumentation: 8.0, evidence: 6.5, relevance: 8.5 },
  { date: '10/09', score: 76, argumentation: 8.0, evidence: 6.2, relevance: 8.5 },
];
