import css from "./SearchBar.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

interface SearchBarProps {
  onSearch: (query: string) => void;
}
interface FormValues {
  search: string;
}
export default function SearchBar({ onSearch }: SearchBarProps) {
  const initialValues: FormValues = { search: "" };
  return (
    <div className={css.searchbar}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          search: Yup.string()
            .min(3, "You must enter at least 3 characters")
            .max(50, "You cannot write more than 50 characters")
            .required("This field is required"),
        })}
        onSubmit={(values, { resetForm }) => {
          const trimmed = values.search.trim();
          onSearch(trimmed.toLowerCase());
          resetForm();
        }}
      >
        {({ handleSubmit, validateForm }) => (
          <Form
            className={css.form}
            onSubmit={async (e) => {
              e.preventDefault();
              const formErrors = await validateForm();

              if (formErrors.search) {
                toast.error(formErrors.search);
                return;
              }

              handleSubmit(e);
            }}
          >
            <Field
              className={css.input}
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <button type="submit" className={css.btn}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

