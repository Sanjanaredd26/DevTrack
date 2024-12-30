from app import create_app
from app.extention import db
from app.models.user import Users
from app.models.task import Task
from werkzeug.security import generate_password_hash


app = create_app()


with app.app_context():
    
    db.drop_all()
    db.create_all()


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

    db.session.commit()

  
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

    db.session.commit()

    print("Database seeded successfully!")
