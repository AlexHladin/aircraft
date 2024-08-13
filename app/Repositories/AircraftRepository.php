<?php

namespace App\Repositories;

use \App\Models\Aircraft;
use \App\Interfaces\AircraftRepositoryInterface;

class AircraftRepository implements AircraftRepositoryInterface
{
    public function index() {
        return Aircraft::all();
    }

    public function getById($id) {
       return Aircraft::findOrFail($id);
    }

    public function store(array $data){
       return Aircraft::create($data);
    }

    public function update(array $data, $id){
       return Aircraft::whereId($id)->update($data);
    }
    
    public function delete($id) {
        Aircraft::findOrFail($id)->destroy($id);;
    }
}
