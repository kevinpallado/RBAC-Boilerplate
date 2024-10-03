<?php

namespace ManagementSettings\Validations;

use Illuminate\Foundation\Http\FormRequest;
// traits
use ManagementSettings\Traits\SystemPolicyTrait;
use ManagementSettings\Traits\SystemUserAccessTrait;

class StoreSystemUserRequest extends FormRequest
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

        return $this->isUserHasAuthorizedAction('store');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'user_uuid' => 'required',
            'email' => 'required|email|unique:system_users,email',
            'group_id' => 'required|exists:system_user_groups,id',
            // Password validation with conditional rules
            'password'   => $this->getPasswordValidationRules(),

            // Data access validation with conditional rules
            'dataAccess' => $this->getDataAccessValidationRules(),
        ];
    }

    /**
     * Get the password validation rules based on the policy.
     *
     * @return array<string>
     */
    protected function getPasswordValidationRules(): array
    {
        if (!$this->modulePolicy['UserDefaultPassword']) {
            return ['required', 'string'];
        }

        return [
            'string',
            'min:10',            // At least 10 characters
            'regex:/[a-z]/',     // At least one lowercase letter
            'regex:/[A-Z]/',     // At least one uppercase letter
            'regex:/[0-9]/',     // At least one digit
            'regex:/[@$!%*#?&]/', // At least one special character
        ];
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
