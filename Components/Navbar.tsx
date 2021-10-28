import React, { FunctionComponent } from 'react';

interface OwnProps {}

type Props = OwnProps;

const Navbar: FunctionComponent<Props> = (props) => {

    return (<nav className={"flex justify-between bg-primary py-3 filter drop-shadow-lg"}>
        <h1 className={"ml-12 text-white text-lg self-center"}>Dishwasher of the month</h1>
        <button className={"mr-12 text-black text-lg bg-white rounded-lg px-4 py-1 self-center filter drop-shadow-lg"}>
            <p>Login</p>
        </button>
    </nav>);
};

export default Navbar;
