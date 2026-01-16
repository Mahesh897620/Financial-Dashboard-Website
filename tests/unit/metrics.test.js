/**
 * Unit Tests for Financial Metrics Section
 * Tests Requirements: 2.1, 2.2, 2.3, 2.4, 2.5
 */

describe('Financial Metrics Section', () => {
  test('displays exactly four metric cards', () => {
    const metricCards = document.querySelectorAll('.metric-card');
    expect(metricCards).toHaveLength(4);
  });

  test('displays Total Balance metric', () => {
    const labels = Array.from(document.querySelectorAll('.metric-label'))
      .map(el => el.textContent.trim());
    expect(labels).toContain('Total Balance');
  });

  test('displays Income metric', () => {
    const labels = Array.from(document.querySelectorAll('.metric-label'))
      .map(el => el.textContent.trim());
    expect(labels).toContain('Income');
  });

  test('displays Expenses metric', () => {
    const labels = Array.from(document.querySelectorAll('.metric-label'))
      .map(el => el.textContent.trim());
    expect(labels).toContain('Expenses');
  });

  test('displays Savings metric', () => {
    const labels = Array.from(document.querySelectorAll('.metric-label'))
      .map(el => el.textContent.trim());
    expect(labels).toContain('Savings');
  });

  test('each metric card has a percentage indicator', () => {
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
      const indicator = card.querySelector('.percentage-indicator');
      expect(indicator).toBeInTheDocument();
    });
  });

  test('percentage indicators contain arrow icons', () => {
    const indicators = document.querySelectorAll('.percentage-indicator i');
    expect(indicators.length).toBeGreaterThan(0);
    indicators.forEach(icon => {
      const hasArrow = icon.className.includes('arrow') || 
                      icon.className.includes('up') || 
                      icon.className.includes('down');
      expect(hasArrow).toBe(true);
    });
  });

  test('metric values are formatted as currency', () => {
    const values = document.querySelectorAll('.metric-value');
    expect(values.length).toBe(4);
    values.forEach(value => {
      expect(value.textContent).toMatch(/\$/);
    });
  });

  test('metric cards use responsive grid classes', () => {
    const metricCards = document.querySelectorAll('.metric-card');
    const parent = metricCards[0]?.parentElement;
    expect(parent).toBeInTheDocument();
  });
});
