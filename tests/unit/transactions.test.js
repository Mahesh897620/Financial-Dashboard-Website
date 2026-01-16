/**
 * Unit Tests for Transactions Section
 * Tests Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 */

describe('Transactions Section', () => {
  test('transactions section exists', () => {
    const section = document.querySelector('.transactions-section');
    expect(section).toBeInTheDocument();
  });

  test('displays section title', () => {
    const title = document.querySelector('.transactions-section h3');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain('Transaction');
  });

  test('displays "View All" link', () => {
    const viewAllLink = document.querySelector('.view-all-link');
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink.textContent).toContain('View All');
  });

  test('displays transaction list', () => {
    const list = document.querySelector('.transactions-list');
    expect(list).toBeInTheDocument();
  });

  test('displays multiple transaction items', () => {
    const items = document.querySelectorAll('.transaction-item');
    expect(items.length).toBeGreaterThan(0);
  });

  test('each transaction has an icon', () => {
    const items = document.querySelectorAll('.transaction-item');
    items.forEach(item => {
      const icon = item.querySelector('.transaction-icon');
      expect(icon).toBeInTheDocument();
    });
  });

  test('each transaction has details section', () => {
    const items = document.querySelectorAll('.transaction-item');
    items.forEach(item => {
      const details = item.querySelector('.transaction-details');
      expect(details).toBeInTheDocument();
    });
  });

  test('each transaction has a name/description', () => {
    const items = document.querySelectorAll('.transaction-item');
    items.forEach(item => {
      const name = item.querySelector('.transaction-name');
      expect(name).toBeInTheDocument();
      expect(name.textContent.length).toBeGreaterThan(0);
    });
  });

  test('each transaction has a date', () => {
    const items = document.querySelectorAll('.transaction-item');
    items.forEach(item => {
      const date = item.querySelector('.transaction-date');
      expect(date).toBeInTheDocument();
    });
  });

  test('each transaction has an amount', () => {
    const items = document.querySelectorAll('.transaction-item');
    items.forEach(item => {
      const amount = item.querySelector('.transaction-amount');
      expect(amount).toBeInTheDocument();
    });
  });

  test('transaction amounts include dollar sign', () => {
    const amounts = document.querySelectorAll('.transaction-amount');
    amounts.forEach(amount => {
      expect(amount.textContent).toMatch(/\$/);
    });
  });
});
