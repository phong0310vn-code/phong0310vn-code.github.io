const passwordInput = document.getElementById('password');
const strengthText = document.getElementById('strength-text');
const progress = document.getElementById('progress');
const form = document.getElementById('registrationForm');

// 1. Xử lý độ mạnh mật khẩu theo thời gian thực
passwordInput.addEventListener('input', function() {
    const value = passwordInput.value;
    let strength = 0;

    if (value.length === 0) {
        updateUI(0, "Chưa nhập", "#ddd", "0%");
        return;
    }

    // Điều kiện 1: Có chữ và có số
    const hasLetters = /[a-zA-Z]/.test(value);
    const hasNumbers = /[0-9]/.test(value);

    if (hasLetters || hasNumbers) strength = 1; // Yếu
    if (hasLetters && hasNumbers) strength = 2; // Trung bình
    if (hasLetters && hasNumbers && value.length >= 8) strength = 3; // Mạnh

    // Cập nhật giao diện
    if (strength === 1) updateUI(1, "Yếu", "#e74c3c", "33%");
    if (strength === 2) updateUI(2, "Trung bình", "#f1c40f", "66%");
    if (strength === 3) updateUI(3, "Mạnh", "#2ecc71", "100%");
});

function updateUI(level, text, color, width) {
    strengthText.innerText = text;
    strengthText.style.color = color;
    progress.style.backgroundColor = color;
    progress.style.width = width;
}

// 2. Kiểm tra dữ liệu khi bấm nút Đăng ký
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngừng tải lại trang

    const username = document.getElementById('username').value;
    const password = passwordInput.value;
    const fileInput = document.getElementById('profilePic');
    const file = fileInput.files[0];

    // Kiểm tra Username
    if (username.length < 5 || username.length > 15) {
        alert("Lỗi: Tên đăng nhập phải từ 5 đến 15 ký tự!");
        return;
    }

    // Kiểm tra Password (phải có cả chữ và số)
    const passRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;
    if (!passRegex.test(password)) {
        alert("Lỗi: Mật khẩu phải bao gồm cả chữ và số!");
        return;
    }

    // Kiểm tra File ảnh
    if (file) {
        const fileName = file.name.toLowerCase();
        if (!(fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png'))) {
            alert("Lỗi: Chỉ chấp nhận ảnh định dạng JPG hoặc PNG!");
            return;
        }
    }

    // Nếu vượt qua tất cả
    alert("Chúc mừng! Bạn đã đăng ký thành công.");
    form.reset();
    updateUI(0, "Chưa nhập", "#ddd", "0%");
});