from fastapi import APIRouter

from app.api.v1.auth.auth_router import router as auth_router
from app.api.v1.user_profile.user_profile import router as profile_router
from app.api.v1.categories.categories_utils import router as category_router
from app.api.v1.listings.listings_utils import router as listings_router


router = APIRouter(prefix="/v1")

router.include_router(auth_router)
router.include_router(profile_router)
router.include_router(category_router)
router.include_router(listings_router)