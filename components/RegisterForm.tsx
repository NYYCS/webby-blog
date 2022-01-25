import React, { useState, useEffect, useReducer } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

enum FormActionType {
  FULLNAME = "fullname",
  EMAIL = "email",
  MOBILE = "mobile",
  PASSWORD = "password",
}

type FormAction = 
  { type: FormActionType.FULLNAME, payload: string } |
  { type: FormActionType.EMAIL, payload: string }    |
  { type: FormActionType.MOBILE, payload: string }   |
  { type: FormActionType.PASSWORD, payload: string }  

type RegisterFormState = {
    user_fullname:string,
		user_email: string,
		user_mobile:string,
		password: string
}

const registerFormReducer = (state: RegisterFormState, action: FormAction) => {
  switch (action.type) {
    case FormActionType.FULLNAME:
      return { ...state, user_fullname: action.payload };
    case FormActionType.EMAIL:
      return { ...state, user_email: action.payload };
    case FormActionType.MOBILE:
      return { ...state, user_mobile: action.payload };
    case FormActionType.PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

const validateForm = (state: RegisterFormState) => {
  if (!state.user_fullname) return false;
  if (!state.user_email)    return false;
  if (!state.user_mobile)   return false;
  if (!state.password)      return false;
  return true;
}

const ErrorMessage: React.FC<{ errors: Array<any> }> = ({ errors }) => {
  const messages = errors.map(error => {
    return Object.entries(error.extensions.validation).map(([_, value]) => value);
  }).flat();

  console.log(messages);

  return (
    <div className="flex flex-col text-xs text-red-500 rounded">
      {messages.map((message, i) => <p key={i}>{message}</p>)}
    </div>
  )

}

const RegisterForm = () => {
  const [valid, setValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [state, dispatch] = useReducer(registerFormReducer, {
    user_fullname: "",
		user_email:  "",
		user_mobile: "",
		password: ""
  });

  const router = useRouter();

  useEffect(() => {
    setValid(validateForm(state))
  }, [state]);

  const submit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (valid)
      fetch("https://graph-api-test.webby.asia/graphql", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              register(input: {
                user_fullname: "${state.user_fullname}",
                user_email: "${state.user_email}",
                user_mobile: "${state.user_mobile}",
                password: "${state.password}"
              })
            }
          `,
        }),
      }).then(res => res.json())
        .then(res => {
          if (!res.errors) {
            alert("Success!");
            router.push("/login");
          } else {
            setErrors(res.errors);
          }
        });
  }
  
  

  return (
    <form className="flex flex-col items-center gap-8 p-8 bg-white shadow rounded-xl">
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">Sign up</div>
        <Link href="/login">
          <a className="text-xs text-gray-500 underline">Click here to login</a>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold" htmlFor="fullname">Full Name</label>
          <input
            value={state.user_fullname}
            onChange={e => dispatch({ type: FormActionType.FULLNAME, payload: e.target.value })}
            className="flex p-2 border rounded shadow-xs bg-gray-50" type="text"
            placeholder="Full Name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold" htmlFor="email">Email</label>
          <input 
            value={state.user_email}
            onChange={e => dispatch({ type: FormActionType.EMAIL, payload: e.target.value })}
            className="flex p-2 border rounded shadow-xs bg-gray-50" type="email"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold" htmlFor="mobile">Mobile No.</label>
          <input
            value={state.user_mobile}
            onChange={e => dispatch({ type: FormActionType.MOBILE, payload: e.target.value })}
            className="flex p-2 border rounded shadow-xs bg-gray-50" type="tel"
            placeholder="Phone number"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold" htmlFor="password">Password</label>
          <input
            value={state.password}
            onChange={e => dispatch({ type: FormActionType.PASSWORD, payload: e.target.value })}
            className="flex p-2 border rounded shadow-xs bg-gray-50" type="password"
            placeholder="Password"
          />
        </div>
      </div>
      {errors.length > 0 && <ErrorMessage errors={errors}/>}
      <div className="flex w-full py-4">
        <button
          onClick={submit}
          className={`flex justify-center w-full py-2 text-white border rounded shadow ${valid ? "bg-cyan-500": "bg-gray-500"}`}
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
}

export { RegisterForm }