<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
// models
use App\Models\SystemPages;
use App\Models\SystemUserAccess;
use ManagementSettings\Models\SystemCompanyBranches;
use ManagementSettings\Models\SystemCompanyInfo;
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

        $companyInfo = [
            ['question' => 'Company Name', 'type' => 'text', 'category' => 'general'],
            ['question' => 'Alias', 'type' => 'text', 'category' => 'general'],
            ['question' => 'Number of Satellite Branch', 'type' => 'number', 'category' => 'general'],
            ['question' => 'Phone Number', 'type' => 'text', 'category' => 'general'],
            ['question' => 'Telephone Number', 'type' => 'text', 'category' => 'general'],
            ['question' => 'Fax Number', 'type' => 'text', 'category' => 'general'],
            ['question' => 'Email Address', 'type' => 'text', 'category' => 'general'],
            ['question' => 'Street Address', 'type' => 'text', 'category' => 'address'],
            ['question' => 'City/Municipality', 'type' => 'text', 'category' => 'address'],
            ['question' => 'Province/State', 'type' => 'text', 'category' => 'address'],
            ['question' => 'Region', 'type' => 'text', 'category' => 'address'],
            ['question' => 'Zip Code', 'type' => 'text', 'category' => 'address'],
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

        foreach($companyInfo as $info) {
            SystemCompanyInfo::updateOrCreate(
                ['info_tag' => $info['question'], 'info_slug' => Str::snake(str_replace("/","",$info['question'])), 'info_type' => $info['type'], 'info_category' => $info['category']],
                ['info_tag' => $info['question'], 'info_slug' => Str::snake(str_replace("/","",$info['question'])), 'info_type' => $info['type'], 'info_category' => $info['category']]
            );
        }

        if(SystemCompanyBranches::count() < 4) {
            for($sample=0; $sample<4; $sample++) {
                SystemCompanyBranches::factory()->create();
            }
        }
        
    }
}
