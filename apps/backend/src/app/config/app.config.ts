export const appConfig = () => ({
  port: +process.env.PORT || 3333,
  production: process.env.NODE_ENV === "production",
  db: {
    url: process.env.DATABASE_URL || "postgres://postgres:0000@localhost:5432/faex",
  },
  jwtSecret: process.env.JWT_SECRET || "test",
});
