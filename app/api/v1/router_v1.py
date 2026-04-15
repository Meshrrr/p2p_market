from fastapi import APIRouter

from app.api.v1.auth.auth_router import router as auth_router
from app.api.v1.user_profile.user_profile import router as profile_router


router = APIRouter(prefix="/v1")

router.include_router(auth_router)
router.include_router(profile_router)