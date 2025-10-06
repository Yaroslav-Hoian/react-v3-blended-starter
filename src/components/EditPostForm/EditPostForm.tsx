import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import css from "./EditPostForm.module.css";
import { NoteFormSchema } from "../CreatePostForm/CreatePostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost, NewDataPostProps } from "../../services/postService";
import toast from "react-hot-toast";

interface EditPostFormProps {
  post: { id: number; title: string; body: string };
  onClose: () => void;
}

const EditFormSchema = NoteFormSchema;

export default function EditPostForm({ post, onClose }: EditPostFormProps) {
  const queryClient = useQueryClient();

  const initialValues: NewDataPostProps = {
    id: post.id,
    title: post.title,
    body: post.body,
  };

  const mutationPost = useMutation({
    mutationFn: async (post: NewDataPostProps) => {
      const res = await editPost(post);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post edited successfully!");
    },
  });

  const handleEditPost = (post: NewDataPostProps) => {
    mutationPost.mutate(post);
  };

  const handleSubmit = (post: NewDataPostProps, actions: FormikHelpers<NewDataPostProps>) => {
    handleEditPost(post);
    actions.resetForm();

    onClose();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={EditFormSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutationPost.isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
