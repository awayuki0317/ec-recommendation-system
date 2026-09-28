from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_active: bool

    model_config = ConfigDict(from_attributes=True)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


from decimal import Decimal


class CategoryResponse(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class ProductResponse(BaseModel):
    id: int
    category_id: int
    name: str
    description: str | None
    price: Decimal
    stock: int
    image_url: str | None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)