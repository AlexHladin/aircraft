<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use \App\Interfaces\AircraftRepositoryInterface;
use \App\Interfaces\MaintenanceCompanyRepositoryInterface;
use \App\Interfaces\ServiceRequestRepositoryInterface;

use \App\Repositories\AircraftRepository;
use \App\Repositories\MaintenanceCompanyRepository;
use \App\Repositories\ServiceRequestRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AircraftRepositoryInterface::class, AircraftRepository::class);
        $this->app->bind(MaintenanceCompanyRepositoryInterface::class, MaintenanceCompanyRepository::class);
        $this->app->bind(ServiceRequestRepositoryInterface::class, ServiceRequestRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
