/**
 * Unit Tests for Card Management Sections
 * Tests Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6
 */

describe('Your Cards Section', () => {
  test('cards section exists', () => {
    const section = document.querySelector('.cards-section');
    expect(section).toBeInTheDocument();
  });

  test('displays section title', () => {
    const title = document.querySelector('.cards-section h3');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain('Card');
  });

  test('displays add card button', () => {
    const addButton = document.querySelector('.add-card-button');
    expect(addButton).toBeInTheDocument();
  });

  test('displays credit card visual', () => {
    const creditCard = document.querySelector('.credit-card');
    expect(creditCard).toBeInTheDocument();
  });

  test('credit card displays card number', () => {
    const cardNumber = document.querySelector('.card-number');
    expect(cardNumber).toBeInTheDocument();
    expect(cardNumber.textContent).toMatch(/\d{4}/);
  });

  test('credit card displays card holder name', () => {
    const cardHolder = document.querySelector('.card-holder');
    expect(cardHolder).toBeInTheDocument();
    expect(cardHolder.textContent.length).toBeGreaterThan(0);
  });

  test('credit card displays expiry date', () => {
    const expiry = document.querySelector('.card-expiry');
    expect(expiry).toBeInTheDocument();
    expect(expiry.textContent).toMatch(/\d{2}\/\d{2}/);
  });

  test('credit card displays chip', () => {
    const chip = document.querySelector('.card-chip');
    expect(chip).toBeInTheDocument();
  });
});

describe('Card Settings Section', () => {
  test('card settings section exists', () => {
    const section = document.querySelector('.card-settings-section');
    expect(section).toBeInTheDocument();
  });

  test('displays section title', () => {
    const title = document.querySelector('.card-settings-section h3');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain('Setting');
  });

  test('displays spending limit label', () => {
    const label = document.querySelector('.card-settings-section label');
    expect(label).toBeInTheDocument();
  });

  test('displays current limit value', () => {
    const currentLimit = document.querySelector('.current-limit');
    expect(currentLimit).toBeInTheDocument();
    expect(currentLimit.textContent).toMatch(/\$/);
  });

  test('displays range slider', () => {
    const slider = document.querySelector('.limit-slider');
    expect(slider).toBeInTheDocument();
    expect(slider.tagName.toLowerCase()).toBe('input');
    expect(slider.type).toBe('range');
  });

  test('slider has min and max values', () => {
    const slider = document.querySelector('.limit-slider');
    expect(slider).toHaveAttribute('min');
    expect(slider).toHaveAttribute('max');
  });

  test('displays slider range labels', () => {
    const labels = document.querySelector('.slider-labels');
    expect(labels).toBeInTheDocument();
  });
});

describe('Card Details Section', () => {
  test('card details section exists', () => {
    const section = document.querySelector('.card-details-section');
    expect(section).toBeInTheDocument();
  });
});
