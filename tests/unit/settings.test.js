/**
 * Unit Tests for Settings and Profile Section
 * Tests Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6
 */

describe('Profile Card', () => {
  test('profile card exists', () => {
    const profileCard = document.querySelector('.profile-card');
    expect(profileCard).toBeInTheDocument();
  });

  test('displays profile avatar', () => {
    const avatar = document.querySelector('.profile-card .profile-avatar');
    expect(avatar).toBeInTheDocument();
  });

  test('displays user name', () => {
    const name = document.querySelector('.profile-card h4');
    expect(name).toBeInTheDocument();
    expect(name.textContent.length).toBeGreaterThan(0);
  });

  test('displays user email', () => {
    const email = document.querySelector('.profile-card p');
    expect(email).toBeInTheDocument();
    expect(email.textContent).toMatch(/@/);
  });

  test('displays membership badge', () => {
    const badge = document.querySelector('.membership-badge');
    expect(badge).toBeInTheDocument();
  });
});

describe('Account Settings', () => {
  test('account settings group exists', () => {
    const settingsGroups = document.querySelectorAll('.settings-group');
    const accountGroup = Array.from(settingsGroups).find(group => 
      group.querySelector('h4')?.textContent.includes('Account')
    );
    expect(accountGroup).toBeInTheDocument();
  });

  test('displays Personal Information option', () => {
    const settingItems = Array.from(document.querySelectorAll('.setting-item'));
    const personalInfo = settingItems.find(item => 
      item.textContent.includes('Personal Information')
    );
    expect(personalInfo).toBeInTheDocument();
  });

  test('displays Security & Privacy option', () => {
    const settingItems = Array.from(document.querySelectorAll('.setting-item'));
    const security = settingItems.find(item => 
      item.textContent.includes('Security')
    );
    expect(security).toBeInTheDocument();
  });

  test('displays Payment Methods option', () => {
    const settingItems = Array.from(document.querySelectorAll('.setting-item'));
    const payment = settingItems.find(item => 
      item.textContent.includes('Payment')
    );
    expect(payment).toBeInTheDocument();
  });

  test('setting items have chevron icons', () => {
    const settingItems = document.querySelectorAll('.settings-group .setting-item');
    settingItems.forEach(item => {
      const icon = item.querySelector('i');
      expect(icon).toBeInTheDocument();
    });
  });
});

describe('Preferences Settings', () => {
  test('preferences group exists', () => {
    const settingsGroups = document.querySelectorAll('.settings-group');
    const preferencesGroup = Array.from(settingsGroups).find(group => 
      group.querySelector('h4')?.textContent.includes('Preferences')
    );
    expect(preferencesGroup).toBeInTheDocument();
  });

  test('displays Notifications toggle', () => {
    const settingItems = Array.from(document.querySelectorAll('.setting-item'));
    const notifications = settingItems.find(item => 
      item.textContent.includes('Notifications')
    );
    expect(notifications).toBeInTheDocument();
  });

  test('displays Dark Mode toggle', () => {
    const settingItems = Array.from(document.querySelectorAll('.setting-item'));
    const darkMode = settingItems.find(item => 
      item.textContent.includes('Dark Mode')
    );
    expect(darkMode).toBeInTheDocument();
  });

  test('displays Biometric Login toggle', () => {
    const settingItems = Array.from(document.querySelectorAll('.setting-item'));
    const biometric = settingItems.find(item => 
      item.textContent.includes('Biometric')
    );
    expect(biometric).toBeInTheDocument();
  });

  test('toggle switches exist', () => {
    const toggles = document.querySelectorAll('.toggle-switch');
    expect(toggles.length).toBeGreaterThanOrEqual(3);
  });

  test('toggle switches contain checkbox inputs', () => {
    const toggles = document.querySelectorAll('.toggle-switch');
    toggles.forEach(toggle => {
      const checkbox = toggle.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });
  });
});

describe('Support and Logout', () => {
  test('support section exists', () => {
    const settingsGroups = document.querySelectorAll('.settings-group');
    const supportGroup = Array.from(settingsGroups).find(group => 
      group.querySelector('h4')?.textContent.includes('Support')
    );
    expect(supportGroup).toBeInTheDocument();
  });

  test('displays Help Center link', () => {
    const settingItems = Array.from(document.querySelectorAll('.setting-item'));
    const helpCenter = settingItems.find(item => 
      item.textContent.includes('Help Center')
    );
    expect(helpCenter).toBeInTheDocument();
  });

  test('displays Log Out button', () => {
    const logoutButton = document.querySelector('.logout-button');
    expect(logoutButton).toBeInTheDocument();
  });

  test('displays version information', () => {
    const version = document.querySelector('.version-info');
    expect(version).toBeInTheDocument();
  });
});
