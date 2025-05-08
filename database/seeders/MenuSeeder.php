<?php
namespace Database\Seeders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Menu;
class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = [
            [
                'id' => 1,
                'menu_name' => 'dashboard',
                'menu_href' => 'dashboard',
                'menu_parent' => 0,
                'menu_icon' => 'mdi-view-dashboard-outline',
                'menu_placeholder' => 'Dashboard',
                'menu_permissions' => '1',
                'is_active' => 1,
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null,
                'is_section' => 0,
                'order' => 1,
            ],
            [
                'id' => 2,
                'menu_name' => 'user',
                'menu_href' => 'users',
                'menu_parent' => 0,
                'menu_icon' => 'mdi-account',
                'menu_placeholder' => 'System Users',
                'menu_permissions' => '1,2,3,4,5',
                'is_active' => 1,
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null,
                'is_section' => 0,
                'order' => 9,
            ],
            [
                'id' => 3,
                'menu_name' => 'role',
                'menu_href' => 'roles',
                'menu_parent' => 0,
                'menu_icon' => 'mdi-account-group',
                'menu_placeholder' => 'Roles',
                'menu_permissions' => '1,2,3,4',
                'is_active' => 1,
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null,
                'is_section' => 0,
                'order' => 10,
            ],
            [
                'id' => 4,
                'menu_name' => 'permission',
                'menu_href' => 'permissions',
                'menu_parent' => 0,
                'menu_icon' => 'mdi-account-cog',
                'menu_placeholder' => 'Permission',
                'menu_permissions' => '1,3',
                'is_active' => 1,
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null,
                'is_section' => 0,
                'order' => 11,
            ],
            [
                'id' => 21,
                'menu_name' => 'customer',
                'menu_href' => 'customers',
                'menu_parent' => 0,
                'menu_icon' => 'mdi-account-heart',
                'menu_placeholder' => 'Customers',
                'menu_permissions' => '1,2,3,4',
                'is_active' => 1,
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null,
                'is_section' => 0,
                'order' => 5,
            ],
            [
                'id' => 26,
                'menu_name' => 'other-inquiry',
                'menu_href' => 'other-inquiry',
                'menu_parent' => 0,
                'menu_icon' => 'mdi-account-details',
                'menu_placeholder' => 'Other Inquiry',
                'menu_permissions' => '1,2,3,4',
                'is_active' => 1,
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null,
                'is_section' => 0,
                'order' => 4,
            ],
            [
                'id' => 29,
                'menu_name' => 'settings',
                'menu_href' => 'settings',
                'menu_parent' => 0,
                'menu_icon' => 'mdi-account-cog',
                'menu_placeholder' => 'Settings',
                'menu_permissions' => '1,2,3,4',
                'is_active' => 1,
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null,
                'is_section' => 0,
                'order' => 12,
            ],
            [
                'id' => 30,
                'menu_name' => 'volunteers',
                'menu_href' => 'volunteers',
                'menu_parent' => 0,
                'menu_icon' => 'mdi-view-dashboard-outline',
                'menu_placeholder' => 'Volunteers',
                'menu_permissions' => '1,2,3,4',
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => null,
                'deleted_at' => null,
                'is_section' => 0,
                'order' => 1,
            ],
        ];
        Menu::truncate('menus');
        Menu::insert($menus);
    }
}
