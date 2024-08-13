<?php

namespace App\Repositories;

use \App\Models\MaintenanceCompanies;
use \App\Interfaces\MaintenanceCompanyRepositoryInterface;

class MaintenanceCompanyRepository implements MaintenanceCompanyRepositoryInterface
{   
    public function index(){
        return MaintenanceCompanies::all();
    }

    public function getById($id){
        return MaintenanceCompanies::findOrFail($id);
    }

    public function store(array $data){
        return MaintenanceCompanies::create($data);
    }

    public function update(array $data,$id){
        return MaintenanceCompanies::whereId($id)->update($data);
    }

    public function delete($id){
        MaintenanceCompanies::findOrFail($id)->destroy($id);
    }
}
