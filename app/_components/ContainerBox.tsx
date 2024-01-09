function ContainerBox({
  isDesktopScreen,
  children,
}: {
  isDesktopScreen: boolean;
  children: React.ReactNode;
}) {
  return isDesktopScreen ? (
    <>
      <div className="max-w-full 2xl:w-5/6 3xl:w-3/5 2xl:px-20 flex flex-row justify-center px-20 mx-auto gap-8 gap-x-5 my-3">
        {children}
      </div>
    </>
  ) : (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-full h-full flex flex-col justify-center items-start my-3">
          {children}
        </div>
      </div>
    </>
  );
}

export default ContainerBox;
