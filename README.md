# Portfolio Backend API

A modern, type-safe backend API built with **Bun**, **Hono**, **TypeScript**, and **PostgreSQL** for managing portfolio data including companies, projects, testimonials, and case studies.

## 🚀 Tech Stack

- **Runtime**: [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager
- **Framework**: [Hono](https://hono.dev/) - Lightweight, modern web framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Robust relational database
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - Type-safe SQL ORM
- **Validation**: [Zod](https://zod.dev/) - Runtime type validation
- **API Docs**: [Scalar](https://github.com/scalar/scalar) - Interactive OpenAPI documentation
- **OpenAPI Generation**: [@asteasolutions/zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi) - Automatic spec generation from Zod schemas
- **Logging**: [Pino](https://getpino.io/) - High-performance JSON logger
- **Linting**: [Biome](https://biomejs.dev/) - Fast formatter and linter
- **Vector Search**: [pgvector](https://github.com/pgvector/pgvector) - PostgreSQL vector extension

## 📁 Project Structure

```
portfolio-backend/
├── src/
│   ├── index.ts                 # Main application entry point
│   ├── models/
│   │   ├── db/
│   │   │   ├── index.ts         # Database connection
│   │   │   ├── migrations/      # Database migration files
│   │   │   └── schema/          # Database schema definitions
│   │   │       ├── companySchema.ts
│   │   │       ├── projectSchema.ts
│   │   │       ├── testimonialSchema.ts
│   │   │       ├── documentSchema.ts
│   │   │       └── caseStudySchema.ts
│   │   ├── companyModel.ts      # Company type definitions
│   │   ├── projectModel.ts      # Project type definitions
│   │   └── testimonialModel.ts  # Testimonial type definitions
│   ├── queries/
│   │   ├── companyQueries.ts    # Company database operations
│   │   ├── projectQueries.ts    # Project database operations
│   │   └── testimonialQueries.ts # Testimonial database operations
│   ├── routes/
│   │   ├── companies.ts         # Company API endpoints
│   │   ├── projects.ts          # Project API endpoints
│   │   ├── testimonials.ts      # Testimonial API endpoints
│   │   └── caseStudies.ts       # Case study API endpoints
│   ├── schemas/
│   │   ├── companySchema.ts     # Company API validation schemas
│   │   ├── projectSchema.ts     # Project API validation schemas
│   │   ├── testimonialSchema.ts # Testimonial API validation schemas
│   │   └── caseStudySchema.ts   # Case study API validation schemas
│   └── utils/
│       ├── logger.ts            # Pino logger configuration
│       └── openapi.ts           # OpenAPI spec generation and registry
├── biome.json                   # Biome linting/formatting config
├── drizzle.config.ts           # Drizzle ORM configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── migrate.ts                 # Database migration runner
```

## 🗄️ Database Schema

### Companies Table
Stores company information for portfolio projects.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `serial` | Primary key |
| `hq` | `text` | Headquarters location |
| `founded` | `integer` | Founded year |
| `industry` | `text` | Industry type |
| `revenue` | `text` | Revenue information |
| `size` | `text` | Company size (e.g., "50-100 employees") |
| `ceo_name` | `text` | CEO name |
| `ceo_title` | `text` | CEO title |

### Projects Table
Stores portfolio project information.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `serial` | Primary key |
| `image` | `text` | Project image URL |
| `features` | `text` | JSON string of project features array |
| `link` | `text` | Project URL |
| `company_id` | `integer` | Foreign key to companies table |
| `start_year` | `integer` | Project start year |
| `project_name` | `text` | Project name |

### Case Studies Table
Stores detailed case study information for projects.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `serial` | Primary key |
| `project_id` | `integer` | Foreign key to projects table (unique) |
| `title` | `text` | Case study title |
| `description` | `text` | Case study description |
| `challenge` | `text` | Project challenge |
| `results` | `text` | Project results |
| `onboarding_improved` | `text` | Onboarding process improvements |
| `retention_increase` | `text` | User retention improvements |
| `time_spent_increase` | `text` | Time spent on website improvements |
| `research` | `text` | Research and analysis details |
| `architecture` | `text` | Information architecture details |
| `wireframing` | `text` | Wireframing and prototyping details |
| `testing` | `text` | Usability testing details |
| `design` | `text` | Visual design and style guide details |
| `tech_stack_urls` | `text` | Tech stack image URLs |
| `ceo_statement` | `text` | CEO statement |
| `conclusion` | `text` | Case study conclusion |

### Testimonials Table
Stores client testimonials.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `serial` | Primary key |
| `image` | `text` | Client image URL |
| `company` | `text` | Client company |
| `content` | `text` | Testimonial content |
| `designation` | `text` | Client designation |
| `client_name` | `text` | Client name |

### Documents Table
Stores documents with vector embeddings for AI/search functionality.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `bigserial` | Primary key |
| `text` | `text` | Document text content |
| `metadata` | `jsonb` | Document metadata |
| `embedding` | `vector(768)` | Vector embedding |
| `created_at` | `timestamp` | Creation timestamp |
| `updated_at` | `timestamp` | Update timestamp |

## 🔗 Database Relationships

- **Companies → Projects**: One-to-Many (one company can have many projects)
- **Projects → Case Studies**: One-to-One (one project can have one case study)
- **Projects → Companies**: Many-to-One (many projects can belong to one company)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/docs/installation) installed on your system
- PostgreSQL database running locally or remotely

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-backend
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db
   PORT=8080
   LOG_LEVEL=info
   ```

4. **Database Migration**
   ```bash
   bun run migrate
   ```

5. **Start Development Server**
   ```bash
   bun run dev
   ```

The API will be available at `http://localhost:8080`

## 📚 API Documentation

The API includes **fully automatic** interactive documentation powered by [Scalar](https://github.com/scalar/scalar) and [@asteasolutions/zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi). The OpenAPI specification is generated automatically from your Zod validation schemas, ensuring your documentation is always in sync with your code.

### Key Features:
- ✅ **Automatic Spec Generation**: OpenAPI spec generated from Zod schemas
- ✅ **Interactive Documentation**: Beautiful, modern API docs interface
- ✅ **Type Safety**: Full TypeScript support with no `any` types
- ✅ **Real-time Sync**: Documentation updates automatically with schema changes
- ✅ **9 API Endpoints**: Complete CRUD operations for all entities

### Access Points:
- **Interactive API Docs**: `http://localhost:8080/docs`
- **OpenAPI Spec** (auto-generated): `http://localhost:8080/openapi.json`

### How It Works:
1. **Schema Definition**: Define Zod schemas in `src/schemas/` with OpenAPI metadata
2. **Automatic Registration**: Schemas are registered in `src/utils/openapi.ts`
3. **Spec Generation**: OpenAPI spec is generated automatically from registered schemas
4. **Live Documentation**: Scalar renders the spec into beautiful interactive docs
5. **Type Safety**: Full TypeScript support with zero `any` types

### Base URL
```
http://localhost:8080/api
```

### Companies API

#### Get All Companies
```http
GET /api/companies
```

**Response:**
```json
{
  "success": true,
  "message": "Companies Fetched Successfully!",
  "data": [
    {
      "id": 1,
      "hq": "Remote",
      "founded": 2020,
      "industry": "Technology",
      "revenue": "N/A",
      "size": "Solo",
      "ceo_name": "Mushood",
      "ceo_title": "Founder"
    }
  ]
}
```

#### Get Company by ID
```http
GET /api/companies/:id
```

#### Create Company
```http
POST /api/companies
Content-Type: application/json

{
  "hq": "San Francisco, CA",
  "founded": 2020,
  "industry": "Technology",
  "revenue": "$1M+",
  "size": "10-50 employees",
  "ceo_name": "John Doe",
  "ceo_title": "Chief Executive Officer"
}
```

#### Update Company
```http
PUT /api/companies/:id
Content-Type: application/json

{
  "hq": "New York, NY",
  "founded": 2020,
  "industry": "Fintech",
  "revenue": "$5M+",
  "size": "50-100 employees",
  "ceo_name": "Jane Smith",
  "ceo_title": "CEO & Founder"
}
```

#### Delete Company
```http
DELETE /api/companies/:id
```

### Projects API

#### Get All Projects (with Company Information)
```http
GET /api/projects
```

**Response:**
```json
{
  "success": true,
  "message": "Projects Fetched Successfully!",
  "data": [
    {
      "id": 1,
      "project_name": "E-commerce Platform",
      "image": "https://example.com/image.png",
      "features": ["Modern UI/UX", "Payment Integration", "Admin Dashboard"],
      "link": "https://example.com",
      "start_year": 2024,
      "company_id": 1,
      "company": {
        "id": 1,
        "hq": "Remote",
        "founded": 2020,
        "industry": "Technology",
        "revenue": "N/A",
        "size": "Solo",
        "ceo_name": "Mushood",
        "ceo_title": "Founder"
      }
    }
  ]
}
```

#### Get Project by ID
```http
GET /api/projects/:id
```

#### Create Project
```http
POST /api/projects
Content-Type: application/json

{
  "project_name": "New Project",
  "link": "https://newproject.com",
  "company_id": 1,
  "start_year": 2024,
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "image": "https://example.com/image.png"
}
```

#### Update Project
```http
PUT /api/projects/:id
Content-Type: application/json

{
  "project_name": "Updated Project Name",
  "link": "https://updatedproject.com",
  "company_id": 2,
  "start_year": 2024,
  "features": ["Updated Feature 1", "Updated Feature 2"],
  "image": "https://example.com/new-image.png"
}
```

#### Delete Project
```http
DELETE /api/projects/:id
```

### Case Studies API

#### Get All Case Studies (with Project Information)
```http
GET /api/case-studies
```

#### Get Case Study by ID
```http
GET /api/case-studies/:id
```

#### Get Case Study by Project ID
```http
GET /api/case-studies/project/:projectId
```

#### Create Case Study
```http
POST /api/case-studies
Content-Type: application/json

{
  "project_id": 1,
  "title": "E-commerce Platform Redesign",
  "description": "Complete redesign of the e-commerce platform to improve user experience and increase conversions.",
  "challenge": "The existing platform had poor user experience and low conversion rates.",
  "results": "Achieved 40% increase in conversion rates and 60% improvement in user satisfaction.",
  "onboarding_improved": "Streamlined onboarding process reducing time to first purchase by 50%.",
  "retention_increase": "Increased user retention by 35% through improved user experience.",
  "time_spent_increase": "Average session duration increased by 45%.",
  "research": "Conducted extensive user research including surveys, interviews, and usability testing.",
  "architecture": "Redesigned information architecture to be more intuitive and user-friendly.",
  "wireframing": "Created detailed wireframes and interactive prototypes for user testing.",
  "testing": "Performed multiple rounds of usability testing with real users.",
  "design": "Developed comprehensive design system and style guide for consistency.",
  "tech_stack_urls": "https://example.com/tech-stack.png",
  "ceo_statement": "This redesign has transformed our business and exceeded all expectations.",
  "conclusion": "The project successfully achieved all objectives and delivered measurable business value."
}
```

#### Update Case Study
```http
PUT /api/case-studies/:id
Content-Type: application/json

{
  "title": "Updated Case Study Title",
  "description": "Updated description...",
  // ... other fields
}
```

#### Delete Case Study
```http
DELETE /api/case-studies/:id
```

### Testimonials API

#### Get All Testimonials
```http
GET /api/testimonials
```

#### Get Testimonial by ID
```http
GET /api/testimonials/:id
```

#### Create Testimonial
```http
POST /api/testimonials
Content-Type: application/json

{
  "client_name": "John Smith",
  "company": "Tech Corp",
  "designation": "CTO",
  "content": "Excellent work! The project exceeded our expectations.",
  "image": "https://example.com/client-image.png"
}
```

#### Update Testimonial
```http
PUT /api/testimonials/:id
Content-Type: application/json

{
  "client_name": "John Smith",
  "company": "Tech Corp",
  "designation": "CTO",
  "content": "Updated testimonial content...",
  "image": "https://example.com/new-client-image.png"
}
```

#### Delete Testimonial
```http
DELETE /api/testimonials/:id
```

## 🛠️ Development Scripts

```bash
# Start development server with hot reload
bun run dev

# Start production server
bun run start

# Run database migrations
bun run migrate

# Run migrations and start server
bun run migrate-start

# Lint and format code
bun run biome check

# Format code
bun run biome format

# Check for linting issues
bun run biome lint
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | `8080` |
| `LOG_LEVEL` | Logging level (trace, debug, info, warn, error, fatal) | `info` |

### Biome Configuration

The project uses [Biome](https://biomejs.dev/) for linting and formatting with the following key rules:

- **Filename Convention**: camelCase
- **Console Usage**: Warning (use Pino logger instead)
- **Strict Equality**: Enforced (`===` instead of `==`)
- **Template Literals**: Enforced (template literals instead of string concatenation)
- **Import Organization**: Automatic

### TypeScript Configuration

- **Target**: ESNext
- **Module**: ESNext
- **Strict Mode**: Enabled
- **Module Resolution**: Bundler
- **No Emit**: True (Bun handles compilation)

## 🏗️ Database Migrations

The project uses Drizzle ORM for database migrations:

```bash
# Generate new migration
bun run drizzle-kit generate

# Run migrations
bun run migrate

# Push schema changes directly (development only)
bun run drizzle-kit push
```

Migration files are stored in `src/models/db/migrations/` and are automatically applied when running the application.

## 📊 Logging

The application uses [Pino](https://getpino.io/) for high-performance JSON logging:

```typescript
import { logger } from "./utils/logger";

// Log levels available
logger.trace("Detailed trace information");
logger.debug("Debug information");
logger.info("General information");
logger.warn("Warning messages");
logger.error("Error messages");
logger.fatal("Fatal error messages");
```

### Log Output

- **Development**: Pretty-printed logs with colors
- **Production**: JSON formatted logs for log aggregation tools

## 🚀 Deployment

### Environment Setup

1. **Database**: Set up PostgreSQL database
2. **Environment Variables**: Configure production environment variables
3. **Migration**: Run database migrations
4. **Build**: No build step required (Bun runs TypeScript directly)

### Production Considerations

- Use a proper PostgreSQL database (not SQLite)
- Set appropriate log levels for production
- Configure CORS origins for security
- Set up proper error monitoring
- Use environment-specific configuration

## 🧪 Testing

While no test suite is currently implemented, the project structure supports easy testing integration:

- **Unit Tests**: Test individual functions and utilities
- **Integration Tests**: Test API endpoints and database operations
- **E2E Tests**: Test complete user workflows

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting
5. Test your changes
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the [Bun documentation](https://bun.sh/docs)
- Review the [Hono documentation](https://hono.dev/docs)
- Consult the [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview)

## 🔄 Changelog

### v1.1.0 (Latest)
- ✅ **Automatic OpenAPI Spec Generation**: Integrated `@asteasolutions/zod-to-openapi`
- ✅ **Modern API Documentation**: Switched to Scalar for beautiful interactive docs
- ✅ **Type Safety Improvements**: Eliminated all `any` types throughout codebase
- ✅ **Fixed TypeScript Errors**: Resolved all linting and compilation issues
- ✅ **Enhanced Project Features**: Fixed array-to-string conversion for database storage
- ✅ **Improved Error Handling**: Better type-safe request/response handling

### v1.0.0
- Initial release with companies, projects, testimonials, and case studies
- Full CRUD operations for all entities
- Type-safe database operations with Drizzle ORM
- Comprehensive API documentation
- Professional logging with Pino
- Modern development setup with Biome

---

**Built with ❤️ using Bun, Hono, TypeScript, and PostgreSQL**