<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Classes\ApiResponseClass;
use App\Interfaces\AircraftRepositoryInterface;
use App\Http\Resources\AircraftResource;
use App\Http\Requests\StoreAircraftRequest;
use App\Http\Requests\UpdateAircraftRequest;

class AircraftController extends Controller
{
    private AircraftRepositoryInterface $aircraftRepositoryInterface;
    
    public function __construct(AircraftRepositoryInterface $aircraftRepositoryInterface)
    {
        $this->aircraftRepositoryInterface = $aircraftRepositoryInterface;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = $this->aircraftRepositoryInterface->index();

        return ApiResponseClass::sendResponse(AircraftResource::collection($data), '', 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAircraftRequest $request)
    {
        $details = [
            'model' => $request->model,
            'serial_number' => $request->serial_number,
            'registration' => $request->registration,
        ];

        DB::beginTransaction();

        try {
            $aircraft = $this->aircraftRepositoryInterface->store($details);

            DB::commit();

            return ApiResponseClass::sendResponse(new AircraftResource($aircraft), 'Aircraft Create Successful', 201);
        } catch(\Exception $ex){
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $aircraft = $this->aircraftRepositoryInterface->getById($id);   

        return ApiResponseClass::sendResponse(new AircraftResource($aircraft), '', 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAircraftRequest $request, string $id)
    {
        $updateDetails =[
            'model' => $request->model,
            'serial_number' => $request->serial_number,
            'registration' => $request->registration,
        ];

        DB::beginTransaction();

        try{
             $aircraft = $this->aircraftRepositoryInterface->update($updateDetails, $id);

             DB::commit();
             return ApiResponseClass::sendResponse('Aircraft Update Successful', '', 201);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->aircraftRepositoryInterface->delete($id);

        return ApiResponseClass::sendResponse('Aircraft Delete Successful', '', 204);
    }
}
