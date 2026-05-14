/**
 * FundRise - Shared Auth & State Utilities
 * Included in every page for auth guards, navigation, and shared helpers.
 */

const Auth = {
    getUser() {
        return JSON.parse(localStorage.getItem('fr_user')) || null;
    },
    isLoggedIn() {
        return !!this.getUser();
    },
    logout() {
        localStorage.removeItem('fr_user');
        window.location.href = 'login.html';
    },
    // Pages that require login
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
        }
    },
    // Redirect logged-in users away from login page
    redirectIfLoggedIn() {
        if (this.isLoggedIn()) {
            window.location.href = 'index.html';
        }
    }
};

const Store = {
    getCampaigns() {
        return JSON.parse(localStorage.getItem('fr_campaigns')) || [
            { id: 1, title: 'Heart Surgery for Leo', category: 'medical', target: 10000, raised: 4200, deadline: '2026-06-15', desc: 'Urgent cardiac procedure needed for 6-year-old Leo. Every dollar brings him closer to a healthy life.', mediaUrl: null, likes: 42, donors: [{name:'Alice', amount:500, anon:false},{name:'Anonymous', amount:200, anon:true}], comments: [{user:'John', text:'Praying for Leo!', date:'2026-04-01'}], ownerId: 'user1' },
            { id: 2, title: 'Community Library Build', category: 'education', target: 25000, raised: 18000, deadline: '2026-09-01', desc: 'Building a safe learning space for underprivileged kids in our community.', mediaUrl: null, likes: 89, donors: [], comments: [], ownerId: 'user2' },
            { id: 3, title: 'Funeral Support for the Mensah Family', category: 'funeral', target: 5000, raised: 3100, deadline: '2026-05-01', desc: 'Help cover funeral costs for a beloved community member.', mediaUrl: null, likes: 31, donors: [], comments: [], ownerId: 'user3' },
            { id: 4, title: 'Local Bakery Startup', category: 'business', target: 8000, raised: 2200, deadline: '2026-07-20', desc: 'Help Afia launch her dream bakery in the heart of Sunyani.', mediaUrl: null, likes: 17, donors: [], comments: [], ownerId: 'user4' }
        ];
    },
    saveCampaigns(campaigns) {
        localStorage.setItem('fr_campaigns', JSON.stringify(campaigns));
    },
    getCampaignById(id) {
        return this.getCampaigns().find(c => c.id == id) || null;
    },
    saveCurrentCampaignId(id) {
        sessionStorage.setItem('fr_current_campaign', id);
    },
    getCurrentCampaignId() {
        return sessionStorage.getItem('fr_current_campaign');
    }
};

function showToast(msg, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3500);
}

function renderNavbar(activePage) {
    const user = Auth.getUser();
    return `
    <header class="navbar">
        <div class="nav-inner">
            <a href="index.html" class="nav-logo">FundRise</a>
            <nav class="nav-links">
                <a href="index.html" class="${activePage==='home'?'active':''}">Home</a>
                <a href="create.html" class="${activePage==='create'?'active':''}">Start Campaign</a>
                <a href="faq.html" class="${activePage==='faq'?'active':''}">Help / FAQ</a>
            </nav>
            <div class="nav-auth">
                ${user
                    ? `<a href="profile.html" class="nav-user ${activePage==='profile'?'active':''}">${user.name}</a>
                       <button class="btn btn-ghost" onclick="Auth.logout()">Logout</button>`
                    : `<a href="login.html" class="btn btn-ghost">Login</a>
                       <a href="login.html#register" class="btn btn-primary">Register</a>`
                }
            </div>
            <button class="nav-hamburger" onclick="document.querySelector('.nav-links').classList.toggle('open')">&#9776;</button>
        </div>
    </header>`;
}
