import React, { FunctionComponent } from 'react';
import Image from 'next/image'
import useDimensions from 'react-cool-dimensions';
import {breakpoints} from "@material-ui/system";

interface OwnProps {}

type Props = OwnProps;

const DishwasherGallery: FunctionComponent<Props> = (props) => {

  const imageDivClass = "mx-12 filter drop-shadow-lg"
  const imageClass = ""
  const textClass = "text-center text-2xl my-5 filter drop-shadow-none"

  return (
      <div className={"my-8 w-screen"}>
          <h1 className={"text-3xl text-center mb-8"}>How to start a wash</h1>
          <div className={"grid md:grid-cols-4 gap-4 mx-12 max-w-full"}>
              <div className={imageDivClass}>
                <Image className={imageClass} src={"/Dishwasher/1.jpg"} alt={"First dishwasher picture"} width={150} height={150} layout={"responsive"} />
                  <p className={textClass}> Step 1</p>
              </div>
              <div className={imageDivClass}>
                  <Image className={imageClass} src={"/Dishwasher/2.jpg"} alt={"First dishwasher picture"} width={150} height={150} layout={"responsive"} />
                  <p className={textClass}> Step 2</p>
              </div>
              <div className={imageDivClass}>
                  <Image className={imageClass} src={"/Dishwasher/3.jpg"} alt={"First dishwasher picture"} width={150} height={150} layout={"responsive"} />
                  <p className={textClass}> Step 3</p>
              </div>
              <div className={imageDivClass}>
                  <div className={" aspect-w-7 aspect-h-7 m-0"}>
                      <button className={"bg-primary text-white hover:bg-pink-500"} onClick={() => {
                          const response = fetch('/api/db', {
                              method: "PUT",
                              body: JSON.stringify({action: "?addWash"})
                          })
                      }}>
                          <p className={"text-xl"}>Clean out the dishwasher</p>
                      </button>
                  </div>
                  <p className={textClass}> Step 4</p>
              </div>
          </div>
      </div>
  );
};

export default DishwasherGallery;
