<?php

namespace ManagementSettings\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

class SystemPolicies extends Model
{
    protected $table = 'system_policies';
    protected $fillable = array(
        'name',
        'slug',
        'module',
        'description',
        'policy_value_type',
        'policy_value',
        'last_modified_by',
        'active'
    );
    protected $casts = [
        'active' => 'boolean'
    ];

    public static $policyModules = [
        'Users' => 'users'
    ];

    protected function slug(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => Str::studly($value),
        );
    }

    public static function getPoliciesByModule() 
    {
        return self::get()->groupBy('module')->map(function ($items) {
            return [
                'module' => ucfirst($items->first()->module),
                'policies' => $items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'name' => $item->name,
                        'slug' => $item->slug,
                        'module' => $item->module,
                        'description' => $item->description,
                        'policy_value_type' => $item->policy_value_type,
                        'policy_value' => $item->policy_value,
                        'last_modified_by' => $item->last_modified_by,
                        'active' => $item->active,
                    ];
                })->toArray(),
            ];
        })
        ->values()
        ->toArray();
    }

    public static function getPolicyModule($module) {
        return self::select('slug','policy_value_type','policy_value')->where('module', $module)
            ->get()
            ->mapWithKeys(function ($item) {
                switch($item->policy_value_type) {
                    case 'boolean':
                        $value = $item->policy_value === "true" ? true : false;
                        break;
                    default:
                        $value = $item->policy_value;
                        break;
                }
                return [$item->slug => $value];
            })
            ->toArray();
    }
}