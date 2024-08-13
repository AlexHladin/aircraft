# Aircraft maintenance
## Apply migrations
```docker compose exec app php artisan migrate```

## Undo migration
```docker compose exec app php artisan migrate:rollback --step=1```

## Create model
```docker compose exec app php artisan make:model Name -m```

## Create resource
```docker compose exec app php artisan make:controller AircraftController --resource```