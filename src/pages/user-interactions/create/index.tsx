import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createUserInteraction } from 'apiSdk/user-interactions';
import { Error } from 'components/error';
import { userInteractionValidationSchema } from 'validationSchema/user-interactions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { UserInteractionInterface } from 'interfaces/user-interaction';

function UserInteractionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: UserInteractionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createUserInteraction(values);
      resetForm();
      router.push('/user-interactions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<UserInteractionInterface>({
    initialValues: {
      interaction_data: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: userInteractionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create User Interaction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="interaction_data" mb="4" isInvalid={!!formik.errors?.interaction_data}>
            <FormLabel>Interaction Data</FormLabel>
            <Input
              type="text"
              name="interaction_data"
              value={formik.values?.interaction_data}
              onChange={formik.handleChange}
            />
            {formik.errors.interaction_data && <FormErrorMessage>{formik.errors?.interaction_data}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'user_interaction',
  operation: AccessOperationEnum.CREATE,
})(UserInteractionCreatePage);
