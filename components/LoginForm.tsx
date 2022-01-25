import React, { useState, useEffect, useReducer, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from  "./context/AuthContext"

enum FormActionType {
  MOBILE = "mobile",
  PASSWORD = "password",
}

type FormAction = 
  { type: FormActionType.MOBILE, payload: string }    |
  { type: FormActionType.PASSWORD, payload: string }  

type LoginFormData = {
  phoneNumber: string,
  password: string
}

type LoginFormState = {
  mobile: string,
  password: string,
}

const validateForm = (state: LoginFormState) => {
  if (state.mobile == '') return false;
  if (state.password == '') return false;
  return true;
}

const loginFormReducer = (state: LoginFormState, action: FormAction) => {
  switch (action.type) {
    case FormActionType.MOBILE:
      return { ...state, mobile: action.payload };
    case FormActionType.PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

const ErrorMessage: React.FC<{ errors: Array<any> }> = ({ errors }) => {
  console.log(errors);
  const messages = errors.map(error => {
    if (error.message == "The provided credentials are incorrect.")
      return error.message
    return Object.entries(error.extensions.validation).map(([_, value]) => value);
  }).flat();

  return (
    <div className="flex flex-col text-xs text-red-500 rounded">
      {messages.map((message, i) => <p key={i}>{message}</p>)}
    </div>
  )

}

const LoginForm: React.FC = () => {
  const [state, dispatch] = useReducer(loginFormReducer, { mobile: '', password: '' });
  const [valid, setValid] = useState(false);
  const [errors, setErrors] = useState([]);
  
  const { login } = useContext(AuthContext);
  

  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (valid) 
      login(state.mobile, state.password)
        .then(res => router.push("/"))
        .catch(res => setErrors(res.errors));

  }
  

  useEffect(() => {
    setValid(validateForm(state));
  }, [state])

  return (
    <form className="flex flex-col items-center gap-8 p-8 bg-white shadow rounded-xl">
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">Log in</div>
        <Link href="/register">
          <a className="text-xs text-gray-500 underline">Click here to register</a>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold" htmlFor="mobile">Mobile No.</label>
          <input 
            onChange={e => dispatch({ type: FormActionType.MOBILE, payload: e.target.value })}
            value={state.mobile}
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
          onClick={onSubmit}
          className={`flex justify-center w-full py-2 text-white border rounded shadow ${valid ? "bg-cyan-500": "bg-gray-500"}`}
          type="submit">
          Enter
        </button>
      </div>
    </form>
  );
}

export { LoginForm }