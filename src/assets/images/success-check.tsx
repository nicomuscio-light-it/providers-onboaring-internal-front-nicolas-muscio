export const SuccessCheck = () => {
  return (
    <svg
      aria-hidden="true"
      className="size-20"
      fill="none"
      viewBox="0 0 52 52"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="signup-check-fill fill-background-success-default"
        cx={26}
        cy={26}
        r={25}
      />
      <circle
        className="signup-check-ring stroke-background-success-default"
        cx={26}
        cy={26}
        pathLength={1}
        r={24}
      />
      <path
        className="signup-check-mark stroke-white"
        d="M14.7 27.1l6.7 6.8 15.9-16"
        pathLength={1}
      />
    </svg>
  );
};
