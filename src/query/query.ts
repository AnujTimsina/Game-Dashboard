// import { useQueryClient } from "react-query";
// import { useNavigate } from "react-router-dom";

// async function signIn(email: string, password: string): Promise<User> {
//     const response = await fetch('/api/auth/signin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email, password })
//     })
//     if (!response.ok)
//       throw new ResponseError('Failed on sign in request', response);

//     return await response.json();
//   }

//   type IUseSignIn = UseMutateFunction<User, unknown, {
//     email: string;
//     password: string;
//   }, unknown>

//   export function useSignIn(): IUseSignIn {
//     const queryClient = useQueryClient();
//     const navigate = useNavigate();
//     const { enqueueSnackbar } = useSnackbar();

//     const { mutate: signInMutation } = useMutation<User, unknown, { email: string, password: string }, unknown>(
//       ({
//         email,
//         password
//       }) => signIn(email, password), {
//       onSuccess: (data) => {
//         // TODO: save the user in the state
//         navigate('/');
//       },
//       onError: (error) => {
//         enqueueSnackbar('Ops.. Error on sign in. Try again!', {
//           variant: 'error'
//         });
//       }
//     });

//     return signInMutation
//   }

export {};
