import React, {useEffect} from "react";
import { providers, signIn } from "next-auth/client";

export default function SignIn({ providers }) {

    useEffect(() =>{
        if(providers) {
            signIn(Object.values(providers)[0].id);
        }
        }, [providers])

    return (
        <div className={"bg-black w-screen h-screen flex self-center justify-center"}>
            {Object.values(providers).map((provider) => (
                <div className={"text-white self-center justify-center"} key={provider.name} >
                    <button className={"text-white bg-primary self-center justify-center"} onClick={() => {
                        signIn(provider.id);
                    }}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

SignIn.getInitialProps = async (context) => {
    return {
        providers: await providers(context),
    };
};