# Aircraft maintenance

## Backend
### Apply migrations
```docker compose exec app php artisan migrate```

### Undo migration
```docker compose exec app php artisan migrate:rollback --step=1```

### Create model
```docker compose exec app php artisan make:model Name -m```

### Create resource
```docker compose exec app php artisan make:controller AircraftController --resource```

## Frontend
### Install node_modules
```cd ./frontned && npm i```
### Run project
```npm run dev```