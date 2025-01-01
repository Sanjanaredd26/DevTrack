# DevTrack

**DevTrack** is a full-stack application that helps developers track their daily tasks, measure productivity, and monitor task progress.

## **Project Features**
- **User Authentication**:
  - Users can sign up and log in.
- **Task Management**:
  - Users can create, update, delete, and track tasks.
  - Categorize tasks by "To Do", "In Progress", and "Completed".
- **Task Dashboard**:
  - A dashboard displaying all the tasks grouped by status.
- **Productivity Tracker**:
  - Track daily task completion rates with visualizations (e.g., bar charts).

## **Tech Stack**
### Backend:
- Python Flask
- SQLite or PostgreSQL database

### Frontend:
- React with Redux
- Axios for API communication
- Chart.js for visualizations

### Deployment:
- Docker for containerization
- Nginx as a reverse proxy
- Systemd for service management on the Linux server

### Testing:
- **Backend**: pytest for testing the API endpoints
- **Frontend**: Jest and React Testing Library to test React components

### CI/CD:
- GitHub Actions to run these tests automatically on push events


## API Documentation

Complete API documentation for the flask backend, [click here](https://documenter.getpostman.com/view/25930901/2sAYJ6CKbE)

## Demo
**Signup/SignIn page**:

![SignUp/SignIn](https://github.com/Sanjanaredd26/DevTrack/blob/e0827f9528c308908a64566befc42e1671a79057/output/Signup%26SignIn%20page.gif)

**Add Tasks Page**:

![Add Tasks Page](https://github.com/Sanjanaredd26/DevTrack/blob/325312a2662e07c083eafa53f1ff70ab56015d67/output/AddTask%20Page.gif)

**Filter Tasks**:

 ![filter tasks](https://github.com/Sanjanaredd26/DevTrack/blob/feccbe5be94fa99bac4c78f2849d3bbdb3faa29e/output/FilterTasks.gif)

**Update Task Form**:

![update tasks](https://github.com/Sanjanaredd26/DevTrack/blob/a8e432200c4122f486a38e09ec34a10495ca3496/output/UpdateTask%20Page.gif)

**Logout**:

![logout](https://github.com/Sanjanaredd26/DevTrack/blob/be50b98046c6cba5982c2ddb89ba0db8aca731f7/output/Logout.gif)


## How To Run This App

**Run Locally**:

1. Clone the repository:

 ```bash
   git clone https://github.com/Sanjanaredd26/DevTrack.git 
```
2. Create a .env file and set value for SQLALCHEMY_DATABASE_URI, JWT_SECRET_KEY, POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB.

3. Make sure you have installed docker desktop and run the following commands:

   Build and start the containers:
   ``` bash
     docker-compose up 
   ```

**Run on Linux Server**:

1. Use a cloud platform like AWS create a Linux instance.
2. Clone the repository or use scp to copy a files from  local machine to  Linux server:
```bash
   git clone https://github.com/Sanjanaredd26/DevTrack.git
```
or 

```bash
  scp -r Directory_name user@hostname:destination_file
```
3. Create a .env file and set value for SQLALCHEMY_DATABASE_URI, JWT_SECRET_KEY, POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB.(if necessary)

4. Install Docker and Docker Compose and run the following command to build and start the ontainers:
```bash
   docker compose up 
```




   





















