<?php

namespace Database\Factories\ManagementSettings\Models;

use Illuminate\Database\Eloquent\Factories\Factory;
// models
use ManagementSettings\Models\SystemCompanyBranches;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SystemCompanyBranchesFactory extends Factory
{
    protected $model = SystemCompanyBranches::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company,
            'code' => fake()->companySuffix,
            'street_address' => fake()->streetAddress,
            'brgy' => fake()->streetName,
            'city' => fake()->city,
            'province_state' => fake()->state,
            'postal' => fake()->postcode,
            'country' => fake()->country,
            'email' => fake()->email,
            'phone' => fake()->phoneNumber,
            'active' => true
        ];
    }
}
