from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.params import Body
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas import UserProfile
from app.models import User

from app.api.v1.auth.auth_utils import get_current_user