// Financial Dashboard JavaScript

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-bs-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'bi bi-moon-fill';
        } else {
            themeIcon.className = 'bi bi-sun-fill';
        }
    }
});

// Chart Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    animateCounters();
    initializeTransactionForm();
});

// Initialize Charts
function initializeCharts() {
    // Income vs Expenses Chart
    const incomeExpenseCtx = document.getElementById('incomeExpenseChart');
    if (incomeExpenseCtx) {
        new Chart(incomeExpenseCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Income',
                    data: [8200, 8400, 8100, 8600, 8300, 8420],
                    borderColor: '#198754',
                    backgroundColor: 'rgba(25, 135, 84, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Expenses',
                    data: [3200, 3400, 3100, 3600, 3300, 3280],
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Expense Breakdown Chart
    const expenseCtx = document.getElementById('expenseChart');
    if (expenseCtx) {
        new Chart(expenseCtx, {
            type: 'doughnut',
            data: {
                labels: ['Food & Dining', 'Transportation', 'Shopping', 'Bills', 'Entertainment', 'Other'],
                datasets: [{
                    data: [420, 280, 350, 180, 150, 100],
                    backgroundColor: [
                        '#0d6efd',
                        '#198754',
                        '#ffc107',
                        '#dc3545',
                        '#0dcaf0',
                        '#6c757d'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
}

// Animate Counter Numbers
function animateCounters() {
    const counters = document.querySelectorAll('.card-title');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        if (text.includes('$') || text.includes('%')) {
            const target = parseFloat(text.replace(/[$,%]/g, ''));
            const isPercentage = text.includes('%');
            const isCurrency = text.includes('$');
            
            animateValue(counter, 0, target, 2000, isPercentage, isCurrency);
        }
    });
}

function animateValue(element, start, end, duration, isPercentage = false, isCurrency = false) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = progress * (end - start) + start;
        
        let displayValue = Math.floor(current);
        if (isCurrency) {
            displayValue = '$' + displayValue.toLocaleString() + '.00';
        } else if (isPercentage) {
            displayValue = displayValue + '%';
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Transaction Form Handling
function initializeTransactionForm() {
    const form = document.getElementById('transactionForm');
    const dateInput = document.getElementById('transactionDate');
    
    // Set default date to today
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }
}

// Add Transaction Function
function addTransaction() {
    const form = document.getElementById('transactionForm');
    const formData = new FormData(form);
    
    // Get form values
    const type = document.getElementById('transactionType').value;
    const amount = document.getElementById('transactionAmount').value;
    const category = document.getElementById('transactionCategory').value;
    const description = document.getElementById('transactionDescription').value;
    const date = document.getElementById('transactionDate').value;
    
    // Validate form
    if (!type || !amount || !category || !description || !date) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    // Create transaction object
    const transaction = {
        id: Date.now(),
        type: type,
        amount: parseFloat(amount),
        category: category,
        description: description,
        date: date,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveTransaction(transaction);
    
    // Show success message
    showAlert('Transaction added successfully!', 'success');
    
    // Reset form and close modal
    form.reset();
    document.getElementById('transactionDate').valueAsDate = new Date();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addTransactionModal'));
    modal.hide();
    
    // Update UI
    updateDashboard();
}

// Save transaction to localStorage
function saveTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.unshift(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Show alert message
function showAlert(message, type) {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertContainer.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    alertContainer.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (alertContainer.parentNode) {
            alertContainer.remove();
        }
    }, 3000);
}

// Update dashboard with new data
function updateDashboard() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    if (transactions.length > 0) {
        // Update recent transactions table
        updateRecentTransactions(transactions.slice(0, 4));
        
        // Update stats (simplified calculation)
        updateStats(transactions);
    }
}

// Update recent transactions table
function updateRecentTransactions(transactions) {
    const tbody = document.querySelector('.table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        const isIncome = transaction.type === 'income';
        const iconClass = getTransactionIcon(transaction.category);
        const iconColor = isIncome ? 'bg-success' : 'bg-danger';
        const amountClass = isIncome ? 'text-success' : 'text-danger';
        const amountPrefix = isIncome ? '+' : '-';
        
        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <div class="transaction-icon ${iconColor}">
                        <i class="bi ${iconClass}"></i>
                    </div>
                    <div class="ms-3">
                        <h6 class="mb-0">${transaction.description}</h6>
                        <small class="text-muted">${formatDate(transaction.date)}</small>
                    </div>
                </div>
            </td>
            <td class="text-end">
                <span class="${amountClass} fw-bold">${amountPrefix}$${transaction.amount.toFixed(2)}</span>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Get transaction icon based on category
function getTransactionIcon(category) {
    const icons = {
        'food': 'bi-cup-straw',
        'transport': 'bi-fuel-pump',
        'shopping': 'bi-cart',
        'bills': 'bi-receipt',
        'entertainment': 'bi-controller',
        'salary': 'bi-arrow-down',
        'other': 'bi-three-dots'
    };
    
    return icons[category] || 'bi-three-dots';
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today, ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday, ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } else {
        return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
}

// Update stats (simplified)
function updateStats(transactions) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
    });
    
    const income = monthlyTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = monthlyTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    // Update UI elements (if they exist)
    const incomeElement = document.querySelector('.stat-card-success .card-title');
    const expenseElement = document.querySelector('.stat-card-warning .card-title');
    
    if (incomeElement) {
        incomeElement.textContent = '$' + income.toLocaleString() + '.00';
    }
    
    if (expenseElement) {
        expenseElement.textContent = '$' + expenses.toLocaleString() + '.00';
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn[data-loading]')) {
        const btn = e.target;
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span class="loading"></span> Loading...';
        btn.disabled = true;
        
        // Simulate loading (remove this in real implementation)
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }
});

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Load saved transactions on page load
document.addEventListener('DOMContentLoaded', function() {
    updateDashboard();
});