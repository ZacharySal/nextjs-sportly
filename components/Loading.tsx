function Loading() {
  return (
    <div className="w-full h-80 flex justify-center items-center relative">
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
