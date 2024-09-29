<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
// models
use ManagementSettings\Models\SystemPolicies;

class PolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $systemPolicy = [
            [
                'name' => 'User Default Data Access',
                'module' => SystemPolicies::$policyModules['Users'],
                'description' => 'When a user is created and this policy is set to "true," the system will automatically grant data access to the user based on the currently registered branch.',
                'policy_value_type' => 'boolean',
                'policy_value' => 'true',
            ],
            [
                'name' => 'User Default Password',
                'module' => SystemPolicies::$policyModules['Users'],
                'description' => 'When a user is created and this policy is set to "true," the system will automatically generate a random password for the user.',
                'policy_value_type' => 'boolean',
                'policy_value' => 'true',
            ]
        ];

        foreach($systemPolicy as $policy) {
            SystemPolicies::updateOrcreate(
                ['name' => $policy['name'], 'module' => $policy['module'], 'last_modified_by' => null],
                array_merge(
                    $policy,
                    [
                        'slug' => $policy['name']
                    ]
                )
            );
        }
    }
}
