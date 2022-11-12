import styled from "styled-components";
import { Button3 } from "../../../Components/UI/Button";
import { InputError1 } from "../../../Components/UI/Errors";
import { FaCircleNotch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../../store/userApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [triggerCreateUser, { isLoading }] = useCreateUserMutation();

  const submitHandler = (validatedData) => {
    const { name, username, email, password, confirm_password } = validatedData;

    const mutationBody = {
      query: `
        mutation{
          createUser(createUserData: {name : "${name}", username: "${username}", email : "${email}" , password : "${password}", confirm_password :"${confirm_password}"}){
            message
          }
        }
      `,
    };

    triggerCreateUser({ body: mutationBody }).then((res) => {
      if (res?.errors) {
        toast.error("Error occurred while signing up user.", {
          position: "top-center",
          style: {
            backgroundColor: "#ffb7",
          },
        });
      } else {
        toast.success("User Signed up successfully!", {
          position: "top-center",
          style: {
            backgroundColor: "#ffb7",
          },
        });

        navigate("/auth/sign-in");
      }
    });
  };

  return (
    <>
      <Title className="text-center">Sign-up</Title>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="py-2">
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            className="w-full p-2 rounded-lg bg-inherit border-solid border-2 border-white"
            {...register("name", {
              required: {
                value: true,
                message: "This field is required.",
              },
              max: {
                value: 30,
                message: "Name must be less than 30 characters.",
              },
              min: {
                value: 4,
                message: "Name must have more than 4 characters.",
              },
            })}
          />

          {errors?.name?.message ? (
            <InputError1>{errors?.name?.message}</InputError1>
          ) : (
            <></>
          )}
        </div>
        <div className="py-2">
          <input
            type="text"
            placeholder="username"
            name="username"
            className="w-full p-2 rounded-lg bg-inherit border-solid border-2 border-white"
            {...register("username", {
              required: {
                value: true,
                message: "This field is required.",
              },
              max: {
                value: 15,
                message: "username must be less than 15 characters.",
              },
              min: {
                value: 5,
                message: "Name must have more than 5 characters.",
              },
            })}
          />

          {errors?.username?.message ? (
            <InputError1>{errors?.username?.message}</InputError1>
          ) : (
            <></>
          )}
        </div>
        <div className="py-2">
          <input
            type="email"
            placeholder="email"
            name="email"
            className="w-full p-2 rounded-lg bg-inherit border-solid border-2 border-white"
            {...register("email", {
              required: {
                value: true,
                message: "This field is required.",
              },
            })}
          />

          {errors?.email?.message ? (
            <InputError1>{errors?.email?.message}</InputError1>
          ) : (
            <></>
          )}
        </div>
        <div className="py-2">
          <input
            type="password"
            placeholder="password"
            name="password"
            className="w-full p-2 rounded-lg bg-inherit border-solid border-2 border-white"
            {...register("password", {
              required: {
                value: true,
                message: "This field is required.",
              },
              max: {
                value: 15,
                message: "password must be less than 15 characters.",
              },
              min: {
                value: 5,
                message: "password must have more than 5 characters.",
              },
            })}
          />

          {errors?.password?.message ? (
            <InputError1>{errors?.password?.message}</InputError1>
          ) : (
            <></>
          )}
        </div>
        <div className="py-2">
          <input
            type="password"
            placeholder="confirm password"
            name="confirm_password"
            className="w-full p-2 rounded-lg bg-inherit border-solid border-2 border-white"
            {...register("confirm_password", {
              required: {
                value: true,
                message: "This field is required.",
              },
              max: {
                value: 15,
                message: "password must be less than 15 characters.",
              },
              min: {
                value: 5,
                message: "password must have more than 5 characters.",
              },
            })}
          />

          {errors?.password?.message ? (
            <InputError1>{errors?.password?.message}</InputError1>
          ) : (
            <></>
          )}
        </div>

        <div className="py-2">
          <input
            type="file"
            placeholder="Choose a image."
            name="image"
            accepts="image/png, image/jpg, image/jpeg"
            className="w-full p-2 rounded-lg bg-inherit border-solid border-2 border-white"
            {...register("image", {
              required: {
                value: true,
                message: "This field is required.",
              },
            })}
          />

          {errors?.image?.message ? (
            <InputError1>{errors?.image?.message}</InputError1>
          ) : (
            <></>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Button3 type="submit">
            {isLoading ? (
              <FaCircleNotch color="#fff" className="animate-spin" />
            ) : (
              "Continue"
            )}
          </Button3>
        </div>
      </form>
    </>
  );
};

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
  border-bottom: 1px solid #ffb7;
  padding-bottom: 1rem;
`;

export default SignUpForm;
