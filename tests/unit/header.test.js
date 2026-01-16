/**
 * Unit Tests for Header Section
 * Tests Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */

describe('Header Section', () => {
  test('header element exists', () => {
    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  test('displays greeting message with user name', () => {
    const greeting = document.querySelector('.greeting-text');
    expect(greeting).toBeInTheDocument();
    expect(greeting.textContent).toContain('Good morning');
  });

  test('displays tagline', () => {
    const tagline = document.querySelector('.tagline');
    expect(tagline).toBeInTheDocument();
    expect(tagline.textContent.length).toBeGreaterThan(0);
  });

  test('displays notification icon', () => {
    const notificationIcon = document.querySelector('.notification-icon');
    expect(notificationIcon).toBeInTheDocument();
  });

  test('displays notification badge', () => {
    const badge = document.querySelector('.notification-badge');
    expect(badge).toBeInTheDocument();
  });

  test('displays user profile section', () => {
    const profile = document.querySelector('.user-profile');
    expect(profile).toBeInTheDocument();
  });

  test('displays user avatar with alt text', () => {
    const avatar = document.querySelector('.user-profile .avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('alt');
  });

  test('displays user name', () => {
    const userName = document.querySelector('.user-name');
    expect(userName).toBeInTheDocument();
    expect(userName.textContent.length).toBeGreaterThan(0);
  });

  test('displays user membership status', () => {
    const status = document.querySelector('.user-status');
    expect(status).toBeInTheDocument();
  });
});
