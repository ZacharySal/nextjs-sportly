function Loading() {
  return (
    <div className="relative flex h-80 w-full items-center justify-center">
      <div className="loader">
        <svg className="circular">
          <circle
            className="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="3"
            strokeMiterlimit="10"
          ></circle>
        </svg>
      </div>
    </div>
  );
}

export default Loading;
