import * as yup from 'yup';

export const userInteractionValidationSchema = yup.object().shape({
  interaction_data: yup.string().required(),
  user_id: yup.string().nullable(),
});
