<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AircraftResource extends JsonResource
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
            'model' => $this->model,
            'serial_number' => $this->serial_number,
            'registration' => $this->registration,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
