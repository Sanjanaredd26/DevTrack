import pytest
from app import create_app
from app.extention import db
from app.models.user import Users


def test_register(test_client):
    response = test_client.post("/api/auth/register", json={
        "name": "Test User",
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert response.json["message"] == "Registration is completed"

def test_login(test_client):
    response = test_client.post("/api/auth/login", json={
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "access token" in response.json
    assert "refresh token" in response.json

def test_logout(test_client):
    login_response = test_client.post("/api/auth/login", json={
        "email": "test@example.com",
        "password": "password123"
    })
    access_token = login_response.json["access token"]

    response = test_client.post("/api/auth/logout", headers={
        "Authorization": f"Bearer {access_token}"
    })
    assert response.status_code == 200
    assert response.json["message"] == "logout successfully"

def test_refresh_token(test_client):
    login_response = test_client.post("/api/auth/login", json={
        "email": "test@example.com",
        "password": "password123"
    })
    refresh_token = login_response.json["refresh token"]

    response = test_client.post("/api/auth/refresh", headers={
        "Authorization": f"Bearer {refresh_token}"
    })
    assert response.status_code == 200
    assert "access token" in response.json
