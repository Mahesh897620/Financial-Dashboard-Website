/**
 * Unit Tests for Analytics Sections
 * Tests Requirements: 3.1-3.4, 6.1-6.4, 7.1-7.3, 8.1-8.5, 9.1-9.3
 */

describe('Spending Activity Section', () => {
  test('spending activity section exists', () => {
    const section = document.querySelector('.spending-activity-section');
    expect(section).toBeInTheDocument();
  });

  test('displays section title', () => {
    const title = document.querySelector('.spending-activity-section h3');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain('Spending');
  });

  test('displays time period label', () => {
    const timePeriod = document.querySelector('.time-period');
    expect(timePeriod).toBeInTheDocument();
  });

  test('has chart container', () => {
    const chartContainer = document.querySelector('.spending-activity-section .chart-container');
    expect(chartContainer).toBeInTheDocument();
  });
});

describe('Spending by Category Section', () => {
  test('category section exists', () => {
    const section = document.querySelector('.category-chart-section');
    expect(section).toBeInTheDocument();
  });

  test('displays section title', () => {
    const title = document.querySelector('.category-chart-section h3');
    expect(title).toBeInTheDocument();
  });

  test('has time filter dropdown', () => {
    const filter = document.querySelector('.time-filter');
    expect(filter).toBeInTheDocument();
  });

  test('has chart container', () => {
    const chartContainer = document.querySelector('.category-chart-section .chart-container');
    expect(chartContainer).toBeInTheDocument();
  });
});

describe('Monthly Budget Section', () => {
  test('budget section exists', () => {
    const section = document.querySelector('.budget-section');
    expect(section).toBeInTheDocument();
  });

  test('displays section title', () => {
    const title = document.querySelector('.budget-section h3');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain('Budget');
  });

  test('has budget progress container', () => {
    const progress = document.querySelector('.budget-progress');
    expect(progress).toBeInTheDocument();
  });
});

describe('Income vs Expenses Section', () => {
  test('income vs expenses section exists', () => {
    const section = document.querySelector('.income-expenses-section');
    expect(section).toBeInTheDocument();
  });

  test('displays section title', () => {
    const title = document.querySelector('.income-expenses-section h3');
    expect(title).toBeInTheDocument();
  });

  test('has chart container', () => {
    const chartContainer = document.querySelector('.income-expenses-section .chart-container');
    expect(chartContainer).toBeInTheDocument();
  });

  test('displays chart legend', () => {
    const legend = document.querySelector('.chart-legend');
    expect(legend).toBeInTheDocument();
  });

  test('legend has income indicator', () => {
    const legendItems = Array.from(document.querySelectorAll('.legend-item'));
    const incomeItem = legendItems.find(item => item.textContent.includes('Income'));
    expect(incomeItem).toBeInTheDocument();
  });

  test('legend has expenses indicator', () => {
    const legendItems = Array.from(document.querySelectorAll('.legend-item'));
    const expensesItem = legendItems.find(item => item.textContent.includes('Expenses'));
    expect(expensesItem).toBeInTheDocument();
  });
});

describe('Recurring Subscriptions Section', () => {
  test('subscriptions section exists', () => {
    const section = document.querySelector('.subscriptions-section');
    expect(section).toBeInTheDocument();
  });

  test('displays section title', () => {
    const title = document.querySelector('.subscriptions-section h3');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain('Subscription');
  });

  test('displays total monthly cost', () => {
    const total = document.querySelector('.subscription-total');
    expect(total).toBeInTheDocument();
    expect(total.textContent).toMatch(/\$/);
  });

  test('subscription total includes /mo indicator', () => {
    const total = document.querySelector('.subscription-total');
    expect(total.textContent).toMatch(/\/mo/);
  });
});
