export const initialProducts = [
  {
      id: "1",
      title: "Bàn phím không dây Logitech MX Mechanical",
      url: "https://example.com/ban-phim",
      description: "Trải nghiệm gõ phím yên tĩnh, phản hồi tốt với đèn nền thông minh. Thiết bị không thể thiếu cho bàn làm việc hiện đại.",
      category: "Công nghệ",
      tags: ["bàn phím", "năng suất", "không dây"],
      createdAt: new Date().toISOString()
  },
  {
      id: "2",
      title: "Chuột Logitech MX Master 3S",
      url: "https://example.com/chuot",
      description: "Thiết kế công thái học, cuộn siêu nhanh và click chuột không gây tiếng động.",
      category: "Công nghệ",
      tags: ["chuột", "công thái học"],
      createdAt: new Date(Date.now() - 10000).toISOString()
  },
  {
      id: "3",
      title: "Giá đỡ Laptop nhôm tối giản",
      url: "https://example.com/giado",
      description: "Làm từ nhôm cao cấp, hỗ trợ tản nhiệt thụ động hiệu quả.",
      category: "Phụ kiện",
      tags: ["giá đỡ", "bàn làm việc"],
      createdAt: new Date(Date.now() - 20000).toISOString()
  },
  {
      id: "4",
      title: "Đèn treo màn hình Baseus",
      url: "https://example.com/den",
      description: "Thiết kế quang học bất đối xứng giúp chống phản chiếu ánh sáng lên màn hình, bảo vệ mắt.",
      category: "Công nghệ",
      tags: ["ánh sáng", "bàn làm việc"],
      createdAt: new Date(Date.now() - 30000).toISOString()
  },
  {
      id: "5",
      title: "Cáp sạc Anker Power Delivery 100W",
      url: "https://example.com/capsac",
      description: "Khả năng sạc cực nhanh cho MacBook và iPad của bạn.",
      category: "Phụ kiện",
      tags: ["cáp sạc", "sạc nhanh"],
      createdAt: new Date(Date.now() - 40000).toISOString()
  }
];

export const AVAILABLE_CATEGORIES = ["Tất cả", "Công nghệ", "Phụ kiện", "Đời sống", "Phần mềm"];
