<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\Rule;

use \App\Enums\Priority;
use \App\Enums\Status;

class UpdateServiceRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'aircraft_id' => 'required|numeric',
            'maintenance_company_id' => 'required|numeric',
            'description' => 'required|min:2|max:1024',
            'priority' => ['required', Rule::enum(Priority::class)],
            'status' => ['required', Rule::enum(Status::class)],
            'start_date' => 'required|date',
            'due_date' => 'required|date|after:start_date',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation errors',
            'data'      => $validator->errors()
        ]));
    }
}
