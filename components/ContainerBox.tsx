function ContainerBox({
  isDesktopScreen,
  children,
}: {
  isDesktopScreen: boolean;
  children: React.ReactNode;
}) {
  return isDesktopScreen ? (
    <>
      <div className="max-w-full grid w-[600px] grid-cols-1 gap-y-2  my-3 mx-auto gap-x-6 lg:w-[1000px] lg:grid-cols-[1fr_600px] xl:w-[1280px] xl:grid-cols-[1fr_600px_1fr]">
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
