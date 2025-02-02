# Revest Dynamic Forms

## Overview

This project is designed to allow users to render HTML forms from JSON data. A Github workflow is set up to ensure, on every push, that the code compiles and has no linting issues.

## Running locally

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Go into the directory "dynamic-forms"
   ```bash
   cd dynamic-forms
   ```
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

## Features

The app allows users to log in and log out using their user names. This data is kept in-memory and lost on restart.
If a user name does not exist, it's created on the fly. Each user has their own data, which is a list of forms that they've submitted
via the text field. Data submitted through a text field must be a valid JSON representing a form.
The form then shows up for selection in the form selection component. Once a form is selected, it is rendered in the appropriate spot in the center of the page.

## Limitations

Due to time constraints, the application lacks a bunch of nice-to-have to features and automated flows.

- For example, there should be validations that:
  - Ensure that a submitted JSON corresponds to a valid form description.
  - Ensure users do not submit a form with the same name twice.
- The application should also be containerized for ease of deployment, and the containerization process should run in the pipeline on every merge to the master branch.
- `Dependabot` should be set up to automatically update dependencies when possible.
- Ideally, there would be another implementation of `UserDataStore` that does not store data locally.

And others.
