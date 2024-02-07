import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to know more about Me?</h2>
        <p className="text-gray-500 my-2">Checkout my Portfolio.</p>
        <Button
          gradientDuoTone="purpleToBlue"
          className="rounded-tl-xl rounded-bl-none"
          onClick={() => {
            window.open("https://roshanportfolio2.netlify.app/", "_blank");
          }}
        >
          Portfolio
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="/Roshan_profile.png" className="rounded" alt="Logo" />
      </div>
    </div>
  );
}
