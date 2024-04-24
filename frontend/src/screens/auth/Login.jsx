import Google from "../../assets/google.png";
import Facebook from "../../assets/facebook.png";
import Nexio from "../../assets/nexio.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/userSlice.js";
import { useState } from "react";
import { handleInputChange } from "../../utils/handleInput.js";

export default function Login() {
  const dispatch = useDispatch();
  const { errorMessage, isLoading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const handleInput = (e) => {
    handleInputChange(e, formData, setFormData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };



  return (
    <main className="py-[20px] md:py-[30px] lg:py-[40px] px-0 lg:px-[120px] flex items-center justify-center">
      <div className="flex justify-center lg:justify-between items-center h-[800px] w-full md:w-[70%]">
        <div className="w-full lg:w-1/2 flex flex-col h-full py-[30px] px-20">
          <div className="flex items-center">
            <img src={Nexio} className="h-[80px] w-[80px] rounded-lg" />
            <div className="ml-[5px]">
              <p className="text-[25px] font-bold tracking-wider">Nexio</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col mt-[50px]">
              <div>
                <h1 className="text-[30px] font-[700] text-gray-700 tracking-wide">
                  Welcome back
                </h1>
                <p className="text-gray-600 font-[200]">
                  Please enter your details
                </p>
              </div>
              <div className="flex items-center justify-center mt-5">
                <form
                  onSubmit={handleLogin}
                  className="w-full"
                  autoComplete="off"
                >
                  <div className="flex flex-col w-full">
                    <label htmlFor="email" className="text-sm text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInput(e)}
                      className="w-full border border-gray-500 py-[6px] rounded-lg outline-none px-2 placeholder:text-sm focus:border-lime-500"
                      placeholder="Enter your email"
                    />
                    {errorMessage.email && (
                      <p className="text-sm text-red-500">
                        {errorMessage.email[0]}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full my-4">
                    <label htmlFor="password" className="text-sm text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInput(e)}
                      className="w-full border border-gray-500 py-[6px] rounded-lg outline-none px-2 placeholder:text-sm focus:border-lime-500"
                      placeholder="Enter your password"
                    />
                    {errorMessage.password && (
                      <p className="text-sm text-red-500">
                        {errorMessage.password[0]}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="remember_me"
                        id="remember_me"
                      />
                      <label
                        htmlFor="remember_me"
                        className="ml-1 text-[15px] "
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-[15px] text-lime-900 font-medium"
                    >
                      Forgot Password
                    </a>
                  </div>
                  <div className="mt-8">
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="w-full bg-lime-900 text-white py-[6px] rounded-md font-medium tracking-wider hover:bg-lime-700 flex items-center justify-center"
                    >
                      {isLoading && (
                        <svg
                          className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex items-center my-7">
            <div className="bg-gray-400 w-full h-[1px] mr-1" />
            <span>OR</span>
            <div className="bg-gray-400 w-full h-[1px] ml-1" />
          </div>
          <div className="flex flex-col items-center">
            <button className="flex items-center justify-center py-[5px] border border-gray-400 w-full rounded-md hover:bg-gray-300">
              <img src={Google} alt="google_logo" className="mr-2 h-[20px]" />
              <span className="text-[14px]">Sign in using Google</span>
            </button>
            <button className="flex items-center justify-center py-[5px] border border-gray-400 w-full rounded-md mt-2 hover:bg-gray-300">
              <img
                src={Facebook}
                alt="facebook_logo"
                className="mr-2 h-[20px]"
              />
              <span className="text-[14px]">Sign in using Facebook</span>
            </button>
          </div>
        </div>

        <div className="hidden w-full h-full overflow-hidden md:w-1/2 lg:block">
          <img
            src="https://images.unsplash.com/photo-1600547463542-f421ba399ff2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-full w-full object-cover rounded-[50px]"
          />
        </div>
      </div>
    </main>
  );
}
