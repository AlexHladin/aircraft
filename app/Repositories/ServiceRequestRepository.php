<?php

namespace App\Repositories;

use \App\Models\ServiceRequest;
use \App\Interfaces\ServiceRequestRepositoryInterface;

class ServiceRequestRepository implements ServiceRequestRepositoryInterface
{
    public function index(){
        return ServiceRequest::with(['aircraft', 'maintenanceCompany'])->get();
    }

    public function getById($id){
       return ServiceRequest::with(['aircraft', 'maintenanceCompany'])->findOrFail($id);
    }

    public function store(array $data){
       return ServiceRequest::create($data);
    }

    public function update(array $data,$id){
       return ServiceRequest::whereId($id)->update($data);
    }
    
    public function delete($id){
        ServiceRequest::findOrFail($id)->destroy($id);;
    }
}
