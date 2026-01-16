# Contributing to Nova Financial Dashboard

Thank you for your interest in contributing to Nova Financial Dashboard! This document provides guidelines and information for contributors.

## 🎯 Project Overview

Nova Financial Dashboard is a sophisticated web application featuring:
- Multiple design themes with interactive navigation
- Responsive layouts for all device sizes
- Comprehensive property-based testing
- Spec-driven development methodology
- Pure HTML/CSS/JavaScript (no backend)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)
- Git
- Modern web browser

### Development Setup

1. Fork the repository on GitHub

2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/Financial-Dashboard-Website.git
cd Financial-Dashboard-Website
```

3. Install dependencies:
```bash
npm install
```

4. Open in browser:
```bash
# Simply open any HTML file in your browser
# Or use a local server
npx http-server -p 8000
```

5. Run tests to ensure everything works:
```bash
npm test
```

## 📋 Development Guidelines

### Code Style

- **HTML**: Use semantic HTML5 elements
- **CSS**: Follow BEM naming conventions
- **JavaScript**: Use vanilla JS, ES6+ syntax
- **Formatting**: Use consistent indentation (2 spaces)

### Architecture Principles

- **Separation of concerns**: Keep HTML, CSS, and JS separate
- **Responsive first**: Mobile-first approach
- **Accessibility**: WCAG AA compliance
- **Property-based testing**: Write properties for new functionality

### File Organization

```
src/
├── css/        # Stylesheets (organized by component)
├── js/         # JavaScript files (minimal, focused)
├── images/     # Image assets (optimized)
└── tests/      # Test suite (unit + property-based)
```

## 🧪 Testing Requirements

### Property-Based Testing

All new functionality must include property-based tests:

- Use `fast-check` for property generation
- Run 100+ iterations per property
- Tag tests with format: `// Feature: financial-dashboard, Property N: [description]`
- Reference requirements: `// Validates: Requirements X.Y`

### Test Categories

- **Structure Properties**: HTML element structure and hierarchy
- **Content Properties**: Text content and formatting
- **Style Properties**: CSS classes and visual consistency
- **Accessibility Properties**: ARIA labels, semantic HTML

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test -- --coverage
```

## 📝 Contribution Types

### 🐛 Bug Fixes

1. Create an issue describing the bug
2. Include reproduction steps and expected behavior
3. Write a failing test that demonstrates the bug
4. Fix the bug and ensure the test passes
5. Submit a pull request with clear description

### ✨ New Features

1. Discuss the feature in an issue first
2. Follow spec-driven development:
   - Update requirements if needed
   - Design the feature architecture
   - Create implementation tasks
3. Write property-based tests for the new functionality
4. Implement the feature following existing patterns
5. Update documentation as needed

### 🎨 UI/UX Improvements

- Maintain design consistency across themes
- Ensure responsive behavior on all devices
- Test across multiple browsers
- Consider accessibility implications
- Follow existing color schemes and typography

### 📚 Documentation

- Keep README.md up to date
- Add inline code comments for complex logic
- Update NAVIGATION-GUIDE.md for new designs
- Include examples and screenshots

## 📊 Spec-Driven Development

This project follows a formal specification methodology:

### Requirements (EARS Format)
- Use EARS patterns for all requirements
- Follow INCOSE quality rules
- Reference specific acceptance criteria

### Design Documents
- Include correctness properties for new features
- Define component interfaces clearly
- Specify performance requirements

### Implementation Tasks
- Break down features into discrete coding tasks
- Reference specific requirements for each task
- Include property-based test tasks

## 🔄 Pull Request Process

### Before Submitting

- [ ] Ensure all tests pass: `npm test`
- [ ] Verify HTML/CSS validation
- [ ] Test on multiple browsers
- [ ] Update documentation if needed
- [ ] Follow commit message conventions

### PR Requirements

- Clear description of changes made
- Reference related issues using keywords (`fixes #123`)
- Include test coverage for new functionality
- Maintain backward compatibility
- Update CHANGELOG.md for significant changes

### Review Process

1. Automated checks must pass (tests, linting)
2. Code review by maintainers
3. Testing verification on multiple browsers
4. Documentation review for completeness
5. Merge after approval

## 🎮 Design Principles

### Core Mechanics
- **Faithful to Design**: Maintain visual consistency
- **Responsive**: Work on all screen sizes
- **Accessible**: Support keyboard navigation and screen readers
- **Performant**: Target 60 FPS animations

### UI Design
- **Consistent**: Unified design language across themes
- **Professional**: Clean, polished aesthetics
- **Intuitive**: Clear navigation and user flow
- **Accessible**: WCAG AA compliance

## 🐛 Bug Report Guidelines

### Include in Bug Reports

- Clear description of the issue
- Steps to reproduce the problem
- Expected vs actual behavior
- Browser and OS information
- Screenshots or videos if applicable
- Console errors if any

### Bug Severity Levels

- **Critical**: Site crashes, major functionality broken
- **High**: Important features not working
- **Medium**: Minor functionality issues, UI problems
- **Low**: Cosmetic issues, enhancement requests

## 💡 Feature Request Guidelines

### Before Requesting

- Check existing issues to avoid duplicates
- Consider the scope - does it fit the project goals?
- Think about implementation - is it technically feasible?

### Include in Feature Requests

- Clear use case - why is this needed?
- Detailed description of the proposed feature
- Mockups or examples if applicable
- Implementation suggestions if you have ideas

## 🏆 Recognition

Contributors will be recognized in:
- README.md acknowledgments section
- CHANGELOG.md for significant contributions
- GitHub contributors page

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Code Comments**: For implementation-specific questions

## 📚 Resources

### Web Development
- [MDN Web Docs](https://developer.mozilla.org/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [HTML5 Specification](https://html.spec.whatwg.org/)
- [CSS Tricks](https://css-tricks.com/)

### Testing
- [Jest Documentation](https://jestjs.io/)
- [fast-check Documentation](https://fast-check.dev/)
- [Testing Library](https://testing-library.com/)

### Accessibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

## 🎯 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Our Standards

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project maintainers.

---

Thank you for contributing to Nova Financial Dashboard! Your contributions help make this project better for everyone. 💰✨
