<?php

namespace ManagementSettings\Traits;
// models
use ManagementSettings\Models\SystemPolicies;

trait SystemPolicyTrait {

    public array $modulePolicy = [];

    public function getModuleSystemPolicy() {
        $this->modulePolicy = SystemPolicies::getPolicyModule($this->page);

        return;
    }
}