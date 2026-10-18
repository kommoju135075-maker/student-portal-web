/* ==========================================================================
   STUDENT PORTAL WEB APPLICATION - SCRIPT.JS
   B.Tech AIDS 3rd Semester Examination Project (Frontend Demonstration)
   ========================================================================== */

/* 
  DISCLAIMER: This application is a 3rd semester frontend project demonstration.
  Login details entered by the user dynamically update the dashboard UI.
  Academic attendance and marks are sample demo data and not retrieved from a real server.
*/

// Dynamic user session state
let loggedInUser = {
    name: "",
    rollNo: "",
    email: "",
    customPhotoUrl: null
};

// Sample Subject-wise Attendance Data for 3rd Sem AIDS (Demo)
const sampleAttendanceData = [
    { code: "AIDS301", name: "Data Structures & Algorithms", attended: 28, total: 32 },
    { code: "AIDS302", name: "Object Oriented Programming (Python/C++)", attended: 22, total: 30 },
    { code: "AIDS303", name: "Discrete Mathematics & Graph Theory", attended: 25, total: 28 },
    { code: "AIDS304", name: "Database Management Systems (DBMS)", attended: 24, total: 30 },
    { code: "AIDS305", name: "Digital Logic & Computer Architecture", attended: 21, total: 29 },
    { code: "AIDS306", name: "Probability & Statistics for Data Science", attended: 26, total: 30 }
];

// Sample Marks & Grades Data for 3rd Sem AIDS (Demo)
const sampleMarksData = [
    { name: "Data Structures & Algorithms", midTerm: "26/30", assignment: "18/20", endSem: "42/50", total: "86/100", grade: "A+" },
    { name: "Object Oriented Programming (Python/C++)", midTerm: "22/30", assignment: "16/20", endSem: "38/50", total: "76/100", grade: "B+" },
    { name: "Discrete Mathematics & Graph Theory", midTerm: "27/30", assignment: "19/20", endSem: "45/50", total: "91/100", grade: "O" },
    { name: "Database Management Systems (DBMS)", midTerm: "24/30", assignment: "17/20", endSem: "40/50", total: "81/100", grade: "A" },
    { name: "Digital Logic & Computer Architecture", midTerm: "20/30", assignment: "15/20", endSem: "35/50", total: "70/100", grade: "B" },
    { name: "Probability & Statistics for Data Science", midTerm: "25/30", assignment: "18/20", endSem: "43/50", total: "86/100", grade: "A+" }
];

// Common Weekly Timetable Data (3rd Sem B.Tech AIDS schedule)
const timetableData = {
    Monday: [
        { time: "09:30 AM - 11:00 AM", subject: "Data Structures & Algorithms", faculty: "Dr. Robert Davis", room: "Room 302" },
        { time: "11:15 AM - 12:45 PM", subject: "Database Management Systems", faculty: "Prof. Sarah Jenkins", room: "Lab 01" },
        { time: "02:00 PM - 03:30 PM", subject: "Discrete Mathematics", faculty: "Dr. Alan Turing", room: "Room 205" }
    ],
    Tuesday: [
        { time: "09:30 AM - 11:00 AM", subject: "Probability & Statistics", faculty: "Dr. Emily Blunt", room: "Room 303" },
        { time: "11:15 AM - 12:45 PM", subject: "Object Oriented Programming", faculty: "Prof. Michael Brown", room: "Lab 03" },
        { time: "02:00 PM - 03:30 PM", subject: "Digital Logic & Architecture", faculty: "Dr. Lisa Ray", room: "Room 202" }
    ],
    Wednesday: [
        { time: "09:30 AM - 11:00 AM", subject: "Discrete Mathematics", faculty: "Dr. Alan Turing", room: "Room 205" },
        { time: "11:15 AM - 12:45 PM", subject: "Data Structures & Algorithms", faculty: "Dr. Robert Davis", room: "Room 302" },
        { time: "02:00 PM - 03:30 PM", subject: "Database Management Systems", faculty: "Prof. Sarah Jenkins", room: "Lab 01" }
    ],
    Thursday: [
        { time: "09:30 AM - 11:00 AM", subject: "Object Oriented Programming", faculty: "Prof. Michael Brown", room: "Lab 03" },
        { time: "11:15 AM - 12:45 PM", subject: "Probability & Statistics", faculty: "Dr. Emily Blunt", room: "Room 303" },
        { time: "02:00 PM - 03:30 PM", subject: "Digital Logic & Architecture", faculty: "Dr. Lisa Ray", room: "Room 202" }
    ],
    Friday: [
        { time: "09:30 AM - 11:00 AM", subject: "Database Management Systems", faculty: "Prof. Sarah Jenkins", room: "Lab 01" },
        { time: "11:15 AM - 12:45 PM", subject: "Data Structures & Algorithms", faculty: "Dr. Robert Davis", room: "Room 302" },
        { time: "02:00 PM - 03:30 PM", subject: "Discrete Mathematics", faculty: "Dr. Alan Turing", room: "Room 205" }
    ]
};

