<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categoryIds = \App\Models\Category::pluck('id')->toArray();
        return [
            'category_id' => fake()->randomElement($categoryIds),
            'slug' => fake()->slug,
            'name' => fake()->unique()->sentence,
            'description' => fake()->paragraph,
            'meta_title' => fake()->sentence,
            'meta_keyword' => fake()->words(3, true),
            'meta_description' => fake()->text,
            'selling_price' => fake()->randomFloat(2, 10, 500),
            'original_price' => fake()->randomFloat(2, 10, 500),
            'quantity' => fake()->numberBetween(1, 100),
            'brand' => fake()->word,
            'image' => fake()->imageUrl(),
            'featured' => fake()->randomElement([0, 1]),
            'popular' => fake()->randomElement([0, 1]),
            'status' => fake()->randomElement([0, 1]),
        ];
    }
}
