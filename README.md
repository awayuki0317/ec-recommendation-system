# EC Recommendation System

ECサイト型の商品レコメンドシステムです。

ユーザーの閲覧履歴・購入履歴・お気に入りなどの行動データをもとに、
商品を推薦するECサイトを個人開発しています。

本プロジェクトでは、ECサイトの基本機能だけでなく、
認証、商品管理、レコメンド、非同期処理、クラウド環境などを組み合わせた
Webアプリケーションの設計・実装を目的としています。

## Tech Stack

### Frontend

- React
- TypeScript
- Vite

### Backend

- FastAPI
- Python 3.12
- SQLAlchemy
- Alembic

### Admin

- Django
- Django Admin

### Database

- PostgreSQL 16

### Infrastructure

- Docker
- Docker Compose
- AWS（予定）
- AWS Lambda（予定）

## Architecture

```text
User
 │
 ▼
React + TypeScript
:5173
 │
 ▼
FastAPI
:8000
 │
 ├── SQLAlchemy
 │
 ├── Alembic
 │
 ▼
PostgreSQL
:5432
 ▲
 │
Django Admin
:8001
 │
 ▼
Administrator
```

FastAPIを一般ユーザー向けAPIの中心として使用し、
Djangoは運営者向けの管理画面として使用します。

FastAPIとDjangoは同一のPostgreSQLデータベースを利用します。

## Current Features

現在、以下の開発基盤を構築済みです。

- React + TypeScript開発環境
- FastAPI APIサーバー
- Django Admin
- PostgreSQL
- Docker Composeによる開発環境
- SQLAlchemyによるORM
- AlembicによるDBマイグレーション
- FastAPIからPostgreSQLへの接続
- usersテーブル
- 環境変数によるDB設定管理

## Planned Features

今後、以下の機能を実装予定です。

- 会員登録
- JWTログイン認証
- 商品一覧
- 商品詳細
- カテゴリ検索
- キーワード検索
- カート
- 注文
- お気に入り
- 閲覧履歴
- 購入履歴
- レコメンド
- Django Adminによる商品管理
- AWS環境へのデプロイ
- AWS Lambdaによる非同期処理

## Project Structure

```text
ec-recommendation-system/
├── backend/
│   ├── fastapi/
│   │   ├── app/
│   │   │   ├── alembic/
│   │   │   ├── database.py
│   │   │   ├── main.py
│   │   │   └── models.py
│   │   ├── alembic.ini
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── django/
│       ├── config/
│       ├── Dockerfile
│       ├── manage.py
│       └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── infrastructure/
├── docs/
├── scripts/
├── docker-compose.yml
├── .env.example
└── README.md
```

## Setup

### 1. Clone repository

```bash
git clone git@github.com:awayuki0317/ec-recommendation-system.git
cd ec-recommendation-system
```

### 2. Create environment file

```bash
cp .env.example .env
```

必要に応じて `.env` の値を変更してください。

### 3. Start containers

```bash
docker compose up -d --build
```

### 4. Run FastAPI migrations

```bash
docker compose exec fastapi alembic -c alembic.ini upgrade head
```

### 5. Run Django migrations

```bash
docker compose exec django python manage.py migrate
```

### 6. Create Django administrator

```bash
docker compose exec django python manage.py createsuperuser
```

## Development URLs

| Service | URL |
| --- | --- |
| React | http://localhost:5173 |
| FastAPI | http://localhost:8000 |
| FastAPI Swagger UI | http://localhost:8000/docs |
| Django Admin | http://localhost:8001/admin/ |
| PostgreSQL | localhost:5432 |

## Health Check

FastAPI:

```bash
curl http://localhost:8000/health
```

Expected response:

```json
{"status":"ok"}
```

Database:

```bash
curl http://localhost:8000/health/db
```

Expected response:

```json
{"status":"ok","database":1}
```

## Development Status

### Phase 1 - Development Environment

- [x] Git / GitHub
- [x] Python environment
- [x] Node.js environment
- [x] Docker / Docker Compose
- [x] PostgreSQL
- [x] FastAPI
- [x] SQLAlchemy
- [x] Alembic
- [x] React + TypeScript
- [x] Django Admin
- [x] Environment variable configuration

### Phase 2 - Core EC Features

- [ ] User registration
- [ ] JWT authentication
- [ ] Product management
- [ ] Product list / detail
- [ ] Search
- [ ] Cart
- [ ] Order processing

### Phase 3 - Recommendation System

- [ ] Browsing history
- [ ] Purchase history
- [ ] Favorite products
- [ ] Recommendation API
- [ ] Recommendation evaluation

### Phase 4 - AWS

- [ ] AWS deployment
- [ ] AWS Lambda
- [ ] Logging / monitoring

## Purpose

本プロジェクトは、Webアプリケーション開発における
フロントエンド・バックエンド・データベース・クラウド・
レコメンド機能までを一貫して設計・実装することを目的としています。