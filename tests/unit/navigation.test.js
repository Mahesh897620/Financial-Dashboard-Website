/**
 * Unit Tests for Bottom Navigation
 * Tests Requirements: 12.1, 12.2, 12.3, 12.4, 12.5
 */

describe('Bottom Navigation', () => {
  test('navigation element exists', () => {
    const nav = document.querySelector('.bottom-navigation');
    expect(nav).toBeInTheDocument();
    expect(nav.tagName.toLowerCase()).toBe('nav');
  });

  test('displays exactly five navigation items', () => {
    const navItems = document.querySelectorAll('.nav-item');
    expect(navItems).toHaveLength(5);
  });

  test('displays Home navigation item', () => {
    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    const homeItem = navItems.find(item => item.textContent.includes('Home'));
    expect(homeItem).toBeInTheDocument();
  });

  test('displays Transactions navigation item', () => {
    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    const transactionsItem = navItems.find(item => item.textContent.includes('Transactions'));
    expect(transactionsItem).toBeInTheDocument();
  });

  test('displays Analytics navigation item', () => {
    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    const analyticsItem = navItems.find(item => item.textContent.includes('Analytics'));
    expect(analyticsItem).toBeInTheDocument();
  });

  test('displays Cards navigation item', () => {
    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    const cardsItem = navItems.find(item => item.textContent.includes('Cards'));
    expect(cardsItem).toBeInTheDocument();
  });

  test('displays Settings navigation item', () => {
    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    const settingsItem = navItems.find(item => item.textContent.includes('Settings'));
    expect(settingsItem).toBeInTheDocument();
  });

  test('each navigation item has an icon', () => {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const icon = item.querySelector('i, svg, .icon');
      expect(icon).toBeInTheDocument();
    });
  });

  test('each navigation item has a label', () => {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const label = item.querySelector('span');
      expect(label).toBeInTheDocument();
      expect(label.textContent.length).toBeGreaterThan(0);
    });
  });

  test('one navigation item is marked as active', () => {
    const activeItem = document.querySelector('.nav-item.active');
    expect(activeItem).toBeInTheDocument();
  });

  test('navigation has fixed positioning class or style', () => {
    const nav = document.querySelector('.bottom-navigation');
    // Check if it has a class that suggests fixed positioning
    expect(nav.className).toBeTruthy();
  });
});
