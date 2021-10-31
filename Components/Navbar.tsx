import React, { FunctionComponent } from 'react';
import {Session} from "next-auth";
import {signIn} from "next-auth/client";

interface OwnProps {
    loading: boolean,
    session: Session | null
}

type Props = OwnProps;

const Navbar: FunctionComponent<Props> = (props) => {

    return (<nav className={"flex justify-between bg-primary py-3 filter drop-shadow-lg"}>
        <h1 className={"ml-12 text-white text-lg self-center"}>Dishwasher of the month</h1>
        {!props.session &&
        <button className={"mr-12 text-black text-lg bg-white rounded-lg px-4 py-1 self-center filter drop-shadow-lg"} onClick={() => signIn()}>
            <p>Login</p>
        </button>
        }
    </nav>);
};

export default Navbar;
