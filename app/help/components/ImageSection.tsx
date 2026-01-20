import React from "react";

const ImageSection = () => {
  return (
    <section className="flex bg-blue-500 h-75">
      <div className="flex flex-col grow relative w-full m-0 h-75">
        <img
          alt="help center home page hero image"
          fetchPriority="high"
          decoding="async"
          data-nimg="fill"
          className="object-cover"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            objectPosition: "0% 10%",
            color: "transparent",
          }}
          sizes="(min-width: 1200px) 50vw, (min-width: 600px) 35vw, (min-width: 385px) 30vw, 100vw"
          srcSet="https://www.searshomeservices.com/cftassets/f2KGYGNTDAN7cTVxK8maG/f47468d1175d2e1702966c2a4f0c169f/ad31812a4fa323f29c49b31745f6a252?w=256&q=90 256w, https://www.searshomeservices.com/cftassets/f2KGYGNTDAN7cTVxK8maG/f47468d1175d2e1702966c2a4f0c169f/ad31812a4fa323f29c49b31745f6a252?w=384&q=90 384w, https://www.searshomeservices.com/cftassets/f2KGYGNTDAN7cTVxK8maG/f47468d1175d2e1702966c2a4f0c169f/ad31812a4fa323f29c49b31745f6a252?w=640&q=90 640w, https://www.searshomeservices.com/cftassets/f2KGYGNTDAN7cTVxK8maG/f47468d1175d2e1702966c2a4f0c169f/ad31812a4fa323f29c49b31745f6a252?w=750&q=90 750w, https://www.searshomeservices.com/cftassets/f2KGYGNTDAN7cTVxK8maG/f47468d1175d2e1702966c2a4f0c169f/ad31812a4fa323f29c49b31745f6a252?w=828&q=90 828w, https://www.searshomeservices.com/cftassets/f2KGYGNTDAN7cTVxK8maG/f47468d1175d2e1702966c2a4f0c169f/ad31812a4fa323f29c49b31745f6a252?w=1080&q=90 1080w, https://www.searshomeservices.com/cftassets/f2KGYGNTDAN7cTVxK8maG/f47468d1175d2e1702966c2a4f0c169f/ad31812a4fa323f29c49b31745f6a252?w=1200&q=90 1200w, https://www.searshomeservices.com/cftassets/f2KGYGNTDAN7cTVxK8maG/f47468d1175d2e1702966c2a4f0c169f/ad31812a4fa323f29c49b31745f6a252?w=1920&q=90 1920w, https://www.searshomeservices.com/cftassets/f2KGYGNTDAN7cTVxK8maG/f47468d1175d2e1702966c2a4f0c169f/ad31812a4fa323f29c49b31745f6a252?w=2048&q=90 2048w, https://www.searshomeservices.com/cftassets/f2KGYGNTDAN7cTVxK8maG/f47468d1175d2e1702966c2a4f0c169f/ad31812a4fa323f29c49b31745f6a252?w=3840&q=90 3840w"
          src="https://www.searshomeservices.com/cftassets/f2KGYGNTDAN7cTVxK8maG/f47468d1175d2e1702966c2a4f0c169f/ad31812a4fa323f29c49b31745f6a252?w=3840&q=90"
        />
        <div className="absolute w-full h-full bg-hero-gradient"></div>
        <div className="absolute w-full h-full flex justify-center items-center">
          <div className="mx-auto max-w-300">
            <div className="w-screen"></div>
            <div className="grid grid-cols-1 gap-6 max-w-220 px-4 md:px-0 md:ml-6 xl:ml-0 md:gap-2 w-full">
              <div className="shrink-0"></div>
              <h2 className="text-white leading-normal max-w-[28.563rem] text-5xl font-semibold">
                Welcome to the <br /> Help Center
              </h2>
              <h4 className="text-white hidden lg:block font-normal max-w-[25.563rem]">
                We're here to help you find a solution
              </h4>
              <p className="font-normal block lg:hidden text-white text-4xl lg:pr-6">
                We're here to help you find a solution
              </p>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSection;
