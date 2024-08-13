<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AircraftController;
use App\Http\Controllers\ServiceRequestController;
use App\Http\Controllers\MaintenanceCompanyController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('aircraft', AircraftController::class);
Route::apiResource('service-request', ServiceRequestController::class);
Route::apiResource('maintenance-company', MaintenanceCompanyController::class);
