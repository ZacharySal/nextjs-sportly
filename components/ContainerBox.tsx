function ContainerBox({
  isDesktopScreen,
  children,
}: {
  isDesktopScreen: boolean;
  children: React.ReactNode;
}) {
  return isDesktopScreen ? (
    <>
      <div className="mx-auto my-3 grid w-[600px] max-w-full  grid-cols-1 gap-x-6 gap-y-2 lg:w-[1000px] lg:grid-cols-[1fr_600px] xl:w-[1280px] xl:grid-cols-[1fr_600px_1fr]">
        {children}
      </div>
    </>
  ) : (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="my-3 flex h-full w-full flex-col items-start justify-center">
          {children}
        </div>
      </div>
    </>
  );
}

export default ContainerBox;
