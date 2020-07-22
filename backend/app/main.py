from app.api.routers import api_router
from app.errorhandlers import register_error_handlers
from fastapi import FastAPI
import uvicorn

from app.core.config import settings
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME, docs_url="/api/docs", openapi_url="/api/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Routers
app.include_router(api_router, prefix='/api')

# 注册异常处理器、中间件
register_error_handlers(app)

@app.get("/api/v1")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", reload=True, port=8888)
