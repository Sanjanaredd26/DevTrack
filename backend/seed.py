from app import create_app
from app.extention import db
from app.models.user import Users
from app.models.task import Task
from werkzeug.security import generate_password_hash

# Create the Flask app context
app = create_app()

# Seed the database
with app.app_context():
    # Drop all tables and recreate them (optional: for a clean slate)
    db.drop_all()
    db.create_all()

    # Seed Users
    user1 = Users(
        name="Sanjana Reddy",
        email="SanjanaR@gmail.com",
        password=generate_password_hash("password123")
    )
    user2 = Users(
        name="Jane Smith",
        email="jane@example.com",
        password=generate_password_hash("password123")
    )

    db.session.add(user1)
    db.session.add(user2)

    # Commit the users to get their IDs
    db.session.commit()

    # Seed Tasks
    task1 = Task(
        title="Task 1",
        description="This is the first task.",
        status="To Do",
        user_id=user1.id
    )
    task2 = Task(
        title="Task 2",
        description="This is the second task.",
        status="In Progress",
        user_id=user1.id
    )
    task3 = Task(
        title="Task 3",
        description="This is a task assigned to Jane.",
        status="Completed",
        user_id=user2.id
    )

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)

    # Commit the tasks
    db.session.commit()

    print("Database seeded successfully!")
