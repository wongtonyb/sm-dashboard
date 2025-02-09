# sm-dashboard

A school management system dashboards.
Features includes:
- multiple login clients (admin, teacher, student, parent)
- multi-object relationships

## Technologies

Built with Node.js ecosystem

Frontend:
- Next.js
- Tailwind CSS
- various libararies for charts & forms

Backend:
- Prisma ORM
- Postgres database

## High Level Design

![image](https://github.com/user-attachments/assets/0bd90531-65b1-4cc1-897d-1b748d590141)


## Data Schema Design

### General High Level
![image](https://github.com/user-attachments/assets/802fdeae-9efe-4353-a945-10f2009b0c18)

### In-depth Data Design
![diagram-export-2-8-2025-6_57_57-PM](https://github.com/user-attachments/assets/e863e19c-8375-493d-b612-ae35c675827a)


## To Run Locally
npx prisma studio for database
npm run dev