<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' =>$this->id,
            'description' => $this->description,
            'priority' => $this->priority,
            'status' => $this->status,
            'opened_at' => $this->opened_at,
            'start_date' => $this->start_date,
            'due_date' => $this->due_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'aircraft' => new AircraftResource($this->whenLoaded('aircraft')),
            'maintenance_company' => new MaintenanceCompanyResource($this->whenLoaded('maintenanceCompany')),
        ];
    }
}
