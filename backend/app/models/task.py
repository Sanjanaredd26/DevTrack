from app.extention import db

class Task(db.Model):
    __tablename__ = 'tasks'
     
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)  
    description = db.Column(db.Text)  
    status = db.Column(db.String(20), default="To Do")  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  

    user = db.relationship('Users', back_populates='tasks')  

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
