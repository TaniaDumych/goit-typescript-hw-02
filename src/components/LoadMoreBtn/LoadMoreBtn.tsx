import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}
export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <button type="button" className={css.button} onClick={onClick}>
      Load more
    </button>
  );
}