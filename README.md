# vending-machine

Vending Machine Full stack application

This application was written in a MongoDB + Express + React stack, by using Prisma for schema validation and generation, and Redux Toolkit for automatizing the API tooling and integration to the frontend.

It can be executed locally via docker compose, with the following command in the root folder:

```bash
$ docker compose up
```

That'll generate the docker images and connect it to a mongodb container instance, while exposing the API (via localhost:8000) and the UI (via localhost:3000). An OpenAPI spec and a postman collection config is included for further testing.

## Next Steps

If I had more time, I would invest in:

- Increasing test coverage by testing other edge cases throughout the application
- Implementing the success path on cypress e2e testing for the frontend, thus speeding the process on testing the UI
- Moving the cache validation strategy from the generated vendingApi to the openapi.json to enable more portability
- Improving dramatically the security by adding a refresh token mechanism to the JWT, avoiding then to store sensitive tokens on the localStorage
