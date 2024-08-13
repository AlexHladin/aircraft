<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class ServiceRequest extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = ['id'];

    public function aircraft()
    {
        return $this->belongsTo(Aircraft::class);
    }

    public function maintenanceCompany()
    {
        return $this->belongsTo(MaintenanceCompanies::class);
    }
}
