import pytest
from app import create_app
from app.extention import db
from app.models.user import Users
from app.models.task import Task
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash

def test_create_task(test_client):
    
    test_client.post("/api/auth/register", json={
        "name": "Test User",
        "email": "test2@example.com",
        "password": "password123"
    })

    login_response = test_client.post("/api/auth/login", json={
        "email": "test2@example.com",
        "password": "password123"
    })
    assert login_response.status_code == 200, "Login failed"

    access_token = login_response.json.get("access token")
    assert access_token, "Access token not returned"

    response = test_client.post("/api/tasks", json={
        "title": "Test Task",
        "description": "This is a test task.",
        "status": "Pending"
    }, headers={"Authorization": f"Bearer {access_token}"})

    assert response.status_code == 200
    assert response.json["success"] is True
    assert response.json["data"]["title"] == "Test Task"

def test_get_tasks(test_client):
   
    login_response = test_client.post("/api/auth/login", json={
        "email": "test2@example.com",
        "password": "password123"
    })
    access_token = login_response.json.get("access token")
    assert access_token, "Access token not returned"

    response = test_client.get("/api/tasks", headers={
        "Authorization": f"Bearer {access_token}"
    })
    assert response.status_code == 200
    assert isinstance(response.json["data"], list)

def test_update_task(test_client):
   
    login_response = test_client.post("/api/auth/login", json={
        "email": "test2@example.com",
        "password": "password123"
    })
    access_token = login_response.json.get("access token")
    assert access_token, "Access token not returned"

    create_response = test_client.post("/api/tasks", json={
        "title": "Task to Update",
        "description": "Update this task",
        "status": "Pending"
    }, headers={"Authorization": f"Bearer {access_token}"})
    task_id = create_response.json["data"]["id"]

    update_response = test_client.put(f"/api/tasks/{task_id}", json={
        "title": "Updated Task",
        "description": "This task has been updated",
        "status": "Completed"
    }, headers={"Authorization": f"Bearer {access_token}"})

    assert update_response.status_code == 200
    assert update_response.json["data"]["title"] == "Updated Task"

def test_delete_task(test_client):
   
    login_response = test_client.post("/api/auth/login", json={
        "email": "test2@example.com",
        "password": "password123"
    })
    access_token = login_response.json.get("access token")
    assert access_token, "Access token not returned"

    create_response = test_client.post("/api/tasks", json={
        "title": "Task to Delete",
        "description": "Delete this task",
        "status": "Pending"
    }, headers={"Authorization": f"Bearer {access_token}"})
    task_id = create_response.json["data"]["id"]

    delete_response = test_client.delete(f"/api/tasks/{task_id}", headers={
        "Authorization": f"Bearer {access_token}"
    })
    assert delete_response.status_code == 200
    assert delete_response.json["message"] == f"Task with id {task_id} has been successfully deleted"
