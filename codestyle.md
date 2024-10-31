## Code Style Guide for Frontend Development

### Introduction

This document outlines the coding standards and guidelines for our frontend development projects. The standards are derived from mainstream official standards and recommendations from major companies to ensure consistency, readability, and maintainability of the codebase.

### Sources

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Mozilla Developer Network (MDN) JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [W3C CSS Guidelines](https://www.w3.org/Style/CSS/)

### General Guidelines

- **File Naming**: Use lowercase letters and hyphens to separate words (e.g., `index.html`, `styles.css`, `script.js`).
- **Directory Structure**: Organize files in a logical manner. Use folders like `img` for images, `css` for styles, and `js` for scripts.

### HTML

- Use semantic HTML elements (`<header>`, `<footer>`, `<article>`, etc.) to improve accessibility and SEO.
- Indent nested elements with 2 spaces.
- Ensure proper closing of tags.
- Use lowercase for all tag names and attributes.

### CSS

- Use a consistent naming convention, preferably BEM (Block Element Modifier) or OOCSS (Object-Oriented CSS).
- Organize styles in a logical manner (e.g., layout, components, utilities).
- Use a maximum of 80 characters per line.
- Include a comment before each section to describe its purpose.

### JavaScript

- Use `const` for variables that do not change and `let` for variables that may change.
- Use arrow functions for anonymous functions where applicable.
- Prefer template literals for string concatenation.
- Keep functions short and focused on a single task. Use descriptive names for functions.
- Use JSDoc comments for function documentation.

### Indentation and Spacing

- Use 2 spaces for indentation.
- Add a space after commas and before/after curly braces.
- Use a single blank line to separate logical sections of code.

### Comments

- Write meaningful comments to explain complex logic.
- Use single-line comments (`//`) for brief explanations and multi-line comments (`/* */`) for detailed descriptions.

### Version Control

- Commit often with clear, descriptive commit messages.
- Use branches for new features or bug fixes and follow the naming convention (e.g., `feature/new-contact-form`).
