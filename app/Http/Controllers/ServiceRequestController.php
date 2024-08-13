<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Classes\ApiResponseClass;
use App\Interfaces\ServiceRequestRepositoryInterface;
use App\Http\Resources\ServiceRequestResource;
use App\Http\Requests\StoreServiceRequestRequest;
use App\Http\Requests\UpdateServiceRequestRequest;

class ServiceRequestController extends Controller
{
    private ServiceRequestRepositoryInterface $serviceRequestRepositoryInterface;
    
    public function __construct(ServiceRequestRepositoryInterface $serviceRequestRepositoryInterface)
    {
        $this->serviceRequestRepositoryInterface = $serviceRequestRepositoryInterface;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = $this->serviceRequestRepositoryInterface->index();

        return ApiResponseClass::sendResponse(ServiceRequestResource::collection($data), '', 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequestRequest $request)
    {
        $details = [
            'aircraft_id' => $request->aircraft_id,
            'maintenance_company_id' => $request->maintenance_company_id,
            'description' => $request->description,
            'priority' => $request->priority,
            'status' => $request->status,
            'start_date' => $request->start_date,
            'due_date' => $request->due_date,
        ];

        DB::beginTransaction();

        try {
            $serviceRequest = $this->serviceRequestRepositoryInterface->store($details);

            DB::commit();

            return ApiResponseClass::sendResponse(new ServiceRequestResource($serviceRequest), 'Service request create successful', 201);
        } catch(\Exception $ex){
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $serviceRequest = $this->serviceRequestRepositoryInterface->getById($id);   

        return ApiResponseClass::sendResponse(new ServiceRequestResource($serviceRequest), '', 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequestRequest $request, string $id)
    {
        $updateDetails =[
            'aircraft_id' => $request->aircraft_id,
            'maintenance_company_id' => $request->maintenance_company_id,
            'description' => $request->description,
            'priority' => $request->priority,
            'status' => $request->status,
            'start_date' => $request->start_date,
            'due_date' => $request->due_date,
        ];

        DB::beginTransaction();

        try {
            $serviceRequest = $this->serviceRequestRepositoryInterface->update($updateDetails, $id);

            DB::commit();
            return ApiResponseClass::sendResponse('Service request update successful', '', 201);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->serviceRequestRepositoryInterface->delete($id);

        return ApiResponseClass::sendResponse('Service request delete successful', '', 204);
    }
}
