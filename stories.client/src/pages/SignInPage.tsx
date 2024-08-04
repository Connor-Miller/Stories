import React from 'react';
import SignInWithGoogle from '../components/login/SignInWithGoogle';
import './SignInPage.css';

const SignInPage: React.FC = () => {

    function onSignInSuccess(data: any) {
        console.log("DATA", data)
        //window.location.href = '/directory'
    }
    function onSignInError(error: Error) {
        console.log(error)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="w-full max-w-md rounded-lg shadow-md p-8">
                <div className="flex justify-center mb-6">
                    <img src="/treeIconGreen.png" alt="Google" className="h-32" />
                </div>
                <h1 className="text-2xl font-normal mb-2">Sign in</h1>
                <p className="text-sm text-gray-600 mb-6">Use your Google Account</p>
                <form>
                    <div className="mb-4">
                        <SignInWithGoogle
                            onSuccess={onSignInSuccess}
                            onError={onSignInError}
                        />
                    </div>
                    {/*<div className="text-sm text-blue-600 mb-6">*/}
                    {/*    <a href="#" className="hover:underline">Forgot email?</a>*/}
                    {/*</div>*/}
                    <div className="text-sm text-gray-600 mb-6">
                        Not your computer? Use Guest mode to sign in privately.
                        <a
                            href="https://support.google.com/chrome/answer/6130773?hl=en"
                            className="text-blue-600 hover:underline block mt-1"
                            target="_blank"
                        >
                            Learn more about using Guest mode
                        </a>
                    </div>
                    {/*<div className="flex items-center justify-between mb-6">*/}
                    {/*    <a href="https://support.google.com/chrome/answer/6130773?hl=en" className="text-blue-600 text-sm hover:underline">*/}
                    {/*        Create account*/}
                    {/*    </a>*/}
                    {/*    <button*/}

                    {/*        type="submit"*/}
                    {/*        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                    {/*    >*/}
                    {/*        Next*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </form>
            </div>
            {/*<div className="mt-8 flex justify-between w-full max-w-md text-sm text-gray-600">*/}
            {/*    <select className="bg-transparent">*/}
            {/*        <option>English (United States)</option>*/}
            {/*    </select>*/}
            {/*    <div className="space-x-4">*/}
            {/*        <a href="#" className="hover:underline">Help</a>*/}
            {/*        <a href="#" className="hover:underline">Privacy</a>*/}
            {/*        <a href="#" className="hover:underline">Terms</a>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>


    );
};

export default SignInPage;