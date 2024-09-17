<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
// models
use App\Models\SystemPages;
use App\Models\SystemUserAccess;
use ManagementSettings\Models\SystemUserGroups;

class CompanyDataAccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $actions = ['read','store','update','delete','print'];
        $pages = [
            [
                'module' => 'Management Settings',
                'page' => 'Company Profile',
            ],
            [
                'module' => 'Management Settings',
                'page' => 'Policy Navigator',
            ]
        ];

        foreach($pages as $page) {
            $pageInfo = SystemPages::updateOrCreate(
                ['module' => $page['module'], 'page' => $page['page']],
                [
                    'module' => $page['module'],
                    'module_slug' => $page['module'],
                    'page' => $page['page'],
                    'page_slug' => $page['page']
                ]
            );

            foreach($actions as $action) {
                SystemUserAccess::updateOrCreate(
                    ['access_type' => 'group', 'access_id' => SystemUserGroups::where("name", 'Administrator')->value('id'), 'page_id' => $pageInfo->id, 'action' => $action],
                    ['access_type' => 'group', 'access_id' => SystemUserGroups::where("name", 'Administrator')->value('id'), 'page_id' => $pageInfo->id, 'action' => $action]
                );
            }
        }
    }
}
