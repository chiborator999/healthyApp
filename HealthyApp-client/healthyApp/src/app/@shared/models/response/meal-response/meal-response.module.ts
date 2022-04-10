import { MealCategoryResponseModule } from "../meal-category-response/meal-category-response.module";
import { MealTypeResponseModule } from "../meal-type-response/meal-type-response.module";
import { ProductResponseModule } from "../product-response/product-response.module";

export class MealResponseModule { 
  id: string;
  mealType: MealTypeResponseModule;
  mealCategory: MealCategoryResponseModule;
  products: Array<ProductResponseModule>;
 }
