from app.extention import db

class Task(db.Model):
    __tablename__ = 'tasks'
     
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)  # Task title (required)
    description = db.Column(db.Text)  # Optional detailed description of the task
    status = db.Column(db.String(20), default="To Do")  # Status (e.g., To Do, In Progress, Done)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # Reference to the user

    user = db.relationship('Users', back_populates='tasks')  # Establish relationship with User

    def serialize(self):
        """
        Convert the Task object into a JSON-serializable dictionary.
        """
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "user": {
                "id": self.user.id,
                "name": self.user.name
            } if self.user else None
        }
