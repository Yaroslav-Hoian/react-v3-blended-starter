import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";
import toast from "react-hot-toast";

interface PostFormValuesProps {
  title: string;
  body: string;
}

interface PostFormProps {
  onClose: () => void;
}

const initialValues: PostFormValuesProps = {
  title: "",
  body: "",
};

export const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  body: Yup.string().max(500, "Content is too long").required("Content is required"),
});

export default function PostForm({ onClose }: PostFormProps) {
  const queryClient = useQueryClient();

  const mutationPost = useMutation({
    mutationFn: async (newPost: PostFormValuesProps) => {
      const res = await createPost(newPost);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPostKey"] });
      toast.success("Post created successfully!");
    },
  });

  const handleCreatePost = (post: PostFormValuesProps) => {
    mutationPost.mutate(post);
  };

  const handleSubmit = (
    values: PostFormValuesProps,
    actions: FormikHelpers<PostFormValuesProps>
  ) => {
    handleCreatePost(values);
    actions.resetForm();
    onClose();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={NoteFormSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutationPost.isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
