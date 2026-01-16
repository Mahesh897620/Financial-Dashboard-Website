/**
 * Unit Tests for Quick Transfer Section
 * Tests Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */

describe('Quick Transfer Section', () => {
  test('quick transfer section exists', () => {
    const section = document.querySelector('.quick-transfer-section');
    expect(section).toBeInTheDocument();
  });

  test('displays section title', () => {
    const title = document.querySelector('.quick-transfer-section h3');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain('Transfer');
  });

  test('displays contacts list', () => {
    const contactsList = document.querySelector('.contacts-list');
    expect(contactsList).toBeInTheDocument();
  });

  test('displays at least five contact options', () => {
    const contacts = document.querySelectorAll('.contact-item');
    expect(contacts.length).toBeGreaterThanOrEqual(5);
  });

  test('each contact has an avatar', () => {
    const contacts = document.querySelectorAll('.contact-item');
    contacts.forEach(contact => {
      const avatar = contact.querySelector('.contact-avatar');
      expect(avatar).toBeInTheDocument();
    });
  });

  test('each contact has a name', () => {
    const contacts = document.querySelectorAll('.contact-item');
    contacts.forEach(contact => {
      const name = contact.querySelector('.contact-name');
      expect(name).toBeInTheDocument();
      expect(name.textContent.length).toBeGreaterThan(0);
    });
  });

  test('displays transfer input group', () => {
    const inputGroup = document.querySelector('.transfer-input-group');
    expect(inputGroup).toBeInTheDocument();
  });

  test('displays currency symbol', () => {
    const currencySymbol = document.querySelector('.currency-symbol');
    expect(currencySymbol).toBeInTheDocument();
    expect(currencySymbol.textContent).toBe('$');
  });

  test('displays transfer amount input field', () => {
    const input = document.querySelector('.transfer-amount');
    expect(input).toBeInTheDocument();
    expect(input.tagName.toLowerCase()).toBe('input');
  });

  test('displays send button', () => {
    const sendButton = document.querySelector('.send-button');
    expect(sendButton).toBeInTheDocument();
  });

  test('send button contains icon', () => {
    const sendButton = document.querySelector('.send-button');
    const icon = sendButton.querySelector('i, svg');
    expect(icon).toBeInTheDocument();
  });
});
