import { bem } from "../../../utils/utils";

enum ProductCategory {
    SoftSkill = "софт-скил",
    HardSkill = "хард-скил",
    Button = "кнопка",
    Additional = "дополнительное",
    Other = "другое"
}

export function productCategoryToClass(productCategory: ProductCategory): string {
    switch (productCategory) {
        case ProductCategory.SoftSkill: return bem("card", "category", "soft").name;
        case ProductCategory.HardSkill: return bem("card", "category", "hard").name;
        case ProductCategory.Button: return bem("card", "category", "button").name;
        case ProductCategory.Additional: return bem("card", "category", "additional").name;
        case ProductCategory.Other: return bem("card", "category", "other").name;
        default: return "";
    }
}

export default ProductCategory;