from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.task import taskBp
from app.extention import db
from app.models.task import Task


@taskBp.route('', strict_slashes=False)
@jwt_required(locations=["headers"])
def get_tasks():
   
    current_user = get_jwt_identity()
    tasks = db.session.query(Task).filter(Task.user_id == current_user).all()
    result = [task.serialize() for task in tasks]

    response = jsonify({
        "data": result
    })

    return response, 200


@taskBp.route('', methods=['POST'], strict_slashes=False)
@jwt_required(locations=["headers"])
def create_task():
 
    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    status = data.get("status", "To Do")  # Default status is "To Do"
    user_id = get_jwt_identity()

    if not title:
        return jsonify({'message': 'Title is required'}), 422

    new_task = Task(
        title=title,
        description=description,
        status=status,
        user_id=user_id
    )

    db.session.add(new_task)
    db.session.commit()

    response = jsonify({
        "success": True,
        "message": 'New task created!',
        "data": new_task.serialize()
    })

    return response, 200


@taskBp.route('/<task_id>', methods=["PUT"], strict_slashes=False)
@jwt_required(locations=["headers"])
def update_task(task_id):
   
    data = request.get_json()
    current_user = get_jwt_identity()

    task = Task.query.filter_by(id=task_id).first()

    if not task:
        return jsonify({
            "success": False,
            "message": f'There is no task with id {task_id}'
        }), 404

 
    title = data.get("title")
    description = data.get("description")
    status = data.get("status")

    if title:
        task.title = title
    if description:
        task.description = description
    if status:
        task.status = status

    db.session.commit()

    response = jsonify({
        "success": True,
        "message": f'Task with id {task_id} has been updated',
        "data": task.serialize()
    })

    return response, 200


@taskBp.route('/<task_id>', methods=["DELETE"], strict_slashes=False)
@jwt_required(locations=["headers"])
def delete_task(task_id):
    
    current_user = get_jwt_identity()
    task = Task.query.filter_by(id=task_id).first()

    if not task:
        return jsonify({
            "success": False,
            "message": f'There is no task with id {task_id}'
        }), 404

    db.session.delete(task)
    db.session.commit()

    response = jsonify({
        "success": True,
        "message": f'Task with id {task_id} has been successfully deleted'
    })

    return response, 200
