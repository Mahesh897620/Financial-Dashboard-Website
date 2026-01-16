const fc = require('fast-check');

// Configure fast-check for minimum iterations
const fcConfig = { numRuns: 100 };

describe('Property Tests', () => {
  /**
   * Feature: financial-dashboard-clone, Property 1: Currency Value Formatting
   * Validates: Requirements 2.4, 9.3
   */
  test('all currency values are formatted with dollar sign and two decimals', () => {
    // Select elements that should contain currency values
    const metricValues = document.querySelectorAll('.metric-value');
    const subscriptionTotal = document.querySelectorAll('.subscription-total');
    const transactionAmounts = document.querySelectorAll('.transaction-amount');
    
    // Combine all currency elements
    const currencyElements = [
      ...Array.from(metricValues),
      ...Array.from(subscriptionTotal),
      ...Array.from(transactionAmounts)
    ];
    
    // Ensure we have currency elements to test
    expect(currencyElements.length).toBeGreaterThan(0);
    
    fc.assert(
      fc.property(
        fc.constantFrom(...currencyElements),
        (element) => {
          const text = element.textContent.trim();
          // Should match pattern: $X,XXX.XX or $X.XX or $X,XXX.XX/mo (for subscriptions)
          // Also handle +/- prefix for transaction amounts
          const currencyPattern = /^[+-]?\$[\d,]+\.\d{2}(\/mo)?$/;
          return currencyPattern.test(text);
        }
      ),
      fcConfig
    );
  });

  /**
   * Feature: financial-dashboard-clone, Property 2: Metric Card Structure
   * Validates: Requirements 2.2
   */
  test('all metric cards contain required child elements', () => {
    const metricCards = document.querySelectorAll('.metric-card');
    
    // Ensure we have metric cards to test
    expect(metricCards.length).toBeGreaterThan(0);
    
    fc.assert(
      fc.property(
        fc.constantFrom(...Array.from(metricCards)),
        (card) => {
          const hasLabel = card.querySelector('.metric-label') !== null;
          const hasValue = card.querySelector('.metric-value') !== null;
          const hasPercentage = card.querySelector('.percentage-indicator') !== null;
          
          return hasLabel && hasValue && hasPercentage;
        }
      ),
      fcConfig
    );
  });

  /**
   * Feature: financial-dashboard-clone, Property 3: Transaction Item Structure
   * Validates: Requirements 5.4
   */
  test('all transaction items contain required child elements', () => {
    const transactions = document.querySelectorAll('.transaction-item');
    
    // Ensure we have transaction items to test
    expect(transactions.length).toBeGreaterThan(0);
    
    fc.assert(
      fc.property(
        fc.constantFrom(...Array.from(transactions)),
        (transaction) => {
          const hasIcon = transaction.querySelector('.transaction-icon') !== null;
          const hasDetails = transaction.querySelector('.transaction-details') !== null;
          const hasAmount = transaction.querySelector('.transaction-amount') !== null;
          const hasDate = transaction.querySelector('.transaction-date') !== null;
          
          return hasIcon && hasDetails && hasAmount && hasDate;
        }
      ),
      fcConfig
    );
  });

  /**
   * Feature: financial-dashboard-clone, Property 4: Navigation Item Structure
   * Validates: Requirements 12.3
   */
  test('all navigation items contain icon and label', () => {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Ensure we have navigation items to test
    expect(navItems.length).toBeGreaterThan(0);
    
    fc.assert(
      fc.property(
        fc.constantFrom(...Array.from(navItems)),
        (navItem) => {
          const hasIcon = navItem.querySelector('i, svg, .icon') !== null;
          const hasLabel = navItem.querySelector('span') !== null || 
                          navItem.textContent.trim().length > 0;
          
          return hasIcon && hasLabel;
        }
      ),
      fcConfig
    );
  });

  /**
   * Feature: financial-dashboard-clone, Property 5: Percentage Indicator Icons
   * Validates: Requirements 2.3
   */
  test('all percentage indicators contain arrow icons', () => {
    const indicators = document.querySelectorAll('.percentage-indicator');
    
    // Ensure we have percentage indicators to test
    expect(indicators.length).toBeGreaterThan(0);
    
    fc.assert(
      fc.property(
        fc.constantFrom(...Array.from(indicators)),
        (indicator) => {
          const icon = indicator.querySelector('i, svg');
          if (!icon) return false;
          
          const iconClass = icon.className;
          const hasArrow = iconClass.includes('arrow') || 
                          iconClass.includes('up') || 
                          iconClass.includes('down');
          
          return hasArrow;
        }
      ),
      fcConfig
    );
  });

  /**
   * Feature: financial-dashboard-clone, Property 6: Semantic HTML Usage
   * Validates: Requirements 15.1
   */
  test('major sections use semantic HTML elements', () => {
    const semanticElements = ['header', 'nav', 'main', 'section', 'article', 'footer'];
    const body = document.body;
    
    // Check that semantic elements are used for major sections
    const hasHeader = body.querySelector('header') !== null;
    const hasNav = body.querySelector('nav') !== null;
    const hasSection = body.querySelector('section') !== null;
    
    // At least header, nav, and section should be present
    expect(hasHeader).toBe(true);
    expect(hasNav).toBe(true);
    expect(hasSection).toBe(true);
    
    // Verify semantic elements exist in sufficient quantity
    const semanticCount = semanticElements.reduce((count, tag) => {
      return count + document.querySelectorAll(tag).length;
    }, 0);
    
    // Should have multiple semantic elements (at least 10 for this dashboard)
    expect(semanticCount).toBeGreaterThanOrEqual(10);
    
    // Verify that metric cards use article elements
    const metricCards = document.querySelectorAll('.metric-card');
    if (metricCards.length > 0) {
      fc.assert(
        fc.property(
          fc.constantFrom(...Array.from(metricCards)),
          (card) => {
            return card.tagName.toLowerCase() === 'article';
          }
        ),
        fcConfig
      );
    }
  });
});
