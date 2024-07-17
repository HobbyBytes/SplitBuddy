# Contributing to Our Django Project

We welcome contributions to Split Buddy project! This document provides guidelines for contributing to make the process smooth and effective for everyone involved.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior to mounishp@proton.me.

## How Can I Contribute?

### Reporting Bugs


- Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/HobbyBytes/SplitBuddy/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/HobbyBytes/SplitBuddyissues/new). Be sure to include a title and clear description, as much relevant information as possible, and a code sample or an executable test case demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

- Open a new issue with a clear title and detailed description of the suggested enhancement.
- Provide any relevant examples or mockups if applicable.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code passes Ruff linting and formatting checks.
6. Issue that pull request!

## Development Setup

1. Fork the repository.
2. Clone your fork: `git clone https://github.com/HobbyBytes/SplitBuddy.git`
3. Create a virtual environment and install dependencies as described in the README.md file.
4. Install Ruff: `pip install ruff` (we use Ruff as our linter and code formatter)
5. Create a branch for your changes: `git checkout -b your-branch-name`

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Python and Django Code Style

We use Ruff for linting and formatting our Python code. Ruff enforces a style that is compliant with PEP 8 and other best practices.

- Install Ruff in your development environment: `pip install ruff`
- Run Ruff to check your code: `ruff check .`
- Run Ruff to format your code: `ruff format .`

Key points:
- Use 4 spaces for indentation (not tabs).
- Maximum line length is 88 characters (as per Ruff's default).
- Use docstrings for functions and classes.
- Follow Django's naming conventions for models, views, etc.

### Django-specific Guidelines

- Keep your models in `models.py`, views in `views.py`, etc. as per Django's conventions.
- Use class-based views where appropriate.
- Follow the [Django coding style](https://docs.djangoproject.com/en/dev/internals/contributing/writing-code/coding-style/) for aspects not covered by Ruff.

## Testing

- Write test cases for new features and bug fixes.
- Run the full test suite before submitting a pull request.
- Aim for high test coverage.

## Documentation

- Update the README.md if your changes impact how the project is used or set up.
- Comment your code where necessary, especially for complex logic.
- Update or add docstrings for new or modified functions and classes.

## Ruff Configuration

We use a `ruff.toml` file in the root of our project to configure Ruff. Make sure to check this file for any project-specific rules or settings.

To run Ruff before committing:

1. Check your code: `ruff check .`
2. Format your code: `ruff format .`
3. If there are any issues, fix them and re-run Ruff.
4. Commit your changes only after Ruff passes without errors.

## Additional Notes

- If you're unsure about anything, just ask! Open an issue for discussion or reach out via mounishp@proton.me.
- Thank you for contributing to our project!
