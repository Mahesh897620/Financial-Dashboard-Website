/**
 * Unit Tests for Semantic HTML and Accessibility
 * Tests Requirements: 14.6, 15.1
 */

describe('Semantic HTML Structure', () => {
  test('uses header element', () => {
    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  test('uses nav element', () => {
    const nav = document.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  test('uses main element or multiple sections', () => {
    const main = document.querySelector('main');
    const sections = document.querySelectorAll('section');
    // Either has a main element OR uses multiple section elements for content organization
    expect(main !== null || sections.length > 0).toBe(true);
  });

  test('uses section elements', () => {
    const sections = document.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  test('metric cards use article elements', () => {
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
      expect(card.tagName.toLowerCase()).toBe('article');
    });
  });

  test('has sufficient semantic elements', () => {
    const semanticElements = ['header', 'nav', 'main', 'section', 'article', 'footer'];
    const semanticCount = semanticElements.reduce((count, tag) => {
      return count + document.querySelectorAll(tag).length;
    }, 0);
    expect(semanticCount).toBeGreaterThanOrEqual(10);
  });
});

describe('Accessibility', () => {
  test('all images have alt attributes', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });

  test('avatar images have descriptive alt text', () => {
    const avatars = document.querySelectorAll('.avatar, .contact-avatar, .profile-avatar');
    avatars.forEach(avatar => {
      if (avatar.tagName.toLowerCase() === 'img') {
        expect(avatar).toHaveAttribute('alt');
        expect(avatar.getAttribute('alt').length).toBeGreaterThan(0);
      }
    });
  });

  test('form inputs have associated labels or placeholders', () => {
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
      const hasLabel = input.labels && input.labels.length > 0;
      const hasPlaceholder = input.hasAttribute('placeholder');
      const hasAriaLabel = input.hasAttribute('aria-label');
      expect(hasLabel || hasPlaceholder || hasAriaLabel).toBe(true);
    });
  });

  test('buttons have accessible text or aria-labels', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      const hasText = button.textContent.trim().length > 0;
      const hasAriaLabel = button.hasAttribute('aria-label');
      const hasTitle = button.hasAttribute('title');
      expect(hasText || hasAriaLabel || hasTitle).toBe(true);
    });
  });

  test('links have meaningful text', () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      expect(link.textContent.trim().length).toBeGreaterThan(0);
    });
  });
});
