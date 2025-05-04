
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

app = FastAPI(title="Habit Builder API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample data (in a real app, this would be in a database)
habits = [
    {
        "id": "1",
        "title": "Morning Meditation",
        "description": "Start each day with 10 minutes of mindfulness",
        "streak": 7,
        "goal": "10 minutes",
        "frequency": "daily",
        "category": "Mindfulness",
        "completedToday": True,
        "progress": 70,
    },
    {
        "id": "2",
        "title": "Read Books",
        "description": "Read for at least 30 minutes",
        "streak": 3,
        "goal": "30 minutes",
        "frequency": "daily",
        "category": "Learning",
        "completedToday": False,
        "progress": 45,
    },
]

# Models
class HabitBase(BaseModel):
    title: str
    description: Optional[str] = None
    goal: str
    frequency: str
    category: str

class HabitCreate(HabitBase):
    pass

class HabitUpdate(HabitBase):
    title: Optional[str] = None
    completedToday: Optional[bool] = None
    progress: Optional[int] = None
    streak: Optional[int] = None

class HabitResponse(HabitBase):
    id: str
    streak: int
    completedToday: bool
    progress: int

# Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to the Habit Builder API"}

@app.get("/habits", response_model=List[HabitResponse])
def get_habits():
    return habits

@app.get("/habits/{habit_id}", response_model=HabitResponse)
def get_habit(habit_id: str):
    for habit in habits:
        if habit["id"] == habit_id:
            return habit
    raise HTTPException(status_code=404, detail="Habit not found")

@app.post("/habits", response_model=HabitResponse, status_code=status.HTTP_201_CREATED)
def create_habit(habit: HabitCreate):
    new_habit = habit.dict()
    new_habit["id"] = str(len(habits) + 1)
    new_habit["streak"] = 0
    new_habit["completedToday"] = False
    new_habit["progress"] = 0
    habits.append(new_habit)
    return new_habit

@app.put("/habits/{habit_id}", response_model=HabitResponse)
def update_habit(habit_id: str, habit: HabitUpdate):
    for i, h in enumerate(habits):
        if h["id"] == habit_id:
            updated_habit = {**h, **habit.dict(exclude_unset=True)}
            habits[i] = updated_habit
            return updated_habit
    raise HTTPException(status_code=404, detail="Habit not found")

@app.delete("/habits/{habit_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_habit(habit_id: str):
    for i, habit in enumerate(habits):
        if habit["id"] == habit_id:
            habits.pop(i)
            return
    raise HTTPException(status_code=404, detail="Habit not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