// College Announcements Data
const announcementsData = [
    {
        title: "3rd Semester Examination Schedule Released",
        category: "Exams",
        date: "Oct 18, 2026",
        description: "The final examination timetable for B.Tech AIDS 3rd Semester has been published. Students are required to verify their seating arrangements.",
        urgent: true
    },
    {
        title: "Data Structures & Algo Hackathon 2026",
        category: "Events",
        date: "Oct 15, 2026",
        description: "Register your teams for the 3rd semester competitive programming and logic building challenge hosted in the university lab.",
        urgent: false
    },
    {
        title: "Mid-Term Attendance Shortage Warning",
        category: "Urgent",
        date: "Oct 10, 2026",
        description: "Students with less than 75% attendance in 3rd semester subjects must meet their faculty advisors immediately with medical certificates if applicable.",
        urgent: true
    },
    {
        title: "Guest Lecture on SQL & Modern DBMS Concepts",
        category: "Academic",
        date: "Oct 05, 2026",
        description: "A mandatory guest lecture by senior database engineers on relational and NoSQL systems will be conducted in Seminar Hall 1 at 10:00 AM.",
        urgent: false
    }
];

/* ==========================================================================
   INITIALS GENERATOR & PHOTO HANDLERS
   ========================================================================== */

function getInitials(name) {
    if (!name) return "ST";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function updateAvatars() {
    const initials = getInitials(loggedInUser.name);
    
    const navInitials = document.getElementById('nav-initials');
    const profileInitials = document.getElementById('profile-initials');
    const navImg = document.getElementById('nav-avatar-img');
    const profileImg = document.getElementById('profile-avatar-img');
    const removeBtn = document.getElementById('remove-photo-btn');

    if (loggedInUser.customPhotoUrl) {
        if (navImg) { navImg.src = loggedInUser.customPhotoUrl; navImg.classList.remove('hidden'); }
        if (profileImg) { profileImg.src = loggedInUser.customPhotoUrl; profileImg.classList.remove('hidden'); }
        if (navInitials) navInitials.classList.add('hidden');
        if (profileInitials) profileInitials.classList.add('hidden');
        if (removeBtn) removeBtn.classList.remove('hidden');
    } else {
        if (navInitials) { navInitials.textContent = initials; navInitials.classList.remove('hidden'); }
        if (profileInitials) { profileInitials.textContent = initials; profileInitials.classList.remove('hidden'); }
        if (navImg) navImg.classList.add('hidden');
        if (profileImg) profileImg.classList.add('hidden');
        if (removeBtn) removeBtn.classList.add('hidden');
    }
}

function triggerFileInput() {
    document.getElementById('photo-file-input').click();
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            loggedInUser.customPhotoUrl = e.target.result;
            updateAvatars();
        };
        reader.readAsDataURL(file);
    }
}

function removePhoto() {
    loggedInUser.customPhotoUrl = null;
    document.getElementById('photo-file-input').value = "";
    updateAvatars();
}

/* ==========================================================================
   VIEW SWITCHING & AUTHENTICATION CONTROLLERS
   ========================================================================== */

function showLogin() {
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('portal-view').classList.add('hidden');
    document.getElementById('login-view').classList.remove('hidden');
    
    document.getElementById('student-name').value = '';
    document.getElementById('student-id').value = '';
    document.getElementById('student-password').value = '';
    const errorDiv = document.getElementById('login-error');
    if (errorDiv) {
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';
    }
}

function showHome() {
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('portal-view').classList.add('hidden');
    document.getElementById('home-view').classList.remove('hidden');
}

function handleLogin(event) {
    event.preventDefault();
    const nameInput = document.getElementById('student-name').value.trim();
    const studentIdInput = document.getElementById('student-id').value.trim().toUpperCase();
    const passwordInput = document.getElementById('student-password').value;
    const errorDiv = document.getElementById('login-error');

    if (!nameInput || !studentIdInput || !passwordInput) {
        errorDiv.textContent = "Please fill in all fields (Name, Student ID, and Password).";
        errorDiv.classList.remove('hidden');
        return;
    }

    loggedInUser.name = nameInput;
    loggedInUser.rollNo = studentIdInput;
    
    const formattedEmailName = nameInput.toLowerCase().replace(/[^a-z0-9]/g, '.');
    loggedInUser.email = `${formattedEmailName}@campusconnect.edu`;

    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('portal-view').classList.remove('hidden');

    updateUserInterface();
    switchSection('dashboard');
}

function handleLogout() {
    loggedInUser = { name: "", rollNo: "", email: "", customPhotoUrl: null };
    showLogin();
}

