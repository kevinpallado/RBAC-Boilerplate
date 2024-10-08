<?php

namespace ManagementSettings\Validations;

use Illuminate\Foundation\Http\FormRequest;
// traits
use ManagementSettings\Traits\SystemPolicyTrait;
use ManagementSettings\Traits\SystemUserAccessTrait;

class UpdateSystemUserRequest extends FormRequest
{
    use SystemUserAccessTrait, SystemPolicyTrait;

    public $page = 'users';
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $this->getUserAuthorizedAction();

        $this->getModuleSystemPolicy();

        return $this->isUserHasAuthorizedAction('update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        switch ($this->action) {
            case 'user-detail':
                return [
                    'first_name' => 'required',
                    'last_name' => 'required',
                    'user_uuid' => 'required',
                    'email' => 'required|email|unique:system_users,email,'.$this->user_id,
                    'group_id' => 'required|exists:system_user_groups,id',
                    // Data access validation with conditional rules
                    'dataAccess' => $this->getDataAccessValidationRules(),
                ];
            default:
                return [];
        }
    }

    /**
     * Get the data access validation rules based on the policy.
     *
     * @return array<string>
     */
    protected function getDataAccessValidationRules(): array
    {
        if (!$this->modulePolicy['UserDefaultDataAccess']) {
            return ['required', 'array', 'exists:system_company_branches,id', 'distinct'];
        }

        return ['nullable', 'array'];
    }
}
