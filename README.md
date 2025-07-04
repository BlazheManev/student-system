# Student Information System - README

## Overview

This project is a simple student information system built with the latest Angular framework and PrimeNG component library. The system allows users to:

- Add a new student with basic information and assigned courses.
- Edit student courses.
- Delete students.
- View all students in a paginated overview table (20 students per page).

The UI tries to closely follow the provided design reference for the overview table.

---

## Project Structure

```
src/
|-- app/
|   |-- core/
|   |   |-- models/
|   |   |   |-- student.model.ts
|   |   |-- services/
|   |       |-- student.service.ts
|   |-- features/
|       |-- students/
|           |-- form-component/
|               |-- student-form.component.ts
|               |-- student-form.component.html
|               |-- student-form.component.css
|           |-- overview/
|               |-- overview.component.ts
|               |-- overview.component.html
|               |-- overview.component.css
|           |-- student.routes.ts
|       |-- app.routes.ts
|       |-- app.config.ts
|       |-- app.component.ts
|       |-- app.component.html
|       |-- app.component.css
|-- assets/
|-- environments/
|   |-- environment.ts
|   |-- environment.prod.ts
|-- styles.css
|-- main.ts
|-- index.html
```

---

## Features

- **Routing:** Lazy loading enabled for the `/overview` page.
- **Pagination:** Student list table paginates with 20 students per page.
- **Data Persistence:** Supports backend simulation using `json-server` or hardcoded data.
- **Component Testing:** Unit tests are implemented using Angular TestBed and Jasmine.
- **Docker:** Dockerfile included for containerized deployment.
- **CI/CD:** GitHub Actions configured to run unit tests on every push to the `master` branch.
- **Deployment:** Application deployed on Vercel for easy access.

---

## Running the Project Locally

1. Start the fake backend server:

   ```bash
   json-server --watch db.json --port 3000
   ```

2. Serve the Angular app:

   ```bash
   ng serve
   ```

3. The Angular app expects the backend API at `http://localhost:3000` (this URL is configurable in the environment files).

---

## Docker Usage

To build and run the application inside a Docker container:

```bash
docker build -t blazhe/student-system .
docker run -p 80:80 blazhe/student-system
```

---

## CI/CD Pipeline

- GitHub Actions workflow runs unit tests automatically on every push to the `master` branch.
- Node.js 18.x environment is used to meet Angular CLI requirements.
- Tests are executed with coverage reports to ensure code quality.

---

## Deployment

- The latest version of the app is deployed on Vercel.
- Vercel automatically builds and deploys on every push to the main branch.
- Visit the deployed URL to access the live app.

---

## Notes

- Environment files (`environment.ts` and `environment.prod.ts`) manage API URLs and other environment-specific settings.
- Proxy configuration can be added during development to forward API requests.
- Tests require HttpClientTestingModule and RouterTestingModule for HTTP and routing mocks.
- The project uses Angular 16+ and PrimeNG latest versions.
