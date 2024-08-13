<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Classes\ApiResponseClass;
use App\Interfaces\MaintenanceCompanyRepositoryInterface;
use App\Http\Resources\MaintenanceCompanyResource;
use App\Http\Requests\StoreMaintenanceCompanyRequest;
use App\Http\Requests\UpdateMaintenanceCompanyRequest;

class MaintenanceCompanyController extends Controller
{
    private MaintenanceCompanyRepositoryInterface $maintenanceCompanyRepositoryInterface;
    
    public function __construct(MaintenanceCompanyRepositoryInterface $maintenanceCompanyRepositoryInterface)
    {
        $this->maintenanceCompanyRepositoryInterface = $maintenanceCompanyRepositoryInterface;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = $this->maintenanceCompanyRepositoryInterface->index();

        return ApiResponseClass::sendResponse(MaintenanceCompanyResource::collection($data), '', 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaintenanceCompanyRequest $request)
    {
        $details = [
            'name' => $request->name,
            'contact' => $request->contact,
            'specialization' => $request->specialization,
        ];

        DB::beginTransaction();

        try {
            $maintenanceCompany = $this->maintenanceCompanyRepositoryInterface->store($details);

            DB::commit();

            return ApiResponseClass::sendResponse(new MaintenanceCompanyResource($maintenanceCompany), 'Maintenance company create successful', 201);
        } catch(\Exception $ex){
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $maintenanceCompany = $this->maintenanceCompanyRepositoryInterface->getById($id);   

        return ApiResponseClass::sendResponse(new MaintenanceCompanyResource($maintenanceCompany), '', 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaintenanceCompanyRequest $request, string $id)
    {
        $updateDetails =[
            'name' => $request->name,
            'contact' => $request->contact,
            'specialization' => $request->specialization,
        ];

        DB::beginTransaction();

        try {
            $maintenanceCompany = $this->maintenanceCompanyRepositoryInterface->update($updateDetails, $id);

            DB::commit();
            return ApiResponseClass::sendResponse('Maintenance company update successful', '', 201);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->maintenanceCompanyRepositoryInterface->delete($id);

        return ApiResponseClass::sendResponse('Maintenance company delete successful', '', 204);
    }
}
