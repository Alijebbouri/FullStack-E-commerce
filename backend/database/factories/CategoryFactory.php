<?php

namespace Database\Factories;
use Faker\Generator as Faker;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement(['PC & Laptops', 'Mobile Phones & Tablets', 'Electronics & Gadgets', 'Men\'s Fashion', 'Women\'s Fashion', 'Kids\' Fashion', 'Home & Kitchen Appliances', 'Health & Beauty', 'Sports & Outdoors', 'Books & Stationery']);
        $slug = Str::slug($name, '-');
        return [
            'name' => $name,
            'slug' => $slug,
            'description' => fake()->paragraph,
            'meta_title' => fake()->sentence,
            'meta_keyword' => fake()->words(3, true),
            'meta_description' => fake()->paragraph,
            'status' =>fake()->randomElement([0, 1]),
        ];
    }
}