function updateUserInterface() {
    const navUserName = document.getElementById('nav-user-name');
    if (navUserName) navUserName.textContent = loggedInUser.name;

    const welcomeBannerText = document.getElementById('welcome-banner-text');
    if (welcomeBannerText) welcomeBannerText.textContent = `Welcome back, ${loggedInUser.name}! 👋`;

    const profileName = document.getElementById('profile-name');
    if (profileName) profileName.textContent = loggedInUser.name;

    const profileRoll = document.getElementById('profile-roll');
    if (profileRoll) profileRoll.textContent = loggedInUser.rollNo;

    const profileEmail = document.getElementById('profile-email');
    if (profileEmail) profileEmail.textContent = loggedInUser.email;

    updateAvatars();

    populateAttendance();
    populateMarks();
}

function switchSection(targetId) {
    const sections = document.querySelectorAll('.portal-section');
    sections.forEach(sec => sec.classList.remove('active'));

    const targetSection = document.getElementById(`section-${targetId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        if (link.getAttribute('data-target') === targetId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const titles = {
        dashboard: "Dashboard",
        profile: "Student Profile",
        attendance: "Subject-wise Attendance",
        marks: "Marks & Grades",
        timetable: "Weekly Timetable",
        announcements: "College Announcements"
    };
    
    if (titles[targetId]) {
        document.getElementById('current-page-title').textContent = titles[targetId];
    }

    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   DYNAMIC DATA POPULATION FUNCTIONS
   ========================================================================== */

function populateAttendance() {
    const tbody = document.getElementById('attendance-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    sampleAttendanceData.forEach(item => {
        const percentage = ((item.attended / item.total) * 100).toFixed(1);
        const isShort = percentage < 75;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.code}</strong></td>
            <td>${item.name}</td>
            <td>${item.attended}</td>
            <td>${item.total}</td>
            <td><strong>${percentage}%</strong></td>
            <td>
                ${isShort 
                    ? '<span class="text-danger"><i class="fa-solid fa-triangle-exclamation"></i> Shortage (&lt;75%)</span>' 
                    : '<span class="text-success"><i class="fa-solid fa-circle-check"></i> Safe (&ge;75%)</span>'}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function populateMarks() {
    const tbody = document.getElementById('marks-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    sampleMarksData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>${item.midTerm}</td>
            <td>${item.assignment}</td>
            <td>${item.endSem}</td>
            <td><strong>${item.total}</strong></td>
            <td><span class="badge-date">${item.grade}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function populateTimetable(day = 'Monday') {
    const tbody = document.getElementById('timetable-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    const daySchedule = timetableData[day] || [];

    if (daySchedule.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No classes scheduled for ${day}.</td></tr>`;
        return;
    }

    daySchedule.forEach(slot => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="badge-date">${slot.time}</span></td>
            <td><strong>${slot.subject}</strong></td>
            <td>${slot.faculty}</td>
            <td>${slot.room}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateAnnouncements() {
    const grid = document.getElementById('announcements-grid-container');
    if (!grid) return;

    grid.innerHTML = '';

    announcementsData.forEach(notice => {
        const card = document.createElement('div');
        card.className = `announcement-card ${notice.urgent ? 'urgent' : ''}`;
        card.innerHTML = `
            <div>
                <div class="announcement-header">
                    <span class="announcement-category">${notice.category}</span>
                    <span class="announcement-date"><i class="fa-regular fa-calendar"></i> ${notice.date}</span>
                </div>
                <h3>${notice.title}</h3>
                <p>${notice.description}</p>
            </div>
            <div class="announcement-footer">
                <span>Official Circular &bull; CampusConnect</span>
            </div>
        `;
        grid.appendChild(card);
    });

    const dashboardNoticeList = document.getElementById('dashboard-notice-list');
    if (dashboardNoticeList) {
        dashboardNoticeList.innerHTML = '';
        announcementsData.slice(0, 2).forEach(notice => {
            const li = document.createElement('li');
            li.className = 'notice-preview-item';
            li.innerHTML = `
                <h5>${notice.title}</h5>
                <p>${notice.date} &bull; ${notice.category}</p>
            `;
            dashboardNoticeList.appendChild(li);
        });
    }
}

/* ==========================================================================
   EVENT LISTENERS & INITIALIZATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu-link[data-target]');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            switchSection(target);
        });
    });

    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }

    const dayButtons = document.querySelectorAll('.day-btn');
    dayButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            dayButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedDay = btn.getAttribute('data-day');
            populateTimetable(selectedDay);
        });
    });

    populateTimetable('Monday');
    populateAnnouncements();

    const dayLabel = document.getElementById('current-day-label');
    if (dayLabel) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date().getDay();
        const currentDayName = today === 0 ? 'Monday' : days[today];
        dayLabel.textContent = currentDayName;
    }
});