<?php
declare(strict_types=1);

// Sumo SDK base feature

class SumoBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(SumoContext $ctx, array $options): void {}
    public function PostConstruct(SumoContext $ctx): void {}
    public function PostConstructEntity(SumoContext $ctx): void {}
    public function SetData(SumoContext $ctx): void {}
    public function GetData(SumoContext $ctx): void {}
    public function GetMatch(SumoContext $ctx): void {}
    public function SetMatch(SumoContext $ctx): void {}
    public function PrePoint(SumoContext $ctx): void {}
    public function PreSpec(SumoContext $ctx): void {}
    public function PreRequest(SumoContext $ctx): void {}
    public function PreResponse(SumoContext $ctx): void {}
    public function PreResult(SumoContext $ctx): void {}
    public function PreDone(SumoContext $ctx): void {}
    public function PreUnexpected(SumoContext $ctx): void {}
}
