import { CreatePreviewCategoriesPropsInterface } from "./types";

const CreatePreviewCategories: React.FC<
  CreatePreviewCategoriesPropsInterface
> = ({ categories, onCategoryClick, onCloseModal }) => {
  return categories.map((genre) => (
    <div
      key={genre.id}
      className="flex justify-center items-center content-center flex-wrap w-full cursor-pointer rounded p-2 bg-surface-3 dark:bg-dark-surface-3 text-text-high dark:text-dark-text-high hover:bg-accent dark:hover:bg-dark-accent transition-colors"
      onClick={() => {
        if (onCloseModal) {
          onCloseModal();
        }
        onCategoryClick(genre.id.toString());
      }}>
      <p>{genre.name}</p>
    </div>
  ));
};

export { CreatePreviewCategories };
