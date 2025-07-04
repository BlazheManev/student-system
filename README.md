Student Information System - README

Naloga:
-----------------------------------------------------------------------------------------------------------------------------------------------
Implement a simple student information system, where the user can:
   - add a new student (basic student information and courses that student will be part of),
   - edit the student (courses only),
   - delete a student.
 You will also have to implement a page with an overview of all students (a table where each row displays student information). Table should have pagination with 20 students per page.

Attached to this email is a screenshot of a different table. Try to approach its appearance, to test your HTML and CSS skills. Ignore features that are not included in task description (like timezone dropdown, expandable rows, "super admin" tag, left sidebar...)

 Requirements:
 - Routing (/overview page should be lazily loaded)

 Required technologies:
 - Latest Angular
 - PrimeNg (component library)
 -----------------------------------------------------------------------------------------------------------------------------------------------
Predlagamo, da za hranjenje kode uporabite enega od javnih ponudnikov Git-a (Github, BitBucket...) nam pa pošljete le uporabniška navodila za zagon in testiranje delovanja. Za "simulacijo" HTTP klicev na zaledni sistem lahko uporabite poljuben pristop (file, hardcodirane vrednosti ...). Lahko tudi "fake server" (https://github.com/typicode/json-server).

Oddaja naloge ni časovno omejena, zato si lahko vzamete toliko časa, kot potrebujete.

Če imate kakršna koli vprašanja v zvezi z nalogo, me lahko brez zadržkov kontaktirate.

## Project Structure

```
src/
|-- app/
|   |-- features/
|   |   |-- overview/
|   |   |   |-- overview.component.ts
|   |   |   |-- overview.component.html
|   |   |   |-- overview.component.css
|   |   |-- student/
|   |       |-- student-form.component.ts
|   |       |-- student-form.component.html
|   |       |-- student-form.component.css
|   |-- core/
|       |-- models/
|       |   |-- student.model.ts
|       |-- services/
|           |-- student.service.ts
|-- assets/
|-- environments/
|   |-- environment.ts
|   |-- environment.prod.ts
|-- styles.css
|-- main.ts
|-- index.html

## Docker

- Dockerfile created to build Angular app and serve with nginx
- Docker commands:
  - `docker build -t your-dockerhub-username/student-system .`
  - `docker run -p 80:80 your-dockerhub-username/student-system`

## Tests

- Unit tests using Angular TestBed and Jasmine
- Tests located alongside components as `.spec.ts` files
- Run tests locally with `ng test` or in CI with GitHub Actions
- GitHub Actions configured to run tests on push, pull request, and manually

## Running locally

- Start json-server separately with:
  ```bash
  json-server --watch db.json --port 3000
  ```
- Run Angular app with:
  ```bash
  ng serve
  ```
- The Angular app expects API at `http://localhost:3000` (configurable via environments)

## Notes

- Use environment files to manage API URLs
- Proxy config can be used during development if needed
- Tests require HttpClientTestingModule and RouterTestingModule providers
- GitHub Actions setup uses Node.js 18.x to meet Angular CLI requirements

