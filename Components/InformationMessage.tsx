import {FunctionComponent} from "react";

const InformationMessage: FunctionComponent = () => {

    return (
        <div className={"flex flex-col justify-center self-center mt-10"}>
            <h1 className={"text-3xl text-center mb-8 md:mx-0 mx-10"}>Will you be the dishwasher of the month?</h1>
            <p className={"self-center text-left text-lg my-5 filter drop-shadow-none w-9/12"}>Welcome to the website
                where you can get imaginary internet points for doing the dishes in Mercator! Simply load the
                dishwasher, turn it on and press the magenta button below to receive these points. <br/> <br/>
                At the end of the month the website will add the best dishwasher to the exclusive winners leaderboard.
                That person also has the honor to use the very special dishwasher of the month mug in Mercator. But
                do not think that you can rest after that because the next month it can be taken away by the new
                dishwasher of the month
            </p>
        </div>
    )
}

export default InformationMessage;