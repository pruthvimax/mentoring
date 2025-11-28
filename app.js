/* Frontend-only app.js
   - This file contains placeholder functions for handling forms and UI interactions.
   - Replace fetch() calls with your backend API endpoints (Node.js + MongoDB Atlas) later.
*/

// Utilities
function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }
function formatDate(d){ const dt = new Date(d); return dt.toLocaleDateString(); }

// Demo: populate current year in footer
document.addEventListener('DOMContentLoaded', ()=>{
  const y = new Date().getFullYear(); const el = document.getElementById('year'); if(el) el.textContent = y;
});

// ------- Register Form (placeholder) -------
const registerForm = qs('#registerForm');
if(registerForm){
  registerForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(registerForm).entries());
    if(data.password !== data.confirmPassword){ alert('Passwords do not match'); return; }
    // TODO: call backend API to create user
    console.log('Register payload', data);
    alert('Registered (demo). Implement backend POST /api/register to save user.');
    window.location.href = 'login.html';
  });
}

// ------- Login Form (placeholder) -------
const loginForm = qs('#loginForm');
if(loginForm){
  loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(loginForm).entries());
    // TODO: call backend API to authenticate
    console.log('Login payload', data);
    alert('Logged in (demo). Implement backend POST /api/login to authenticate and redirect based on role.');
    // Simple demo redirect based on selected role
    if(data.role === 'student') window.location.href = 'studentDashboard.html';
    else if(data.role === 'staff') window.location.href = 'staffDashboard.html';
    else if(data.role === 'hod') window.location.href = 'hodDashboard.html';
  });
}

// ------- Student Mentoring Form -------
const mentoringForm = qs('#mentoringForm');
if(mentoringForm){
  mentoringForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(mentoringForm).entries());
    console.log('Mentoring record to save', data);
    // TODO: POST to /api/students/:id/records
    alert('Saved (demo). Implement backend POST /api/students/:id/records to persist.');
    window.location.href = 'studentDashboard.html';
  });
  const cancel = qs('#cancel'); if(cancel) cancel.addEventListener('click', ()=>window.location.href='studentDashboard.html');
}

// ------- Simple table population for dashboards (demo data) -------
function sampleRecords(){
  return [
    {id:'r1', student:'A. Kumar', date:'2025-09-12', semester:'5', sgpa:'8.2', attendance:'92', goals:'Improve algorithm skills', mentor:'Dr. S', hod:'--'},
    {id:'r2', student:'B. Sharma', date:'2025-08-01', semester:'3', sgpa:'7.1', attendance:'85', goals:'Better time management', mentor:'Prof. R', hod:'--'}
  ];
}

function populateStudentTable(){
  const table = qs('#recordsTable'); if(!table) return;
  const tbody = table.querySelector('tbody'); tbody.innerHTML='';
  sampleRecords().forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${formatDate(r.date)}</td><td>${r.semester}</td><td>${r.sgpa}</td><td>${r.attendance}%</td><td>${r.goals}</td><td>${r.mentor}</td><td>${r.hod}</td><td><a class='action-link' href='studentForm.html?edit=${r.id}'>Edit</a></td>`;
    tbody.appendChild(tr);
  });
}

function populateStaffTable(){
  const table = qs('#submissionsTable'); if(!table) return;
  const tbody = table.querySelector('tbody'); tbody.innerHTML='';
  sampleRecords().forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.student}</td><td>${formatDate(r.date)}</td><td>${r.semester}</td><td>${r.goals}</td><td>${r.mentor||'--'}</td><td><a class='action-link' href='mentorReview.html?rid=${r.id}'>Open</a></td>`;
    tbody.appendChild(tr);
  });
}

function populateHodTable(){
  const table = qs('#allRecordsTable'); if(!table) return;
  const tbody = table.querySelector('tbody'); tbody.innerHTML='';
  sampleRecords().forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.student}</td><td>${formatDate(r.date)}</td><td>${r.goals}</td><td>${r.mentor}</td><td>${r.hod||'--'}</td><td><a class='action-link' href='hodReview.html?rid=${r.id}'>Open</a></td>`;
    tbody.appendChild(tr);
  });
}

// populate tables on pages
document.addEventListener('DOMContentLoaded', ()=>{
  populateStudentTable();
  populateStaffTable();
  populateHodTable();

  // Mentor/HOD review page: show demo record
  const rv = qs('#recordView');
  if(rv){ const params = new URLSearchParams(location.search); const rid = params.get('rid') || 'r1'; const rec = sampleRecords().find(x=>x.id===rid) || sampleRecords()[0];
    rv.innerHTML = `<div class='card'><h3>${rec.student}</h3><p><strong>Date:</strong> ${formatDate(rec.date)}</p><p><strong>Goal:</strong> ${rec.goals}</p></div>`;
  }
});
